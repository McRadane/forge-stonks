import { reforges } from '../resources/items';
import { IAuctions } from './types';

interface IReplaceNotFrom {
  notFrom: string;
  special: string;
}

interface IReplaceFrom {
  from: string[];
  special: string[];
  to: string[];
}

interface IReplaceFromDouble {
  from1: string[];
  from2: string[];
  special1: string[];
  special2: string[];
  toFinal: string[];
}

type Replace = IReplaceFrom | IReplaceFromDouble | IReplaceNotFrom;

const isNotFrom = (replace: Replace): replace is IReplaceNotFrom => {
  return (replace as IReplaceNotFrom).notFrom != undefined;
};

const isFrom = (replace: Replace): replace is IReplaceFrom => {
  return (replace as IReplaceFrom).to != undefined;
};

const isFromDouble = (replace: Replace): replace is IReplaceFromDouble => {
  return (replace as IReplaceFromDouble).from1 != undefined;
};

const specificReplaces: Replace[] = [
  { from: ['Wise Dragon'], special: ['Very'], to: ['Wise'] },
  {
    from1: ['Super Heavy Helmet', 'Super Heavy Chestplate', 'Super Heavy Leggings', 'Super Heavy Boots'],
    from2: ['Heavy Helmet', 'Heavy Chestplate', 'Heavy Leggings', 'Heavy Boots'],
    special1: ['Thicc'],
    special2: ['Extremely', 'Not So'],
    toFinal: ['Heavy', 'Light']
  },
  { from: ['Perfect Helmet', 'Perfect Chestplate', 'Perfect Leggings', 'Perfect Boots'], special: ['Absolutely'], to: ['Perfect'] },
  { from: ['Refined Mithril Pickaxe'], special: ['Even More'], to: ['Refined'] },
  { notFrom: "Giant's Sword", special: 'Giant' }
];

export const cleanAuctionName = (name: string): string => {
  let cleanedName = name;

  cleanedName = cleanedName.replace(/✪/g, '');
  cleanedName = cleanedName.replace(/◆/g, '');
  cleanedName = cleanedName.replace(/➊/g, '');
  cleanedName = cleanedName.replace(/➋/g, '');
  cleanedName = cleanedName.replace(/➌/g, '');
  cleanedName = cleanedName.replace(/➍/g, '');
  cleanedName = cleanedName.replace(/➎/g, '');
  cleanedName = cleanedName.replace(/✦/g, '');
  cleanedName = cleanedName.replace(/✿/g, '');
  cleanedName = cleanedName.replace(/⚚/g, '');

  cleanedName = cleanedName.replace(/\[Lvl \d+\]/g, '');
  cleanedName = cleanedName.replace(/\[\d+✦\]/g, '');
  cleanedName = cleanedName.replace(/\[\d+\]/g, '');
  cleanedName = cleanedName.replace(/\(Year \d+\)/g, '');

  cleanedName = cleanedName.trim();

  if (cleanedName.includes('Backpack')) {
    return cleanedName;
  }

  specificReplaces.forEach((replace) => {
    if (isNotFrom(replace) && !cleanedName.includes(replace.notFrom)) {
      cleanedName = cleanedName.replace(`${replace.special}`, '');
    }

    if (isFrom(replace)) {
      let found = false;
      replace.from.forEach((from) => {
        if (cleanedName.includes(from)) {
          found = true;
          replace.special.forEach((special) => {
            cleanedName = cleanedName.replace(`${special} `, '');
          });
        }
      });

      if (!found && replace.to) {
        replace.to.forEach((to) => {
          cleanedName = cleanedName.replace(to, '');
        });
      }
    }

    if (isFromDouble(replace)) {
      let found = false;
      replace.from1.forEach((from) => {
        if (cleanedName.includes(from)) {
          found = true;

          replace.special1.forEach((special) => {
            cleanedName = cleanedName.replace(`${special} `, '');
          });
        }
      });

      if (found) {
        return;
      }

      replace.from2.forEach((from) => {
        if (cleanedName.includes(from)) {
          found = true;
          replace.special2.forEach((special) => {
            cleanedName = cleanedName.replace(`${special} `, '');
          });
        }
      });

      if (!found && replace.toFinal) {
        replace.toFinal.forEach((to) => {
          cleanedName = cleanedName.replace(to, '');
        });
      }
    }
  });

  /*if (cleanedName.includes('Wise Dragon')) {
      cleanedName = cleanedName.replace('Very ', '');
    } else {
      cleanedName = cleanedName.replace('Wise ', '');
    }
  
    if (
      cleanedName.includes('Super Heavy Helmet') ||
      cleanedName.includes('Super Heavy Chestplate') ||
      cleanedName.includes('Super Heavy Leggings') ||
      cleanedName.includes('Super Heavy Boots')
    ) {
      cleanedName = cleanedName.replace('Thicc ', '');
    } else if (
      cleanedName.includes('Heavy Helmet') ||
      cleanedName.includes('Heavy Chestplate') ||
      cleanedName.includes('Heavy Leggings') ||
      cleanedName.includes('Heavy Boots')
    ) {
      cleanedName = cleanedName.replace('Extremely ', '');
      cleanedName = cleanedName.replace('Not So ', '');
    } else {
      cleanedName = cleanedName.replace('Heavy ', '');
      cleanedName = cleanedName.replace('Light ', '');
    }
  
    if (
      cleanedName.includes('Perfect Helmet') ||
      cleanedName.includes('Perfect Chestplate') ||
      cleanedName.includes('Perfect Leggings') ||
      cleanedName.includes('Perfect Boots')
    ) {
      cleanedName = cleanedName.replace('Absolutely ', '');
    } else {
      cleanedName = cleanedName.replace('Perfect ', '');
    }
  
    if (cleanedName.includes('Refined Mithril Pickaxe')) {
      cleanedName = cleanedName.replace('Even More ', '');
    } else {
      cleanedName = cleanedName.replace('Refined ', '');
    }
  
    if (!cleanedName.includes("Giant's Sword")) {
      cleanedName = cleanedName.replace('Giant ', '');
    }*/

  reforges.forEach((reforge) => {
    if (cleanedName.startsWith(reforge)) {
      cleanedName = cleanedName.replace(reforge, '');
    }
  });

  return cleanedName.trim();
};

export const filterAuctions = (
  auction: IAuctions & {
    bin: boolean;
  },
  stores: string[][]
): boolean => {
  return stores.some((store) => store.includes(auction.item_name));
};
