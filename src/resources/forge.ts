/* eslint-disable sonarjs/no-duplicate-string */

import type { ICraft, IPartialCraft } from './types';

const craftsRefine: IPartialCraft[] = [
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_DIAMOND_BLOCK', quantity: 2, source: 'bazaar' }],
    hotm: 2,
    itemId: 'REFINED_DIAMOND',
    time: 8
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 160, source: 'bazaar' }],
    hotm: 2,
    itemId: 'REFINED_MITHRIL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_TITANIUM', quantity: 16, source: 'bazaar' }],
    hotm: 2,
    itemId: 'REFINED_TITANIUM',
    time: 12
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_COAL_BLOCK', quantity: 2, source: 'bazaar' }],
    hotm: 2,
    itemId: 'Fuel Tank',
    time: 10
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'Glacite Jewel', quantity: 3, source: 'auction' }],
    hotm: 2,
    itemId: 'Bejeweled Handle',
    time: 0.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_REDSTONE_BLOCK', quantity: 3, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Golden Plate', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Drill Engine',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_GOLD_BLOCK', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Glacite Jewel', quantity: 5, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 1, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Golden Plate',
    time: 6
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Golden Plate', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Mithril Plate',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FINE_JADE_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_AMBER_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_AMETHYST_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_SAPPHIRE_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'SLUDGE_JUICE', quantity: 320, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Gemstone Mixture',
    time: 4
  }
];

