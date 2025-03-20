
import type { ILanguage } from '../resources/lang/type';
import type { CraftCategory } from '../resources/types';


export const getCategoryLabel = (category: CraftCategory, ui: ILanguage['ui']) => {
  switch (category) {
    case 'drill parts':
      return ui.categoryDrillParts;
    case 'forging':
      return ui.categoryForging;
    case 'gear':
      return ui.categoryGear;
    case 'gemstone':
      return ui.categoryGemstone;
    case 'pets':
      return ui.categoryPets;
    case 'refining':
      return ui.categoryRefining;
    case 'stones':
      return ui.categoryStones;
    case 'tools':
      return ui.categoryTools;
    case 'other':
    default:
      return ui.categoryOther;
  }
};
