import { attributes } from '@shared/resources/attributes';
import { IAuctionAttributes, IAuctionsAPI } from '@shared/types/requests';

import { cleanAuctionName } from './requests';

// eslint-disable-next-line sonarjs/cyclomatic-complexity
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

const rawAuctionToAuctionLine = (lines: string[], line: string, index: number): [string, number] | null => {
  // eslint-disable-next-line sonarjs/regular-expr -- Safe
  const match = /^§[0-9a-f]([a-z ]+) ([IVX]+)/i.exec(line);

  if (!match) {
    return null;
  }

  const [, attribute, levelRoman] = match;
  const level = romanToNumber(levelRoman);

  if (attributes.includes(attribute) && level !== -1) {
    if (attribute === 'Speed' && line.includes(':')) {
      return null;
    }
    if (attribute === 'Experience' && !lines[index + 1].includes('more experience')) {
      return null;
    }
    if (attribute === 'Mana Steal' && !lines[index + 1].includes('max mana')) {
      return null;
    }

    return [attribute, level];
  }

  return null;
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

  loreLines.forEach((line, index) => {
    const ok = rawAuctionToAuctionLine(loreLines, line, index);

    if (ok) {
      const [attribute, level] = ok;
      auction.attributes[attribute] = level;
    }
  });

  return auction;
};
