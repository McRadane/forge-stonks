import { crafts, itemsSource, itemsVendorPrice } from '../resources/crafts';
import { enUs } from '../resources/lang/enUs';
import { frFr } from '../resources/lang/frFr';
import type { ILanguage, KeysLanguageType } from '../resources/lang/type';
import type { ICraft, ICraftWithCosts, ICraftWithPrice } from '../resources/types';
import { initialState, type IOptionsState } from '../services/common';

import { getPlayerData } from './axios';
import { Database } from './database';
import type {
  ITimer,
  IWorkerCommandStartTimer,
  IWorkerCommandStopTimer,
  IWorkerResponseGetLanguage,
  IWorkerResponseGetPrices,
  IWorkerResponseGetPricesResult,
  IWorkerResponseMessage,
  IWorkerResponseOptions,
  IWorkerResponseTimerEnded,
  IWorkerResponseTimers,
  IWorkerResponseTimerSet,
  WorkerCommandEvents
} from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

const CACHE_DURATION = 3_600_000;

class ComputationWorker {
  private readonly _database: Database;
  private _languageKey: KeysLanguageType = 'en-US';
  private _timersInterval: number | undefined;
  private _withNotification = false;

  constructor() {
    this._database = new Database(ctx, () => {});

    this._database.cacheDuration = CACHE_DURATION;
  }

  public async forceRefresh(): Promise<void> {
    this._messageResponse('Starting forceRefresh');
    await this._database.ensureInitialize();
    await this._database.forceRefresh();
  }

  public async getLanguage() {
    this._messageResponse('ask for language');
    const data = await this._database.cache.get('language');
    if (data) {
      this._languageKey = data.value as KeysLanguageType;
      const command: IWorkerResponseGetLanguage = { command: 'Response-GetLanguage', language: this._languageKey };
      ctx.postMessage(command);
    }

    const command: IWorkerResponseGetLanguage = { command: 'Response-GetLanguage', language: null };
    ctx.postMessage(command);
  }
  public async getPrices(): Promise<void> {
    const options = await this._getAllOptions();
    const crafts = await this._getCrafts();

    this._messageResponse('Starting getPrices');

    const results = await this._getItemsWithCraftPrice({ crafts, ...options });

    this._messageResponse('Ending getPrices');
    const command: IWorkerResponseGetPrices = {
      command: 'Response-GetPrices',
      results
    };
    ctx.postMessage(command);
  }
  public async initialize(withNotification: boolean) {
    this._messageResponse('Initializing');
    this._getOptions();
    this._withNotification = withNotification;
    const count = await this._database.timers.count();

    if (count !== 0 && this._timersInterval === undefined) {
      this._timersInterval = setInterval(() => {
        this._checkTimers();
      }, 1000) as unknown as number;
    }

    const playerName = await this._database.getFromCache<string>('playerName');
    const playerProfile = await this._database.getFromCache<string>('playerProfile');
    if (playerName && playerProfile) {
      const player = await getPlayerData(playerName, playerProfile);
      if (player) {
        this._database.addToCache('hotm', player.data.mining.core.tier ?? initialState.hotm);
        this._database.addToCache('quickForge', player.raw.mining_core.nodes.forge_time ?? initialState.quickForge);
        this._database.timers.clear();
        /* player.data.mining.forge.processes.forEach((forge) => {
          this.database.timers.add({
            itemId: forge.id
          });
        }); */
      }
    }

    this._getTimers();
    this.getPrices();
  }

  public setLanguage(language: KeysLanguageType) {
    this._database.addToCache('language', language);

    this._languageKey = language;
  }

