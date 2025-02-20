import axios from 'axios';

import type { IAuctions, IBazaar } from './type';

interface IAuctionsAPIPaginatedResponse {
  auctions: {
    bin: boolean; // Indicate if auction or BIN
    category: string;
    claimed: boolean; // Indicate if the auction is active
    highest_bid_amount: number; // Price of auctions
    item_name: string;
    starting_bid: number; // Price for BIN
    tier: string;
    uuid: string;
  }[];
  lastUpdated: number;
  page: number;
  success: boolean;
  totalAuctions: number;
  totalPages: number;
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

interface IPlayerAPIResponse {
  profiles: Record<string, IProfile>;
}
interface IProfile {
  current: boolean;
  cute_name: string;
  data: {
    mining: {
      core: {
        tier: {
          level?: number;
        };
      };
      forge: {
        processes: {
          id: string;
          timeFinished: number;
        }[];
      };
    };
  };
  raw: {
    mining_core: {
      nodes: {
        forge_time?: number;
      };
    };
  };
}

export const getBazaarData = (): Promise<IBazaar[]> => {
  return axios
    .get<IBazaarAPIResponse>('https://api.hypixel.net/skyblock/bazaar')
    .then((response) => response.data)
    .then((data) => {
      if (!data?.success) {
        throw new Error('Invalid query to bazaar');
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

  if (pageData?.success) {
    return pageData.auctions.filter((auction) => !auction.claimed);
  }

  return Promise.reject(new Error('No results'));
};

const filterAuctions = (data: IAuctionsAPIPaginatedResponse) => {
  const auctions: Map<string, IAuctions & { bin: boolean }> = new Map();

  data.auctions
    .filter((auction) => !auction.claimed)
    .forEach(({ bin, highest_bid_amount: highestBidAmount, item_name: itemName, starting_bid: startingBid, uuid }) => {
      auctions.set(uuid, {
        bin,
        buyPrice: bin || highestBidAmount ? startingBid : highestBidAmount,
        item_name: itemName,
        sellPrice: bin || highestBidAmount ? startingBid : highestBidAmount
      });
    });

  return auctions;
};

const sortResults = (
  results: {
    bin: boolean;
    category: string;
    claimed: boolean;
    highest_bid_amount: number;
    item_name: string;
    starting_bid: number;
    tier: string;
    uuid: string;
  }[][],
  auctions: Map<
    string,
    IAuctions & {
      bin: boolean;
    }
  >
) => {
  results.forEach((element) => {
    element.forEach((item) => {
      const { bin, highest_bid_amount: highestBidAmount, item_name: itemName, starting_bid: startingBid, uuid } = item;

      auctions.set(uuid, {
        bin,
        buyPrice: bin || highestBidAmount === 0 ? startingBid : highestBidAmount,
        item_name: itemName,
        sellPrice: bin || highestBidAmount === 0 ? startingBid : highestBidAmount
      });
    });
  });
};

export const getAuctionData = (): Promise<Array<IAuctions & { bin: boolean }>> => {
  return axios
    .get<IAuctionsAPIPaginatedResponse>('https://api.hypixel.net/skyblock/auctions')
    .then((response) => response.data)
    .then((data) => {
      if (!data?.success) {
        throw new Error('Invalid query to auctions');
      }

      const auctions = filterAuctions(data);

      const promises: Promise<IAuctionsAPIPaginatedResponse['auctions']>[] = [];

      if (data.totalPages > 1) {
        for (let page = 1; page < data.totalPages; page++) {
          promises.push(getPageAuctionsRequests(page));
        }
      }
      return Promise.all(promises).then((results) => {
        sortResults(results, auctions);

        return Array.from(auctions.values());
      });
    });
};

export const getPlayerProfiles = async (playerName: string): Promise<string[] | undefined> => {
  if (!playerName) {
    return;
  }
  return axios
    .get<IPlayerAPIResponse>(`https://sky.shiiyu.moe/api/v2/profile/${playerName}`)
    .then((response) => response.data)
    .then((response) => Object.keys(response.profiles));
};

export const getPlayerData = async (playerName: string, profileName: string): Promise<IProfile | undefined> => {
  if (!playerName || !profileName) {
    return;
  }
  return axios
    .get<IPlayerAPIResponse>(`https://sky.shiiyu.moe/api/v2/profile/${playerName}`)
    .then((response) => response.data)
    .then((response) => {
      return response.profiles[profileName];
    });
};
