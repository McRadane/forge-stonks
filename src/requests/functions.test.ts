/* eslint-disable sonarjs/no-duplicate-string */
import { describe, expect, test } from 'vitest';

import { cleanAuctionName } from './functions';

describe('Requests tests', () => {
  describe('clean auction name', () => {
    test('should return the name without the reforge', () => {
      const result = cleanAuctionName('Withered Strong Dragon Chestplate');

      expect(result).toBe('Strong Dragon Chestplate');
    });

    test('should return backpack name', () => {
      const result = cleanAuctionName('Large Backpack');

      expect(result).toBe('Large Backpack');
    });

    test('should return Pet names', () => {
      const result1 = cleanAuctionName('[Lvl 200] [2✦] Golden Dragon');
      const result2 = cleanAuctionName('[Lvl 98] Squid');

      expect(result1).toBe('Golden Dragon');
      expect(result2).toBe('Squid');
    });

    test('should return Dungeons items', () => {
      const result = cleanAuctionName('Heroic Hyperion ✪✪✪✪✪');

      expect(result).toBe('Hyperion');
    });

    test('should return Wise Dragon Armor', () => {
      const result1 = cleanAuctionName('Withered Wise Dragon Chestplate');
      const result2 = cleanAuctionName('Very Wise Dragon Chestplate');

      expect(result1).toBe('Wise Dragon Chestplate');
      expect(result2).toBe('Wise Dragon Chestplate');
    });

    test('should return Super Heavy Armor', () => {
      const result1 = cleanAuctionName('Withered Super Heavy Chestplate');
      const result2 = cleanAuctionName('Thicc Super Heavy Chestplate');

      expect(result1).toBe('Super Heavy Chestplate');
      expect(result2).toBe('Super Heavy Chestplate');
    });

    test('should return Heavy Armor', () => {
      const result1 = cleanAuctionName('Withered Heavy Chestplate');
      const result2 = cleanAuctionName('Extremely Heavy Chestplate');
      const result3 = cleanAuctionName('Not So Heavy Chestplate');
      const result4 = cleanAuctionName('Heavy Chestplate');
      const result5 = cleanAuctionName('Heavy Iron Chestplate');

      expect(result1).toBe('Heavy Chestplate');
      expect(result2).toBe('Heavy Chestplate');
      expect(result3).toBe('Heavy Chestplate');
      expect(result4).toBe('Heavy Chestplate');
      expect(result5).toBe('Iron Chestplate');
    });

    test('should return Perfect Armor', () => {
      const result1 = cleanAuctionName('Withered Perfect Chestplate');
      const result2 = cleanAuctionName('Absolutely Perfect Chestplate');

      expect(result1).toBe('Perfect Chestplate');
      expect(result2).toBe('Perfect Chestplate');
    });

    test('should return Refined Mithril Pickaxe', () => {
      const result1 = cleanAuctionName('Withered Refined Mithril Pickaxe');
      const result2 = cleanAuctionName('Even More Refined Mithril Pickaxe');

      expect(result1).toBe('Refined Mithril Pickaxe');
      expect(result2).toBe('Refined Mithril Pickaxe');
    });

    test('should return Giant Sword', () => {
      const result1 = cleanAuctionName("Withered Giant's Sword");
      const result2 = cleanAuctionName('Giant Refined Mithril Pickaxe');

      expect(result1).toBe("Giant's Sword");
      expect(result2).toBe('Refined Mithril Pickaxe');
    });
  });
});
