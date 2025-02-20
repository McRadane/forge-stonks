import Dexie from 'dexie';

import { getAuctionData, getBazaarData } from './axios';
import type { IAuctions, IBazaar, ITimer, IWorkerResponseLoading, IWorkerResponseMessage } from './type';

interface ICache {
  key: string;
  value: unknown;
}

const commandLoadingTrue: IWorkerResponseLoading = { command: 'Response-Loading', loading: true };
const commandLoadingFalse: IWorkerResponseLoading = { command: 'Response-Loading', loading: false };

type StoreTypes = 'auctions' | 'auctions+bins' | 'bazaar' | 'bins';

export class Database extends Dexie {
  auctions!: Dexie.Table<IAuctions, string>;
  bazaars!: Dexie.Table<IBazaar, string>;
  bins!: Dexie.Table<IAuctions, string>;
  cache!: Dexie.Table<ICache, string>;
  timers!: Dexie.Table<ITimer, number>;

  private _cacheDuration = -1;
  private readonly _ctx!: Worker;
  private _initialized = false;
  private _lastRefresh = -1;

  private _polling!: number;
  private readonly _postRefresh: () => void;

  constructor(ctx: Worker, postRefresh: () => void) {
    super('Database');

    this._ctx = ctx;
    this._postRefresh = postRefresh;

    this.version(1).stores({
      // eslint-disable-next-line sonarjs/no-duplicate-string
      auctions: 'item_name, sellPrice, buyPrice',
      bazaars: 'item_name, sellPrice, buyPrice',
      bins: 'item_name, sellPrice, buyPrice',
      cache: 'key',
      timers: 'id++, itemId, startTime, endTime'
    });
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

  public async getFromCache<T>(key: string): Promise<T | undefined> {
    await this.ensureInitialize();
    const exists = await this.cache.get(key);
    return exists?.value as T;
  }

  public async getItemAuctionsPrice(item: string) {
    await this.ensureInitialize();
    return await this.auctions.get(item);
  }

  public async getItemBazaarPrice(item: string) {
    await this.ensureInitialize();
    return await this.bazaars.get(item);
  }

  public async getItemBinsPrice(item: string) {
    await this.ensureInitialize();
    return await this.bins.get(item);
  }

  public async getItemPrice(item: string, store: StoreTypes) {
    await this.ensureInitialize();
    if (store === 'bins') {
      return await this.bins.get(item);
    }

    if (store === 'auctions') {
      return await this.auctions.get(item);
    }

    if (store === 'auctions+bins') {
      const resultBins = await this.bins.get(item);
      const resultAuctions = await this.auctions.get(item);

      if (!resultBins) {
        return resultAuctions;
      }

      if (!resultAuctions) {
        return resultBins;
      }

      return resultBins?.buyPrice < resultAuctions?.buyPrice ? resultBins : resultAuctions;
    }

    return await this.bazaars.get(item);
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
    return this.auctions
      .toCollection()
      .delete()
      .then(() => {
        this.auctions.bulkAdd(minAuctions);
        resolve();
        this._sendMessage('Auctions data has been updated');
      });
  }

  private async _getRefreshPromiseBazaar(resolve: (value: PromiseLike<void> | void) => void) {
    const bazaars = await getBazaarData();
    this.transaction('rw', this.bazaars, async () => {
      return this.bazaars
        .toCollection()
        .delete()
        .then(() => {
          this.bazaars.bulkAdd(bazaars);
          resolve();
          this._sendMessage('Bazaar data has been updated');
        });
    });
  }

  private async _getRefreshPromiseBins(minBins: IAuctions[], resolve: (value: PromiseLike<void> | void) => void) {
    return this.bins
      .toCollection()
      .delete()
      .then(() => {
        this.bins.bulkAdd(minBins);
        resolve();

        this._sendMessage('BINs data has been updated');
      });
  }

  private async _refresh() {
    this._ctx.postMessage(commandLoadingTrue);

    const refreshPromiseBazaar = new Promise<void>((resolve) => {
      this._getRefreshPromiseBazaar(resolve);
    });

    const refreshPromiseAuctionsAndBins = getAuctionData().then((auctionsAndBins) => {
      return this.transaction('rw', this.auctions, this.bins, async () => {
        const auctions = auctionsAndBins.filter((auction) => !auction.bin);
        const bins = auctionsAndBins.filter((auction) => auction.bin);

        const minAuctions = this._findMinPrice(auctions);
        const minBins = this._findMinPrice(bins);

        const refreshPromiseAuctions = new Promise<void>((resolve) => {
          return this._getRefreshPromiseAuctionsAndBins(minAuctions, resolve);
        });

        const refreshPromiseBins = new Promise<void>((resolve) => {
          return this._getRefreshPromiseBins(minBins, resolve);
        });

        return Promise.all([refreshPromiseAuctions, refreshPromiseBins]);
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
