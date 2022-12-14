import Dexie from 'dexie';

import { getAuctionData, getBazaarData } from './axios';
import type { IAuctions, IBazaar, ITimer, IWorkerResponseLoading, IWorkerResponseMessage } from './type';

interface ICache {
  key: string;
  value: unknown;
}

const commandLoadingTrue: IWorkerResponseLoading = { command: 'Response-Loading', loading: true };
const commandLoadingFalse: IWorkerResponseLoading = { command: 'Response-Loading', loading: false };

export class Database extends Dexie {
  bazaars!: Dexie.Table<IBazaar, string>;
  auctions!: Dexie.Table<IAuctions, string>;
  bins!: Dexie.Table<IAuctions, string>;
  cache!: Dexie.Table<ICache, string>;
  timers!: Dexie.Table<ITimer, number>;

  private _cacheDuration = -1;
  private _lastRefresh = -1;
  private _polling!: number;

  private ctx!: Worker;
  private postRefresh: () => void;

  constructor(ctx: Worker, postRefresh: () => void) {
    super('Database');

    this.ctx = ctx;
    this.postRefresh = postRefresh;

    this.version(1).stores({
      // eslint-disable-next-line sonarjs/no-duplicate-string
      auctions: 'item_name, sellPrice, buyPrice',
      bazaars: 'item_name, sellPrice, buyPrice',
      bins: 'item_name, sellPrice, buyPrice',
      cache: 'key',
      timers: 'id++, itemId, startTime, endTime'
    });

    this.cache.get('lastRefresh').then((lastRefreshString) => {
      if (lastRefreshString) {
        const lastRefresh = Number(lastRefreshString.value);
        if (!Number.isNaN(lastRefresh)) {
          this._lastRefresh = lastRefresh;
        }
      }
    });
  }

  public set cacheDuration(duration: undefined | number) {
    if (duration === undefined) {
      this._cacheDuration = -1;
      this._stopPolling();
    } else {
      this._cacheDuration = duration;
      this._startPolling();
    }
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

  private _doPolling() {
    const now = Date.now();
    if (this._lastRefresh + this._cacheDuration < now) {
      this._lastRefresh = now;

      this.addToCache('lastRefresh', now);

      this._refresh();
    }
  }

  public addToCache(key: string, value: unknown) {
    return this.cache.get(key).then((exists) => {
      if (exists) {
        this.cache.update(key, { value });
      } else {
        this.cache.add({ key, value });
      }
    });
  }

  public removeFromCache(key: string) {
    return this.cache.get(key).then((exists) => {
      if (exists) {
        this.cache.delete(key);
      }
    });
  }

  public getFromCache<T>(key: string): Promise<undefined | T> {
    return this.cache.get(key).then((exists) => {
      return exists?.value as T;
    });
  }

  public async forceRefresh() {
    const now = Date.now();

    this._lastRefresh = now;
    this.addToCache('lastRefresh', now);
    await this._refresh();
  }

  private sendMessage(message: string) {
    const command: IWorkerResponseMessage = {
      command: 'Response-Message',
      message
    };
    this.ctx.postMessage(command);
  }

  private async _refresh() {
    this.ctx.postMessage(commandLoadingTrue);

    const refreshPromiseBazaar = new Promise<void>((resolve) => {
      return getBazaarData().then((bazaars) => {
        this.transaction('rw', this.bazaars, async () => {
          this.bazaars
            .toCollection()
            .delete()
            .then(() => {
              this.bazaars.bulkAdd(bazaars);
              resolve();
              this.sendMessage('Bazaar data has been updated');
            });
        });
      });
    });

    const refreshPromiseAuctionsAndBins = getAuctionData().then((auctionsAndBins) => {
      return this.transaction('rw', this.auctions, this.bins, async () => {
        const auctions = auctionsAndBins.filter((auction) => !auction.bin);
        const bins = auctionsAndBins.filter((auction) => auction.bin);

        const minAuctions = this._findMinPrice(auctions);
        const minBins = this._findMinPrice(bins);

        const refreshPromiseAuctions = new Promise<void>((resolve) => {
          return this.auctions
            .toCollection()
            .delete()
            .then(() => {
              this.auctions.bulkAdd(minAuctions);
              resolve();
              this.sendMessage('Auctions data has been updated');
            });
        });

        const refreshPromiseBins = new Promise<void>((resolve) => {
          return this.bins
            .toCollection()
            .delete()
            .then(() => {
              this.bins.bulkAdd(minBins);
              resolve();

              this.sendMessage('BINs data has been updated');
            });
        });

        return Promise.all([refreshPromiseAuctions, refreshPromiseBins]);
      });
    });

    Promise.all([refreshPromiseBazaar, refreshPromiseAuctionsAndBins])
      .then(() => {
        this.sendMessage('All data has been updated');
        this.ctx.postMessage(commandLoadingFalse);
        this.postRefresh();
      })
      .catch((err) => {
        this.sendMessage(JSON.stringify({ err, message: 'An error occurred' }));

        this.ctx.postMessage(commandLoadingFalse);
        this.postRefresh();
      });
  }

  private _findMinPrice(auctions: IAuctions[]): IAuctions[] {
    const minAuctionsRecord = auctions.reduce(
      (minItem, current) => {
        if (!minItem[current.item_name]) {
          minItem[current.item_name] = { item: current, min: current.buyPrice };
        } else {
          if (minItem[current.item_name].min > current.buyPrice) {
            minItem[current.item_name] = {
              item: current,
              min: current.buyPrice
            };
          }
        }

        return minItem;
      },
      {} as Record<string, { item: IAuctions; min: number }> // { min: Number.MAX_VALUE, item: undefined as unknown as IAuctions }
    );

    return Object.values(minAuctionsRecord).map((record) => record.item);
  }

  public async getItemPrice(item: string, store: 'auctions' | 'auctions+bins' | 'bazaar' | 'bins') {
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

  public async getItemBazaarPrice(item: string) {
    return await this.bazaars.get(item);
  }

  public async getItemAuctionsPrice(item: string) {
    return await this.auctions.get(item);
  }

  public async getItemBinsPrice(item: string) {
    return await this.bins.get(item);
  }
}
