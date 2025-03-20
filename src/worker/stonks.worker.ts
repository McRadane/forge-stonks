/* eslint-disable perfectionist/sort-classes */
import { rawAuctionToAuction } from '../auctionsAttributes/functions';
import { getPlayerData } from '../requests/axios';
import { Database } from '../requests/database';
import { IProfile } from '../requests/types';
import { crafts } from '../resources/forge';
import { itemsFuels, itemsOrganicMatter } from '../resources/garden';
import { itemsSource, itemsVendorPrice, rarities } from '../resources/items';
import { enUs } from '../resources/lang/enUs';
import { frFr } from '../resources/lang/frFr';
import type { ILanguage, ILanguageItems, ILanguageUIRNGFlips, KeysLanguageType } from '../resources/lang/type';
import { pets } from '../resources/pets';
import { rngFlips } from '../resources/rng';
import type { IForgeCraft, IForgeCraftWithCosts, IForgeCraftWithPrice } from '../resources/types';
import { initialState, type IOptionsState } from '../services/common';

import type {
  IPetCraftMaterial,
  IPetPrices,
  IWorkerCommandStartTimer,
  IWorkerCommandStopTimer,
  IWorkerResponseGetAuctionsAttributes,
  IWorkerResponseGetGardenPrices,
  IWorkerResponseGetLanguage,
  IWorkerResponseGetPetPrices,
  IWorkerResponseGetPetPricesResult,
  IWorkerResponseGetPrices,
  IWorkerResponseGetPricesResult,
  IWorkerResponseGetRNGPrices,
  IWorkerResponseMessage,
  IWorkerResponseOptions,
  IWorkerResponseTimerEnded,
  IWorkerResponseTimers,
  IWorkerResponseTimerSet,
  WorkerCommandEvents
} from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;
const glob = globalThis as unknown as { worker: ComputationWorker };

const CACHE_DURATION = 3_600_000;

class ComputationWorker {
  private static _instance: ComputationWorker;
  private readonly _database: Database;
  private readonly _instanceTimestamp: number;
  private _languageKey: KeysLanguageType = 'en-US';
  private _timersInterval: number | undefined;

  private _withNotification = false;

  private constructor(timestamp: number) {
    this._database = new Database(ctx, () => {});

    this._instanceTimestamp = timestamp;

    this._database.cacheDuration = CACHE_DURATION;
  }

  public static getInstance() {
    if (!ComputationWorker._instance) {
      ComputationWorker._instance = new ComputationWorker(Date.now());
    }

    return ComputationWorker._instance;
  }

  public async _getAuctionsAttributes(): Promise<void> {
    // console.log('starting getPrices');
    // this.messageResponse('Starting getPrices');

    this._messageResponse('Starting getAuctionsAttributes');

    const rawItems = await this._database.getAuctionsAttribute();

    const auctionsAttributes = rawItems.map((auction) => rawAuctionToAuction(auction));

    this._messageResponse('Ending getAuctionsAttributes');
    const command: IWorkerResponseGetAuctionsAttributes = {
      command: 'Response-GetAuctionsAttributes',
      results: {
        auctionsAttributes
      }
    };
    ctx.postMessage(command);
  }

