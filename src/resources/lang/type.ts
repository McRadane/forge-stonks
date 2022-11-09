export interface ILanguage {
  items: {
    'Bejeweled Handle': string;
    'Drill Engine': string;
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
    ENCHANTED_COAL_BLOCK: string;
  };
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
