import { ICraftWithCosts } from '../craft/functions';
import { crafts, itemsSource, itemsVendorPrice, ICraft } from '../resources/crafts';
import enUs from '../resources/lang/enUs.json';
import frFr from '../resources/lang/frFr.json';
import { KeysLanguageType, ILanguage } from '../resources/lang/type';
import { IOptionsState } from '../services/options';

import { Database } from './database';
import {
  WorkerCommandEvents,
  ITimer,
  IWorkerCommandDeleteCacheItem,
  IWorkerCommandGetCacheItem,
  IWorkerCommandGetPrices,
  IWorkerCommandSetCacheItem,
  IWorkerCommandStartTimer,
  IWorkerCommandStopTimer,
  IWorkerResponseCacheDeleteExecuted,
  IWorkerResponseCacheGetResult,
  IWorkerResponseCacheSetExecuted,
  IWorkerResponseGetLanguage,
  IWorkerResponseMessage,
  IWorkerResponseTimerSet,
  IWorkerResponseTimers
} from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

const CACHE_DURATION = 3_600_000;

class ComputationWorker {
  private database: Database;
  private timersInterval: undefined | number;
  private languageKey: KeysLanguageType = 'en-US';
  private crafts!: ICraft[];
  private withNotification = false;

  constructor() {
    this.database = new Database(ctx, () => {
      if (this.crafts) {
        this.getPrices({ command: 'getPrices', crafts: this.crafts });
      }
    });

    this.database.cacheDuration = CACHE_DURATION;
  }

  public deleteCacheItem({ key }: IWorkerCommandDeleteCacheItem) {
    this.database.removeFromCache(key).then(() => {
      const command: IWorkerResponseCacheDeleteExecuted = { command: 'cacheDeleteExecuted', key };
      ctx.postMessage(command);
    });
  }
  public async forceRefresh(): Promise<void> {
    // console.log('starting getPrices');
    this.messageResponse('Starting forceRefresh');
    await this.database.forceRefresh();
  }

  public getCacheItem({ key }: IWorkerCommandGetCacheItem) {
    this.database.getFromCache(key).then((value) => {
      const command: IWorkerResponseCacheGetResult = { command: 'cacheGetResult', key, value: value as undefined | number | string };
      ctx.postMessage(command);
    });
  }

  public async getLanguage() {
    this.messageResponse('ask for language');
    const data = await this.database.cache.get('language');
    if (data) {
      this.languageKey = data.value as KeysLanguageType;
      const command: IWorkerResponseGetLanguage = { command: 'getLanguageResponse', language: this.languageKey };
      ctx.postMessage(command);
    }

    const command: IWorkerResponseGetLanguage = { command: 'getLanguageResponse', language: undefined };
    ctx.postMessage(command);
  }
  public async getPrices(command: IWorkerCommandGetPrices): Promise<void> {
    // console.log('starting getPrices');
    // this.messageResponse('Starting getPrices');

    this.crafts = command.crafts;

    let options: IOptionsState = {
      auctionsBINOnly: true,
      cacheDuration: CACHE_DURATION,
      hotm: 7,
      includeAuctionsFlip: true,
      intermediateCraft: false,
      maxCraftingCost: 0,
      playFrequency: 'nonstop',
      quickForge: 0
    };

    const optionsCached = (await this.database.getFromCache('persist:root')) as string;

    if (optionsCached) {
      const hydrated = JSON.parse(optionsCached);

      options = { ...options, ...JSON.parse(hydrated.options) };
    }

    this.messageResponse('Starting getPrices' + JSON.stringify(options));

    this.getItemsWithCraftPrice({ crafts: command.crafts, ...options }).then((results) => {
      this.messageResponse('Ending getPrices');
      ctx.postMessage({ command: 'resultGetPrices', results });
    });
  }
  public async initialize(withNotification: boolean) {
    this.messageResponse('Initializing');
    this.withNotification = withNotification;
    const count = await this.database.timers.count();

    if (count !== 0 && this.timersInterval === undefined) {
      this.timersInterval = setInterval(() => {
        this.checkTimers();
      }, 1000) as unknown as number;
    }

    this.getTimers();
  }
  public setCacheItem({ key, value }: IWorkerCommandSetCacheItem) {
    this.database.addToCache(key, value).then(() => {
      const command: IWorkerResponseCacheSetExecuted = { command: 'cacheSetExecuted', key };
      ctx.postMessage(command);
      if (this.crafts) {
        this.getPrices({ command: 'getPrices', crafts: this.crafts });
      }
    });
  }
  public setLanguage(language: KeysLanguageType) {
    this.database.addToCache('language', language);

    this.languageKey = language;
  }
  public async startTimer({ itemId }: IWorkerCommandStartTimer) {
    const found = crafts.find((item) => item.itemId === itemId);

    if (found) {
      this.messageResponse(`Start timer for ${JSON.stringify(found)}`);
      const count = await this.database.timers.count();
      if (count <= 4) {
        const startTime = Date.now();
        const endTime = startTime + found.time * 1000 * 60 * 60;
        this.database.timers.add({ endTime, itemId, startTime } as ITimer);
      }

      if (count === 0 && this.timersInterval === undefined) {
        this.timersInterval = setInterval(() => {
          this.checkTimers();
        }, 1000) as unknown as number;
      }
    } else {
      this.messageResponse(`Start timer but item not found ${itemId}`);
    }

    this.getTimers();

    const command: IWorkerResponseTimerSet = { command: 'timerSet', itemId };
    ctx.postMessage(command);
  }

