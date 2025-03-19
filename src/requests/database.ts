import Dexie from 'dexie';

import { forge } from '../models/forge';
import { IWorkerResponseLoading, IWorkerResponseMessage } from '../worker/type';

import { getAuctionPriceData, getBazaarPriceData } from './axios';
import type { IAuctions, IAuctionsAPI, IBazaar, ITimer, ITimerDB } from './types';

interface ICache {
  key: string;
  value: unknown;
}

const commandLoadingTrue: IWorkerResponseLoading = { command: 'Response-Loading', loading: true };
const commandLoadingFalse: IWorkerResponseLoading = { command: 'Response-Loading', loading: false };

type StoreTypes = 'auctions' | 'auctions+bins' | 'bazaar' | 'bins';

export class Database extends Dexie {
  protected auctionsAttribute!: Dexie.Table<IAuctionsAPI, string>;
  protected auctionsPrices!: Dexie.Table<IAuctions, string>;
  protected bazaarsPrices!: Dexie.Table<IBazaar, string>;
  protected binsPrices!: Dexie.Table<IAuctions, string>;
  protected cache!: Dexie.Table<ICache, string>;
  protected forgeTimers!: Dexie.Table<ITimerDB, number>;

  private _cacheDuration = -1;
  private readonly _ctx!: Worker;
  private _initialized = false;
  private _lastRefresh = -1;

  private _polling!: number;
  private readonly _postRefresh: () => void;

  constructor(ctx: Worker, postRefresh: () => void) {
    super('Stonks');

    this._ctx = ctx;
    this._postRefresh = postRefresh;

    this.version(1).stores({
      auctionsAttribute: 'uuid',
      // eslint-disable-next-line sonarjs/no-duplicate-string
      auctionsPrices: 'item_name, sellPrice, buyPrice',
      bazaarsPrices: 'item_name, sellPrice, buyPrice',
      binsPrices: 'item_name, sellPrice, buyPrice',
      cache: 'key',
      forgeTimers: 'id++, itemId, startTime, endTime'
    });
  }

  public async addTimers(timer: ITimer) {
    await this.ensureInitialize();
    return this.forgeTimers.add(timer as ITimerDB);
  }

  public async addToCache(key: string, value: unknown) {
    await this.ensureInitialize();
    const exists = await this.cache.get(key);
    if (exists) {
      this.cache.update(key, { value });
    } else {
      this.cache.add({ key, value });
    }
  }

  public set cacheDuration(duration: number | undefined) {
    if (duration === undefined) {
      this._cacheDuration = -1;
      this._stopPolling();
    } else {
      this._cacheDuration = duration;
      this._startPolling();
    }
  }

  public async clearTimers() {
    await this.ensureInitialize();
    return this.forgeTimers.clear();
  }

  public async countTimers() {
    await this.ensureInitialize();
    return this.forgeTimers.count();
  }

  public async deleteTimer(timerId: number) {
    await this.ensureInitialize();
    return this.forgeTimers.delete(timerId);
  }

  public async ensureInitialize() {
    if (this._initialized) {
      return;
    }

    const lastRefreshString = await this.cache.get('lastRefresh');

    if (lastRefreshString) {
      const lastRefresh = Number(lastRefreshString.value);
      if (!Number.isNaN(lastRefresh)) {
        this._lastRefresh = lastRefresh;
      }
    }

    this._initialized = true;
  }

  public async forceRefresh() {
    await this.ensureInitialize();
    const now = Date.now();

    this._lastRefresh = now;
    this.addToCache('lastRefresh', now);
    await this._refresh();
  }

  public async getAuctionsAttribute(): Promise<IAuctionsAPI[]> {
    await this.ensureInitialize();

    return new Promise<IAuctionsAPI[]>((resolve, reject) => {
      this.auctionsAttribute
        .toArray()
        .then((array) => {
          if (array.length > 0) {
            resolve(array);
          } else {
            const interval = setInterval(async () => {
              const newArray = await this.auctionsAttribute.toArray();
              if (newArray.length > 0) {
                clearInterval(interval);
                resolve(newArray);
              }
            }, 100);
          }
        })
        .catch((reason: Error) => reject(reason));
    });
  }

  public async getFromCache<T = ICache>(key: string): Promise<T | undefined> {
    await this.ensureInitialize();
    const exists = await this.cache.get(key);
    return exists?.value as T;
  }

  public async getItemAuctionsPrice(item: string) {
    await this.ensureInitialize();
    return await this.auctionsPrices.get(item);
  }

  public async getItemBazaarPrice(item: string) {
    await this.ensureInitialize();
    return await this.bazaarsPrices.get(item);
  }

  public async getItemBinsPrice(item: string) {
    await this.ensureInitialize();
    return await this.binsPrices.get(item);
  }

  public async getItemPrice(item: string, store: StoreTypes) {
    await this.ensureInitialize();
    if (store === 'bins') {
      return await this.binsPrices.get(item);
    }

    if (store === 'auctions') {
      return await this.auctionsPrices.get(item);
    }

    if (store === 'auctions+bins') {
      const resultBins = await this.binsPrices.get(item);
      const resultAuctions = await this.auctionsPrices.get(item);

      if (!resultBins) {
        return resultAuctions;
      }

      if (!resultAuctions) {
        return resultBins;
      }

      return resultBins?.buyPrice < resultAuctions?.buyPrice ? resultBins : resultAuctions;
    }

    return await this.bazaarsPrices.get(item);
  }

