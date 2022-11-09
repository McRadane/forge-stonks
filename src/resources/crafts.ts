import { ILanguage } from './lang/type';

export interface ICraftMaterial {
  id: keyof ILanguage['items'];
  quantity: number;
  source: 'bazaar' | 'auction' | 'vendor';
  intermediaryCraft: boolean;
}

export interface ICraft {
  id: keyof ILanguage['items'];
  craftMaterial: ICraftMaterial[];
  bazaarItem: boolean;
  hotm: number;
  time: number;
  category: 'refine' | 'casting';
}

export const itemsSource: Record<keyof ILanguage['items'], 'bazaar' | 'auction' | 'vendor'> = {
  'Bejeweled Handle': 'auction',
  'Drill Engine': 'auction',
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
  TREASURITE: 'bazaar',
  ENCHANTED_COAL_BLOCK: 'bazaar'
};

export const crafts: ICraft[] = [
  {
    id: 'REFINED_DIAMOND',
    bazaarItem: true,
    craftMaterial: [
      {
        id: 'ENCHANTED_DIAMOND_BLOCK',
        intermediaryCraft: false,
        source: 'bazaar',
        quantity: 2
      }
    ],
    hotm: 2,
    time: 8,
    category: 'refine'
  },
  {
    id: 'REFINED_MITHRIL',
    bazaarItem: true,
    craftMaterial: [
      {
        id: 'ENCHANTED_MITHRIL',
        intermediaryCraft: false,
        source: 'bazaar',
        quantity: 160
      }
    ],
    hotm: 2,
    time: 6,
    category: 'refine'
  },
  {
    id: 'REFINED_TITANIUM',
    bazaarItem: true,
    craftMaterial: [
      {
        id: 'ENCHANTED_TITANIUM',
        intermediaryCraft: false,
        source: 'bazaar',
        quantity: 16
      }
    ],
    hotm: 2,
    time: 12,
    category: 'refine'
  },
  {
    id: 'Fuel Tank',
    bazaarItem: false,
    craftMaterial: [
      {
        id: 'ENCHANTED_COAL_BLOCK',
        intermediaryCraft: false,
        source: 'bazaar',
        quantity: 2
      }
    ],
    hotm: 2,
    time: 10,
    category: 'refine'
  },
  {
    id: 'Bejeweled Handle',
    bazaarItem: false,
    craftMaterial: [
      {
        id: 'Glacite Jewel',
        intermediaryCraft: false,
        quantity: 3,
        source: 'auction'
      }
    ],
    hotm: 2,
    time: 0.5,
    category: 'refine'
  },
  {
    id: 'Drill Engine',
    bazaarItem: false,
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
    time: 30,
    category: 'refine'
  },
  {
    id: 'Golden Plate',
    bazaarItem: false,
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
    time: 6,
    category: 'refine'
  },
  {
    id: 'Mithril Plate',
    bazaarItem: false,
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
    time: 18,
    category: 'refine'
  },
  {
    id: 'Gemstone Mixture',
    bazaarItem: false,
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
    time: 4,
    category: 'refine'
  }
];
