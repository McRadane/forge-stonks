import { ILanguage, ILanguageUIRNGFlips } from './lang/type';

export interface IRNGLoot {
  cost: number;
  item: keyof ILanguage['items'];
}

const experimentationTableSource: Partial<Record<keyof ILanguage['items'], number>> = {
  CHAIN_END_TIMES: 500_000,
  ENCHANTMENT_BANE_OF_ARTHROPODS_7: 500_000,
  ENCHANTMENT_BLAST_PROTECTION_6: 150_000,
  ENCHANTMENT_BLAST_PROTECTION_7: 500_000,
  ENCHANTMENT_CHANCE_4: 150_000,
  ENCHANTMENT_CHANCE_5: 500_000,
  ENCHANTMENT_CLEAVE_6: 500_000,
  ENCHANTMENT_CRITICAL_7: 500_000,
  ENCHANTMENT_CUBISM_6: 500_000,
  ENCHANTMENT_ENDER_SLAYER_6: 150_000,
  ENCHANTMENT_ENDER_SLAYER_7: 500_000,
  ENCHANTMENT_EXECUTE_6: 500_000,
  ENCHANTMENT_FIRE_PROTECTION_6: 150_000,
  ENCHANTMENT_FIRE_PROTECTION_7: 500_000,
  ENCHANTMENT_FIRST_STRIKE_5: 500_000,
  ENCHANTMENT_GIANT_KILLER_6: 150_000,
  ENCHANTMENT_GIANT_KILLER_7: 500_000,
  ENCHANTMENT_GROWTH_6: 150_000,
  ENCHANTMENT_GROWTH_7: 500_000,
  ENCHANTMENT_LIFE_STEAL_4: 150_000,
  ENCHANTMENT_LIFE_STEAL_5: 500_000,
  ENCHANTMENT_LOOTING_5: 500_000,
  ENCHANTMENT_LUCK_7: 500_000,
  ENCHANTMENT_POWER_6: 150_000,
  ENCHANTMENT_POWER_7: 500_000,
  ENCHANTMENT_PROJECTILE_PROTECTION_6: 150_000,
  ENCHANTMENT_PROJECTILE_PROTECTION_7: 500_000,
  ENCHANTMENT_PROSECUTE_6: 500_000,
  ENCHANTMENT_PROTECTION_6: 150_000,
  ENCHANTMENT_PROTECTION_7: 500_000,
  ENCHANTMENT_RESPITE_3: 150_000,
  ENCHANTMENT_SCAVENGER_5: 150_000,
  ENCHANTMENT_SHARPNESS_6: 150_000,
  ENCHANTMENT_SHARPNESS_7: 500_000,
  ENCHANTMENT_SMITE_7: 500_000,
  ENCHANTMENT_SNIPE_4: 500_000,
  ENCHANTMENT_SYPHON_4: 150_000,
  ENCHANTMENT_SYPHON_5: 500_000,
  ENCHANTMENT_THUNDERBOLT_6: 150_000,
  ENCHANTMENT_THUNDERBOLT_7: 500_000,
  ENCHANTMENT_THUNDERLORD_7: 500_000,
  ENCHANTMENT_TITAN_KILLER_6: 150_000,
  ENCHANTMENT_TITAN_KILLER_7: 500_000,
  ENCHANTMENT_TRIPLE_STRIKE_5: 500_000,
  ENCHANTMENT_VENOMOUS_6: 500_000,
  'Experiment the Fish': 50_000,
  GOLD_BOTTLE_CAP: 500_000,
  GOLDEN_BOUNTY: 500_000,
  // Guardian: 150_000,
  METAPHYSICAL_SERUM: 50_000,
  'Nadeshiko Dye': 2_500_000,
  OCTOPUS_TENDRIL: 500_000,
  PESTHUNTING_GUIDE: 500_000,
  SEVERED_PINCER: 500_000,
  TITANIC_EXP_BOTTLE: 15_000,
  TROUBLED_BUBBLE: 500_000
};

const crystalNucleusSource: Partial<Record<keyof ILanguage['items'], number>> = {
  'Claw Fossil': 50_000,
  DIVAN_FRAGMENT: 8000,
  "Divan's Alloy": 1_000_000,
  DWARVEN_OS_GEMSTONE_GRAHAMS: 20_000,
  ENCHANTMENT_LAPIDARY_1: 10_000,
  GEMSTONE_MIXTURE: 35_000,
  'Helix Fossil': 10_000,
  'Jade Dye': 5_000_000,
  JADERALD: 20_000,
  'Pickonimbus 2000': 4000,
  PRECIOUS_PEARL: 50_000,
  'Prehistoric Egg': 8000,
  'Quick Claw': 450_000,
  'Recall Potion': 100_000
};

// slayer xp = multiplier * (100 / highest base percent drop rate)

// const revSlayerSource: Partial<Record<keyof ILanguage['items'], number>> = {
// 'Matcha Dye': 75_000_000,
// FOUL_FLESH: 3081,
// 'Pestilence Rune 1': 7911,
// UNDEAD_CATALYST: 24750,
// ENCHANTMENT_SMITE_6: 61634,
// }
// const taraSlayerSource: Partial<Record<keyof ILanguage['items'], number>> = {}
// const svenSlayerSource: Partial<Record<keyof ILanguage['items'], number>> = {}
// const voidSlayerSource: Partial<Record<keyof ILanguage['items'], number>> = {}
// const riftSlayerSource: Partial<Record<keyof ILanguage['items'], number>> = {}
// const infernoSlayerSource: Partial<Record<keyof ILanguage['items'], number>> = {}

export const rngFlips: Record<keyof ILanguageUIRNGFlips, Partial<Record<keyof ILanguage['items'], number>>> = {
  crystalNucleus: crystalNucleusSource,
  experimentationTable: experimentationTableSource
};

export const rngItemsFromAuctions = [
  'Experiment the Fish',
  /*'Guardian:LEGENDARY',*/
  'Nadeshiko Dye',
  'Claw Fossil',
  "Divan's Alloy",
  'Helix Fossil',
  'Jade Dye',
  'Pickonimbus 2000',
  'Prehistoric Egg',
  'Quick Claw',
  'Recall Potion'
];