  public async stopTimer({ id }: IWorkerCommandStopTimer) {
    await this.database.timers.delete(id);
    const count = await this.database.timers.count();

    if (count === 0) {
      clearInterval(this.timersInterval);
    }

    this.getTimers();
  }

  private getTimers() {
    this.database.timers.toArray().then((timers) => {
      const command: IWorkerResponseTimers = { command: 'timers', timers };
      ctx.postMessage(command);
    });
  }

  private async checkTimers() {
    const now = Date.now();
    const timers = await this.database.timers.toArray();

    const lang = this.getLang();
    timers.forEach((timer) => {
      if (now > timer.endTime) {
        this.notifyMe(lang.notification.timerEnded.replace('{0}', lang.items[timer.itemId as keyof ILanguage['items']]));
        this.database.timers.delete(timer.id);
        this.getTimers();
      }
    });
  }

  private notifyMe(message: string) {
    // Check if the browser supports notifications
    if (this.withNotification && Notification.permission === 'granted') {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const notification = new Notification(message);
      // …
    }
  }

  private messageResponse(message: string) {
    const command: IWorkerResponseMessage = { command: 'message', message };
    ctx.postMessage(command);
  }

  private async resolveItemPrices(
    id: keyof ILanguage['items'],
    source: 'auction' | 'bazaar' | 'vendor',
    auctionsBINOnly: boolean
  ): Promise<{ buy: number; sell: number }> {
    if (source === 'bazaar') {
      const found = await this.database.getItemBazaarPrice(id);

      if (found) {
        return { buy: found.buyPrice, sell: found.sellPrice };
      }
      return { buy: NaN, sell: NaN };
    } else if (source === 'vendor') {
      const price = itemsVendorPrice[id] ?? 0;

      return { buy: price, sell: price };
    }

    const foundBins = await this.database.getItemBinsPrice(id);

    if (foundBins && auctionsBINOnly) {
      return { buy: foundBins?.buyPrice, sell: foundBins?.buyPrice };
    }

    const foundAuctions = await this.database.getItemAuctionsPrice(id);

    if (foundBins || foundAuctions) {
      const lowerPrice = Math.min(...([foundBins?.buyPrice, foundAuctions?.buyPrice].filter((price) => price) as number[]));

      return { buy: lowerPrice, sell: lowerPrice };
    }

    return { buy: NaN, sell: NaN };
  }

