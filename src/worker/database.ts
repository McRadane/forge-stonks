import axios from 'axios';
import Dexie from 'dexie';

interface IAuctionsAPIPaginatedResponse {
  auctions: {
    // _id: string,
    uuid: string;
    // auctioneer: string,
    // profile_id: string,
    // coop: {},
    // start: number,
    // end: number,
    item_name: string;
    // item_lore: string,
    // extra: string,
    category: string;
    tier: string;
    claimed: boolean; // Indicate if the auction is active
    starting_bid: number; // Price for BIN
    highest_bid_amount: number; // Price of auctions
    bin: boolean; // Indicate if auction or BIN
  }[];
  lastUpdated: number;
  page: number;
  success: boolean;
  totalAuctions: number;
  totalPages: number;
}

export interface IAuctions {
  buyPrice: number;
  item_name: string;
  sellPrice: number;
}

interface IBazaarAPIResponse {
  products: Record<
    string,
    {
      product_id: string;
      quick_status: {
        buyPrice: number;
        sellPrice: number;
      };
    }
  >;
  success: boolean;
}

export interface IBazaar {
  buyPrice: number;
  item_name: string;
  sellPrice: number;
}

export const getBazaarData = (): Promise<IBazaar[]> => {
  return axios
    .get<IBazaarAPIResponse>('https://api.hypixel.net/skyblock/bazaar')
    .then((response) => response.data)
    .then((data) => {
      if (!data || !data.success) {
        throw new Error('Invalid query');
      }

      const result: IBazaar[] = Object.keys(data.products).map((key) => ({
        buyPrice: data.products[key].quick_status.buyPrice,
        item_name: key,
        sellPrice: data.products[key].quick_status.sellPrice
      }));

      return result;
    });
};

const getPageAuctionsRequests = async (page: number): Promise<IAuctionsAPIPaginatedResponse['auctions']> => {
  const pageDataResponse = await axios.get<IAuctionsAPIPaginatedResponse>(`https://api.hypixel.net/skyblock/auctions?page=${page}`);
  const pageData = pageDataResponse.data;

  if (pageData && pageData.success) {
    return pageData.auctions.filter((auction) => !auction.claimed);
  }

  return Promise.reject();
};

const getAuctionData = (): Promise<Array<IAuctions & { bin: boolean }>> => {
  return axios
    .get<IAuctionsAPIPaginatedResponse>('https://api.hypixel.net/skyblock/auctions')
    .then((response) => response.data)
    .then((data) => {
      if (!data || !data.success) {
        throw new Error('Invalid query');
      }

      const auctions: Map<string, IAuctions & { bin: boolean }> = new Map();

      data.auctions
        .filter((auction) => !auction.claimed)
        .forEach(({ bin, highest_bid_amount, item_name, starting_bid, uuid }) => {
          auctions.set(uuid, {
            bin,
            buyPrice: bin || highest_bid_amount ? starting_bid : highest_bid_amount,
            item_name,
            sellPrice: bin || highest_bid_amount ? starting_bid : highest_bid_amount
          });
        });

      const promises: Promise<IAuctionsAPIPaginatedResponse['auctions']>[] = [];

      if (data.totalPages > 1) {
        for (let page = 1; page < data.totalPages; page++) {
          promises.push(getPageAuctionsRequests(page));
        }
      }
      return Promise.all(promises).then((results) => {
        results.forEach((element) => {
          element.forEach((item) => {
            const { bin, highest_bid_amount, item_name, starting_bid, uuid } = item;

            auctions.set(uuid, {
              bin,
              buyPrice: bin || highest_bid_amount === 0 ? starting_bid : highest_bid_amount,
              item_name,
              sellPrice: bin || highest_bid_amount === 0 ? starting_bid : highest_bid_amount
            });
          });
        });

        return Array.from(auctions.values());
      });
    });
};

export class Services extends Dexie {
  bazaars!: Dexie.Table<IBazaar, string>;
  auctions!: Dexie.Table<IAuctions, string>;
  bins!: Dexie.Table<IAuctions, string>;
  cache!: Dexie.Table<{ key: string; value: unknown }, string>;

  private _cacheDuration = -1;
  private _lastRefresh = -1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _polling!: any;
  // private _reduxDispatch!: Dispatch<AnyAction>;
  private ctx!: Worker;
  private postRefresh: () => void;

  constructor(ctx: Worker, postRefresh: () => void) {
    super('Services');

    this.ctx = ctx;
    this.postRefresh = postRefresh;

    this.version(1).stores({
      auctions: 'item_name, sellPrice, buyPrice',
      bazaars: 'item_name, sellPrice, buyPrice',
      bins: 'item_name, sellPrice, buyPrice',
      cache: 'key'
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
      // this._refresh();
      this._startPolling();
    }
  }

  private _startPolling() {
    if (!this._polling && this._cacheDuration !== -1) {
      this._polling = setInterval(() => {
        this._doPolling();
      }, 1000);
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

  private addToCache(key: string, value: unknown) {
    this.cache.get(key).then((exists) => {
      if (exists) {
        this.cache.update(key, { value });
      } else {
        this.cache.add({ key, value });
      }
    });
  }

  public async forceRefresh() {
    const now = Date.now();

    this._lastRefresh = now;
    this.addToCache('lastRefresh', now);
    await this._refresh();
  }

  private async _refresh() {
    this.ctx.postMessage({ command: 'loading', loading: true });

    const refreshPromiseBazaar = new Promise<void>((resolve) => {
      getBazaarData().then((bazaars) => {
        this.transaction('rw', this.bazaars, async () => {
          this.bazaars
            .toCollection()
            .delete()
            .then(() => {
              this.bazaars.bulkAdd(bazaars);
              resolve();
              this.ctx.postMessage({ command: 'message', message: 'Bazaar data has been updated' });
            });
        });
      });
    });

    const refreshPromiseAuctionsAndBins = getAuctionData().then((auctionsAndBins) => {
      this.transaction('rw', this.auctions, this.bins, async () => {
        const auctions = auctionsAndBins.filter((auction) => !auction.bin);
        const bins = auctionsAndBins.filter((auction) => auction.bin);

        const minAuctions = this._findMinPrice(auctions);
        const minBins = this._findMinPrice(bins);

        const refreshPromiseAuctions = new Promise<void>((resolve) => {
          this.auctions
            .toCollection()
            .delete()
            .then(() => {
              this.auctions.bulkAdd(minAuctions);
              resolve();
              this.ctx.postMessage({ command: 'message', message: 'Auctions data has been updated' });
            });
        });

        const refreshPromiseBins = new Promise<void>((resolve) => {
          this.bins
            .toCollection()
            .delete()
            .then(() => {
              this.bins.bulkAdd(minBins);
              resolve();
              this.ctx.postMessage({ command: 'message', message: 'BINs data has been updated' });
            });
        });

        return Promise.all([refreshPromiseAuctions, refreshPromiseBins]);
      });
    });

    Promise.all([refreshPromiseBazaar, refreshPromiseAuctionsAndBins])
      .then(() => {
        this.ctx.postMessage({ command: 'message', message: 'All data has been updated' });
        this.ctx.postMessage({ command: 'loading', loading: false });
        this.postRefresh();
      })
      .catch((err) => {
        this.ctx.postMessage({ command: 'message', message: JSON.stringify({ message: 'An error occured', err }) });
        this.ctx.postMessage({ command: 'loading', loading: false });
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
      const result = await this.bins.get(item);

      return result;
    }

    if (store === 'auctions') {
      const result = await this.auctions.get(item);

      return result;
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