const craftsCasting: IPartialCraft[] = [
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 30, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Bejeweled Handle', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_GOLD', quantity: 10, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'Mithril Pickaxe',
    time: 0.75
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Beacon I', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 5, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'Beacon II',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 2, source: 'bazaar' }],
    hotm: 2,
    itemId: 'Titanium Talisman',
    time: 14
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 3, source: 'bazaar' }],
    hotm: 2,
    itemId: 'DIAMONITE',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'STARFALL', quantity: 256, source: 'bazaar' }],
    hotm: 2,
    itemId: 'POWER_CRYSTAL',
    time: 2
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'MITHRIL_ORE', quantity: 48, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'TITANIUM_ORE', quantity: 80, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_ENDER_PEARL', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'coins', quantity: 25_000, source: 'vendor' }
    ],
    hotm: 2,
    itemId: 'Travel Scroll to the Dwarven Forge',
    time: 5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 3, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Bejeweled Handle', quantity: 2, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_GOLD', quantity: 30, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Refined Mithril Pickaxe',
    time: 22
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 3, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Fuel Tank', quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Mithril Drill SX-R226',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Mithril Plate', quantity: 3, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Fuel Tank', quantity: 5, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Mithril-Infused Fuel Tank',
    time: 10
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Drill Engine', quantity: 2, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Mithril Plate', quantity: 3, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Mithril-Plated Drill Engine',
    time: 15
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Beacon II', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 10, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Beacon III',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 6, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Titanium Talisman', quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Titanium Ring',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 2, source: 'bazaar' }],
    hotm: 3,
    itemId: 'Pure Mithril',
    time: 12
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_COBBLESTONE', quantity: 128, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 64, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Rock Gemstone',
    time: 22
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'STARFALL', quantity: 512, source: 'bazaar' }],
    hotm: 3,
    itemId: 'Petrified Starfall',
    time: 14
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_GREEN', quantity: 99, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_JADE_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Pesto Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Helix', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'coins', quantity: 300_000, source: 'vendor' }
    ],
    hotm: 3,
    itemId: 'Ammonite Pet',
    time: 288
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Fuel Tank', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FINE_RUBY_GEM', quantity: 6, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Ruby Drill TX-15',
    time: 1
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Mithril Drill SX-R226', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Golden Plate', quantity: 10, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Mithril Plate', quantity: 2, source: 'auction' }
    ],
    hotm: 4,
    itemId: 'Mithril Drill SX-R326',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Drill Engine', quantity: 10, source: 'auction' },
      { intermediaryCraft: false, itemId: 'PLASMA_BUCKET', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril Plate', quantity: 4, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 5, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Titanium-Plated Drill Engine',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'GOBLIN_EGG', quantity: 99, source: 'bazaar' }],
    hotm: 4,
    itemId: 'Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Beacon III', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 20, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PLASMA_BUCKET', quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Beacon IV',
    time: 40
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 12, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Titanium Ring', quantity: 1, source: 'auction' }
    ],
    hotm: 4,
    itemId: 'Titanium Artifact',
    time: 36
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'HARD_STONE', quantity: 128, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ROUGH_AMBER_GEM', quantity: 64, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Hot Stuff',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_YELLOW', quantity: 99, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_TOPAZ_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Sunny Side Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Ruby Drill TX-15', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 3, source: 'auction' }
    ],
    hotm: 4,
    itemId: 'Gemstone Drill LT-522',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Fuel Tank', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Golden Plate', quantity: 6, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 10, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X355',
    time: 64
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X355', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril Plate', quantity: 6, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X455',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X455', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 20, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril Plate', quantity: 15, source: 'auction' },
      { intermediaryCraft: false, itemId: 'PLASMA_BUCKET', quantity: 20, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X555',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Fuel Tank', quantity: 10, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Titanium-Infused Fuel Tank',
    time: 25
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Beacon IV', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 40, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PLASMA_BUCKET', quantity: 5, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Beacon V',
    time: 50
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 20, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Titanium Artifact', quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Titanium Relic',
    time: 72
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_RED', quantity: 99, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Spicy Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'WORM_MEMBRANE', quantity: 100, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'coins', quantity: 25_000, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'Gemstone Chamber',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Gemstone Drill LT-522', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 3, source: 'auction' },
      { intermediaryCraft: false, itemId: 'Magma Core', quantity: 5, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Topaz Drill KGR-12',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Mithril-Plated Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'Superlite Motor', quantity: 10, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FINE_RUBY_GEM', quantity: 10, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Ruby-polished Drill Engine',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium-Infused Fuel Tank', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'Control Switch', quantity: 30, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 10, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Gemstone Fuel Tank',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'PERFECT_SAPPHIRE_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_BLUE', quantity: 99, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Blue Cheese Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X555', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'Corleonite', quantity: 30, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 16, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 12, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril Plate', quantity: 5, source: 'auction' }
    ],
    hotm: 6,
    itemId: 'Titanium Drill DR-X655',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Topaz Drill KGR-12', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_JASPER_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 100, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Jasper Drill X',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium-Plated Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'Electron Transmitter', quantity: 25, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FTX 3070', quantity: 25, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FINE_SAPPHIRE_GEM', quantity: 20, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Sapphire-polished Drill Engine',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FINE_AMBER_GEM', quantity: 12, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Golden Plate', quantity: 1, source: 'auction' }
    ],
    hotm: 6,
    itemId: 'Amber Material',
    time: 7
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Divan Fragment', quantity: 5, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 10, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Helmet Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Divan Fragment', quantity: 8, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 10, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Chestplate Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Divan Fragment', quantity: 7, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 10, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Leggings Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Divan Fragment', quantity: 4, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 10, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Boots Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Ruby-polished Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Sapphire-polished Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Robotron Reflector', quantity: 50, source: 'auction' }
    ],
    hotm: 7,
    itemId: 'Amber-polished Drill Engine',
    time: 50
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Gemstone Fuel Tank', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Gemstone Mixture', quantity: 25, source: 'auction' },
      { intermediaryCraft: false, itemId: 'Synthetic Heart', quantity: 70, source: 'auction' }
    ],
    hotm: 7,
    itemId: 'Perfectly-Cut Fuel Tank',
    time: 50
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: "Divan's Alloy", quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X655', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'coins', quantity: 50_000_000, source: 'vendor' }
    ],
    hotm: 7,
    itemId: "Divan's Drill",
    time: 60
  }
];

export const crafts: ICraft[] = [
  ...craftsRefine.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'refine',
        id: index * 10
      } as ICraft)
  ),
  ...craftsCasting.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'casting',
        id: index * 10 + 1
      } as ICraft)
  )
];