  public async _getGardenPrices(): Promise<void> {
    // console.log('starting getPrices');
    // this.messageResponse('Starting getPrices');

    this._messageResponse('Starting getGardenPrices');

    const organicMattersIds = Object.keys(itemsOrganicMatter);
    const fuelsIds = Object.keys(itemsFuels);

    const resultOrganicMatters: Partial<Record<keyof typeof itemsOrganicMatter, { price: number; ratio: number }>> = {};
    const resultFuels: Partial<Record<keyof typeof itemsFuels, { price: number; ratio: number }>> = {};

    for await (const itemId of organicMattersIds) {
      const source = itemsSource[itemId as keyof ILanguage['items']];

      const result = await this._resolveItemPrices(itemId as keyof ILanguage['items'], source, true);

      if (!isNaN(result.buy)) {
        resultOrganicMatters[itemId as keyof typeof itemsOrganicMatter] = {
          price: result.buy,
          ratio: (result.buy / (itemsOrganicMatter[itemId as keyof typeof itemsOrganicMatter] as number)) * 4000
        };
      }
    }

    for await (const itemId of fuelsIds) {
      const source = itemsSource[itemId as keyof ILanguage['items']];

      const result = await this._resolveItemPrices(itemId as keyof ILanguage['items'], source, true);

      if (!isNaN(result.buy)) {
        resultFuels[itemId as keyof typeof itemsFuels] = {
          price: result.buy,
          ratio: (result.buy / (itemsFuels[itemId as keyof typeof itemsFuels] as number)) * 2000
        };
      }
    }

    this._messageResponse('Ending getGardenPrices');
    const command: IWorkerResponseGetGardenPrices = {
      command: 'Response-GetGardenPrices',
      results: {
        fuels: resultFuels,
        organics: resultOrganicMatters
      }
    };
    ctx.postMessage(command);
  }

  public async _getRNGPrices(): Promise<void> {
    this._messageResponse('Starting getRNGPrices');

    const tables = Object.keys(rngFlips);

    const flips = {} as Record<keyof ILanguageUIRNGFlips, Partial<Record<keyof ILanguage['items'], { price: number; ratio: number }>>>;

    for await (const table of tables) {
      const sourceTable = rngFlips[table as keyof ILanguageUIRNGFlips];
      const tableIds = Object.keys(sourceTable);

      const resultTable: Partial<Record<keyof typeof sourceTable, { price: number; ratio: number }>> = {};

      for await (const itemId of tableIds) {
        const source = itemsSource[itemId as keyof ILanguage['items']];

        const result = await this._resolveItemPrices(itemId as keyof ILanguage['items'], source, true);

        if (!isNaN(result.buy)) {
          resultTable[itemId as keyof typeof resultTable] = {
            price: result.buy,
            ratio: result.buy / (sourceTable[itemId as keyof typeof sourceTable] as number)
          };
        }
      }

      flips[table as keyof ILanguageUIRNGFlips] = resultTable;
    }

    this._messageResponse('Ending getRNGPrices');
    const command: IWorkerResponseGetRNGPrices = {
      command: 'Response-GetRNGPrices',
      results: {
        flips
      }
    };
    ctx.postMessage(command);
  }

  public async forceRefresh(): Promise<void> {
    this._messageResponse('Starting forceRefresh');
    await this._database.ensureInitialize();
    await this._database.forceRefresh();
  }
  public async getLanguage() {
    this._messageResponse('ask for language');
    const data = await this._database.getFromCache('language');
    if (data) {
      this._languageKey = data.value as KeysLanguageType;
      const command: IWorkerResponseGetLanguage = { command: 'Response-GetLanguage', language: this._languageKey };
      ctx.postMessage(command);
    }

    const command: IWorkerResponseGetLanguage = { command: 'Response-GetLanguage', language: null };
    ctx.postMessage(command);
  }

