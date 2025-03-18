import type { ILanguage } from './lang/type';

export type CraftCategory = 'drill parts' | 'forging' | 'gear' | 'gemstone' | 'other' | 'pets' | 'refining' | 'stones' | 'tools';

export interface ICraft extends IPartialCraft {
  category: CraftCategory;
  id: number;
}

export interface ICraftMaterial {
  intermediaryCraft: boolean;
  itemId: keyof ILanguage['items'];
  quantity: number;
  source: 'auction' | 'bazaar' | 'vendor';
}

export interface ICraftWithCosts extends ICraftWithPrice {
  profit: number;
  profitHourly: number;
  sell: number;
}

export interface ICraftWithPrice extends ICraft {
  craft: number;
}

export interface IPartialCraft {
  bazaarItem: boolean;
  craftMaterial: ICraftMaterial[];
  hotm: number;
  itemId: keyof ILanguage['items'];
  time: number;
}
