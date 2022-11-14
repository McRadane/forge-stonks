import axios from 'axios';

import { IAuctions, IBazaar } from './type';

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

interface IAuctionsAPIPaginatedResponse {
  auctions: {
    uuid: string;
    item_name: string;
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

export const getAuctionData = (): Promise<Array<IAuctions & { bin: boolean }>> => {
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
