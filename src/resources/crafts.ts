/* eslint-disable sonarjs/no-duplicate-string */

import type { ILanguage } from './lang/type';
import type { ICraft, IPartialCraft } from './types';

export const itemsSource: Record<keyof ILanguage['items'], 'auction' | 'bazaar' | 'vendor'> = {
  AMBER_MATERIAL: 'bazaar',
  'Amber Crystal': 'vendor',
  'Amber Necklace': 'auction',
  'Amber-polished Drill Engine': 'auction',
  'Amethyst Crystal': 'vendor',
  'Amethyst Gauntlet': 'auction',
  'Ammonite Pet': 'auction',
  'Ankylosaurus Pet': 'auction',
  'Aquamarine Crystal': 'vendor',
  'Artifact Of Power': 'auction',
  BEJEWELED_HANDLE: 'bazaar',
  'Beacon I': 'auction',
  'Beacon II': 'auction',
  'Beacon III': 'auction',
  'Beacon IV': 'auction',
  'Beacon V': 'auction',
  'Bejeweled Collar': 'auction',
  'Blue Cheese Goblin Omelette': 'auction',
  'Boots Of Divan': 'auction',
  CORLEONITE: 'bazaar',
  'Chestplate Of Divan': 'auction',
  Chisel: 'auction',
  'Citrine Crystal': 'vendor',
  'Claw Fossil': 'auction',
  'Clubbed Fossil': 'auction',
  DIAMONITE: 'bazaar',
  DIVAN_FRAGMENT: 'bazaar',
  DIVAN_POWDER_COATING: 'bazaar',
  DRILL_ENGINE: 'bazaar',
  "Divan's Alloy": 'auction',
  "Divan's Drill": 'auction',
  'Dwarven Handwarmers': 'auction',
  'Dwarven Metal Talisman': 'auction',
  ENCHANTED_COAL_BLOCK: 'bazaar',
  ENCHANTED_COBBLESTONE: 'bazaar',
  ENCHANTED_DIAMOND_BLOCK: 'bazaar',
  ENCHANTED_ENDER_PEARL: 'bazaar',
  ENCHANTED_GLACITE: 'bazaar',
  ENCHANTED_GOLD_BLOCK: 'bazaar',
  ENCHANTED_IRON_BLOCK: 'bazaar',
  ENCHANTED_LAPIS_LAZULI: 'bazaar',
  ENCHANTED_MITHRIL: 'bazaar',
  ENCHANTED_REDSTONE_BLOCK: 'bazaar',
  ENCHANTED_TITANIUM: 'bazaar',
  ENCHANTED_TUNGSTEN: 'bazaar',
  ENCHANTED_UMBER: 'bazaar',
  FINE_AMBER_GEM: 'bazaar',
  FINE_AMETHYST_GEM: 'bazaar',
  FINE_AQUAMARINE_GEM: 'bazaar',
  FINE_CITRINE_GEM: 'bazaar',
  FINE_JADE_GEM: 'bazaar',
  FINE_ONYX_GEM: 'bazaar',
  FINE_PERIDOT_GEM: 'bazaar',
  FINE_RUBY_GEM: 'bazaar',
  FINE_SAPPHIRE_GEM: 'bazaar',
  FLAWLESS_AMBER_GEM: 'bazaar',
  FLAWLESS_AMETHYST_GEM: 'bazaar',
  FLAWLESS_AQUAMARINE_GEM: 'bazaar',
  FLAWLESS_CITRINE_GEM: 'bazaar',
  FLAWLESS_JADE_GEM: 'bazaar',
  FLAWLESS_JASPER_GEM: 'bazaar',
  FLAWLESS_ONYX_GEM: 'bazaar',
  FLAWLESS_OPAL_GEM: 'bazaar',
  FLAWLESS_PERIDOT_GEM: 'bazaar',
  FLAWLESS_RUBY_GEM: 'bazaar',
  FLAWLESS_SAPPHIRE_GEM: 'bazaar',
  FLAWLESS_TOPAZ_GEM: 'bazaar',
  FRIGID_HUSK: 'bazaar',
  FUEL_TANK: 'bazaar',
  'Footprint Fossil': 'auction',
  GEMSTONE_MIXTURE: 'bazaar',
  GLACITE_AMALGAMATION: 'bazaar',
  GLACITE_JEWEL: 'bazaar',
  GLEAMING_CRYSTAL: 'bazaar',
  GLOSSY_GEMSTONE: 'bazaar',
  GOBLIN_EGG: 'bazaar',
  GOBLIN_EGG_BLUE: 'bazaar',
  GOBLIN_EGG_GREEN: 'bazaar',
  GOBLIN_EGG_RED: 'bazaar',
  GOBLIN_EGG_YELLOW: 'bazaar',
  GOLDEN_PLATE: 'bazaar',
  'Gemstone Chamber': 'auction',
  'Gemstone Drill LT-522': 'auction',
  'Gemstone Fuel Tank': 'auction',
  'Glacite-Plated Chisel': 'auction',
  'Goblin Omelette': 'auction',
  'Goblin Pet': 'auction',
  HARD_STONE: 'bazaar',
  HOT_STUFF: 'bazaar',
  'Helix Fossil': 'auction',
  'Helmet Of Divan': 'auction',
  'Jade Belt': 'auction',
  'Jade Crystal': 'vendor',
  'Jasper Crystal': 'vendor',
  'Jasper Drill X': 'auction',
  'Leggings Of Divan': 'auction',
  MAGMA_CORE: 'bazaar',
  MATCH_STICKS: 'bazaar',
  MITHRIL_ORE: 'bazaar',
  MITHRIL_PLATE: 'bazaar',
  'Mammoth Pet': 'auction',
  'Mithril Belt': 'auction',
  'Mithril Cloak': 'auction',
  'Mithril Drill SX-R226': 'auction',
  'Mithril Drill SX-R326': 'auction',
  'Mithril Gauntlet': 'auction',
  'Mithril Necklace': 'auction',
  'Mithril-Infused Fuel Tank': 'auction',
  'Mithril-Plated Drill Engine': 'auction',
  'Mole Pet': 'auction',
  'Onyx Crystal': 'vendor',
  'Opal Crystal': 'vendor',
  PERFECT_AMBER_GEM: 'bazaar',
  PERFECT_AMETHYST_GEM: 'bazaar',
  PERFECT_AQUAMARINE_GEM: 'bazaar',
  PERFECT_CITRINE_GEM: 'bazaar',
  PERFECT_JADE_GEM: 'bazaar',
  PERFECT_JASPER_GEM: 'bazaar',
  PERFECT_ONYX_GEM: 'bazaar',
  PERFECT_OPAL_GEM: 'bazaar',
  PERFECT_PERIDOT_GEM: 'bazaar',
  PERFECT_PLATE: 'bazaar',
  PERFECT_RUBY_GEM: 'bazaar',
  PERFECT_SAPPHIRE_GEM: 'bazaar',
  PERFECT_TOPAZ_GEM: 'bazaar',
  PETRIFIED_STARFALL: 'bazaar',
  PLASMA: 'bazaar',
  POCKET_ICEBERG: 'bazaar',
  POWER_CRYSTAL: 'bazaar',
  PRECURSOR_APPARATUS: 'bazaar',
  PURE_MITHRIL: 'bazaar',
  'Pendant Of Divan': 'auction',
  'Penguin Pet': 'auction',
  'Perfect Chisel': 'auction',
  'Perfectly-Cut Fuel Tank': 'auction',
  'Peridot Crystal': 'vendor',
  'Pesto Goblin Omelette': 'auction',
  'Polished Topaz Rod': 'auction',
  'Portable Campfire': 'auction',
  REFINED_DIAMOND: 'bazaar',
  REFINED_MINERAL: 'bazaar',
  REFINED_MITHRIL: 'bazaar',
  REFINED_TITANIUM: 'bazaar',
  REFINED_TUNGSTEN: 'bazaar',
  REFINED_UMBER: 'bazaar',
  ROCK_GEMSTONE: 'bazaar',
  'Reinforced Chisel': 'auction',
  'Relic Of Power': 'auction',
  'Ruby Crystal': 'vendor',
  'Ruby Drill TX-15': 'auction',
  'Ruby-polished Drill Engine': 'auction',
  SKELETON_KEY: 'bazaar',
  SLUDGE_JUICE: 'bazaar',
  STARFALL: 'bazaar',
  'Sapphire Cloak': 'auction',
  'Sapphire Crystal': 'vendor',
  'Sapphire-polished Drill Engine': 'auction',
  'Shattered Locket': 'auction',
  'Spicy Goblin Omelette': 'auction',
  'Spine Fossil': 'auction',
  'Spinosaurus Pet': 'auction',
  'Starfall Seasoning': 'auction',
  'Sunny Side Goblin Omelette': 'auction',
  'T-Rex Pet': 'auction',
  TITANIUM_ORE: 'bazaar',
  TITANIUM_TESSERACT: 'bazaar',
  TREASURITE: 'bazaar',
  TUNGSTEN_KEY: 'bazaar',
  TUNGSTEN_ORE: 'bazaar',
  TUNGSTEN_PLATE: 'bazaar',
  'Titanium Artifact': 'auction',
  'Titanium Belt': 'auction',
  'Titanium Cloak': 'auction',
  'Titanium Drill DR-X355': 'auction',
  'Titanium Drill DR-X455': 'auction',
  'Titanium Drill DR-X555': 'auction',
  'Titanium Drill DR-X655': 'auction',
  'Titanium Gauntlet': 'auction',
  'Titanium Necklace': 'auction',
  'Titanium Relic': 'auction',
  'Titanium Ring': 'auction',
  'Titanium Talisman': 'auction',
  'Titanium-Infused Fuel Tank': 'auction',
  'Titanium-Plated Drill Engine': 'auction',
  'Topaz Crystal': 'vendor',
  'Topaz Drill KGR-12': 'auction',
  'Travel Scroll to the Dwarven Base Camp': 'auction',
  'Travel Scroll to the Dwarven Forge': 'auction',
  'Tungsten Regulator': 'auction',
  'Tusk Fossil': 'auction',
  UMBER_KEY: 'bazaar',
  UMBER_PLATE: 'bazaar',
  'Ugly Fossil': 'auction',
  WORM_MEMBRANE: 'bazaar',
  'Webbed Fossil': 'auction',
  coins: 'vendor'
};

