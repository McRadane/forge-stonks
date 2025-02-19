import type { ILanguage } from './lang/type';

export interface ICraftMaterial {
  intermediaryCraft: boolean;
  itemId: keyof ILanguage['items'];
  quantity: number;
  source: 'auction' | 'bazaar' | 'vendor';
}

export interface IPartialCraft {
  bazaarItem: boolean;
  craftMaterial: ICraftMaterial[];
  hotm: number;
  itemId: keyof ILanguage['items'];
  time: number;
}

export type CraftCategory = 'drill parts' | 'forging' | 'gear' | 'gemstone' | 'other' | 'pets' | 'refining' | 'stones' | 'tools';

export interface ICraft extends IPartialCraft {
  category: CraftCategory;
  id: number;
}

export interface ICraftWithCosts extends ICraft {
  craft: number;
  profit: number;
  profitHourly: number;
  sell: number;
}
