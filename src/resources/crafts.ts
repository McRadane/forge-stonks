/* eslint-disable sonarjs/no-duplicate-string */

import type { ILanguage } from './lang/type';
import type { ICraft, IPartialCraft } from './types';

const SOURCE_BAZAAR = 'bazaar';
const SOURCE_AUCTION = 'auction';
const SOURCE_VENDOR = 'vendor';

export const itemsSource: Record<keyof ILanguage['items'], 'auction' | 'bazaar' | 'vendor'> = {
  AMBER_MATERIAL: SOURCE_BAZAAR,
  'Amber Crystal': SOURCE_VENDOR,
  'Amber Necklace': SOURCE_AUCTION,
  'Amber-polished Drill Engine': SOURCE_AUCTION,
  'Amethyst Crystal': SOURCE_VENDOR,
  'Amethyst Gauntlet': SOURCE_AUCTION,
  'Ammonite Pet': SOURCE_AUCTION,
  'Ankylosaurus Pet': SOURCE_AUCTION,
  'Aquamarine Crystal': SOURCE_VENDOR,
  'Artifact Of Power': SOURCE_AUCTION,
  BEJEWELED_HANDLE: SOURCE_BAZAAR,
  'Beacon I': SOURCE_AUCTION,
  'Beacon II': SOURCE_AUCTION,
  'Beacon III': SOURCE_AUCTION,
  'Beacon IV': SOURCE_AUCTION,
  'Beacon V': SOURCE_AUCTION,
  'Bejeweled Collar': SOURCE_AUCTION,
  'Blue Cheese Goblin Omelette': SOURCE_AUCTION,
  'Boots Of Divan': SOURCE_AUCTION,
  CORLEONITE: SOURCE_BAZAAR,
  'Chestplate Of Divan': SOURCE_AUCTION,
  Chisel: SOURCE_AUCTION,
  'Citrine Crystal': SOURCE_VENDOR,
  'Claw Fossil': SOURCE_AUCTION,
  'Clubbed Fossil': SOURCE_AUCTION,
  DIAMONITE: SOURCE_BAZAAR,
  DIVAN_FRAGMENT: SOURCE_BAZAAR,
  DIVAN_POWDER_COATING: SOURCE_BAZAAR,
  DRILL_ENGINE: SOURCE_BAZAAR,
  "Divan's Alloy": SOURCE_AUCTION,
  "Divan's Drill": SOURCE_AUCTION,
  'Dwarven Handwarmers': SOURCE_AUCTION,
  'Dwarven Metal Talisman': SOURCE_AUCTION,
  ENCHANTED_COAL_BLOCK: SOURCE_BAZAAR,
  ENCHANTED_COBBLESTONE: SOURCE_BAZAAR,
  ENCHANTED_DIAMOND_BLOCK: SOURCE_BAZAAR,
  ENCHANTED_ENDER_PEARL: SOURCE_BAZAAR,
  ENCHANTED_GLACITE: SOURCE_BAZAAR,
  ENCHANTED_GOLD_BLOCK: SOURCE_BAZAAR,
  ENCHANTED_IRON_BLOCK: SOURCE_BAZAAR,
  ENCHANTED_LAPIS_LAZULI: SOURCE_BAZAAR,
  ENCHANTED_MITHRIL: SOURCE_BAZAAR,
  ENCHANTED_REDSTONE_BLOCK: SOURCE_BAZAAR,
  ENCHANTED_TITANIUM: SOURCE_BAZAAR,
  ENCHANTED_TUNGSTEN: SOURCE_BAZAAR,
  ENCHANTED_UMBER: SOURCE_BAZAAR,
  FINE_AMBER_GEM: SOURCE_BAZAAR,
  FINE_AMETHYST_GEM: SOURCE_BAZAAR,
  FINE_AQUAMARINE_GEM: SOURCE_BAZAAR,
  FINE_CITRINE_GEM: SOURCE_BAZAAR,
  FINE_JADE_GEM: SOURCE_BAZAAR,
  FINE_ONYX_GEM: SOURCE_BAZAAR,
  FINE_PERIDOT_GEM: SOURCE_BAZAAR,
  FINE_RUBY_GEM: SOURCE_BAZAAR,
  FINE_SAPPHIRE_GEM: SOURCE_BAZAAR,
  FLAWLESS_AMBER_GEM: SOURCE_BAZAAR,
  FLAWLESS_AMETHYST_GEM: SOURCE_BAZAAR,
  FLAWLESS_AQUAMARINE_GEM: SOURCE_BAZAAR,
  FLAWLESS_CITRINE_GEM: SOURCE_BAZAAR,
  FLAWLESS_JADE_GEM: SOURCE_BAZAAR,
  FLAWLESS_JASPER_GEM: SOURCE_BAZAAR,
  FLAWLESS_ONYX_GEM: SOURCE_BAZAAR,
  FLAWLESS_OPAL_GEM: SOURCE_BAZAAR,
  FLAWLESS_PERIDOT_GEM: SOURCE_BAZAAR,
  FLAWLESS_RUBY_GEM: SOURCE_BAZAAR,
  FLAWLESS_SAPPHIRE_GEM: SOURCE_BAZAAR,
  FLAWLESS_TOPAZ_GEM: SOURCE_BAZAAR,
  FRIGID_HUSK: SOURCE_BAZAAR,
  FUEL_TANK: SOURCE_BAZAAR,
  'Footprint Fossil': SOURCE_AUCTION,
  GEMSTONE_MIXTURE: SOURCE_BAZAAR,
  GLACITE_AMALGAMATION: SOURCE_BAZAAR,
  GLACITE_JEWEL: SOURCE_BAZAAR,
  GLEAMING_CRYSTAL: SOURCE_BAZAAR,
  GLOSSY_GEMSTONE: SOURCE_BAZAAR,
  GOBLIN_EGG: SOURCE_BAZAAR,
  GOBLIN_EGG_BLUE: SOURCE_BAZAAR,
  GOBLIN_EGG_GREEN: SOURCE_BAZAAR,
  GOBLIN_EGG_RED: SOURCE_BAZAAR,
  GOBLIN_EGG_YELLOW: SOURCE_BAZAAR,
  GOLDEN_PLATE: SOURCE_BAZAAR,
  'Gemstone Chamber': SOURCE_AUCTION,
  'Gemstone Drill LT-522': SOURCE_AUCTION,
  'Gemstone Fuel Tank': SOURCE_AUCTION,
  'Glacite-Plated Chisel': SOURCE_AUCTION,
  'Goblin Omelette': SOURCE_AUCTION,
  'Goblin Pet': SOURCE_AUCTION,
  HARD_STONE: SOURCE_BAZAAR,
  HOT_STUFF: SOURCE_BAZAAR,
  'Helix Fossil': SOURCE_AUCTION,
  'Helmet Of Divan': SOURCE_AUCTION,
  'Jade Belt': SOURCE_AUCTION,
  'Jade Crystal': SOURCE_VENDOR,
  'Jasper Crystal': SOURCE_VENDOR,
  'Jasper Drill X': SOURCE_AUCTION,
  'Leggings Of Divan': SOURCE_AUCTION,
  MAGMA_CORE: SOURCE_BAZAAR,
  MATCH_STICKS: SOURCE_BAZAAR,
  MITHRIL_ORE: SOURCE_BAZAAR,
  MITHRIL_PLATE: SOURCE_BAZAAR,
  'Mammoth Pet': SOURCE_AUCTION,
  'Mithril Belt': SOURCE_AUCTION,
  'Mithril Cloak': SOURCE_AUCTION,
  'Mithril Drill SX-R226': SOURCE_AUCTION,
  'Mithril Drill SX-R326': SOURCE_AUCTION,
  'Mithril Gauntlet': SOURCE_AUCTION,
  'Mithril Necklace': SOURCE_AUCTION,
  'Mithril-Infused Fuel Tank': SOURCE_AUCTION,
  'Mithril-Plated Drill Engine': SOURCE_AUCTION,
  'Mole Pet': SOURCE_AUCTION,
  'Onyx Crystal': SOURCE_VENDOR,
  'Opal Crystal': SOURCE_VENDOR,
  PERFECT_AMBER_GEM: SOURCE_BAZAAR,
  PERFECT_AMETHYST_GEM: SOURCE_BAZAAR,
  PERFECT_AQUAMARINE_GEM: SOURCE_BAZAAR,
  PERFECT_CITRINE_GEM: SOURCE_BAZAAR,
  PERFECT_JADE_GEM: SOURCE_BAZAAR,
  PERFECT_JASPER_GEM: SOURCE_BAZAAR,
  PERFECT_ONYX_GEM: SOURCE_BAZAAR,
  PERFECT_OPAL_GEM: SOURCE_BAZAAR,
  PERFECT_PERIDOT_GEM: SOURCE_BAZAAR,
  PERFECT_PLATE: SOURCE_BAZAAR,
  PERFECT_RUBY_GEM: SOURCE_BAZAAR,
  PERFECT_SAPPHIRE_GEM: SOURCE_BAZAAR,
  PERFECT_TOPAZ_GEM: SOURCE_BAZAAR,
  PETRIFIED_STARFALL: SOURCE_BAZAAR,
  PLASMA: SOURCE_BAZAAR,
  POCKET_ICEBERG: SOURCE_BAZAAR,
  POWER_CRYSTAL: SOURCE_BAZAAR,
  PRECURSOR_APPARATUS: SOURCE_BAZAAR,
  PURE_MITHRIL: SOURCE_BAZAAR,
  'Pendant Of Divan': SOURCE_AUCTION,
  'Penguin Pet': SOURCE_AUCTION,
  'Perfect Chisel': SOURCE_AUCTION,
  'Perfectly-Cut Fuel Tank': SOURCE_AUCTION,
  'Peridot Crystal': SOURCE_VENDOR,
  'Pesto Goblin Omelette': SOURCE_AUCTION,
  'Polished Topaz Rod': SOURCE_AUCTION,
  'Portable Campfire': SOURCE_AUCTION,
  REFINED_DIAMOND: SOURCE_BAZAAR,
  REFINED_MINERAL: SOURCE_BAZAAR,
  REFINED_MITHRIL: SOURCE_BAZAAR,
  REFINED_TITANIUM: SOURCE_BAZAAR,
  REFINED_TUNGSTEN: SOURCE_BAZAAR,
  REFINED_UMBER: SOURCE_BAZAAR,
  ROCK_GEMSTONE: SOURCE_BAZAAR,
  'Reinforced Chisel': SOURCE_AUCTION,
  'Relic Of Power': SOURCE_AUCTION,
  'Ruby Crystal': SOURCE_VENDOR,
  'Ruby Drill TX-15': SOURCE_AUCTION,
  'Ruby-polished Drill Engine': SOURCE_AUCTION,
  SKELETON_KEY: SOURCE_BAZAAR,
  SLUDGE_JUICE: SOURCE_BAZAAR,
  STARFALL: SOURCE_BAZAAR,
  'Sapphire Cloak': SOURCE_AUCTION,
  'Sapphire Crystal': SOURCE_VENDOR,
  'Sapphire-polished Drill Engine': SOURCE_AUCTION,
  'Shattered Locket': SOURCE_AUCTION,
  'Spicy Goblin Omelette': SOURCE_AUCTION,
  'Spine Fossil': SOURCE_AUCTION,
  'Spinosaurus Pet': SOURCE_AUCTION,
  'Starfall Seasoning': SOURCE_AUCTION,
  'Sunny Side Goblin Omelette': SOURCE_AUCTION,
  'T-Rex Pet': SOURCE_AUCTION,
  TITANIUM_ORE: SOURCE_BAZAAR,
  TITANIUM_TESSERACT: SOURCE_BAZAAR,
  TREASURITE: SOURCE_BAZAAR,
  TUNGSTEN_KEY: SOURCE_BAZAAR,
  TUNGSTEN_ORE: SOURCE_BAZAAR,
  TUNGSTEN_PLATE: SOURCE_BAZAAR,
  'Titanium Artifact': SOURCE_AUCTION,
  'Titanium Belt': SOURCE_AUCTION,
  'Titanium Cloak': SOURCE_AUCTION,
  'Titanium Drill DR-X355': SOURCE_AUCTION,
  'Titanium Drill DR-X455': SOURCE_AUCTION,
  'Titanium Drill DR-X555': SOURCE_AUCTION,
  'Titanium Drill DR-X655': SOURCE_AUCTION,
  'Titanium Gauntlet': SOURCE_AUCTION,
  'Titanium Necklace': SOURCE_AUCTION,
  'Titanium Relic': SOURCE_AUCTION,
  'Titanium Ring': SOURCE_AUCTION,
  'Titanium Talisman': SOURCE_AUCTION,
  'Titanium-Infused Fuel Tank': SOURCE_AUCTION,
  'Titanium-Plated Drill Engine': SOURCE_AUCTION,
  'Topaz Crystal': SOURCE_VENDOR,
  'Topaz Drill KGR-12': SOURCE_AUCTION,
  'Travel Scroll to the Dwarven Base Camp': SOURCE_AUCTION,
  'Travel Scroll to the Dwarven Forge': SOURCE_AUCTION,
  'Tungsten Regulator': SOURCE_AUCTION,
  'Tusk Fossil': SOURCE_AUCTION,
  UMBER_KEY: SOURCE_BAZAAR,
  UMBER_PLATE: SOURCE_BAZAAR,
  'Ugly Fossil': SOURCE_AUCTION,
  WORM_MEMBRANE: SOURCE_BAZAAR,
  'Webbed Fossil': SOURCE_AUCTION,
  coins: SOURCE_VENDOR
};