const DAY = 24;
const SEC_30 = 1 / 120;

export const itemsVendorPrice: Partial<Record<keyof ILanguage['items'], number>> = {
  coins: 1
};

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
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_UMBER', quantity: 160, source: 'bazaar' }],
    hotm: 7,
    itemId: 'REFINED_UMBER',
    time: 1
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_TUNGSTEN', quantity: 160, source: 'bazaar' }],
    hotm: 2,
    itemId: 'REFINED_TUNGSTEN',
    time: 1
  }
];

const craftsGear: IPartialCraft[] = [
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 3, source: 'bazaar' }],
    hotm: 1,
    itemId: 'Mithril Necklace',
    time: 1
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 3, source: 'bazaar' }],
    hotm: 1,
    itemId: 'Mithril Cloak',
    time: 1
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 3, source: 'bazaar' }],
    hotm: 1,
    itemId: 'Mithril Belt',
    time: 1
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 3, source: 'bazaar' }],
    hotm: 1,
    itemId: 'Mithril Gauntlet',
    time: 1
  },

  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MINERAL', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril Necklace', quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Titanium Necklace',
    time: 4.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MINERAL', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril Cloak', quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Titanium Cloak',
    time: 4.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MINERAL', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril Belt', quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Titanium Belt',
    time: 4.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MINERAL', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril Gauntlet', quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Titanium Gauntlet',
    time: 4.5
  },

  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 2, source: 'bazaar' }],
    hotm: 2,
    itemId: 'Titanium Talisman',
    time: 14
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
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 20, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Titanium Artifact', quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Titanium Relic',
    time: 72
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_MINERAL', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'DIVAN_FRAGMENT', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_GOLD_BLOCK', quantity: 16, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'DIVAN_POWDER_COATING',
    time: 36
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Helmet Of Divan',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 8, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Chestplate Of Divan',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 7, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Leggings Of Divan',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Boots Of Divan',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 2, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Amber Necklace',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_SAPPHIRE_GEM', quantity: 2, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Sapphire Cloak',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_JADE_GEM', quantity: 2, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Jade Belt',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMETHYST_GEM', quantity: 2, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Amethyst Gauntlet',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'WORM_MEMBRANE', quantity: 100, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'coins', quantity: 25_000, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'Gemstone Chamber',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_JASPER_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'TUNGSTEN_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'UMBER_PLATE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 8,
    itemId: 'Dwarven Handwarmers',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_UMBER', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TUNGSTEN', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 4, source: 'bazaar' }
    ],
    hotm: 8,
    itemId: 'Dwarven Metal Talisman',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Shattered Locket', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'PERFECT_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 10, source: 'bazaar' }
    ],
    hotm: 10,
    itemId: 'Pendant Of Divan',
    time: 24 * 7
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Artifact Of Power', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'PERFECT_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 32, source: 'bazaar' }
    ],
    hotm: 10,
    itemId: 'Relic Of Power',
    time: 8
  }
];

