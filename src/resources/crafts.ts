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
  'Bejeweled Handle': 'auction',
  'Drill Engine': 'auction',
  ENCHANTED_COAL_BLOCK: 'bazaar',
  ENCHANTED_DIAMOND_BLOCK: 'bazaar',
  ENCHANTED_GOLD_BLOCK: 'bazaar',
  ENCHANTED_IRON_BLOCK: 'bazaar',
  ENCHANTED_MITHRIL: 'bazaar',
  ENCHANTED_REDSTONE_BLOCK: 'bazaar',
  ENCHANTED_TITANIUM: 'bazaar',
  FINE_AMBER_GEM: 'bazaar',
  FINE_AMETHYST_GEM: 'bazaar',
  FINE_JADE_GEM: 'bazaar',
  FINE_SAPPHIRE_GEM: 'bazaar',
  'Fuel Tank': 'auction',
  'Gemstone Mixture': 'auction',
  'Glacite Jewel': 'auction',
  'Golden Plate': 'auction',
  'Mithril Plate': 'auction',
  REFINED_DIAMOND: 'bazaar',
  REFINED_MITHRIL: 'bazaar',
  REFINED_TITANIUM: 'bazaar',
  SLUDGE_JUICE: 'bazaar',
  TREASURITE: 'bazaar'
};

export const crafts: ICraft[] = [
  {
    bazaarItem: true,
    category: 'refine',
    craftMaterial: [
      {
        id: 'ENCHANTED_DIAMOND_BLOCK',
        intermediaryCraft: false,
        quantity: 2,
        source: 'bazaar'
      }
    ],
    hotm: 2,
    id: 'REFINED_DIAMOND',
    time: 8
  },
  {
    bazaarItem: true,
    category: 'refine',
    craftMaterial: [
      {
        id: 'ENCHANTED_MITHRIL',
        intermediaryCraft: false,
        quantity: 160,
        source: 'bazaar'
      }
    ],
    hotm: 2,
    id: 'REFINED_MITHRIL',
    time: 6
  },
  {
    bazaarItem: true,
    category: 'refine',
    craftMaterial: [
      {
        id: 'ENCHANTED_TITANIUM',
        intermediaryCraft: false,
        quantity: 16,
        source: 'bazaar'
      }
    ],
    hotm: 2,
    id: 'REFINED_TITANIUM',
    time: 12
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      {
        id: 'ENCHANTED_COAL_BLOCK',
        intermediaryCraft: false,
        quantity: 2,
        source: 'bazaar'
      }
    ],
    hotm: 2,
    id: 'Fuel Tank',
    time: 10
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      {
        id: 'Glacite Jewel',
        intermediaryCraft: false,
        quantity: 3,
        source: 'auction'
      }
    ],
    hotm: 2,
    id: 'Bejeweled Handle',
    time: 0.5
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      {
        id: 'ENCHANTED_IRON_BLOCK',
        intermediaryCraft: false,
        quantity: 1,
        source: 'bazaar'
      },
      {
        id: 'ENCHANTED_REDSTONE_BLOCK',
        intermediaryCraft: false,
        quantity: 3,
        source: 'bazaar'
      },
      {
        id: 'Golden Plate',
        intermediaryCraft: true,
        quantity: 1,
        source: 'auction'
      },
      {
        id: 'TREASURITE',
        intermediaryCraft: false,
        quantity: 10,
        source: 'bazaar'
      },
      {
        id: 'REFINED_DIAMOND',
        intermediaryCraft: true,
        quantity: 1,
        source: 'bazaar'
      }
    ],
    hotm: 4,
    id: 'Drill Engine',
    time: 30
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      {
        id: 'ENCHANTED_GOLD_BLOCK',
        intermediaryCraft: false,
        quantity: 2,
        source: 'bazaar'
      },
      {
        id: 'Glacite Jewel',
        intermediaryCraft: false,
        quantity: 5,
        source: 'auction'
      },
      {
        id: 'REFINED_DIAMOND',
        intermediaryCraft: true,
        quantity: 1,
        source: 'bazaar'
      }
    ],
    hotm: 3,
    id: 'Golden Plate',
    time: 6
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      {
        id: 'REFINED_MITHRIL',
        intermediaryCraft: true,
        quantity: 5,
        source: 'bazaar'
      },
      {
        id: 'Golden Plate',
        intermediaryCraft: true,
        quantity: 1,
        source: 'auction'
      },
      {
        id: 'ENCHANTED_IRON_BLOCK',
        intermediaryCraft: false,
        quantity: 1,
        source: 'bazaar'
      },
      {
        id: 'REFINED_TITANIUM',
        intermediaryCraft: true,
        quantity: 1,
        source: 'bazaar'
      }
    ],
    hotm: 3,
    id: 'Mithril Plate',
    time: 18
  },
  {
    bazaarItem: false,
    category: 'refine',
    craftMaterial: [
      {
        id: 'FINE_JADE_GEM',
        intermediaryCraft: false,
        quantity: 4,
        source: 'bazaar'
      },
      {
        id: 'FINE_AMBER_GEM',
        intermediaryCraft: false,
        quantity: 4,
        source: 'bazaar'
      },
      {
        id: 'FINE_AMETHYST_GEM',
        intermediaryCraft: false,
        quantity: 4,
        source: 'bazaar'
      },
      {
        id: 'FINE_SAPPHIRE_GEM',
        intermediaryCraft: false,
        quantity: 4,
        source: 'bazaar'
      },
      {
        id: 'SLUDGE_JUICE',
        intermediaryCraft: false,
        quantity: 320,
        source: 'bazaar'
      }
    ],
    hotm: 3,
    id: 'Gemstone Mixture',
    time: 4
  }
];
