import axios from 'axios';
import Dexie from 'dexie';

interface IAuctionsAPIPaginatedResponse {
  success: boolean;
  page: number;
  totalPages: number;
  totalAuctions: number;
  lastUpdated: number;
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
}

export interface IAuctions {
  item_name: string;
  sellPrice: number;
  buyPrice: number;
}

interface IBazaarAPIResponse {
  success: boolean;
  products: Record<
    string,
    {
      product_id: string;
      quick_status: {
        sellPrice: number;
        buyPrice: number;
      };
    }
  >;
}

export interface IBazaar {
  item_name: string;
  sellPrice: number;
  buyPrice: number;
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
        item_name: key,
        buyPrice: data.products[key].quick_status.buyPrice,
        sellPrice: data.products[key].quick_status.sellPrice
      }));

      console.log({ result });
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
        .forEach(({ uuid, highest_bid_amount, starting_bid, item_name, bin }) => {
          auctions.set(uuid, {
            item_name,
            buyPrice: bin || highest_bid_amount ? starting_bid : highest_bid_amount,
            sellPrice: bin || highest_bid_amount ? starting_bid : highest_bid_amount,
            bin
          });
        });

      /*const page1 = data.auctions
        .filter((auction) => !auction.claimed);*/

      const promises: Promise<IAuctionsAPIPaginatedResponse['auctions']>[] = [];

      if (data.totalPages > 1) {
        for (let page = 1; page < data.totalPages; page++) {
          promises.push(getPageAuctionsRequests(page));
          /* 
            .forEach(({ uuid, highest_bid_amount, starting_bid, ...auctionData }) => {
        auctions.set(uuid, {
          ...auctionData,
          price: auctionData.bin ? starting_bid : highest_bid_amount,
        });
      });
            */
        }
      }
      return Promise.all(promises).then((results) => {
        results.forEach((element) => {
          element.forEach((item) => {
            const { uuid, highest_bid_amount, starting_bid, item_name, bin } = item;

            auctions.set(uuid, {
              item_name,
              buyPrice: bin || highest_bid_amount === 0 ? starting_bid : highest_bid_amount,
              sellPrice: bin || highest_bid_amount === 0 ? starting_bid : highest_bid_amount,
              bin
            });
          });
        });

        return Array.from(auctions.values());
      });
    });
};

class Services extends Dexie {
  bazaars!: Dexie.Table<IBazaar, string>;
  auctions!: Dexie.Table<IAuctions, string>;
  bins!: Dexie.Table<IAuctions, string>;

  constructor() {
    super('Services');
    this.version(1).stores({
      bazaars: 'item_name, sellPrice, buyPrice',
      auctions: 'item_name, sellPrice, buyPrice',
      bins: 'item_name, sellPrice, buyPrice'
    });
  }

  public async refresh() {
    getBazaarData().then((bazaars) => {
      this.transaction('rw', this.bazaars, async () => {
        this.bazaars
          .toCollection()
          .delete()
          .then(() => {
            this.bazaars.bulkAdd(bazaars);
          });
      });
    });

    getAuctionData().then((auctionsAndBins) => {
      this.transaction('rw', this.auctions, this.bins, async () => {
        const auctions = auctionsAndBins.filter((auction) => !auction.bin);
        const bins = auctionsAndBins.filter((auction) => auction.bin);

        console.log(
          'Glacite Jewel or Bejeweled Handle',
          auctions.filter((auction) => ['Bejeweled Handle', 'Glacite Jewel'].includes(auction.item_name))
        );

        const minAuctions = this.findMinPrice(auctions);
        const minBins = this.findMinPrice(bins);

        this.auctions
          .toCollection()
          .delete()
          .then(() => {
            this.auctions.bulkAdd(minAuctions);
          });
        this.bins
          .toCollection()
          .delete()
          .then(() => {
            this.bins.bulkAdd(minBins);
          });
      });
    });

    /*this.transaction("rw", this.auctions, this.bins, async () => {
      const auctionsAndBins = await getAuctionData();
      await this.auctions.toCollection().delete();
      await this.bins.toCollection().delete();

      const auctions = auctionsAndBins.filter((auction) => !auction.bin);
      const bins = auctionsAndBins.filter((auction) => auction.bin);

      const minAuctions = this.findMinPrice(auctions);
      const minBins = this.findMinPrice(bins);

      await this.auctions.bulkAdd(minAuctions);
      await this.bins.bulkAdd(minBins);
    });*/
  }

  private findMinPrice(auctions: IAuctions[]): IAuctions[] {
    const minAuctionsRecord = auctions.reduce(
      (minItem, current) => {
        if (!minItem[current.item_name]) {
          minItem[current.item_name] = { item: current, min: current.buyPrice };
        } else {
          if (minItem[current.item_name].min < current.buyPrice) {
            minItem[current.item_name] = {
              item: current,
              min: current.buyPrice
            };
          }
        }

        return minItem;
      },
      {} as Record<string, { min: number; item: IAuctions }> // { min: Number.MAX_VALUE, item: undefined as unknown as IAuctions }
    );

    return Object.values(minAuctionsRecord).map((record) => record.item);
  }

  public async getItemPrice(item: string, store: 'auctions' | 'bazaar' | 'bins' | 'auctions+bins') {
    if (store === 'bins') {
      const result = await this.bins.get(item);

      if (item === 'Bejeweled Handle') {
        console.log('searching Bejeweled Handle BIN', result);
      } else {
        console.log({ item });
      }

      return result;
    }

    if (store === 'auctions') {
      const result = await this.auctions.get(item);

      if (item === 'Bejeweled Handle') {
        console.log('searching Bejeweled Handle', result);
      } else {
        console.log({ item });
      }

      return result;
    }

    if (store === 'auctions+bins') {
      const resultBins = await this.bins.get(item);
      const resultAuctions = await this.auctions.get(item);

      if (item === 'Bejeweled Handle') {
        console.log('searching Bejeweled Handle BIN', {
          resultBins,
          resultAuctions
        });
      }

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

export const services = new Services();