const craftsGemstones: IPartialCraft[] = [
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Amber Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'PERFECT_AMBER_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMETHYST_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Amethyst Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'PERFECT_AMETHYST_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_JADE_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Jade Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'PERFECT_JADE_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_JASPER_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Jasper Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'PERFECT_JASPER_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_OPAL_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Opal Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'PERFECT_OPAL_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Ruby Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'PERFECT_RUBY_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_SAPPHIRE_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Sapphire Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'PERFECT_SAPPHIRE_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Topaz Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'PERFECT_TOPAZ_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Onyx Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 7,
    itemId: 'PERFECT_ONYX_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_CITRINE_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Citrine Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 7,
    itemId: 'PERFECT_CITRINE_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_AQUAMARINE_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Aquamarine Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 7,
    itemId: 'PERFECT_AQUAMARINE_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_PERIDOT_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'Peridot Crystal', quantity: 1, source: 'vendor' }
    ],
    hotm: 7,
    itemId: 'PERFECT_PERIDOT_GEM',
    time: 20
  }
];

const craftsForging: IPartialCraft[] = [
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'GLACITE_JEWEL', quantity: 3, source: 'bazaar' }],
    hotm: 2,
    itemId: 'BEJEWELED_HANDLE',
    time: SEC_30
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_REDSTONE_BLOCK', quantity: 3, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 1, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'DRILL_ENGINE',
    time: 30
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_COAL_BLOCK', quantity: 2, source: 'bazaar' }],
    hotm: 2,
    itemId: 'FUEL_TANK',
    time: 10
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FINE_JADE_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_AMBER_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_AMETHYST_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_SAPPHIRE_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'SLUDGE_JUICE', quantity: 320, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'GEMSTONE_MIXTURE',
    time: 4
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FINE_ONYX_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_CITRINE_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_PERIDOT_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_AQUAMARINE_GEM', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_GLACITE', quantity: 256, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'GLACITE_AMALGAMATION',
    time: 4
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_GOLD_BLOCK', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'GLACITE_JEWEL', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 1, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'GOLDEN_PLATE',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'MITHRIL_PLATE',
    time: 18
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TUNGSTEN', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'TUNGSTEN_PLATE',
    time: 3
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_UMBER', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'UMBER_PLATE',
    time: 3
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'UMBER_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'TUNGSTEN_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 10,
    itemId: 'PERFECT_PLATE',
    time: 0.5
  }
];

