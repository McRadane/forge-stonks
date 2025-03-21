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
  | 'Elephant'
  | 'Ender Dragon'
  | 'Enderman'
  | 'Endermite'
  | 'Flying Fish'
  | 'Ghoul'
  | 'Giraffe'
  | 'Glacite Golem'
  | 'Golem'
  | 'Guardian'
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
  'Elephant',
  'Ender Dragon',
  'Enderman',
  'Endermite',
  'Flying Fish',
  'Ghoul',
  'Giraffe',
  'Glacite Golem',
  'Golem',
  'Guardian',
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

export const petsItemsAuctions = ['Rat Jetpack'];

interface IPetTier {
  items: Partial<Record<keyof ILanguage['items'], number>>;
  price: number;
  time: number;
}

export interface IPet {
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
      LEGENDARY: {
        items: {
          YOGGIE: 100
        },
        price: 2_000_000,
        time: 10
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Bat',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 1 },
      LEGENDARY: {
        items: {
          ENCHANTED_RED_MUSHROOM: 64
        },
        price: 250_000,
        time: 3
      },
      MYTHIC: {
        items: {
          PET_ITEM_VAMPIRE_FANG: 1
        },
        price: 1_000_000,
        time: HOUR
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 6 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Bee',
    tier: {
      EPIC: {
        items: {
          ENCHANTED_COAL_BLOCK: 9
        },
        price: 150_000,
        time: 1
      },
      LEGENDARY: {
        items: {
          ENCHANTED_GOLD_BLOCK: 9
        },
        price: 450_000,
        time: 3
      },
      RARE: {
        items: {
          GOLD_BLOCK: 128
        },
        price: 50_000,
        time: HOUR * 6
      },
      UNCOMMON: {
        items: {
          COAL_BLOCK: 128
        },
        price: 10_000,
        time: HOUR
      }
    }
  },
  {
    minTier: 'LEGENDARY',
    name: 'Black cat',
    tier: {
      MYTHIC: {
        items: {
          BLACK_WOOLEN_YARN: 1
        },
        price: 1_000_000,
        time: HOUR
      }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Blaze',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_BLAZE_ROD: 64
        },
        price: 250_000,
        time: 12
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Blue Whale',
    tier: {
      EPIC: {
        items: {
          ENCHANTED_COOKED_FISH: 1
        },
        price: 900_000,
        time: 7
      },
      LEGENDARY: { items: { ENCHANTED_COOKED_FISH: 8 }, price: 9_000_000, time: 12 },
      RARE: { items: {}, price: 75_000, time: 2 },
      UNCOMMON: { items: {}, price: 15_000, time: 1 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Chicken',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 0.5 },
      LEGENDARY: {
        items: {
          ENCHANTED_RAW_CHICKEN: 8
        },
        price: 250_000,
        time: 1
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 4 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Dolphin',
    tier: {
      EPIC: { items: {}, price: 10_000_000, time: 7 },
      LEGENDARY: {
        items: {
          ENCHANTED_RAW_FISH: 16
        },
        price: 50_000_000,
        time: 14
      },
      RARE: { items: {}, price: 1_000_000, time: 2 },
      UNCOMMON: { items: {}, price: 100_000, time: 1 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Elephant',
    tier: {
      EPIC: { items: {}, price: 900_000, time: 5 },
      LEGENDARY: { items: {}, price: 14_000_000, time: 10 },
      RARE: { items: {}, price: 75_000, time: HOUR * 20 },
      UNCOMMON: { items: {}, price: 15_000, time: HOUR * 6 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Ender Dragon',
    tier: {
      LEGENDARY: {
        items: {
          SUMMONING_EYE: 8
        },
        price: 400_000_000,
        time: 20
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Enderman',
    tier: {
      EPIC: { items: {}, price: 100_000, time: 6 },
      LEGENDARY: {
        items: {
          ENCHANTED_EYE_OF_ENDER: 8
        },
        price: 40_000_000,
        time: 12
      },
      MYTHIC: {
        items: {
          ENDERMAN_CORTEX_REWRITER: 1
        },
        price: 1_000_000,
        time: HOUR
      },
      RARE: { items: {}, price: 50_000, time: 2 },
      UNCOMMON: { items: {}, price: 10_000, time: 1 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Endermite',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 3 },
      LEGENDARY: {
        items: {
          MITE_GEL: 128
        },
        price: 1_000_000,
        time: 7
      },
      MYTHIC: {
        items: {
          MIXED_MITE_GEL: 1
        },
        price: 1_000_000,
        time: HOUR
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 8 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR * 2 }
    }
  },
  {
    minTier: 'RARE',
    name: 'Flying Fish',
    tier: {
      EPIC: { items: {}, price: 200_000, time: 5 },
      LEGENDARY: {
        items: {
          ENCHANTED_RAW_FISH: 64
        },
        price: 1_000_000,
        time: 10
      },
      MYTHIC: {
        items: {
          RADIOACTIVE_VIAL: 1
        },
        price: 1_000_000,
        time: HOUR
      }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Ghoul',
    tier: {
      LEGENDARY: {
        items: {
          REVENANT_FLESH: 512
        },
        price: 5_000_000,
        time: 10
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Giraffe',
    tier: {
      EPIC: { items: { ENCHANTED_ACACIA_LOG: 128 }, price: 900_000, time: 7 },
      LEGENDARY: { items: { ENCHANTED_ACACIA_LOG: 512 }, price: 9_000_000, time: 12 },
      RARE: {
        items: {
          ENCHANTED_ACACIA_LOG: 16
        },
        price: 75_000,
        time: 2
      },
      UNCOMMON: {
        items: {
          ENCHANTED_ACACIA_LOG: 1
        },
        price: 15_000,
        time: 1
      }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Glacite Golem',
    tier: {
      LEGENDARY: {
        items: {
          GLACITE_AMALGAMATION: 24
        },
        price: 10_000_000,
        time: 14
      }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Golem',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_IRON_BLOCK: 8
        },
        price: 10_000_000,
        time: 20
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Guardian',
    tier: {
      EPIC: { items: {}, price: 500_000, time: 2 },
      LEGENDARY: {
        items: {
          ENCHANTED_PRISMARINE_SHARD: 64
        },
        price: 3_000_000,
        time: 5
      },
      MYTHIC: {
        items: {
          GUARDIAN_LUCKY_BLOCK: 1
        },
        price: 1_000_000,
        time: HOUR
      },
      RARE: { items: {}, price: 100_000, time: HOUR * 6 },
      UNCOMMON: { items: {}, price: 20_000, time: HOUR }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Horse',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 0.5 },
      LEGENDARY: {
        items: {
          ENCHANTED_LEATHER: 8
        },
        price: 250_000,
        time: 1
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 4 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Hound',
    tier: {
      LEGENDARY: {
        items: {
          WOLF_TOOTH: 512
        },
        price: 5_000_000,
        time: 10
      }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Jellyfish',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_SLIME_BALL: 16
        },
        price: 15_000_000,
        time: 10
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Jerry',
    tier: {
      EPIC: { items: {}, price: 100_000, time: 1 },
      LEGENDARY: { items: {}, price: 200_000, time: 3 },
      MYTHIC: {
        items: {
          PET_ITEM_TOY_JERRY: 1
        },
        price: 1_000_000,
        time: HOUR
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 6 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Lion',
    tier: {
      EPIC: { items: {}, price: 900_000, time: 7 },
      LEGENDARY: {
        items: {
          ENCHANTED_RAW_BEEF: 1024
        },
        price: 14_000_000,
        time: 12
      },
      RARE: { items: {}, price: 75_000, time: 2 },
      UNCOMMON: { items: {}, price: 15_000, time: 1 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Magma Cube',
    tier: {
      EPIC: { items: {}, price: 100_000, time: 5 },
      LEGENDARY: {
        items: {
          ENCHANTED_MAGMA_CREAM: 16
        },
        price: 500_000,
        time: 10
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 20 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR * 6 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Megalodon',
    tier: {
      LEGENDARY: { items: {}, price: 10_000_000, time: 20 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Mithril Golem',
    tier: {
      EPIC: { items: {}, price: 100_000, time: 5 },
      LEGENDARY: { items: {}, price: 200_000, time: 20 },
      MYTHIC: {
        items: {
          PET_ITEM_PURE_MITHRIL_GEM: 1
        },
        price: 1_000_000,
        time: HOUR
      },
      RARE: { items: {}, price: 50_000, time: 2 },
      UNCOMMON: { items: {}, price: 10_000, time: 1 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Monkey',
    tier: {
      EPIC: { items: {}, price: 900_000, time: 7 },
      LEGENDARY: { items: {}, price: 17_000_000, time: 12 },
      RARE: { items: {}, price: 75_000, time: 2 },
      UNCOMMON: { items: {}, price: 15_000, time: 1 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Mooshroom Cow',
    tier: {
      EPIC: {
        items: {
          DIGESTED_MUSHROOMS: 20
        },
        price: 100_000,
        time: 1
      },
      LEGENDARY: {
        items: {
          DIGESTED_MUSHROOMS: 20,
          ENCHANTED_MYCELIUM: 32
        },
        price: 200_000,
        time: 3
      },
      RARE: {
        items: {
          DIGESTED_MUSHROOMS: 10
        },
        price: 50_000,
        time: HOUR * 6
      },
      UNCOMMON: {
        items: {
          DIGESTED_MUSHROOMS: 5
        },
        price: 10_000,
        time: HOUR
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Ocelot',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 2 },
      LEGENDARY: {
        items: {
          ENCHANTED_JUNGLE_LOG: 512
        },
        price: 250_000,
        time: 5
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 6 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Parrot',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_FEATHER: 16
        },
        price: 15_000_000,
        time: 10
      }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Phoenix',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_BLAZE_POWDER: 1024
        },
        price: 100_000_000,
        time: 20
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Pig',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 0.5 },
      LEGENDARY: {
        items: {
          PORK: 512
        },
        price: 250_000,
        time: 1
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 4 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Pigman',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_GRILLED_PORK: 8
        },
        price: 250_000,
        time: 10
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Rabbit',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 0.5 },
      LEGENDARY: {
        items: {
          RABBIT: 64
        },
        price: 250_000,
        time: 1
      },
      MYTHIC: {
        items: { PET_ITEM_CHOCOLATE_SYRINGE: 1 },
        price: 1_000_000,
        time: HOUR
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 4 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'LEGENDARY',
    name: 'Rat',
    tier: {
      MYTHIC: {
        items: {
          'Rat Jetpack': 1
        },
        price: 1_000_000,
        time: HOUR
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Rock',
    tier: {
      EPIC: { items: {}, price: 10_000_000, time: 7 },
      LEGENDARY: {
        items: {
          ENCHANTED_COBBLESTONE: 64
        },
        price: 50_000_000,
        time: 14
      },
      RARE: { items: {}, price: 1_000_000, time: 2 },
      UNCOMMON: { items: {}, price: 100_000, time: 1 }
    }
  },
  {
    minTier: 'RARE',
    name: 'Scatha',
    tier: {
      EPIC: {
        items: {
          ENCHANTED_HARD_STONE: 64
        },
        price: 125_000_000,
        time: 7
      },
      LEGENDARY: {
        items: {
          ENCHANTED_HARD_STONE: 256
        },
        price: 250_000_000,
        time: 14
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Sheep',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 3 },
      LEGENDARY: {
        items: {
          ENCHANTED_MUTTON: 512
        },
        price: 250_000,
        time: 7
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 8 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR * 2 }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Silverfish',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 1 },
      LEGENDARY: {
        items: {
          ENCHANTED_COBBLESTONE: 64
        },
        price: 250_000,
        time: 3
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 6 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Skeleton',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 1 },
      LEGENDARY: {
        items: {
          ENCHANTED_BONE: 128
        },
        price: 250_000,
        time: 3
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 6 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Slug',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_COMPOST: 1
        },
        price: 10_000_000,
        time: 7
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Snail',
    tier: {
      EPIC: {
        items: {
          BURNING_EYE: 20
        },
        price: 100_000,
        time: 1
      },
      LEGENDARY: {
        items: {
          BURNING_EYE: 20,
          ENCHANTED_RED_SAND: 32
        },
        price: 200_000,
        time: 3
      },
      RARE: {
        items: {
          BURNING_EYE: 10
        },
        price: 50_000,
        time: HOUR * 6
      },
      UNCOMMON: {
        items: {
          BURNING_EYE: 5
        },
        price: 10_000,
        time: HOUR
      }
    }
  },
  {
    minTier: 'LEGENDARY',
    name: 'Snowman',
    tier: {
      MYTHIC: {
        items: {
          MAGIC_TOP_HAT: 1
        },
        price: 1_000_000,
        time: HOUR
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Spider',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 3 },
      LEGENDARY: {
        items: {
          ENCHANTED_STRING: 512
        },
        price: 250_000,
        time: 7
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 8 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR * 2 }
      // MYTHIC: { items: {}, price: 1_000_000, time: HOUR }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Spirit',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_GHAST_TEAR: 64
        },
        price: 5_000_000,
        time: 10
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Squid',
    tier: {
      EPIC: { items: {}, price: 500_000, time: 2 },
      LEGENDARY: {
        items: {
          ENCHANTED_INK_SACK: 64
        },
        price: 3_000_000,
        time: 5
      },
      RARE: { items: {}, price: 100_000, time: HOUR * 6 },
      UNCOMMON: { items: {}, price: 20_000, time: HOUR }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Tarantula',
    tier: {
      LEGENDARY: {
        items: {
          TARANTULA_WEB: 512
        },
        price: 5_000_000,
        time: 10
      }
      // MYTHIC: { items: {}, price: 1_000_000, time: HOUR }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Tiger',
    tier: {
      EPIC: { items: {}, price: 900_000, time: 7 },
      LEGENDARY: {
        items: {
          ENCHANTED_RAW_CHICKEN: 1024
        },
        price: 14_000_000,
        time: 12
      },
      RARE: { items: {}, price: 75_000, time: 2 },
      UNCOMMON: { items: {}, price: 15_000, time: 1 }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Turtle',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_RAW_FISH: 16
        },
        price: 15_000_000,
        time: 10
      }
    }
  },
  {
    minTier: 'EPIC',
    name: 'Wither Skeleton',
    tier: {
      LEGENDARY: {
        items: {
          ENCHANTED_COAL_BLOCK: 8
        },
        price: 250_000,
        time: 5
      }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Wolf',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 2 },
      LEGENDARY: {
        items: {
          ENCHANTED_SPRUCE_LOG: 512
        },
        price: 250_000,
        time: 5
      },
      RARE: { items: {}, price: 50_000, time: HOUR * 6 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR }
    }
  },
  {
    minTier: 'COMMON',
    name: 'Zombie',
    tier: {
      EPIC: { items: {}, price: 190_000, time: 5 },
      LEGENDARY: {
        items: {
          ENCHANTED_ROTTEN_FLESH: 128
        },
        price: 250_000,
        time: 10
      },
      RARE: { items: {}, price: 50_000, time: 2 },
      UNCOMMON: { items: {}, price: 10_000, time: HOUR * 6 }
    }
  }
];
