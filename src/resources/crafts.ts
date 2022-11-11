import { ILanguage } from './lang/type';

export interface ICraftMaterial {
  id: keyof ILanguage['items'];
  intermediaryCraft: boolean;
  quantity: number;
  source: 'auction' | 'bazaar' | 'vendor';
}

export interface ICraft {
  bazaarItem: boolean;
  category: 'casting' | 'refine';
  craftMaterial: ICraftMaterial[];
  hotm: number;
  id: keyof ILanguage['items'];
  time: number;
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

export const crafts: ICraft[] = [
  {
    bazaarItem: true,
    category: 'refine',
    craftMaterial: [{ id: 'ENCHANTED_DIAMOND_BLOCK', intermediaryCraft: false, quantity: 2, source: 'bazaar' }],
    hotm: 2,
    id: 'REFINED_DIAMOND',
    time: 8
  },
  {
    bazaarItem: true,
    category: 'refine',
    craftMaterial: [{ id: 'ENCHANTED_MITHRIL', intermediaryCraft: false, quantity: 160, source: 'bazaar' }],
    hotm: 2,
    id: 'REFINED_MITHRIL',
    time: 6
  },
  {
    bazaarItem: true,
    category: 'refine',
    craftMaterial: [{ id: 'ENCHANTED_TITANIUM', intermediaryCraft: false, quantity: 16, source: 'bazaar' }],
    hotm: 2,
    id: 'REFINED_TITANIUM',
    time: 12
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [{ id: 'ENCHANTED_COAL_BLOCK', intermediaryCraft: false, quantity: 2, source: 'bazaar' }],
    hotm: 2,
    id: 'Fuel Tank',
    time: 10
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [{ id: 'Glacite Jewel', intermediaryCraft: false, quantity: 3, source: 'auction' }],
    hotm: 2,
    id: 'Bejeweled Handle',
    time: 0.5
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      { id: 'ENCHANTED_IRON_BLOCK', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { id: 'ENCHANTED_REDSTONE_BLOCK', intermediaryCraft: false, quantity: 3, source: 'bazaar' },
      { id: 'Golden Plate', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'TREASURITE', intermediaryCraft: false, quantity: 10, source: 'bazaar' },
      { id: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    id: 'Drill Engine',
    time: 30
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      { id: 'ENCHANTED_GOLD_BLOCK', intermediaryCraft: false, quantity: 2, source: 'bazaar' },
      { id: 'Glacite Jewel', intermediaryCraft: false, quantity: 5, source: 'auction' },
      { id: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 1, source: 'bazaar' }
    ],
    hotm: 3,
    id: 'Golden Plate',
    time: 6
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 5, source: 'bazaar' },
      { id: 'Golden Plate', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'ENCHANTED_IRON_BLOCK', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 1, source: 'bazaar' }
    ],
    hotm: 3,
    id: 'Mithril Plate',
    time: 18
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      { id: 'FINE_JADE_GEM', intermediaryCraft: false, quantity: 4, source: 'bazaar' },
      { id: 'FINE_AMBER_GEM', intermediaryCraft: false, quantity: 4, source: 'bazaar' },
      { id: 'FINE_AMETHYST_GEM', intermediaryCraft: false, quantity: 4, source: 'bazaar' },
      { id: 'FINE_SAPPHIRE_GEM', intermediaryCraft: false, quantity: 4, source: 'bazaar' },
      { id: 'SLUDGE_JUICE', intermediaryCraft: false, quantity: 320, source: 'bazaar' }
    ],
    hotm: 3,
    id: 'Gemstone Mixture',
    time: 4
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'ENCHANTED_MITHRIL', intermediaryCraft: false, quantity: 30, source: 'bazaar' },
      { id: 'Bejeweled Handle', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'ENCHANTED_GOLD', intermediaryCraft: false, quantity: 10, source: 'bazaar' }
    ],
    hotm: 2,
    id: 'Mithril Pickaxe',
    time: 0.75
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Beacon I', intermediaryCraft: false, quantity: 1, source: 'auction' },
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 5, source: 'bazaar' }
    ],
    hotm: 2,
    id: 'Beacon II',
    time: 20
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [{ id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 2, source: 'bazaar' }],
    hotm: 2,
    id: 'Titanium Talisman',
    time: 14
  },
  {
    bazaarItem: true,
    category: 'casting',
    craftMaterial: [{ id: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 3, source: 'bazaar' }],
    hotm: 2,
    id: 'DIAMONITE',
    time: 6
  },
  {
    bazaarItem: true,
    category: 'casting',
    craftMaterial: [{ id: 'STARFALL', intermediaryCraft: false, quantity: 256, source: 'bazaar' }],
    hotm: 2,
    id: 'POWER_CRYSTAL',
    time: 2
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'MITHRIL_ORE', intermediaryCraft: false, quantity: 48, source: 'bazaar' },
      { id: 'TITANIUM_ORE', intermediaryCraft: false, quantity: 80, source: 'bazaar' },
      { id: 'ENCHANTED_ENDER_PEARL', intermediaryCraft: false, quantity: 16, source: 'bazaar' },
      { id: 'coins', intermediaryCraft: false, quantity: 25, source: 'auction' }
    ],
    hotm: 2,
    id: 'Travel Scroll to the Dwarven Forge',
    time: 5
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 3, source: 'bazaar' },
      { id: 'Bejeweled Handle', intermediaryCraft: true, quantity: 2, source: 'auction' },
      { id: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 1, source: 'bazaar' },
      { id: 'ENCHANTED_GOLD', intermediaryCraft: false, quantity: 30, source: 'bazaar' }
    ],
    hotm: 3,
    id: 'Refined Mithril Pickaxe',
    time: 22
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 3, source: 'bazaar' },
      { id: 'Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    id: 'Mithril Drill SX-R226',
    time: 4
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Mithril Plate', intermediaryCraft: true, quantity: 3, source: 'auction' },
      { id: 'Fuel Tank', intermediaryCraft: true, quantity: 5, source: 'auction' }
    ],
    hotm: 3,
    id: 'Mithril-Infused Fuel Tank',
    time: 10
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Drill Engine', intermediaryCraft: true, quantity: 2, source: 'auction' },
      { id: 'Mithril Plate', intermediaryCraft: true, quantity: 3, source: 'auction' }
    ],
    hotm: 3,
    id: 'Mithril-Plated Drill Engine',
    time: 15
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Beacon II', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 10, source: 'bazaar' }
    ],
    hotm: 3,
    id: 'Beacon III',
    time: 30
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 6, source: 'bazaar' },
      { id: 'Titanium Talisman', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 3,
    id: 'Titanium Ring',
    time: 20
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [{ id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 2, source: 'bazaar' }],
    hotm: 3,
    id: 'Pure Mithril',
    time: 12
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'ENCHANTED_COBBLESTONE', intermediaryCraft: false, quantity: 128, source: 'bazaar' },
      { id: 'TREASURITE', intermediaryCraft: false, quantity: 64, source: 'bazaar' }
    ],
    hotm: 3,
    id: 'Rock Gemstone',
    time: 22
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [{ id: 'STARFALL', intermediaryCraft: false, quantity: 512, source: 'bazaar' }],
    hotm: 3,
    id: 'Petrified Starfall',
    time: 14
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'GOBLIN_EGG_GREEN', intermediaryCraft: false, quantity: 99, source: 'bazaar' },
      { id: 'FINE_JADE_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    id: 'Pesto Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Helix', intermediaryCraft: false, quantity: 1, source: 'auction' },
      { id: 'coins', intermediaryCraft: false, quantity: 300, source: 'auction' }
    ],
    hotm: 3,
    id: 'Ammonite Pet',
    time: 288
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'FINE_RUBY_GEM', intermediaryCraft: false, quantity: 6, source: 'bazaar' }
    ],
    hotm: 3,
    id: 'Ruby Drill TX-15',
    time: 1
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'FLAWED_RUBY_GEM', intermediaryCraft: false, quantity: 48, source: 'bazaar' },
      { id: 'FINE_RUBY_GEM', intermediaryCraft: false, quantity: 80, source: 'bazaar' },
      { id: 'ENCHANTED_ENDER_PEARL', intermediaryCraft: false, quantity: 16, source: 'bazaar' },
      { id: 'coins', intermediaryCraft: false, quantity: 50, source: 'auction' }
    ],
    hotm: 3,
    id: 'Travel Scroll to the Crystal Hollows',
    time: 10
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Mithril Drill SX-R226', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Golden Plate', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { id: 'Mithril Plate', intermediaryCraft: true, quantity: 2, source: 'auction' }
    ],
    hotm: 4,
    id: 'Mithril Drill SX-R326',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Drill Engine', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { id: 'PLASMA_BUCKET', intermediaryCraft: false, quantity: 5, source: 'bazaar' },
      { id: 'Mithril Plate', intermediaryCraft: true, quantity: 4, source: 'auction' },
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 5, source: 'bazaar' }
    ],
    hotm: 4,
    id: 'Titanium-Plated Drill Engine',
    time: 30
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [{ id: 'GOBLIN_EGG', intermediaryCraft: false, quantity: 99, source: 'bazaar' }],
    hotm: 4,
    id: 'Goblin Omelette',
    time: 18
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Beacon III', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 20, source: 'bazaar' },
      { id: 'PLASMA_BUCKET', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 4,
    id: 'Beacon IV',
    time: 40
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 12, source: 'bazaar' },
      { id: 'Titanium Ring', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 4,
    id: 'Titanium Artifact',
    time: 36
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'HARD_STONE', intermediaryCraft: false, quantity: 128, source: 'bazaar' },
      { id: 'ROUGH_AMBER_GEM', intermediaryCraft: false, quantity: 64, source: 'bazaar' }
    ],
    hotm: 4,
    id: 'Hot Stuff',
    time: 24
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'GOBLIN_EGG_YELLOW', intermediaryCraft: false, quantity: 99, source: 'bazaar' },
      { id: 'FINE_TOPAZ_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    id: 'Sunny Side Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Ruby Drill TX-15', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 3, source: 'auction' }
    ],
    hotm: 4,
    id: 'Gemstone Drill LT-522',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Golden Plate', intermediaryCraft: true, quantity: 6, source: 'auction' },
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 10, source: 'bazaar' }
    ],
    hotm: 5,
    id: 'Titanium Drill DR-X355',
    time: 64
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Titanium Drill DR-X355', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 16, source: 'bazaar' },
      { id: 'Mithril Plate', intermediaryCraft: true, quantity: 6, source: 'auction' }
    ],
    hotm: 5,
    id: 'Titanium Drill DR-X455',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Titanium Drill DR-X455', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 20, source: 'bazaar' },
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 32, source: 'bazaar' },
      { id: 'ENCHANTED_IRON_BLOCK', intermediaryCraft: false, quantity: 2, source: 'bazaar' },
      { id: 'Mithril Plate', intermediaryCraft: true, quantity: 15, source: 'auction' },
      { id: 'PLASMA_BUCKET', intermediaryCraft: false, quantity: 20, source: 'bazaar' }
    ],
    hotm: 5,
    id: 'Titanium Drill DR-X555',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { id: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 10, source: 'bazaar' },
      { id: 'Fuel Tank', intermediaryCraft: true, quantity: 10, source: 'auction' }
    ],
    hotm: 5,
    id: 'Titanium-Infused Fuel Tank',
    time: 25
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Beacon IV', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'REFINED_MITHRIL', intermediaryCraft: true, quantity: 40, source: 'bazaar' },
      { id: 'PLASMA_BUCKET', intermediaryCraft: false, quantity: 5, source: 'bazaar' }
    ],
    hotm: 5,
    id: 'Beacon V',
    time: 50
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 20, source: 'bazaar' },
      { id: 'Titanium Artifact', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    id: 'Titanium Relic',
    time: 72
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'GOBLIN_EGG_RED', intermediaryCraft: false, quantity: 99, source: 'bazaar' },
      { id: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'auction' }
    ],
    hotm: 5,
    id: 'Spicy Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'WORM_MEMBRANE', intermediaryCraft: false, quantity: 100, source: 'bazaar' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'coins', intermediaryCraft: false, quantity: 25, source: 'auction' }
    ],
    hotm: 5,
    id: 'Gemstone Chamber',
    time: 4
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Gemstone Drill LT-522', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'FLAWLESS_TOPAZ_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 3, source: 'auction' },
      { id: 'Magma Core', intermediaryCraft: false, quantity: 5, source: 'auction' }
    ],
    hotm: 5,
    id: 'Topaz Drill KGR-12',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Mithril-Plated Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Superlite Motor', intermediaryCraft: false, quantity: 10, source: 'auction' },
      { id: 'FINE_RUBY_GEM', intermediaryCraft: false, quantity: 10, source: 'bazaar' }
    ],
    hotm: 5,
    id: 'Ruby-polished Drill Engine',
    time: 20
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Titanium-Infused Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Control Switch', intermediaryCraft: false, quantity: 30, source: 'auction' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' }
    ],
    hotm: 5,
    id: 'Gemstone Fuel Tank',
    time: 30
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'PERFECT_SAPPHIRE_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { id: 'GOBLIN_EGG_BLUE', intermediaryCraft: false, quantity: 99, source: 'bazaar' }
    ],
    hotm: 6,
    id: 'Blue Cheese Goblin Omelette',
    time: 20
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Titanium Drill DR-X555', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Corleonite', intermediaryCraft: false, quantity: 30, source: 'auction' },
      { id: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { id: 'REFINED_DIAMOND', intermediaryCraft: true, quantity: 5, source: 'bazaar' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 16, source: 'auction' },
      { id: 'REFINED_TITANIUM', intermediaryCraft: true, quantity: 12, source: 'bazaar' },
      { id: 'Mithril Plate', intermediaryCraft: true, quantity: 5, source: 'auction' }
    ],
    hotm: 6,
    id: 'Titanium Drill DR-X655',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Topaz Drill KGR-12', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'FLAWLESS_JASPER_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { id: 'TREASURITE', intermediaryCraft: false, quantity: 100, source: 'bazaar' }
    ],
    hotm: 6,
    id: 'Jasper Drill X',
    time: 0.008333333333333333
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Titanium-Plated Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Electron Transmitter', intermediaryCraft: false, quantity: 25, source: 'auction' },
      { id: 'FTX 3070', intermediaryCraft: false, quantity: 25, source: 'auction' },
      { id: 'FINE_SAPPHIRE_GEM', intermediaryCraft: false, quantity: 20, source: 'bazaar' }
    ],
    hotm: 6,
    id: 'Sapphire-polished Drill Engine',
    time: 20
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'FINE_AMBER_GEM', intermediaryCraft: false, quantity: 12, source: 'bazaar' },
      { id: 'Golden Plate', intermediaryCraft: true, quantity: 1, source: 'auction' }
    ],
    hotm: 6,
    id: 'Amber Material',
    time: 7
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Divan Fragment', intermediaryCraft: false, quantity: 5, source: 'auction' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { id: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    id: 'Helmet Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Divan Fragment', intermediaryCraft: false, quantity: 8, source: 'auction' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { id: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    id: 'Chestplate Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Divan Fragment', intermediaryCraft: false, quantity: 7, source: 'auction' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { id: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    id: 'Leggings Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Divan Fragment', intermediaryCraft: false, quantity: 4, source: 'auction' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 10, source: 'auction' },
      { id: 'FLAWLESS_RUBY_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' }
    ],
    hotm: 6,
    id: 'Boots Of Divan',
    time: 23
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Ruby-polished Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Sapphire-polished Drill Engine', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'FLAWLESS_AMBER_GEM', intermediaryCraft: false, quantity: 1, source: 'bazaar' },
      { id: 'Robotron Reflector', intermediaryCraft: false, quantity: 50, source: 'auction' }
    ],
    hotm: 7,
    id: 'Amber-polished Drill Engine',
    time: 50
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: 'Gemstone Fuel Tank', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'Gemstone Mixture', intermediaryCraft: true, quantity: 25, source: 'auction' },
      { id: 'Synthetic Heart', intermediaryCraft: false, quantity: 70, source: 'auction' }
    ],
    hotm: 7,
    id: 'Perfectly-Cut Fuel Tank',
    time: 50
  },
  {
    bazaarItem: false,
    category: 'casting',
    craftMaterial: [
      { id: "Divan's Alloy", intermediaryCraft: false, quantity: 1, source: 'auction' },
      { id: 'Titanium Drill DR-X655', intermediaryCraft: true, quantity: 1, source: 'auction' },
      { id: 'coins', intermediaryCraft: false, quantity: 50, source: 'auction' }
    ],
    hotm: 7,
    id: "Divan's Drill",
    time: 60
  }
];