const craftsStones: IPartialCraft[] = [
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 3, source: 'bazaar' }],
    hotm: 2,
    itemId: 'DIAMONITE',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'GLACITE_JEWEL', quantity: 5, source: 'bazaar' }],
    hotm: 2,
    itemId: 'POCKET_ICEBERG',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'STARFALL', quantity: 512, source: 'bazaar' }],
    hotm: 3,
    itemId: 'PETRIFIED_STARFALL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 2, source: 'bazaar' }],
    hotm: 3,
    itemId: 'PURE_MITHRIL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_COBBLESTONE', quantity: 128, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 64, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'ROCK_GEMSTONE',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_LAPIS_LAZULI', quantity: 16, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'TITANIUM_TESSERACT',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 2, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'GLEAMING_CRYSTAL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'HARD_STONE', quantity: 128, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'HOT_STUFF',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FINE_AMBER_GEM', quantity: 12, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'AMBER_MATERIAL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'FRIGID_HUSK',
    time: 6
  }
];

const craftsPets: IPartialCraft[] = [
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MITHRIL', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'Bejeweled Collar',
    time: 2
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Claw Fossil', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'coins', quantity: 300_000, source: 'vendor' }
    ],
    hotm: 4,
    itemId: 'Mole Pet',
    time: 3 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Helix Fossil', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'coins', quantity: 300_000, source: 'vendor' }
    ],
    hotm: 4,
    itemId: 'Ammonite Pet',
    time: 3 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Webbed Fossil', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AQUAMARINE_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'Penguin Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Footprint Fossil', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'T-Rex Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Spine Fossil', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AQUAMARINE_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'Spinosaurus Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Ugly Fossil', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'Goblin Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Clubbed Fossil', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_OPAL_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'Ankylosaurus Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Tusk Fossil', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'Mammoth Pet',
    time: 7 * DAY
  }
];

