import { ICraft } from '../resources/types';

export interface IAuctions {
  buyPrice: number;
  item_name: string;
  sellPrice: number;
}

export interface IBazaar {
  buyPrice: number;
  item_name: string;
  sellPrice: number;
}

export interface ITimer {
  endTime: number;
  // id: number;
  itemId: ICraft['itemId'];
  slot: number;
  startTime: number;
}

export interface ITimerDB extends ITimer {
  id: number;
}

export interface IBazaarAPIResponse {
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

export interface IPlayerAPIResponse {
  profiles: Record<string, IProfile>;
}

/*
  export const HOTM_XP = {
    1: 0,
    2: 3000,
    3: 9000,
    4: 25000,
    5: 60000,
    6: 100000,
    7: 150000,
  };
  */

export interface IProfile {
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
          slot: number;
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
export interface IPlayerAPIResponse {
  profiles: Record<string, IProfile>;
}

export interface IAuctionsAPI {
  bin: boolean; // Indicate if auction or BIN
  category: string;
  claimed: boolean; // Indicate if the auction is active
  highest_bid_amount: number; // Price of auctions
  item_lore: string;
  item_name: string;
  starting_bid: number; // Price for BIN
  tier: string;
  uuid: string;
}

export interface IAuctionAttributes {
  attributes: Record<string, number>;
  bin: boolean;
  category: string;
  highest_bid_amount: number;
  itemName: string;
  rawItemName: string;
  startingBid: number;
  tier: string;
  uuid: string;
}

export interface IAuctionsAPIPaginatedResponse {
  auctions: IAuctionsAPI[];
  lastUpdated: number;
  page: number;
  success: boolean;
  totalAuctions: number;
  totalPages: number;
}