const DAY = 24;
const SEC_30 = 1 / 120;

export const itemsVendorPrice: Partial<Record<keyof ILanguage['items'], number>> = {
  coins: 1
};

const craftsRefine: IPartialCraft[] = [
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_DIAMOND_BLOCK', quantity: 2, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'REFINED_DIAMOND',
    time: 8
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 160, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'REFINED_MITHRIL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_TITANIUM', quantity: 16, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'REFINED_TITANIUM',
    time: 12
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_UMBER', quantity: 160, source: SOURCE_BAZAAR }],
    hotm: 7,
    itemId: 'REFINED_UMBER',
    time: 1
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_TUNGSTEN', quantity: 160, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'REFINED_TUNGSTEN',
    time: 1
  }
];

const craftsGear: IPartialCraft[] = [
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 3, source: SOURCE_BAZAAR }],
    hotm: 1,
    itemId: 'Mithril Necklace',
    time: 1
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 3, source: SOURCE_BAZAAR }],
    hotm: 1,
    itemId: 'Mithril Cloak',
    time: 1
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 3, source: SOURCE_BAZAAR }],
    hotm: 1,
    itemId: 'Mithril Belt',
    time: 1
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_MITHRIL', quantity: 3, source: SOURCE_BAZAAR }],
    hotm: 1,
    itemId: 'Mithril Gauntlet',
    time: 1
  },

  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MINERAL', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Mithril Necklace', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 3,
    itemId: 'Titanium Necklace',
    time: 4.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MINERAL', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Mithril Cloak', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 3,
    itemId: 'Titanium Cloak',
    time: 4.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MINERAL', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Mithril Belt', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 3,
    itemId: 'Titanium Belt',
    time: 4.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'REFINED_MINERAL', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Mithril Gauntlet', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 3,
    itemId: 'Titanium Gauntlet',
    time: 4.5
  },

  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 2, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'Titanium Talisman',
    time: 14
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 6, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Titanium Talisman', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 3,
    itemId: 'Titanium Ring',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 12, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Titanium Ring', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 4,
    itemId: 'Titanium Artifact',
    time: 36
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 20, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Titanium Artifact', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 5,
    itemId: 'Titanium Relic',
    time: 72
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_MINERAL', quantity: 32, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'DIVAN_FRAGMENT', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'ENCHANTED_GOLD_BLOCK', quantity: 16, source: SOURCE_BAZAAR }
    ],
    hotm: 4,
    itemId: 'DIVAN_POWDER_COATING',
    time: 36
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 6,
    itemId: 'Helmet Of Divan',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 8, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 6,
    itemId: 'Chestplate Of Divan',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 7, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 6,
    itemId: 'Leggings Of Divan',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 6,
    itemId: 'Boots Of Divan',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 2, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Amber Necklace',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_SAPPHIRE_GEM', quantity: 2, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Sapphire Cloak',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_JADE_GEM', quantity: 2, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Jade Belt',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMETHYST_GEM', quantity: 2, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Amethyst Gauntlet',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'WORM_MEMBRANE', quantity: 100, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'coins', quantity: 25_000, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'Gemstone Chamber',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_JASPER_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'TUNGSTEN_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'UMBER_PLATE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 8,
    itemId: 'Dwarven Handwarmers',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_UMBER', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TUNGSTEN', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 4, source: SOURCE_BAZAAR }
    ],
    hotm: 8,
    itemId: 'Dwarven Metal Talisman',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Shattered Locket', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'PERFECT_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'DIVAN_FRAGMENT', quantity: 10, source: SOURCE_BAZAAR }
    ],
    hotm: 10,
    itemId: 'Pendant Of Divan',
    time: 24 * 7
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Artifact Of Power', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'PERFECT_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 32, source: SOURCE_BAZAAR }
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
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Amber Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'PERFECT_AMBER_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMETHYST_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Amethyst Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'PERFECT_AMETHYST_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_JADE_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Jade Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'PERFECT_JADE_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_JASPER_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Jasper Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'PERFECT_JASPER_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_OPAL_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Opal Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'PERFECT_OPAL_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Ruby Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'PERFECT_RUBY_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_SAPPHIRE_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Sapphire Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'PERFECT_SAPPHIRE_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Topaz Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 5,
    itemId: 'PERFECT_TOPAZ_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Onyx Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 7,
    itemId: 'PERFECT_ONYX_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_CITRINE_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Citrine Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 7,
    itemId: 'PERFECT_CITRINE_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_AQUAMARINE_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Aquamarine Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 7,
    itemId: 'PERFECT_AQUAMARINE_GEM',
    time: 20
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_PERIDOT_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'Peridot Crystal', quantity: 1, source: SOURCE_VENDOR }
    ],
    hotm: 7,
    itemId: 'PERFECT_PERIDOT_GEM',
    time: 20
  }
];