const craftsTools: IPartialCraft[] = [
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 3, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 1, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'Mithril Drill SX-R226',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Mithril Drill SX-R226', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 2, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Mithril Drill SX-R326',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FINE_RUBY_GEM', quantity: 6, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Ruby Drill TX-15',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Ruby Drill TX-15', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 3, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Gemstone Drill LT-522',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Gemstone Drill LT-522', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 3, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'MAGMA_CORE', quantity: 5, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Topaz Drill KGR-12',
    time: SEC_30
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
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 3, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Polished Topaz Rod',
    time: 12
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 6, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 10, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X355',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X355', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 6, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X455',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X455', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 20, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 32, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 15, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 20, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X555',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X555', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'CORLEONITE', quantity: 30, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 12, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 5, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Titanium Drill DR-X655',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'TUNGSTEN_ORE', quantity: 64, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'Chisel',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Chisel', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_TUNGSTEN', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_UMBER', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 8,
    itemId: 'Reinforced Chisel',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Reinforced Chisel', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 8, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 9,
    itemId: 'Glacite-Plated Chisel',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Glacite-Plated Chisel', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'PERFECT_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 10,
    itemId: 'Perfect Chisel',
    time: SEC_30
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
    time: SEC_30
  }
];

const craftsDrillParts: IPartialCraft[] = [
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'STARFALL', quantity: 64, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'Starfall Seasoning',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'GOBLIN_EGG', quantity: 99, source: 'bazaar' }],
    hotm: 3,
    itemId: 'Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_SAPPHIRE_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_BLUE', quantity: 96, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Goblin Omelette', quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Blue Cheese Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_GREEN', quantity: 96, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_JADE_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Goblin Omelette', quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Pesto Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_RED', quantity: 96, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Goblin Omelette', quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Spicy Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_YELLOW', quantity: 96, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Goblin Omelette', quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Sunny Side Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'PERFECT_OPAL_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'TUNGSTEN_PLATE', quantity: 5, source: 'bazaar' }
    ],
    hotm: 8,
    itemId: 'Tungsten Regulator',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Mithril-Plated Drill Engine',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 2, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'Mithril-Plated Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 8, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium-Plated Drill Engine',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium-Plated Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'PERFECT_RUBY_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 2, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'Ruby-polished Drill Engine',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Ruby-polished Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 8, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'PERFECT_SAPPHIRE_GEM', quantity: 3, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 5, source: 'bazaar' }
    ],
    hotm: 8,
    itemId: 'Sapphire-polished Drill Engine',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Sapphire-polished Drill Engine', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'PERFECT_AMBER_GEM', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 32, source: 'bazaar' }
    ],
    hotm: 9,
    itemId: 'Amber-polished Drill Engine',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 5, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Mithril-Infused Fuel Tank',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Mithril-Infused Fuel Tank', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 10, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 5, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 5, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium-Infused Fuel Tank',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium-Infused Fuel Tank', quantity: 1, source: 'auction' },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 4, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'Gemstone Fuel Tank',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Gemstone Fuel Tank', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 25, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 32, source: 'bazaar' }
    ],
    hotm: 8,
    itemId: 'Perfectly-Cut Fuel Tank',
    time: SEC_30
  }
];