  public async getPetPrices(): Promise<void> {
    const options = await this._getAllOptions();

    this._messageResponse('Starting getPetPrices');

    const results = await this._getPetsWithUpgradePrice(options);

    this._messageResponse('Ending getPetPrices');
    const command: IWorkerResponseGetPetPrices = {
      command: 'Response-GetPetPrices',
      results
    };
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
    const count = await this._database.countTimers();

    if (count !== 0 && this._timersInterval === undefined) {
      this._timersInterval = setInterval(() => {
        this._checkTimers();
      }, 1000) as unknown as number;
    }

    const playerName = await this._database.getFromCache<string>('playerName');
    const playerProfile = await this._database.getFromCache<{ id: string; name: string }>('playerProfile');
    if (playerName && playerProfile) {
      const player = await getPlayerData(playerName, playerProfile.id);
      if (player) {
        this._database.addToCache('hotm', player.data.mining.core.tier ?? initialState.hotm);
        this._database.addToCache('quickForge', player.raw.mining_core.nodes.forge_time ?? initialState.quickForge);
        this._database.clearTimers();
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
      const count = await this._database.countTimers();
      const slots = await this._getForgeSlots();

      if (count < slots) {
        const startTime = Date.now();
        const endTime = startTime + found.time * 1000 * 60 * 60;
        this._database.addTimers({ endTime, itemId, slot: count + 1, startTime });
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
    await this._database.deleteTimer(id);
    const count = await this._database.countTimers();

    if (count === 0) {
      clearInterval(this._timersInterval);
    }

    this._getTimers();
  }

  public async syncPlayerProfile(player: IProfile) {
    this._database.addToCache('hotm', player.data.mining.core.tier.level ?? initialState.hotm);
    this._database.addToCache('quickForge', player.raw.mining_core.nodes.forge_time ?? initialState.quickForge);

    // this.database.timers.clear();
    player.data.mining.forge.processes.forEach(async (forge) => {
      let found = crafts.find((item) => item.itemId === forge.id);

      if (!found) {
        found = crafts.find((item) => item.itemId.toLowerCase() === forge.id.toLowerCase().replace('_', ' '));
      }

      const existing = await this._database.getTimers();

      if (found) {
        const foundExisting = existing.find((timer) => timer.endTime === forge.timeFinished);
        if (!foundExisting) {
          const startTime = forge.timeFinished - found.time * 1000 * 60 * 60;

          this._database.addTimers({
            endTime: forge.timeFinished,
            itemId: found.itemId,
            slot: forge.slot,
            startTime
          });
        }
      }
    });
  }

  private async _checkTimers() {
    const now = Date.now();
    const timers = await this._database.getTimers();

    const lang = this._getLang();
    timers.forEach((timer) => {
      if (now > timer.endTime) {
        this._notifyMe(lang.notification.timerEnded.replace('{0}', lang.items[timer.itemId]));
        this._database.deleteTimer(timer.id);
        this._getTimers();
        const command: IWorkerResponseTimerEnded = { command: 'Response-TimerEnded', itemId: timer.itemId, slot: timer.slot };
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
      playerProfile: await this._database.getFromCache<{ id: string; name: string }>('playerProfile'),
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

  private async _getItemsWithCraftPrice(options: IOptionsState & { crafts: IForgeCraft[] }): Promise<IWorkerResponseGetPricesResult> {
    const {
      auctionsBINOnly,
      crafts,
      // costsRef,
      intermediateCraft,
      playFrequency,
      quickForge
    } = options;
    const newCosts = {} as Record<IForgeCraft['itemId'], IForgeCraftWithCosts>;
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
  }: IOptionsState & { crafts: IForgeCraft[] }): Promise<Record<IForgeCraft['itemId'], IForgeCraftWithPrice>> {
    const newMaterials = {} as Record<IForgeCraft['itemId'], IForgeCraftWithPrice>;
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

  private async _getPricesForPetMaterial(
    itemId: keyof ILanguage['items'],
    craftMaterial: 'bazaar' | 'vendor' | 'auction',
    auctionsBINOnly: boolean
  ): Promise<false | number> {
    switch (craftMaterial) {
      case 'bazaar': {
        const bazaarPrice = await this._database.getItemPrice(itemId, 'bazaar');
        if (bazaarPrice) {
          console.log('found bazaar price', bazaarPrice);
          return bazaarPrice.buyPrice;
        } else {
          return false;
        }
      }
      case 'vendor': {
        const vendorPrice = itemsVendorPrice[itemId];
        if (vendorPrice) {
          console.log('found vendor price', vendorPrice);
          return vendorPrice;
        } else {
          return false;
        }
      }

      case 'auction': {
        const storeType = auctionsBINOnly ? 'auctions+bins' : 'bins';
        const auctionPrice = await this._database.getItemPrice(itemId, storeType);
        if (auctionPrice) {
          console.log('found auction price', auctionPrice);
          return auctionPrice.buyPrice;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  private async _getPetsWithUpgradePrice(options: IOptionsState): Promise<IWorkerResponseGetPetPricesResult> {
    const petsPrice = await this._database.getItemPetPrice();

    console.log({ petsPrice });

    const result: IPetPrices[] = [];
    const materials: Partial<Record<IPetCraftMaterial['itemId'], number>> = {};

    /*
    return value:
    {
      petName
      petBaseRarity
      petUpgradedRarity
      petBasePrice
      petUpgraded
    }
    */

    for await (const pet of pets) {
      let rarityIndex = -1;
      for await (const rarity of rarities) {
        rarityIndex++;

        if (rarity !== 'COMMON') {
          if (pet.tier[rarity]) {
            const tier = pet.tier[rarity];
            const previousRarity = rarities[rarityIndex - 1];

            const foundBase = petsPrice.find((item) => item.pet === pet.name && item.rarity === previousRarity);
            const foundUpgraded = petsPrice.find((item) => item.pet === pet.name && item.rarity === rarity);
            let petUpgradedCost = tier.price;
            let allPrices = true;

            const materialsIds = Object.keys(tier.items);
            const material: IPetCraftMaterial[] = [];
            //'auctions+bins'
            for await (const itemId of materialsIds) {
              const craftMaterial = itemsSource[itemId as keyof ILanguage['items']] ?? 'vendor';
              const quantity = tier.items[itemId as keyof typeof tier.items] ?? 0;

              if (quantity !== 0) {
                const result = await this._getPricesForPetMaterial(
                  itemId as keyof ILanguage['items'],
                  craftMaterial,
                  options.auctionsBINOnly
                );

                if (result !== false) {
                  petUpgradedCost += result * quantity;
                  material.push({ itemId: itemId as keyof ILanguageItems, quantity, source: craftMaterial });

                  if (!materials[itemId as keyof ILanguageItems]) {
                    materials[itemId as keyof ILanguageItems] = result;
                  }
                } else {
                  allPrices = false;
                }
              } else {
                allPrices = false;
              }
            }

            console.log(pet.name, previousRarity, { petsPrice, foundBase, foundUpgraded, allPrices });

            if (foundBase && foundUpgraded && allPrices) {
              result.push({
                coins: tier.price,
                material,
                petBasePrice: foundBase.buyPrice,
                petBaseRarity: previousRarity,
                petName: pet.name,
                petUpgradedCost,
                petUpgradedPrice: foundUpgraded.sellPrice,
                petUpgradedRarity: rarity,
                upgradeTime: tier.time
              });
            }
          }
        }
      }
    }

    return { materials, pets: result };
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
    const timers = await this._database.getTimers();
    const command: IWorkerResponseTimers = { command: 'Response-Timers', timers };
    ctx.postMessage(command);
  }

  private _messageResponse(message: string) {
    const command: IWorkerResponseMessage = { command: 'Response-Message', message: `[${this._instanceTimestamp}] ${message}` };
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

const init = () => {
  if (glob.worker) {
    return;
  }

  glob.worker = ComputationWorker.getInstance();

  // eslint-disable-next-line sonarjs/cyclomatic-complexity
  ctx.addEventListener('message', (event: WorkerCommandEvents) => {
    switch (event.data.command) {
      case 'Command-ForceRefresh':
        glob.worker.forceRefresh();
        break;
      case 'Command-GetAuctionsAttributes':
        glob.worker._getAuctionsAttributes();
        break;
      case 'Command-GetGardenPrices':
        glob.worker._getGardenPrices();
        break;
      case 'Command-GetLanguage':
        glob.worker.getLanguage();
        break;
      case 'Command-GetPetPrices':
        console.log('get pet prices');
        glob.worker.getPetPrices();
        break;
      case 'Command-GetPrices':
        glob.worker.getPrices();
        break;
      case 'Command-GetRNGPrices':
        glob.worker._getRNGPrices();
        break;
      case 'Command-Initialize':
        glob.worker.initialize(event.data.withNotification);
        break;
      case 'Command-SetLanguage':
        glob.worker.setLanguage(event.data.language);
        break;
      case 'Command-SetOptions':
        glob.worker.setOptions(event.data.options);
        break;
      case 'Command-StartTimer':
        glob.worker.startTimer(event.data);
        break;
      case 'Command-StopTimer':
        glob.worker.stopTimer(event.data);
        break;
    }
  });
};

init();