const craftsForging: IPartialCraft[] = [
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'GLACITE_JEWEL', quantity: 3, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'BEJEWELED_HANDLE',
    time: SEC_30
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'ENCHANTED_REDSTONE_BLOCK', quantity: 3, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 2,
    itemId: 'DRILL_ENGINE',
    time: 30
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'ENCHANTED_COAL_BLOCK', quantity: 2, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'FUEL_TANK',
    time: 10
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FINE_JADE_GEM', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FINE_AMBER_GEM', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FINE_AMETHYST_GEM', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FINE_SAPPHIRE_GEM', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'SLUDGE_JUICE', quantity: 320, source: SOURCE_BAZAAR }
    ],
    hotm: 4,
    itemId: 'GEMSTONE_MIXTURE',
    time: 4
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FINE_ONYX_GEM', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FINE_CITRINE_GEM', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FINE_PERIDOT_GEM', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FINE_AQUAMARINE_GEM', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'ENCHANTED_GLACITE', quantity: 256, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'GLACITE_AMALGAMATION',
    time: 4
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_GOLD_BLOCK', quantity: 2, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'GLACITE_JEWEL', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 2,
    itemId: 'GOLDEN_PLATE',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 3,
    itemId: 'MITHRIL_PLATE',
    time: 18
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TUNGSTEN', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'TUNGSTEN_PLATE',
    time: 3
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_UMBER', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'UMBER_PLATE',
    time: 3
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'UMBER_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'TUNGSTEN_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 10,
    itemId: 'PERFECT_PLATE',
    time: 0.5
  }
];

