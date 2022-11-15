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

export interface ICraft extends IPartialCraft {
  category: 'casting' | 'refine';
  id: number;
}

export interface ICraftWithCosts extends ICraft {
  craft: number;
  profit: number;
  profitHourly: number;
  sell: number;
}