  private async resolveItemCraftPrice(id: string, intermediateCraft: boolean, auctionsBINOnly: boolean) {
    const found = crafts.find((item) => item.itemId === id);

    if (found) {
      let sum = 0;
      for await (const material of found.craftMaterial) {
        if (intermediateCraft && material.intermediaryCraft) {
          const buy = await this.resolveItemCraftPrice(material.itemId, intermediateCraft, auctionsBINOnly);
          sum += buy * material.quantity;
        } else if (material.source === 'vendor') {
          sum += (itemsVendorPrice[material.itemId] ?? 0) * material.quantity;
        } else {
          const { buy } = await this.resolveItemPrices(material.itemId, material.source, auctionsBINOnly);
          sum += buy * material.quantity;
        }
      }

      return sum;
    }

    return NaN;
  }

  private async updater(options: {
    auctionsBINOnly: boolean;
    // costRef: number;
    id: keyof ILanguage['items'];
    intermediateCraft: boolean;
    isCraft: boolean;
    source?: string;
    callback(newPrice: number): void;
  }) {
    const { auctionsBINOnly, callback, id, intermediateCraft, isCraft, source } = options;
    if (isCraft) {
      const newCost = await this.resolveItemCraftPrice(id, intermediateCraft, auctionsBINOnly);
      //if (costRef !== newCost) {
      callback(newCost);
      //}
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { buy } = await this.resolveItemPrices(id, source as any, auctionsBINOnly);
      //if (costRef !== buy) {
      callback(buy);
      //}
    }
  }

  private getQuickForgeBonus(quickForge: number) {
    if (quickForge >= 2 && quickForge <= 10) {
      return 0.85;
    }

    if (quickForge >= 11 && quickForge <= 19) {
      return 0.805;
    }

    if (quickForge === 20) {
      return 0.7;
    }

    return 1;
  }

  private async getItemsWithCraftPrice({
    auctionsBINOnly,
    crafts,
    // costsRef,
    intermediateCraft,
    playFrequency,
    quickForge
  }: IOptionsState & { crafts: ICraft[] }) {
    const newCosts = {} as Record<ICraft['itemId'], ICraftWithCosts>;

    const quickForgeBonus = this.getQuickForgeBonus(quickForge);

    for await (const craft of crafts) {
      const source = itemsSource[craft.itemId as keyof typeof itemsSource] ?? 'vendor';

      const itemDb = craft.bazaarItem
        ? await this.database.getItemPrice(craft.itemId, 'bazaar')
        : await this.database.getItemPrice(craft.itemId, 'bins');
      const sell = itemDb?.sellPrice ?? 0;

      await this.updater({
        auctionsBINOnly,
        // costRef: costsRef[craft.itemId],
        id: craft.itemId,
        intermediateCraft,
        isCraft: true,
        source,
        callback: (newCost: number) => {
          const profit = sell - newCost;
          let period = 1;

          switch (playFrequency) {
            case 'everyday':
              period = 24;
              break;
            case 'three-time':
              period = 8;
              break;
            case 'twice':
              period = 12;
              break;
          }

          const time = craft.time * quickForgeBonus;

          const profitHourly = (profit / Math.max(time, period)) * period;

          newCosts[craft.itemId] = { ...craft, craft: newCost, profit, profitHourly, sell, time };
        }
      });
    }

    return newCosts;
  }

  private getLang(): ILanguage {
    switch (this.languageKey) {
      case 'fr-FR':
        return frFr as ILanguage;
      case 'en-US':
      default:
        return enUs as ILanguage;
    }
  }
}

const worker = new ComputationWorker();

ctx.addEventListener('message', (event: WorkerCommandEvents) => {
  switch (event.data.command) {
    case 'deleteCacheItem':
      worker.deleteCacheItem(event.data);
      break;
    case 'forceRefresh':
      worker.forceRefresh();
      break;
    case 'getCacheItem':
      worker.getCacheItem(event.data);
      break;
    case 'getLanguage':
      worker.getLanguage();
      break;
    case 'getPrices':
      worker.getPrices(event.data);
      break;
    case 'initialize':
      worker.initialize(event.data.withNotification);
      break;
    case 'setCacheItem':
      worker.setCacheItem(event.data);
      break;
    case 'setLanguage':
      worker.setLanguage(event.data.language);
      break;
    case 'startTimer':
      worker.startTimer(event.data);
      break;
    case 'stopTimer':
      worker.stopTimer(event.data);
      break;
  }
});
