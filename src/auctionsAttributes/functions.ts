import { useSelector } from "react-redux";
import { IAuctionAttributes, IAuctionsAPI } from "../requests/types";
import { attributes } from "../resources/attributes";
import { RootState } from "../store";
import { useWorker } from "../worker/WorkerContext";
import { useEffect } from "react";

const romanToNumber = (roman: string): number => {
    switch (roman) {
      case 'I':
        return 1;
      case 'II':
        return 2;
      case 'III':
        return 3;
      case 'IV':
        return 4;
      case 'IX':
        return 9;
      case 'V':
        return 5;
      case 'VI':
        return 6;
      case 'VII':
        return 7;
      case 'VIII':
        return 8;
      case 'X':
        return 10;
      default:
        return -1;
    }
  };
  
  const reforges = [
    'Ambered',
    'Ancient',
    'Astute',
    'Auspicious',
    'Awkward',
    'Blazing',
    'Blended',
    'Blessed',
    'Blood-Soaked',
    'Blooming',
    'Bountiful',
    'Brilliant',
    'Bulky',
    'Bustling',
    'Chomp',
    'Clean',
    'Coldfused',
    'Colossal',
    'Cubic',
    'Deadly',
    'Dirty',
    'Double-Bit',
    'Empowered',
    'Epic',
    'Excellent',
    'Fabled',
    'Fair',
    'Fanged',
    'Fast',
    'Festive',
    'Fierce',
    'Fine',
    'Fleet',
    'Fortified',
    'Fortunate',
    'Fruitful',
    'Gentle',
    'Gilded',
    'Glistening',
    'Grand',
    'Great',
    'Green Thumb',
    'Hasty',
    'Headstrong',
    'Heated',
    'Hefty',
    'Heroic',
    'Honored',
    'Hyper',
    'Jaded',
    'Legendary',
    'Loving',
    'Lucky',
    "Lumberjack's",
    'Lush',
    'Magnetic',
    'Menacing',
    'Mithraic',
    'Moil',
    'Mossy',
    'Mythic',
    'Neat',
    'Necrotic',
    'Odd',
    "Peasant's",
    "Pitchin'",
    'Precise',
    "Prospector's",
    'Pure',
    'Rapid',
    'Reinforced',
    'Renowned',
    'Rich',
    'Ridiculous',
    'Robust',
    'Rooted',
    'Royal',
    'Rugged',
    'Salty',
    'Sharp',
    'Smart',
    'Snowy',
    'Soft',
    'Spicy',
    'Spiked',
    'Spiritual',
    'Stained',
    'Stellar',
    'Stiff',
    'Strenghtened',
    'Sturdy',
    'Submerged',
    'Suspicious',
    'Thick',
    'Titanic',
    'Toil',
    'Treacherous',
    'Unreal',
    'Unyielding',
    'Warped',
    'Waxed',
    'Withered',
    'Zooming'
  ];
  
  const cleanAuctionName = (name: string): string => {
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
  
    if (cleanedName.includes('Wise Dragon')) {
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
    }
  
    reforges.forEach((reforge) => {
      if (cleanedName.startsWith(reforge)) {
        cleanedName = cleanedName.replace(reforge, '');
      }
    });
  
    return cleanedName.trim();
  };
  
  export const rawAuctionToAuction = (rawAuction: IAuctionsAPI): IAuctionAttributes => {
    const auction: IAuctionAttributes = {
      attributes: {},
      bin: rawAuction.bin,
      category: rawAuction.category,
      highest_bid_amount: rawAuction.highest_bid_amount,
      itemName: cleanAuctionName(rawAuction.item_name),
      rawItemName: rawAuction.item_name,
      startingBid: rawAuction.starting_bid,
      tier: rawAuction.tier,
      uuid: rawAuction.uuid
    };
  
    const loreLines = rawAuction.item_lore.split('\n');
  
    loreLines.forEach((line) => {
      // eslint-disable-next-line sonarjs/regular-expr -- Safe
      const match = /^§[0-9a-f]([a-z ]+) ([IVX]+)/i.exec(line);
      if (match) {
        const [, attribute, levelRoman] = match;
        const level = romanToNumber(levelRoman);
  
        if (attributes.includes(attribute) && level !== -1) {
          auction.attributes[attribute] = level;
        }
      }
    });
  
    return auction;
  };
  

  export const useAuctionsAttributes = () => {
    const auctions = useSelector((state: RootState) => state.attributes.auctions);
    const workerRunner = useWorker();
  
    useEffect(() => {
      workerRunner.getGardenPrices();
    }, [workerRunner]);
  
    return { auctions };
  };
  