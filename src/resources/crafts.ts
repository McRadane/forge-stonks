import { ILanguage } from './lang/type';

export interface ICraftMaterial {
  itemId: keyof ILanguage['items'];
  intermediaryCraft: boolean;
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

export const itemsSource: Record<keyof ILanguage['items'], 'auction' | 'bazaar' | 'vendor'> = {
  'Amber Material': 'auction',
  'Amber-polished Drill Engine': 'auction',
  'Ammonite Pet': 'auction',
  'Beacon I': 'auction',
  'Beacon II': 'auction',
  'Beacon III': 'auction',
  'Beacon IV': 'auction',
  'Beacon V': 'auction',
  'Bejeweled Handle': 'auction',
  'Blue Cheese Goblin Omelette': 'auction',
  'Boots Of Divan': 'auction',
  'Chestplate Of Divan': 'auction',
  'Control Switch': 'auction',
  Corleonite: 'auction',
  DIAMONITE: 'bazaar',
  'Divan Fragment': 'auction',
  "Divan's Alloy": 'auction',
  "Divan's Drill": 'auction',
  'Drill Engine': 'auction',
  ENCHANTED_COAL_BLOCK: 'bazaar',
  ENCHANTED_COBBLESTONE: 'bazaar',
  ENCHANTED_DIAMOND_BLOCK: 'bazaar',
  ENCHANTED_ENDER_PEARL: 'bazaar',
  ENCHANTED_GOLD: 'bazaar',
  ENCHANTED_GOLD_BLOCK: 'bazaar',
  ENCHANTED_IRON_BLOCK: 'bazaar',
  ENCHANTED_MITHRIL: 'bazaar',
  ENCHANTED_REDSTONE_BLOCK: 'bazaar',
  ENCHANTED_TITANIUM: 'bazaar',
  'Electron Transmitter': 'auction',
  FINE_AMBER_GEM: 'bazaar',
  FINE_AMETHYST_GEM: 'bazaar',
  FINE_JADE_GEM: 'bazaar',
  FINE_RUBY_GEM: 'bazaar',
  FINE_SAPPHIRE_GEM: 'bazaar',
  FINE_TOPAZ_GEM: 'bazaar',
  FLAWED_RUBY_GEM: 'bazaar',
  FLAWLESS_AMBER_GEM: 'bazaar',
  FLAWLESS_JASPER_GEM: 'bazaar',
  FLAWLESS_RUBY_GEM: 'bazaar',
  FLAWLESS_TOPAZ_GEM: 'bazaar',
  'FTX 3070': 'auction',
  'Fuel Tank': 'auction',
  GOBLIN_EGG: 'bazaar',
  GOBLIN_EGG_BLUE: 'bazaar',
  GOBLIN_EGG_GREEN: 'bazaar',
  GOBLIN_EGG_RED: 'bazaar',
  GOBLIN_EGG_YELLOW: 'bazaar',
  'Gemstone Chamber': 'auction',
  'Gemstone Drill LT-522': 'auction',
  'Gemstone Fuel Tank': 'auction',
  'Gemstone Mixture': 'auction',
  'Glacite Jewel': 'auction',
  'Goblin Omelette': 'auction',
  'Golden Plate': 'auction',
  HARD_STONE: 'bazaar',
  Helix: 'auction',
  'Helmet Of Divan': 'auction',
  'Hot Stuff': 'auction',
  'Jasper Drill X': 'auction',
  'Leggings Of Divan': 'auction',
  MITHRIL_ORE: 'bazaar',
  'Mithril Drill SX-R226': 'auction',
  'Mithril Drill SX-R326': 'auction',
  'Mithril Pickaxe': 'auction',
  'Mithril Plate': 'auction',
  'Mithril-Infused Fuel Tank': 'auction',
  'Mithril-Plated Drill Engine': 'auction',
  PERFECT_SAPPHIRE_GEM: 'bazaar',
  PLASMA_BUCKET: 'bazaar',
  POWER_CRYSTAL: 'bazaar',
  'Perfectly-Cut Fuel Tank': 'auction',
  'Pesto Goblin Omelette': 'auction',
  'Petrified Starfall': 'auction',
  'Pure Mithril': 'auction',
  REFINED_DIAMOND: 'bazaar',
  REFINED_MITHRIL: 'bazaar',
  REFINED_TITANIUM: 'bazaar',
  ROUGH_AMBER_GEM: 'bazaar',
  'Refined Mithril Pickaxe': 'auction',
  'Robotron Reflector': 'auction',
  'Rock Gemstone': 'auction',
  'Ruby Drill TX-15': 'auction',
  'Magma Core': 'vendor',
  'Ruby-polished Drill Engine': 'auction',
  SLUDGE_JUICE: 'bazaar',
  STARFALL: 'bazaar',
  'Sapphire-polished Drill Engine': 'auction',
  'Spicy Goblin Omelette': 'auction',
  'Sunny Side Goblin Omelette': 'auction',
  'Superlite Motor': 'auction',
  'Synthetic Heart': 'auction',
  TITANIUM_ORE: 'bazaar',
  TREASURITE: 'bazaar',
  'Titanium Artifact': 'auction',
  'Titanium Drill DR-X355': 'auction',
  'Titanium Drill DR-X455': 'auction',
  'Titanium Drill DR-X555': 'auction',
  'Titanium Drill DR-X655': 'auction',
  'Titanium Relic': 'auction',
  'Titanium Ring': 'auction',
  'Titanium Talisman': 'auction',
  'Titanium-Infused Fuel Tank': 'auction',
  'Titanium-Plated Drill Engine': 'auction',
  'Topaz Drill KGR-12': 'auction',
  'Travel Scroll to the Crystal Hollows': 'auction',
  'Travel Scroll to the Dwarven Forge': 'auction',
  WORM_MEMBRANE: 'bazaar',
  coins: 'vendor'
};

export const itemsVendorPrice: Partial<Record<keyof ILanguage['items'], number>> = {
  'Magma Core': 0,
  coins: 1
};

const craftsRefine: IPartialCraft[] = [
  {
    bazaarItem: true,
    craftMaterial: [{ itemId: 'ENCHANTED_DIAMOND_BLOCK', intermediaryCraft: false, quantity: 2, source: 'bazaar' }],
    hotm: 2,
    itemId: 'REFINED_DIAMOND',
    time: 8
  },
  {
    bazaarItem: true,
    craftMaterial: [{ itemId: 'ENCHANTED_MITHRIL', intermediaryCraft: false, quantity: 160, source: 'bazaar' }],
    hotm: 2,
    itemId: 'REFINED_MITHRIL',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ itemId: 'ENCHANTED_TITANIUM', intermediaryCraft: false, quantity: 16, source: 'bazaar' }],
    hotm: 2,
    itemId: 'REFINED_TITANIUM',
    time: 12
  },
  {
    bazaarItem: false,
    craftMaterial: [{ itemId: 'ENCHANTED_COAL_BLOCK', intermediaryCraft: false, quantity: 2, source: 'bazaar' }],
    hotm: 2,
    itemId: 'Fuel Tank',
    time: 10
  },
  {
    bazaarItem: false,
    craftMaterial: [{ itemId: 'Glacite Jewel', intermediaryCraft: false, quantity: 3, source: 'auction' }],
    hotm: 2,
    itemId: 'Bejeweled Handle',
    time: 0.5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'ENCHANTED_IRON_BLOCK', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { itemId: 'ENCHANTED_REDSTONE_BLOCK', intermediaryCraft: false, quantity: 3, source: 'bazaar' },
      { itemId: 'Golden Plate', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'TREASURITE', intermediaryCraft: false, quantity: 10, source: 'bazaar' },
      { itemId: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Drill Engine',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'ENCHANTED_GOLD_BLOCK', intermediaryCraft: false, quantity: 2, source: 'bazaar' },
      { itemId: 'Glacite Jewel', intermediaryCraft: false, quantity: 5, source: 'auction' },
      { itemId: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 1, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Golden Plate',
    time: 6
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 5, source: 'bazaar' },
      { itemId: 'Golden Plate', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'ENCHANTED_IRON_BLOCK', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 1, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Mithril Plate',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'FINE_JADE_GEM', intermediaryCraft: false, quantity: 4, source: 'bazaar' },
      { itemId: 'FINE_AMBER_GEM', intermediaryCraft: false, quantity: 4, source: 'bazaar' },
      { itemId: 'FINE_AMETHYST_GEM', intermediaryCraft: false, quantity: 4, source: 'bazaar' },
      { itemId: 'FINE_SAPPHIRE_GEM', intermediaryCraft: false, quantity: 4, source: 'bazaar' },
      { itemId: 'SLUDGE_JUICE', intermediaryCraft: false, quantity: 320, source: 'bazaar' }
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
      { itemId: 'ENCHANTED_MITHRIL', intermediaryCraft: false, quantity: 30, source: 'bazaar' },
      { itemId: 'Bejeweled Handle', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'ENCHANTED_GOLD', intermediaryCraft: false, quantity: 10, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'Mithril Pickaxe',
    time: 0.75
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Beacon I', intermediaryCraft: false, quantity: 1, source: 'auction' },
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 5, source: 'bazaar' }
    ],
    hotm: 2,
    itemId: 'Beacon II',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [{ itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 2, source: 'bazaar' }],
    hotm: 2,
    itemId: 'Titanium Talisman',
    time: 14
  },
  {
    bazaarItem: true,
    craftMaterial: [{ itemId: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 3, source: 'bazaar' }],
    hotm: 2,
    itemId: 'DIAMONITE',
    time: 6
  },
  {
    bazaarItem: true,
    craftMaterial: [{ itemId: 'STARFALL', intermediaryCraft: false, quantity: 256, source: 'bazaar' }],
    hotm: 2,
    itemId: 'POWER_CRYSTAL',
    time: 2
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'MITHRIL_ORE', intermediaryCraft: false, quantity: 48, source: 'bazaar' },
      { itemId: 'TITANIUM_ORE', intermediaryCraft: false, quantity: 80, source: 'bazaar' },
      { itemId: 'ENCHANTED_ENDER_PEARL', intermediaryCraft: false, quantity: 16, source: 'bazaar' },
      { itemId: 'coins', intermediaryCraft: false, quantity: 25_000, source: 'vendor' }
    ],
    hotm: 2,
    itemId: 'Travel Scroll to the Dwarven Forge',
    time: 5
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 3, source: 'bazaar' },
      { itemId: 'Bejeweled Handle', intermediaryCraft: true, quantity: 2, source: 'auction' },
      { itemId: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 1, source: 'bazaar' },
      { itemId: 'ENCHANTED_GOLD', intermediaryCraft: false, quantity: 30, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Refined Mithril Pickaxe',
    time: 22
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 3, source: 'bazaar' },
      { itemId: 'Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Mithril Drill SX-R226',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Mithril Plate', intermediaryCraft: true, quantity: 3, source: 'auction' },
      { itemId: 'Fuel Tank', intermediaryCraft: true, quantity: 5, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Mithril-Infused Fuel Tank',
    time: 10
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Drill Engine', intermediaryCraft: true, quantity: 2, source: 'auction' },
      { itemId: 'Mithril Plate', intermediaryCraft: true, quantity: 3, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Mithril-Plated Drill Engine',
    time: 15
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Beacon II', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 10, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Beacon III',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 6, source: 'bazaar' },
      { itemId: 'Titanium Talisman', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    itemId: 'Titanium Ring',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [{ itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 2, source: 'bazaar' }],
    hotm: 3,
    itemId: 'Pure Mithril',
    time: 12
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'ENCHANTED_COBBLESTONE', intermediaryCraft: false, quantity: 128, source: 'bazaar' },
      { itemId: 'TREASURITE', intermediaryCraft: false, quantity: 64, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Rock Gemstone',
    time: 22
  },
  {
    bazaarItem: false,
    craftMaterial: [{ itemId: 'STARFALL', intermediaryCraft: false, quantity: 512, source: 'bazaar' }],
    hotm: 3,
    itemId: 'Petrified Starfall',
    time: 14
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'GOBLIN_EGG_GREEN', intermediaryCraft: false, quantity: 99, source: 'bazaar' },
      { itemId: 'FINE_JADE_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Pesto Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Helix', intermediaryCraft: false, quantity: 1, source: 'auction' },
      { itemId: 'coins', intermediaryCraft: false, quantity: 300_000, source: 'vendor' }
    ],
    hotm: 3,
    itemId: 'Ammonite Pet',
    time: 288
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'FINE_RUBY_GEM', intermediaryCraft: false, quantity: 6, source: 'bazaar' }
    ],
    hotm: 3,
    itemId: 'Ruby Drill TX-15',
    time: 1
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'FLAWED_RUBY_GEM', intermediaryCraft: false, quantity: 48, source: 'bazaar' },
      { itemId: 'FINE_RUBY_GEM', intermediaryCraft: false, quantity: 80, source: 'bazaar' },
      { itemId: 'ENCHANTED_ENDER_PEARL', intermediaryCraft: false, quantity: 16, source: 'bazaar' },
      { itemId: 'coins', intermediaryCraft: false, quantity: 50_000, source: 'vendor' }
    ],
    hotm: 3,
    itemId: 'Travel Scroll to the Crystal Hollows',
    time: 10
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Mithril Drill SX-R226', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Golden Plate', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { itemId: 'Mithril Plate', intermediaryCraft: true, quantity: 2, source: 'auction' }
    ],
    hotm: 4,
    itemId: 'Mithril Drill SX-R326',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Drill Engine', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { itemId: 'PLASMA_BUCKET', intermediaryCraft: false, quantity: 5, source: 'bazaar' },
      { itemId: 'Mithril Plate', intermediaryCraft: true, quantity: 4, source: 'auction' },
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 5, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Titanium-Plated Drill Engine',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [{ itemId: 'GOBLIN_EGG', intermediaryCraft: false, quantity: 99, source: 'bazaar' }],
    hotm: 4,
    itemId: 'Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Beacon III', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 20, source: 'bazaar' },
      { itemId: 'PLASMA_BUCKET', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Beacon IV',
    time: 40
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 12, source: 'bazaar' },
      { itemId: 'Titanium Ring', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 4,
    itemId: 'Titanium Artifact',
    time: 36
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'HARD_STONE', intermediaryCraft: false, quantity: 128, source: 'bazaar' },
      { itemId: 'ROUGH_AMBER_GEM', intermediaryCraft: false, quantity: 64, source: 'bazaar' }
    ],
    hotm: 4,
    itemId: 'Hot Stuff',
    time: 24
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'GOBLIN_EGG_YELLOW', intermediaryCraft: false, quantity: 99, source: 'bazaar' },
      { itemId: 'FINE_TOPAZ_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Sunny Side Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Ruby Drill TX-15', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 3, source: 'auction' }
    ],
    hotm: 4,
    itemId: 'Gemstone Drill LT-522',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Golden Plate', intermediaryCraft: true, quantity: 6, source: 'auction' },
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 10, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X355',
    time: 64
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Titanium Drill DR-X355', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 16, source: 'bazaar' },
      { itemId: 'Mithril Plate', intermediaryCraft: true, quantity: 6, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X455',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Titanium Drill DR-X455', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 20, source: 'bazaar' },
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 32, source: 'bazaar' },
      { itemId: 'ENCHANTED_IRON_BLOCK', intermediaryCraft: false, quantity: 2, source: 'bazaar' },
      { itemId: 'Mithril Plate', intermediaryCraft: true, quantity: 15, source: 'auction' },
      { itemId: 'PLASMA_BUCKET', intermediaryCraft: false, quantity: 20, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Titanium Drill DR-X555',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { itemId: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { itemId: 'Fuel Tank', intermediaryCraft: true, quantity: 10, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Titanium-Infused Fuel Tank',
    time: 25
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Beacon IV', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 40, source: 'bazaar' },
      { itemId: 'PLASMA_BUCKET', intermediaryCraft: false, quantity: 5, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Beacon V',
    time: 50
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 20, source: 'bazaar' },
      { itemId: 'Titanium Artifact', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Titanium Relic',
    time: 72
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'GOBLIN_EGG_RED', intermediaryCraft: false, quantity: 99, source: 'bazaar' },
      { itemId: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Spicy Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'WORM_MEMBRANE', intermediaryCraft: false, quantity: 100, source: 'bazaar' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'coins', intermediaryCraft: false, quantity: 25_000, source: 'vendor' }
    ],
    hotm: 5,
    itemId: 'Gemstone Chamber',
    time: 4
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Gemstone Drill LT-522', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'FLAWLESS_TOPAZ_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 3, source: 'auction' },
      { itemId: 'Magma Core', intermediaryCraft: false, quantity: 5, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Topaz Drill KGR-12',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Mithril-Plated Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Superlite Motor', intermediaryCraft: false, quantity: 10, source: 'auction' },
      { itemId: 'FINE_RUBY_GEM', intermediaryCraft: false, quantity: 10, source: 'bazaar' }
    ],
    hotm: 5,
    itemId: 'Ruby-polished Drill Engine',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Titanium-Infused Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Control Switch', intermediaryCraft: false, quantity: 30, source: 'auction' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' }
    ],
    hotm: 5,
    itemId: 'Gemstone Fuel Tank',
    time: 30
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'PERFECT_SAPPHIRE_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { itemId: 'GOBLIN_EGG_BLUE', intermediaryCraft: false, quantity: 99, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Blue Cheese Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Titanium Drill DR-X555', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Corleonite', intermediaryCraft: false, quantity: 30, source: 'auction' },
      { itemId: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { itemId: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 5, source: 'bazaar' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 16, source: 'auction' },
      { itemId: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 12, source: 'bazaar' },
      { itemId: 'Mithril Plate', intermediaryCraft: true, quantity: 5, source: 'auction' }
    ],
    hotm: 6,
    itemId: 'Titanium Drill DR-X655',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Topaz Drill KGR-12', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'FLAWLESS_JASPER_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { itemId: 'TREASURITE', intermediaryCraft: false, quantity: 100, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Jasper Drill X',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Titanium-Plated Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Electron Transmitter', intermediaryCraft: false, quantity: 25, source: 'auction' },
      { itemId: 'FTX 3070', intermediaryCraft: false, quantity: 25, source: 'auction' },
      { itemId: 'FINE_SAPPHIRE_GEM', intermediaryCraft: false, quantity: 20, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Sapphire-polished Drill Engine',
    time: 20
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'FINE_AMBER_GEM', intermediaryCraft: false, quantity: 12, source: 'bazaar' },
      { itemId: 'Golden Plate', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 6,
    itemId: 'Amber Material',
    time: 7
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Divan Fragment', intermediaryCraft: false, quantity: 5, source: 'auction' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { itemId: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Helmet Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Divan Fragment', intermediaryCraft: false, quantity: 8, source: 'auction' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { itemId: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Chestplate Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Divan Fragment', intermediaryCraft: false, quantity: 7, source: 'auction' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { itemId: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Leggings Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Divan Fragment', intermediaryCraft: false, quantity: 4, source: 'auction' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { itemId: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    itemId: 'Boots Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Ruby-polished Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Sapphire-polished Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'FLAWLESS_AMBER_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { itemId: 'Robotron Reflector', intermediaryCraft: false, quantity: 50, source: 'auction' }
    ],
    hotm: 7,
    itemId: 'Amber-polished Drill Engine',
    time: 50
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: 'Gemstone Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'Gemstone Mixture', intermediaryCraft: true, quantity: 25, source: 'auction' },
      { itemId: 'Synthetic Heart', intermediaryCraft: false, quantity: 70, source: 'auction' }
    ],
    hotm: 7,
    itemId: 'Perfectly-Cut Fuel Tank',
    time: 50
  },
  {
    bazaarItem: false,
    craftMaterial: [
      { itemId: "Divan's Alloy", intermediaryCraft: false, quantity: 1, source: 'auction' },
      { itemId: 'Titanium Drill DR-X655', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { itemId: 'coins', intermediaryCraft: false, quantity: 50_000_000, source: 'vendor' }
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