const craftsStones: IPartialCraft[] = [
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 3, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'DIAMONITE',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'GLACITE_JEWEL', quantity: 5, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'POCKET_ICEBERG',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'STARFALL', quantity: 512, source: SOURCE_BAZAAR }],
    hotm: 3,
    itemId: 'PETRIFIED_STARFALL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 2, source: SOURCE_BAZAAR }],
    hotm: 3,
    itemId: 'PURE_MITHRIL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_COBBLESTONE', quantity: 128, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 64, source: SOURCE_BAZAAR }
    ],
    hotm: 3,
    itemId: 'ROCK_GEMSTONE',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'ENCHANTED_LAPIS_LAZULI', quantity: 16, source: SOURCE_BAZAAR }
    ],
    hotm: 3,
    itemId: 'TITANIUM_TESSERACT',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GLOSSY_GEMSTONE', quantity: 32, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 2, source: SOURCE_BAZAAR }
    ],
    hotm: 4,
    itemId: 'GLEAMING_CRYSTAL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'HARD_STONE', quantity: 128, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 4,
    itemId: 'HOT_STUFF',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FINE_AMBER_GEM', quantity: 12, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 6,
    itemId: 'AMBER_MATERIAL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 1, source: SOURCE_BAZAAR }
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
      { intermediaryCraft: false, itemId: 'REFINED_MITHRIL', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 2,
    itemId: 'Bejeweled Collar',
    time: 2
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Claw Fossil', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'coins', quantity: 300_000, source: SOURCE_VENDOR }
    ],
    hotm: 4,
    itemId: 'Mole Pet',
    time: 3 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Helix Fossil', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'coins', quantity: 300_000, source: SOURCE_VENDOR }
    ],
    hotm: 4,
    itemId: 'Ammonite Pet',
    time: 3 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Webbed Fossil', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AQUAMARINE_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'Penguin Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Footprint Fossil', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'T-Rex Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Spine Fossil', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AQUAMARINE_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'Spinosaurus Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Ugly Fossil', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'FLAWLESS_AMBER_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'Goblin Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Clubbed Fossil', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'FLAWLESS_OPAL_GEM', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'Ankylosaurus Pet',
    time: 7 * DAY
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'Tusk Fossil', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 1, source: SOURCE_BAZAAR }
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
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 3, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 2,
    itemId: 'Mithril Drill SX-R226',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Mithril Drill SX-R226', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 2, source: SOURCE_BAZAAR }
    ],
    hotm: 3,
    itemId: 'Mithril Drill SX-R326',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FINE_RUBY_GEM', quantity: 6, source: SOURCE_BAZAAR }
    ],
    hotm: 4,
    itemId: 'Ruby Drill TX-15',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Ruby Drill TX-15', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 3, source: SOURCE_BAZAAR }
    ],
    hotm: 4,
    itemId: 'Gemstone Drill LT-522',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Gemstone Drill LT-522', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 3, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'MAGMA_CORE', quantity: 5, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Topaz Drill KGR-12',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Topaz Drill KGR-12', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'FLAWLESS_JASPER_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 100, source: SOURCE_BAZAAR }
    ],
    hotm: 6,
    itemId: 'Jasper Drill X',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 2, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 3, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Polished Topaz Rod',
    time: 12
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GOLDEN_PLATE', quantity: 6, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 10, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X355',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X355', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 6, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X455',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X455', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 20, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 32, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'ENCHANTED_IRON_BLOCK', quantity: 2, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 15, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 20, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X555',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X555', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'CORLEONITE', quantity: 30, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 12, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 5, source: SOURCE_BAZAAR }
    ],
    hotm: 6,
    itemId: 'Titanium Drill DR-X655',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'TUNGSTEN_ORE', quantity: 64, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'Chisel',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Chisel', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_TUNGSTEN', quantity: 2, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_UMBER', quantity: 2, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 8,
    itemId: 'Reinforced Chisel',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Reinforced Chisel', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'GLACITE_AMALGAMATION', quantity: 8, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 9,
    itemId: 'Glacite-Plated Chisel',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Glacite-Plated Chisel', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'PERFECT_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 10,
    itemId: 'Perfect Chisel',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: "Divan's Alloy", quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'Titanium Drill DR-X655', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'coins', quantity: 50_000_000, source: SOURCE_VENDOR }
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
      { intermediaryCraft: false, itemId: 'TREASURITE', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'STARFALL', quantity: 64, source: SOURCE_BAZAAR }
    ],
    hotm: 2,
    itemId: 'Starfall Seasoning',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'GOBLIN_EGG', quantity: 99, source: SOURCE_BAZAAR }],
    hotm: 3,
    itemId: 'Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_SAPPHIRE_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_BLUE', quantity: 96, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Goblin Omelette', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 5,
    itemId: 'Blue Cheese Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_GREEN', quantity: 96, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_JADE_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Goblin Omelette', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 5,
    itemId: 'Pesto Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_RED', quantity: 96, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_RUBY_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Goblin Omelette', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 5,
    itemId: 'Spicy Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'GOBLIN_EGG_YELLOW', quantity: 96, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'FLAWLESS_TOPAZ_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Goblin Omelette', quantity: 1, source: SOURCE_AUCTION }
    ],
    hotm: 5,
    itemId: 'Sunny Side Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'PERFECT_OPAL_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'TUNGSTEN_PLATE', quantity: 5, source: SOURCE_BAZAAR }
    ],
    hotm: 8,
    itemId: 'Tungsten Regulator',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 2, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'MITHRIL_PLATE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 3,
    itemId: 'Mithril-Plated Drill Engine',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 2, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'Mithril-Plated Drill Engine', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 8, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Titanium-Plated Drill Engine',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium-Plated Drill Engine', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'PERFECT_RUBY_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 2, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'Ruby-polished Drill Engine',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Ruby-polished Drill Engine', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 8, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'PERFECT_SAPPHIRE_GEM', quantity: 3, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 5, source: SOURCE_BAZAAR }
    ],
    hotm: 8,
    itemId: 'Sapphire-polished Drill Engine',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Sapphire-polished Drill Engine', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'PERFECT_AMBER_GEM', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'DRILL_ENGINE', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 32, source: SOURCE_BAZAAR }
    ],
    hotm: 9,
    itemId: 'Amber-polished Drill Engine',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 5, source: SOURCE_BAZAAR }
    ],
    hotm: 3,
    itemId: 'Mithril-Infused Fuel Tank',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Mithril-Infused Fuel Tank', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_TITANIUM', quantity: 10, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'REFINED_DIAMOND', quantity: 5, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'FUEL_TANK', quantity: 5, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Titanium-Infused Fuel Tank',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Titanium-Infused Fuel Tank', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 4, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 10, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'Gemstone Fuel Tank',
    time: SEC_30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Gemstone Fuel Tank', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'GEMSTONE_MIXTURE', quantity: 25, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PRECURSOR_APPARATUS', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 32, source: SOURCE_BAZAAR }
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
      { intermediaryCraft: false, itemId: 'Beacon I', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 5, source: SOURCE_BAZAAR }
    ],
    hotm: 2,
    itemId: 'Beacon II',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Beacon II', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 10, source: SOURCE_BAZAAR }
    ],
    hotm: 3,
    itemId: 'Beacon III',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Beacon III', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 20, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 4,
    itemId: 'Beacon IV',
    time: 40
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'Beacon IV', quantity: 1, source: SOURCE_AUCTION },
      { intermediaryCraft: true, itemId: 'REFINED_MITHRIL', quantity: 40, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'PLASMA', quantity: 5, source: SOURCE_BAZAAR }
    ],
    hotm: 5,
    itemId: 'Beacon V',
    time: 50
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'MITHRIL_ORE', quantity: 48, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'TITANIUM_ORE', quantity: 80, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'ENCHANTED_ENDER_PEARL', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'coins', quantity: 25_000, source: SOURCE_VENDOR }
    ],
    hotm: 2,
    itemId: 'Travel Scroll to the Dwarven Forge',
    time: 5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'FLAWLESS_ONYX_GEM', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'ENCHANTED_ENDER_PEARL', quantity: 16, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'coins', quantity: 500_000, source: SOURCE_VENDOR }
    ],
    hotm: 7,
    itemId: 'Travel Scroll to the Dwarven Base Camp',
    time: 10
  },
  {
    bazaarItem: true,
    craftMaterial: [{ intermediaryCraft: false, itemId: 'STARFALL', quantity: 256, source: SOURCE_BAZAAR }],
    hotm: 2,
    itemId: 'POWER_CRYSTAL',
    time: 2
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_TUNGSTEN', quantity: 192, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'TUNGSTEN_KEY',
    time: SEC_30
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: false, itemId: 'ENCHANTED_UMBER', quantity: 192, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 7,
    itemId: 'UMBER_KEY',
    time: SEC_30
  },
  {
    bazaarItem: true,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'PERFECT_PLATE', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: true, itemId: 'BEJEWELED_HANDLE', quantity: 1, source: SOURCE_BAZAAR }
    ],
    hotm: 10,
    itemId: 'SKELETON_KEY',
    time: 0.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { intermediaryCraft: true, itemId: 'REFINED_UMBER', quantity: 1, source: SOURCE_BAZAAR },
      { intermediaryCraft: false, itemId: 'MATCH_STICKS', quantity: 16, source: SOURCE_BAZAAR }
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