  public async getTimers(): Promise<ITimerDB[]> {
    await this.ensureInitialize();
    return this.forgeTimers.toArray();
  }

  public async removeFromCache(key: string) {
    await this.ensureInitialize();
    const exists = await this.cache.get(key);
    if (exists) {
      this.cache.delete(key);
    }
  }

  private _doPolling() {
    const now = Date.now();
    if (this._lastRefresh + this._cacheDuration < now) {
      this._lastRefresh = now;

      this.addToCache('lastRefresh', now);

      this._refresh();
    }
  }

  private _findMinPrice(auctions: IAuctions[]): IAuctions[] {
    const minAuctionsRecord = auctions.reduce(
      (minItem, current) => {
        if (!minItem[current.item_name] || minItem[current.item_name].min > current.buyPrice) {
          minItem[current.item_name] = { item: current, min: current.buyPrice };
        }

        return minItem;
      },
      {} as Record<string, { item: IAuctions; min: number }> // { min: Number.MAX_VALUE, item: undefined as unknown as IAuctions }
    );

    return Object.values(minAuctionsRecord).map((record) => record.item);
  }

  private async _getRefreshPromiseAuctionsAndBins(minAuctions: IAuctions[], resolve: (value: PromiseLike<void> | void) => void) {
    return this.auctionsPrices
      .toCollection()
      .delete()
      .then(() => {
        this.auctionsPrices.bulkAdd(minAuctions);
        resolve();
        this._sendMessage('Auctions data has been updated');
      });
  }

  private async _getRefreshPromiseAuctionsAttributes(
    auctionsAttributes: IAuctionsAPI[],
    resolve: (value: PromiseLike<void> | void) => void
  ) {
    await this.auctionsAttribute.clear();

    await this.auctionsAttribute.bulkAdd(auctionsAttributes);
    resolve();

    this._sendMessage('Auction attributes data has been updated');
  }

  private async _getRefreshPromiseBazaar(resolve: (value: PromiseLike<void> | void) => void) {
    const bazaars = await getBazaarPriceData();
    this.transaction('rw', this.bazaarsPrices, async () => {
      return this.bazaarsPrices
        .toCollection()
        .delete()
        .then(() => {
          this.bazaarsPrices.bulkAdd(bazaars);
          resolve();
          this._sendMessage('Bazaar data has been updated');
        });
    });
  }

  private async _getRefreshPromiseBins(minBins: IAuctions[], resolve: (value: PromiseLike<void> | void) => void) {
    return this.binsPrices
      .toCollection()
      .delete()
      .then(() => {
        this.binsPrices.bulkAdd(minBins);
        resolve();

        this._sendMessage('BINs data has been updated');
      });
  }

  private async _refresh() {
    this._ctx.postMessage(commandLoadingTrue);

    const refreshPromiseBazaar = new Promise<void>((resolve) => {
      this._getRefreshPromiseBazaar(resolve);
    });

    const refreshPromiseAuctionsAndBins = getAuctionPriceData().then((auctionsAndBins) => {
      return this.transaction('rw', this.auctionsPrices, this.binsPrices, this.auctionsAttribute, async () => {
        const filteredAuctionsAndBins = auctionsAndBins.price.filter((auction) => forge.auctionItems.includes(auction.item_name));
        const auctions = filteredAuctionsAndBins.filter((auction) => !auction.bin);
        const bins = filteredAuctionsAndBins.filter((auction) => auction.bin);

        const minAuctions = this._findMinPrice(auctions);
        const minBins = this._findMinPrice(bins);

        const refreshPromiseAuctions = new Promise<void>((resolve) => {
          return this._getRefreshPromiseAuctionsAndBins(minAuctions, resolve);
        });

        const refreshPromiseBins = new Promise<void>((resolve) => {
          return this._getRefreshPromiseBins(minBins, resolve);
        });

        const refreshPromiseAuctionsAttributes = new Promise<void>((resolve) => {
          return this._getRefreshPromiseAuctionsAttributes(auctionsAndBins.all, resolve);
        });

        return Promise.all([refreshPromiseAuctions, refreshPromiseBins, refreshPromiseAuctionsAttributes]);
      });
    });

    Promise.all([refreshPromiseBazaar, refreshPromiseAuctionsAndBins])
      .then(() => {
        this._sendMessage('All data has been updated');
        this._ctx.postMessage(commandLoadingFalse);
        this._postRefresh();
      })
      .catch((err) => {
        this._sendMessage(JSON.stringify({ err, message: 'An error occurred' }));

        this._ctx.postMessage(commandLoadingFalse);
        this._postRefresh();
      });
  }

  private _sendMessage(message: string) {
    const command: IWorkerResponseMessage = {
      command: 'Response-Message',
      message
    };
    this._ctx.postMessage(command);
  }

  private _startPolling() {
    if (!this._polling && this._cacheDuration !== -1) {
      this._polling = setInterval(() => {
        this._doPolling();
      }, 1000) as unknown as number;
    }
  }

  private _stopPolling() {
    if (this._polling) {
      clearInterval(this._polling);
    }
  }
}
