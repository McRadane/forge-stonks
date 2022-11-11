interface ILanguageItems {
  'Bejeweled Handle': string;
  'Drill Engine': string;
  ENCHANTED_COAL_BLOCK: string;
  ENCHANTED_DIAMOND_BLOCK: string;
  ENCHANTED_GOLD_BLOCK: string;
  ENCHANTED_IRON_BLOCK: string;
  ENCHANTED_MITHRIL: string;
  ENCHANTED_REDSTONE_BLOCK: string;
  ENCHANTED_TITANIUM: string;
  FINE_AMBER_GEM: string;
  FINE_AMETHYST_GEM: string;
  FINE_JADE_GEM: string;
  FINE_SAPPHIRE_GEM: string;
  'Fuel Tank': string;
  'Gemstone Mixture': string;
  'Glacite Jewel': string;
  'Golden Plate': string;
  'Mithril Plate': string;
  REFINED_DIAMOND: string;
  REFINED_MITHRIL: string;
  REFINED_TITANIUM: string;
  SLUDGE_JUICE: string;
  TREASURITE: string;
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
  playFrequencyDescription: string;
  playFrequencyLabel: string;
  playFrequencyOptionEveryday: string;
  playFrequencyOptionLess: string;
  playFrequencyOptionNonStop: string;
  playFrequencyOptionThreeTime: string;
  playFrequencyOptionTwice: string;
  title: string;
}

interface ILanguageUI {
  amount: string;
  auction: string;
  bazaar: string;
  craftCost: string;
  hotm: string;
  hour: string;
  item: string;
  itemPrice: string;
  shoppingList: string;
  options: ILanguageUIOptions;
  profit: string;
  profitByTimeEveryday: string;
  profitByTimeNonStop: string;
  profitByTimeThreeTime: string;
  profitByTimeTwice: string;
  sellPrice: string;
  time: string;
  title: string;
  totalPrice: string;
  vendor: string;
}

export interface ILanguage {
  items: ILanguageItems;
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
  userLanguageChange(selected: KeysLanguageType): void;
}
