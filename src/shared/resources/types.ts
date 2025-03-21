import type { ILanguage } from './lang/type';

export type CraftCategory = 'drill parts' | 'forging' | 'gear' | 'gemstone' | 'other' | 'pets' | 'refining' | 'stones' | 'tools';

export interface IPartialForgeCraft {
  bazaarItem: boolean;
  craftMaterial: IForgeCraftMaterial[];
  hotm: number;
  itemId: keyof ILanguage['items'];
  time: number;
}

export interface IForgeCraft extends IPartialForgeCraft {
  category: CraftCategory;
  id: number;
}

export interface IForgeCraftMaterial {
  intermediaryCraft: boolean;
  itemId: keyof ILanguage['items'];
  quantity: number;
  source: 'auction' | 'bazaar' | 'vendor';
}

export interface IForgeCraftWithPrice extends IForgeCraft {
  craft: number;
}

export interface IForgeCraftWithCosts extends IForgeCraftWithPrice {
  profit: number;
  profitHourly: number;
  sell: number;
}
