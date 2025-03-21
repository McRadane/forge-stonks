import { Rarities } from '@shared/resources/items';
import { ILanguageItems } from '@shared/resources/lang/type';
import { PetNames } from '@shared/resources/pets';
import { IForgeCraft } from '@shared/resources/types';

export interface IAuctions {
  buyPrice: number;
  item_name: string;
  rarity?: Rarities;
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
  itemId: IForgeCraft['itemId'];
  slot: number;
  startTime: number;
}

export interface ITimerDB extends ITimer {
  id: number;
}

export interface IPetAuctions {
  buyPrice: number;
  pet: PetNames;
  rarity: Rarities;
  sellPrice: number;
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

// eslint-disable-next-line @typescript-eslint/naming-convention
const HOTM_CUMULATIVE_XP = {
  1: 0,
  10: 1_247_000,
  2: 3000,
  3: 12_000,
  4: 37_000,
  5: 97_000,
  6: 197_000,
  7: 347_000,
  8: 557_000,
  9: 847_000

  //814_030
};

interface IProfileSkyCrypt {
  current: boolean;
  cute_name: string;
  data: {
    mining: {
      core: {
        level: {
          level: number;
        };
        nodes: {
          forge_time?: number;
        };
      };
      forge: {
        processes: {
          id: keyof ILanguageItems;
          slot: number;
          timeFinished: number;
        }[];
      };
    };
  };
}

interface IProfileHypixelProfile {
  forge: {
    forge_processes: {
      forge_1: Record<
        number,
        {
          id: keyof ILanguageItems;
          slot: number;
          startTime: number;
        }
      >;
    };
  };
  mining_core: {
    experience: number; // HOTM level => compare with HOTM_CUMULATIVE_XP
    nodes: {
      forge_time?: number;
    };
  };
}

export interface IProfileHypixel {
  current: boolean;
  cute_name: string;
  profile: {
    members: Record<string, IProfileHypixelProfile>;
  };
}

export type IProfile = IProfileSkyCrypt;

export interface IAuctionsAPI {
  bin: boolean; // Indicate if auction or BIN
  category: string;
  claimed: boolean; // Indicate if the auction is active
  highest_bid_amount: number; // Price of auctions
  item_lore: string;
  item_name: string;
  rarity: Rarities;
  starting_bid: number; // Price for BIN
  tier: string;
  uuid: string;
}

export interface IAuctionsAPIWithCleanNames extends IAuctionsAPI {
  buyPrice: number;
  cleanName: string;
  sellPrice: number;
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

export interface IAuctionsAPIPaginatedResponseWithCleanNames {
  auctions: IAuctionsAPIWithCleanNames[];
  lastUpdated: number;
  page: number;
  success: boolean;
  totalAuctions: number;
  totalPages: number;
}
