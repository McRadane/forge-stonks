interface ILanguageItems {
  'Amber Material': string;
  'Amber-polished Drill Engine': string;
  'Ammonite Pet': string;
  'Beacon I': string;
  'Beacon II': string;
  'Beacon III': string;
  'Beacon IV': string;
  'Beacon V': string;
  'Bejeweled Handle': string;
  'Blue Cheese Goblin Omelette': string;
  'Boots Of Divan': string;
  'Chestplate Of Divan': string;
  'Control Switch': string;
  Corleonite: string;
  DIAMONITE: string;
  'Divan Fragment': string;
  "Divan's Alloy": string;
  "Divan's Drill": string;
  'Drill Engine': string;
  ENCHANTED_COAL_BLOCK: string;
  ENCHANTED_COBBLESTONE: string;
  ENCHANTED_DIAMOND_BLOCK: string;
  ENCHANTED_ENDER_PEARL: string;
  ENCHANTED_GOLD: string;
  ENCHANTED_GOLD_BLOCK: string;
  ENCHANTED_IRON_BLOCK: string;
  ENCHANTED_MITHRIL: string;
  ENCHANTED_REDSTONE_BLOCK: string;
  ENCHANTED_TITANIUM: string;
  'Electron Transmitter': string;
  FINE_AMBER_GEM: string;
  FINE_AMETHYST_GEM: string;
  FINE_JADE_GEM: string;
  FINE_RUBY_GEM: string;
  FINE_SAPPHIRE_GEM: string;
  FINE_TOPAZ_GEM: string;
  FLAWED_RUBY_GEM: string;
  FLAWLESS_AMBER_GEM: string;
  FLAWLESS_JASPER_GEM: string;
  FLAWLESS_RUBY_GEM: string;
  FLAWLESS_TOPAZ_GEM: string;
  'FTX 3070': string;
  'Fuel Tank': string;
  GOBLIN_EGG: string;
  GOBLIN_EGG_BLUE: string;
  GOBLIN_EGG_GREEN: string;
  GOBLIN_EGG_RED: string;
  GOBLIN_EGG_YELLOW: string;
  'Gemstone Chamber': string;
  'Gemstone Drill LT-522': string;
  'Gemstone Fuel Tank': string;
  'Gemstone Mixture': string;
  'Glacite Jewel': string;
  'Goblin Omelette': string;
  'Golden Plate': string;
  HARD_STONE: string;
  Helix: string;
  'Helmet Of Divan': string;
  'Hot Stuff': string;
  'Jasper Drill X': string;
  'Leggings Of Divan': string;
  MITHRIL_ORE: string;
  'Magma Core': string;
  'Mithril Drill SX-R226': string;
  'Mithril Drill SX-R326': string;
  'Mithril Pickaxe': string;
  'Mithril Plate': string;
  'Mithril-Infused Fuel Tank': string;
  'Mithril-Plated Drill Engine': string;
  PERFECT_SAPPHIRE_GEM: string;
  PLASMA_BUCKET: string;
  POWER_CRYSTAL: string;
  'Perfectly-Cut Fuel Tank': string;
  'Pesto Goblin Omelette': string;
  'Petrified Starfall': string;
  'Pure Mithril': string;
  REFINED_DIAMOND: string;
  REFINED_MITHRIL: string;
  REFINED_TITANIUM: string;
  ROUGH_AMBER_GEM: string;
  'Refined Mithril Pickaxe': string;
  'Robotron Reflector': string;
  'Rock Gemstone': string;
  'Ruby Drill TX-15': string;
  'Ruby-polished Drill Engine': string;
  SLUDGE_JUICE: string;
  STARFALL: string;
  'Sapphire-polished Drill Engine': string;
  'Spicy Goblin Omelette': string;
  'Sunny Side Goblin Omelette': string;
  'Superlite Motor': string;
  'Synthetic Heart': string;
  TITANIUM_ORE: string;
  TREASURITE: string;
  'Titanium Artifact': string;
  'Titanium Drill DR-X355': string;
  'Titanium Drill DR-X455': string;
  'Titanium Drill DR-X555': string;
  'Titanium Drill DR-X655': string;
  'Titanium Relic': string;
  'Titanium Ring': string;
  'Titanium Talisman': string;
  'Titanium-Infused Fuel Tank': string;
  'Titanium-Plated Drill Engine': string;
  'Topaz Drill KGR-12': string;
  'Travel Scroll to the Crystal Hollows': string;
  'Travel Scroll to the Dwarven Forge': string;
  WORM_MEMBRANE: string;
  coins: string;
}

interface ILanguageUIOptions {
  auctionsBINOnlyDescription: string;
  auctionsBINOnlyLabel: string;
  forceRefresh: string;
  hotmDescription: string;
  hotmLabel: string;
  includeAuctionsFlipDescription: string;
  includeAuctionsFlipLabel: string;
  intermediateCraftDescription: string;
  intermediateCraftLabel: string;
  languageDescription: string;
  languageLabel: string;
  languageOptionEnglish: string;
  languageOptionFrench: string;
  maxCraftingCostDescription: string;
  maxCraftingCostLabel: string;
  playFrequencyDescription: string;
  playFrequencyLabel: string;
  playFrequencyOptionEveryday: string;
  playFrequencyOptionLess: string;
  playFrequencyOptionNonStop: string;
  playFrequencyOptionThreeTime: string;
  playFrequencyOptionTwice: string;
  quickForgeDescription: string;
  quickForgeLabel: string;
  title: string;
}

interface ILanguageUI {
  amount: string;
  auction: string;
  bazaar: string;
  casting: string;
  craftCost: string;
  filters: string;
  hotm: string;
  hour: string;
  item: string;
  itemPrice: string;
  options: ILanguageUIOptions;
  profit: string;
  profitByTimeEveryday: string;
  profitByTimeNonStop: string;
  profitByTimeThreeTime: string;
  profitByTimeTwice: string;
  refine: string;
  sell: string;
  sellPrice: string;
  shoppingList: string;
  time: string;
  timer: string;
  timerButton: string;
  title: string;
  totalPrice: string;
  type: string;
  vendor: string;
}

export interface ILanguage {
  items: ILanguageItems;
  notification: {
    timerEnded: string;
    timerStarted: string;
  };
  ui: ILanguageUI;
}

export type KeysLanguageType = 'en-US' | 'fr-FR';

export interface ILanguageContextDefinition {
  allDictionary: { [key: string]: ILanguage };
  dictionary: ILanguage;
  userLanguage: KeysLanguageType;

  /**
   * Change the current language
   * @param selected
   */
  userLanguageChange(selected: KeysLanguageType): KeysLanguageType;
}