  public async setOptions(options: Partial<IOptionsState>) {
    const allOptions = await this._getAllOptions();
    const touched: Partial<IOptionsState> = {};

    Object.keys(options).forEach((optionName) => {
      const value = options[optionName as keyof Partial<IOptionsState>];
      if (value !== allOptions[optionName as keyof Partial<IOptionsState>]) {
        this._database.addToCache(optionName, value);
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
      this._messageResponse(`Start timer for ${JSON.stringify(found)}`);
      const count = await this._database.timers.count();
      const slots = await this._getForgeSlots();

      if (count < slots) {
        const startTime = Date.now();
        const endTime = startTime + found.time * 1000 * 60 * 60;
        this._database.timers.add({ endTime, itemId, startTime } as ITimer);
      }

      if (count === 0 && this._timersInterval === undefined) {
        this._timersInterval = setInterval(() => {
          this._checkTimers();
        }, 1000) as unknown as number;
      }
    } else {
      this._messageResponse(`Start timer but item not found ${itemId}`);
    }

    this._getTimers();

    const command: IWorkerResponseTimerSet = { command: 'Response-TimerSet', itemId };
    ctx.postMessage(command);
  }

  public async stopTimer({ id }: IWorkerCommandStopTimer) {
    await this._database.timers.delete(id);
    const count = await this._database.timers.count();

    if (count === 0) {
      clearInterval(this._timersInterval);
    }

    this._getTimers();
  }

  private async _checkTimers() {
    const now = Date.now();
    const timers = await this._database.timers.toArray();

    const lang = this._getLang();
    timers.forEach((timer) => {
      if (now > timer.endTime) {
        this._notifyMe(lang.notification.timerEnded.replace('{0}', lang.items[timer.itemId]));
        this._database.timers.delete(timer.id);
        this._getTimers();
        const command: IWorkerResponseTimerEnded = { command: 'Response-TimerEnded', itemId: timer.itemId };
        ctx.postMessage(command);
      }
    });
  }

  private async _getAllOptions(): Promise<IOptionsState> {
    return {
      auctionsBINOnly: (await this._database.getFromCache<boolean>('auctionsBINOnly')) ?? initialState.auctionsBINOnly,
      cacheDuration: (await this._database.getFromCache<number>('cacheDuration')) ?? initialState.cacheDuration,
      hotm: (await this._database.getFromCache<number>('hotm')) ?? initialState.hotm,
      includeAuctionsFlip: (await this._database.getFromCache<boolean>('includeAuctionsFlip')) ?? initialState.includeAuctionsFlip,
      includePerfectGems: (await this._database.getFromCache<boolean>('includePerfectGems')) ?? initialState.includePerfectGems,
      intermediateCraft: (await this._database.getFromCache<boolean>('intermediateCraft')) ?? initialState.intermediateCraft,
      maxCraftingCost: (await this._database.getFromCache<number>('maxCraftingCost')) ?? initialState.maxCraftingCost,
      playerName: await this._database.getFromCache<string>('playerName'),
      playerProfile: await this._database.getFromCache<string>('playerProfile'),
      playFrequency: (await this._database.getFromCache<IOptionsState['playFrequency']>('playFrequency')) ?? initialState.playFrequency,
      quickForge: (await this._database.getFromCache<number>('quickForge')) ?? initialState.quickForge
    };
  }

  private async _getCrafts() {
    const { hotm, includeAuctionsFlip } = await this._getAllOptions();

    let filtersCraft = crafts;
    if (!includeAuctionsFlip) {
      filtersCraft = filtersCraft.filter((craft) => craft.bazaarItem);
    }

    filtersCraft = filtersCraft.filter((craft) => craft.hotm <= hotm);

    return filtersCraft;
  }

  private async _getForgeSlots() {
    const { hotm } = await this._getAllOptions();

    return Math.min(7, hotm);
  }

  private async _getItemsWithCraftPrice(options: IOptionsState & { crafts: ICraft[] }): Promise<IWorkerResponseGetPricesResult> {
    const {
      auctionsBINOnly,
      crafts,
      // costsRef,
      intermediateCraft,
      playFrequency,
      quickForge
    } = options;
    const newCosts = {} as Record<ICraft['itemId'], ICraftWithCosts>;
    const newMaterials = await this._getMaterialPrice(options);

    const quickForgeBonus = this._getQuickForgeBonus(quickForge);

    for await (const craft of crafts) {
      const source = itemsSource[craft.itemId] ?? 'vendor';

      const itemDb = craft.bazaarItem
        ? await this._database.getItemPrice(craft.itemId, 'bazaar')
        : await this._database.getItemPrice(craft.itemId, 'bins');
      const sell = itemDb?.sellPrice ?? 0;

      await this._updater({
        auctionsBINOnly,
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
        },
        id: craft.itemId,
        intermediateCraft,
        isCraft: true,
        source
      });
    }

    return { crafts: newCosts, materials: newMaterials };
  }

  private _getLang(): ILanguage {
    switch (this._languageKey) {
      case 'fr-FR':
        return frFr;
      case 'en-US':
      default:
        return enUs;
    }
  }

  private async _getMaterialPrice({
    auctionsBINOnly,
    crafts,
    intermediateCraft
  }: IOptionsState & { crafts: ICraft[] }): Promise<Record<ICraft['itemId'], ICraftWithPrice>> {
    const newMaterials = {} as Record<ICraft['itemId'], ICraftWithPrice>;
    for await (const craft of crafts) {
      for await (const craftMaterial of craft.craftMaterial) {
        if (intermediateCraft) {
          await this._updater({
            auctionsBINOnly,
            callback: (newCost: number) => {
              newMaterials[craftMaterial.itemId] = { ...craft, craft: newCost, time: 0 };
            },
            id: craftMaterial.itemId,
            intermediateCraft,
            isCraft: craftMaterial.intermediaryCraft,
            source: craftMaterial.source
          });
        } else {
          const materialitemDb =
            craftMaterial.source === 'bazaar'
              ? await this._database.getItemPrice(craftMaterial.itemId, 'bazaar')
              : await this._database.getItemPrice(craftMaterial.itemId, 'bins');
          newMaterials[craftMaterial.itemId] = { ...craft, craft: materialitemDb?.buyPrice ?? 0, time: 0 };
        }
      }
    }
    return newMaterials;
  }

  private async _getOptions() {
    const command: IWorkerResponseOptions = {
      command: 'Response-Options',
      ...(await this._getAllOptions())
    };

    ctx.postMessage(command);
  }

  private _getQuickForgeBonus(quickForge: number) {
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

  private async _getTimers() {
    const timers = await this._database.timers.toArray();
    const command: IWorkerResponseTimers = { command: 'Response-Timers', timers };
    ctx.postMessage(command);
  }

  private _messageResponse(message: string) {
    const command: IWorkerResponseMessage = { command: 'Response-Message', message };
    ctx.postMessage(command);
  }

  private _notifyMe(message: string) {
    // Check if the browser supports notifications
    if (this._withNotification && Notification.permission === 'granted') {
      // Check whether notification permissions have already been granted;
      // if so, create a notification

      new Notification(message);
    }
  }

  private async _resolveItemCraftPrice(id: string, intermediateCraft: boolean, auctionsBINOnly: boolean) {
    const found = crafts.find((item) => item.itemId === id);

    if (found) {
      let sum = 0;
      for await (const material of found.craftMaterial) {
        if (intermediateCraft && material.intermediaryCraft) {
          const buy = await this._resolveItemCraftPrice(material.itemId, intermediateCraft, auctionsBINOnly);
          sum += buy * material.quantity;
        } else if (material.source === 'vendor') {
          sum += (itemsVendorPrice[material.itemId] ?? 0) * material.quantity;
        } else {
          const { buy } = await this._resolveItemPrices(material.itemId, material.source, auctionsBINOnly);
          sum += buy * material.quantity;
        }
      }

      return sum;
    }

    return NaN;
  }
  private async _resolveItemPrices(
    id: keyof ILanguage['items'],
    source: 'auction' | 'bazaar' | 'vendor',
    auctionsBINOnly: boolean
  ): Promise<{ buy: number; sell: number }> {
    if (source === 'bazaar') {
      const found = await this._database.getItemBazaarPrice(id);

      if (found) {
        return { buy: found.buyPrice, sell: found.sellPrice };
      }
      return { buy: NaN, sell: NaN };
    } else if (source === 'vendor') {
      const price = itemsVendorPrice[id] ?? 0;

      return { buy: price, sell: price };
    }

    const foundBins = await this._database.getItemBinsPrice(id);

    if (foundBins && auctionsBINOnly) {
      return { buy: foundBins?.buyPrice, sell: foundBins?.buyPrice };
    }

    const foundAuctions = await this._database.getItemAuctionsPrice(id);

    if (foundBins || foundAuctions) {
      const lowerPrice = Math.min(...([foundBins?.buyPrice, foundAuctions?.buyPrice].filter((price) => price) as number[]));

      return { buy: lowerPrice, sell: lowerPrice };
    }

    return { buy: NaN, sell: NaN };
  }

  private async _updater(options: {
    auctionsBINOnly: boolean;
    callback(newPrice: number): void;
    // costRef: number;
    id: keyof ILanguage['items'];
    intermediateCraft: boolean;
    isCraft: boolean;
    source?: string;
  }) {
    const { auctionsBINOnly, callback, id, intermediateCraft, isCraft, source } = options;
    if (isCraft) {
      const newCost = await this._resolveItemCraftPrice(id, intermediateCraft, auctionsBINOnly);

      callback(newCost);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { buy } = await this._resolveItemPrices(id, source as any, auctionsBINOnly);

      callback(buy);
    }
  }
}

const worker = new ComputationWorker();

ctx.addEventListener('message', (event: WorkerCommandEvents) => {
  switch (event.data.command) {
    case 'Command-ForceRefresh':
      worker.forceRefresh();
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
