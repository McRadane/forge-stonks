import { crafts } from '../resources/forge';
import { itemsFuels, itemsOrganicMatter } from '../resources/garden';
import { itemsSource, itemsVendorPrice } from '../resources/items';
import { enUs } from '../resources/lang/enUs';
import { frFr } from '../resources/lang/frFr';
import type { KeysLanguageType, ILanguage, ILanguageItems } from '../resources/lang/type';
import type { ICraft, ICraftWithCosts, ICraftWithPrice } from '../resources/types';
import { initialState, IOptionsState } from '../services/common';

import { getPlayerData, IProfile } from './axios';
import { Database } from './database';
import type {
  WorkerCommandEvents,
  ITimer,
  IWorkerCommandStartTimer,
  IWorkerCommandStopTimer,
  IWorkerResponseGetGardenPrices,
  IWorkerResponseGetLanguage,
  IWorkerResponseGetPrices,
  IWorkerResponseGetPricesResult,
  IWorkerResponseMessage,
  IWorkerResponseOptions,
  IWorkerResponseTimerEnded,
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
  private withNotification = false;

  constructor() {
    this.database = new Database(ctx, () => {
      /* if (this.crafts) {
        this.getPrices({ command: 'Command-GetPrices', crafts: this.crafts });
      } */
    });

    this.database.cacheDuration = CACHE_DURATION;
  }

  public async forceRefresh(): Promise<void> {
    // console.log('starting getPrices');
    this.messageResponse('Starting forceRefresh');
    await this.database.forceRefresh();
  }

  public async getLanguage() {
    this.messageResponse('ask for language');
    const data = await this.database.cache.get('language');
    if (data) {
      this.languageKey = data.value as KeysLanguageType;
      const command: IWorkerResponseGetLanguage = { command: 'Response-GetLanguage', language: this.languageKey };
      ctx.postMessage(command);
    }

    const command: IWorkerResponseGetLanguage = { command: 'Response-GetLanguage', language: undefined };
    ctx.postMessage(command);
  }
  public async getPrices(): Promise<void> {
    // console.log('starting getPrices');
    // this.messageResponse('Starting getPrices');

    const options = await this.getAllOptions();
    const crafts = await this.getCrafts();

    this.messageResponse('Starting getPrices');

    this.getItemsWithCraftPrice({ crafts, ...options }).then((results) => {
      this.messageResponse('Ending getPrices');
      const command: IWorkerResponseGetPrices = {
        command: 'Response-GetPrices',
        results
      };
      ctx.postMessage(command);
    });
  }

  public async getGardenPrices(): Promise<void> {
    // console.log('starting getPrices');
    // this.messageResponse('Starting getPrices');

    this.messageResponse('Starting getGardenPrices');

    const organicMattersIds = Object.keys(itemsOrganicMatter);
    const fuelsIds = Object.keys(itemsFuels);

    const resultOrganicMatters: Partial<Record<keyof typeof itemsOrganicMatter, { price: number; ratio: number }>> = {};
    const resultFuels: Partial<Record<keyof typeof itemsFuels, { price: number; ratio: number }>> = {};

    for await (const itemId of organicMattersIds) {
      const source = itemsSource[itemId as keyof ILanguage['items']];

      const result = await this.resolveItemPrices(itemId as keyof ILanguage['items'], source, true);

      if (!isNaN(result.buy)) {
        resultOrganicMatters[itemId as keyof typeof itemsOrganicMatter] = {
          price: result.buy,
          ratio: (result.buy / (itemsOrganicMatter[itemId as keyof typeof itemsOrganicMatter] as number)) * 4000
        };
      }
    }

    for await (const itemId of fuelsIds) {
      const source = itemsSource[itemId as keyof ILanguage['items']];

      const result = await this.resolveItemPrices(itemId as keyof ILanguage['items'], source, true);

      if (!isNaN(result.buy)) {
        resultFuels[itemId as keyof typeof itemsFuels] = {
          price: result.buy,
          ratio: ((result.buy / (itemsFuels[itemId as keyof typeof itemsFuels] as number)) as number) * 2000
        };
      }
    }

    this.messageResponse('Ending getGardenPrices');
    const command: IWorkerResponseGetGardenPrices = {
      command: 'Response-GetGardenPrices',
      results: {
        fuels: resultFuels,
        organics: resultOrganicMatters
      }
    };
    ctx.postMessage(command);
  }

  public async initialize(withNotification: boolean) {
    this.messageResponse('Initializing');
    this.getOptions();
    this.withNotification = withNotification;
    const count = await this.database.timers.count();

    if (count !== 0 && this.timersInterval === undefined) {
      this.timersInterval = setInterval(() => {
        this.checkTimers();
      }, 1000) as unknown as number;
    }

    const playerName = await this.database.getFromCache<string>('playerName');
    const playerProfile = await this.database.getFromCache<{ id: string; name: string }>('playerProfile');

    if (playerName && playerProfile) {
      const player = await getPlayerData(playerName, playerProfile.id);
      if (player) {
        this.syncPlayerProfile(player);
      }
    }

    this.getTimers();
    this.getPrices();
  }

  public async syncPlayerProfile(player: IProfile) {
    this.database.addToCache('hotm', player.data.mining.core.tier.level ?? initialState.hotm);
    this.database.addToCache('quickForge', player.raw.mining_core.nodes.forge_time ?? initialState.quickForge);

    // this.database.timers.clear();
    player.data.mining.forge.processes.forEach(async (forge) => {
      let found = crafts.find((item) => item.itemId === forge.id);

      if (!found) {
        found = crafts.find((item) => item.itemId.toLowerCase() === forge.id.toLowerCase().replace('_', ' '));
      }

      const existing = await this.database.timers.toArray();

      if (found) {
        const foundExisting = existing.find((timer) => timer.endTime === forge.timeFinished);
        if (!foundExisting) {
          const startTime = forge.timeFinished - found.time * 1000 * 60 * 60;

          this.database.timers.add({
            endTime: forge.timeFinished,
            itemId: found.itemId as keyof ILanguageItems,
            slot: forge.slot,
            startTime
          } as ITimer);
        }
      }
    });
  }

  public setLanguage(language: KeysLanguageType) {
    this.database.addToCache('language', language);

    this.languageKey = language;
  }

  public async setOptions(options: Partial<IOptionsState>) {
    const allOptions = await this.getAllOptions();
    const touched: Partial<IOptionsState> = {};

    Object.keys(options).forEach((optionName) => {
      const value = options[optionName as keyof Partial<IOptionsState>];
      if (value !== allOptions[optionName as keyof Partial<IOptionsState>]) {
        this.database.addToCache(optionName, value);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        touched[optionName as keyof Partial<IOptionsState>] = value as any;
      }
    });

    if (Object.keys(touched).length > 0) {
      const command: IWorkerResponseOptions = {
        command: 'Response-Options',
        ...touched
      };
      ctx.postMessage(command);

      this.getPrices();
    }
  }

  public async startTimer({ itemId }: IWorkerCommandStartTimer) {
    const found = crafts.find((item) => item.itemId === itemId);

    if (found) {
      this.messageResponse(`Start timer for ${JSON.stringify(found)}`);
      const count = await this.database.timers.count();
      if (count <= 4) {
        const startTime = Date.now();
        const endTime = startTime + found.time * 1000 * 60 * 60;
        this.database.timers.add({ endTime, itemId, slot: count + 1, startTime } as ITimer);
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

    const command: IWorkerResponseTimerSet = { command: 'Response-TimerSet', itemId };
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
      const command: IWorkerResponseTimers = { command: 'Response-Timers', timers };
      ctx.postMessage(command);
    });
  }

  private async getOptions() {
    const command: IWorkerResponseOptions = {
      command: 'Response-Options',
      ...(await this.getAllOptions())
    };

    ctx.postMessage(command);
  }

  private async getCrafts() {
    const { hotm, includeAuctionsFlip } = await this.getAllOptions();

    let filtersCraft = crafts;
    if (!includeAuctionsFlip) {
      filtersCraft = filtersCraft.filter((craft) => craft.bazaarItem);
    }

    filtersCraft = filtersCraft.filter((craft) => craft.hotm <= hotm);

    return filtersCraft;
  }

  private async getAllOptions(): Promise<IOptionsState> {
    return {
      auctionsBINOnly: (await this.database.getFromCache<boolean>('auctionsBINOnly')) ?? initialState.auctionsBINOnly,
      cacheDuration: (await this.database.getFromCache<number>('cacheDuration')) ?? initialState.cacheDuration,
      hotm: (await this.database.getFromCache<number>('hotm')) ?? initialState.hotm,
      includeAuctionsFlip: (await this.database.getFromCache<boolean>('includeAuctionsFlip')) ?? initialState.includeAuctionsFlip,
      intermediateCraft: (await this.database.getFromCache<boolean>('intermediateCraft')) ?? initialState.intermediateCraft,
      maxCraftingCost: (await this.database.getFromCache<number>('maxCraftingCost')) ?? initialState.maxCraftingCost,
      playFrequency: (await this.database.getFromCache<IOptionsState['playFrequency']>('playFrequency')) ?? initialState.playFrequency,
      playerName: await this.database.getFromCache<string>('playerName'),
      playerProfile: await this.database.getFromCache<{ id: string; name: string }>('playerProfile'),
      quickForge: (await this.database.getFromCache<number>('quickForge')) ?? initialState.quickForge
    };
  }

  private async checkTimers() {
    const now = Date.now();
    const timers = await this.database.timers.toArray();

    const lang = this.getLang();
    timers.forEach((timer) => {
      if (now > timer.endTime) {
        this.database.timers.delete(timer.id);
        this.notifyMe(lang.notification.timerEnded.replace('{0}', lang.items[timer.itemId]).replace('{1}', String(timer.slot ?? '')));
        this.getTimers();
        const command: IWorkerResponseTimerEnded = { command: 'Response-TimerEnded', itemId: timer.itemId, slot: timer.slot };
        ctx.postMessage(command);
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
    const command: IWorkerResponseMessage = { command: 'Response-Message', message };
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

  private async getMaterialPrice({
    auctionsBINOnly,
    crafts,
    intermediateCraft
  }: IOptionsState & { crafts: ICraft[] }): Promise<Record<ICraft['itemId'], ICraftWithPrice>> {
    const newMaterials = {} as Record<ICraft['itemId'], ICraftWithPrice>;

    for await (const craft of crafts) {
      for await (const craftMaterial of craft.craftMaterial) {
        if (intermediateCraft) {
          await this.updater({
            auctionsBINOnly,
            // costRef: costsRef[craft.itemId],
            id: craftMaterial.itemId,
            intermediateCraft,
            isCraft: craftMaterial.intermediaryCraft,
            source: craftMaterial.source,
            callback: (newCost: number) => {
              newMaterials[craftMaterial.itemId] = { ...craft, craft: newCost, time: 0 };
            }
          });
        } else {
          const materialitemDb =
            craftMaterial.source === 'bazaar'
              ? await this.database.getItemPrice(craftMaterial.itemId, 'bazaar')
              : await this.database.getItemPrice(craftMaterial.itemId, 'bins');

          newMaterials[craftMaterial.itemId] = { ...craft, craft: materialitemDb?.buyPrice ?? 0, time: 0 };
        }
      }
    }

    return newMaterials;
  }

  private async getItemsWithCraftPrice(options: IOptionsState & { crafts: ICraft[] }): Promise<IWorkerResponseGetPricesResult> {
    const {
      auctionsBINOnly,
      crafts,
      // costsRef,
      intermediateCraft,
      playFrequency,
      quickForge
    } = options;
    const newCosts = {} as Record<ICraft['itemId'], ICraftWithCosts>;
    const newMaterials = await this.getMaterialPrice(options);

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

    return { crafts: newCosts, materials: newMaterials };
  }

  private getLang(): ILanguage {
    switch (this.languageKey) {
      case 'fr-FR':
        return frFr;
      case 'en-US':
      default:
        return enUs;
    }
  }
}

const worker = new ComputationWorker();

ctx.addEventListener('message', (event: WorkerCommandEvents) => {
  switch (event.data.command) {
    case 'Command-ForceRefresh':
      worker.forceRefresh();
      break;
    case 'Command-GetGardenPrices':
      worker.getGardenPrices();
      break;
    case 'Command-GetLanguage':
      worker.getLanguage();
      break;
    case 'Command-GetPrices':
      worker.getPrices();
      break;
    case 'Command-Initialize':
      worker.initialize(event.data.withNotification);
      break;
    case 'Command-SetLanguage':
      worker.setLanguage(event.data.language);
      break;
    case 'Command-SetOptions':
      worker.setOptions(event.data.options);
      break;
    case 'Command-StartTimer':
      worker.startTimer(event.data);
      break;
    case 'Command-StopTimer':
      worker.stopTimer(event.data);
      break;
  }
});