const craftsOther: IPartialCraft[] = [
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
      { intermediaryCraft: true, itemId: 'Beacon III', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 20, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Beacon IV',
    time: 40
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Beacon IV', quantity: 1, source: 'auction' },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 40, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 5, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Beacon V',
    time: 50
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
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'ENCHANTED_ENDER_PEARL', quantity: 16, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'coins', quantity: 500_000, source: 'vendor' }
    ],
    hotm: 7,
    itemId: 'Travel Scroll to the Dwarven Base Camp',
    time: 10
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'STARFALL', quantity: 256, source: 'bazaar' }],
    hotm: 2,
    itemId: 'POWER_CRYSTAL',
    time: 2
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_TUNGSTEN', quantity: 192, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'TUNGSTEN_KEY',
    time: SEC_30
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_UMBER', quantity: 192, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 7,
    itemId: 'UMBER_KEY',
    time: SEC_30
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'PERFECT_PLATE', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: 'bazaar' }
    ],
    hotm: 10,
    itemId: 'SKELETON_KEY',
    time: 0.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_UMBER', quantity: 1, source: 'bazaar' },
      { intermediaryCraft: false, itemId: 'MATCH_STICKS', quantity: 16, source: 'bazaar' }
    ],
    hotm: 8,
    itemId: 'Portable Campfire',
    time: 0.5
  }
];

const indexRefine = 0;
const indexGear = 100;
const indexGemstone = 200;
const indexForging = 300;
const indexStones = 400;
const indexPets = 500;
const indexTools = 600;
const indexDrillParts = 700;
const indexOther = 800;

export const crafts: ICraft[] = [
  ...craftsRefine.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'refining',
        id: index + indexRefine
      } as ICraft)
  ),
  ...craftsGear.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'gear',
        id: index + indexGear
      } as ICraft)
  ),
  ...craftsGemstones.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'gemstone',
        id: index + indexGemstone
      } as ICraft)
  ),
  ...craftsForging.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'forging',
        id: index + indexForging
      } as ICraft)
  ),
  ...craftsStones.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'stones',
        id: index + indexStones
      } as ICraft)
  ),
  ...craftsPets.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'pets',
        id: index + indexPets
      } as ICraft)
  ),
  ...craftsTools.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'tools',
        id: index + indexTools
      } as ICraft)
  ),
  ...craftsDrillParts.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'drill parts',
        id: index + indexDrillParts
      } as ICraft)
  ),
  ...craftsOther.map(
    (craft, index) =>
      ({
        ...craft,
        category: 'other',
        id: index + indexOther
      } as ICraft)
  )
];
