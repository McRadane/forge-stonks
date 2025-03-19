import { Rarities } from './items';
import { ILanguage } from './lang/type';

export type PetNames =
  | 'Armadillo'
  | 'Baby Yeti'
  | 'Bal'
  | 'Bat'
  | 'Bee'
  | 'Black cat'
  | 'Blaze'
  | 'Blue Whale'
  | 'Chicken'
  | 'Dolphin'
  | 'Eerie'
  | 'Elephant'
  | 'Ender Dragon'
  | 'Enderman'
  | 'Endermite'
  | 'Flying Fish'
  | 'Ghoul'
  | 'Giraffe'
  | 'Glacite Golem'
  | 'Golem'
  | 'Griffin'
  | 'Guardian'
  | 'Hedgehog'
  | 'Horse'
  | 'Hound'
  | 'Jellyfish'
  | 'Jerry'
  | 'Lion'
  | 'Magma Cube'
  | 'Megalodon'
  | 'Mithril Golem'
  | 'Monkey'
  | 'Mooshroom Cow'
  | 'Ocelot'
  | 'Parrot'
  | 'Phoenix'
  | 'Pig'
  | 'Pigman'
  | 'Rabbit'
  | 'Rat'
  | 'Rock'
  | 'Scatha'
  | 'Sheep'
  | 'Silverfish'
  | 'Skeleton'
  | 'Slug'
  | 'Snail'
  | 'Snowman'
  | 'Spider'
  | 'Spirit'
  | 'Squid'
  | 'Tarantula'
  | 'Tiger'
  | 'Turtle'
  | 'Wither Skeleton'
  | 'Wolf'
  | 'Zombie';

export const petsAuctions: PetNames[] = [
  'Armadillo',
  'Baby Yeti',
  'Bal',
  'Bat',
  'Bee',
  'Black cat',
  'Blaze',
  'Blue Whale',
  'Chicken',
  'Dolphin',
  'Eerie',
  'Elephant',
  'Ender Dragon',
  'Enderman',
  'Endermite',
  'Flying Fish',
  'Ghoul',
  'Giraffe',
  'Glacite Golem',
  'Golem',
  'Griffin',
  'Guardian',
  'Hedgehog',
  'Horse',
  'Hound',
  'Jellyfish',
  'Jerry',
  'Lion',
  'Magma Cube',
  'Megalodon',
  'Mithril Golem',
  'Monkey',
  'Mooshroom Cow',
  'Ocelot',
  'Parrot',
  'Phoenix',
  'Pig',
  'Pigman',
  'Rabbit',
  'Rat',
  'Rock',
  'Scatha',
  'Sheep',
  'Silverfish',
  'Skeleton',
  'Slug',
  'Snail',
  'Snowman',
  'Spider',
  'Spirit',
  'Squid',
  'Tarantula',
  'Tiger',
  'Turtle',
  'Wither Skeleton',
  'Wolf',
  'Zombie'
];

export const petsItemsAuctions = [];

interface IPetTier {
  items: Partial<Record<keyof ILanguage['items'], number>>;
  price: number;
  time: number;
}

interface IPet {
  minTier: Rarities;
  name: PetNames;
  tier: Partial<Record<Rarities, IPetTier>>;
}

const HOUR = 1 / 24;

export const pets: IPet[] = [
  {
    minTier: 'COMMON',
    name: 'Armadillo',
    tier: {
      EPIC: { items: {}, price: 250_000, time: 2 },
      LEGENDARY: { items: {}, price: 1_000_000, time: 5 },
      RARE: { items: {}, price: 50_000, time: 10 * HOUR },
      UNCOMMON: { items: {}, price: 10_000, time: 3 * HOUR }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Baby Yeti',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_RAW_SALMON: 16
        },
        price: 20_000_000,
        time: 12
      }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Bal',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Bat',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Bee',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'LEGENDARY',
    name: 'Black cat',
    tier: {
      MYTHIC: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Blaze',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Blue Whale',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Chicken',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Dolphin',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  // { name: 'Eerie', tier: {} },
  {
    minTier: 'COMMON',
    name: 'Elephant',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Ender Dragon',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Enderman',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Endermite',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'RARE',
    name: 'Flying Fish',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Ghoul',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Giraffe',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Glacite Golem',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Golem',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Griffin',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Guardian',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  // { name: 'Hedgehog', tier: {} },
  {
    minTier: 'COMMON',
    name: 'Horse',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Hound',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Jellyfish',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Jerry',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Lion',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Magma Cube',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Megalodon',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Mithril Golem',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Monkey',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Mooshroom Cow',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Ocelot',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Parrot',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Phoenix',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Pig',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Pigman',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Rabbit',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'LEGENDARY',
    name: 'Rat',
    tier: {
      MYTHIC: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Rock',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'RARE',
    name: 'Scatha',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Sheep',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Silverfish',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Skeleton',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  //{ name: 'Slug', tier: {} },
  {
    minTier: 'COMMON',
    name: 'Snail',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'LEGENDARY',
    name: 'Snowman',
    tier: {
      MYTHIC: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Spider',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Spirit',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Squid',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Tarantula',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 },
      MYTHIC: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Tiger',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Turtle',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Wither Skeleton',
    tier: {
      LEGENDARY: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Wolf',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Zombie',
    tier: {
      EPIC: { items: {}, price: 0, time: 0 },
      LEGENDARY: { items: {}, price: 0, time: 0 },
      RARE: { items: {}, price: 0, time: 0 },
      UNCOMMON: { items: {}, price: 0, time: 0 }
    }
  }
];
