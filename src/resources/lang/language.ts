import enUsFile from './enUs.json';
import frFrFile from './frFr.json';
import type { KeysLanguageType, ILanguage } from './type';

const baseMap = JSON.parse(JSON.stringify(enUsFile), (_, value) => {
  if (typeof value === 'string') {
    return `[MISSING] ${value}`;
  }

  return value;
});

export const dictionaryList = {
  'en-US': enUsFile as ILanguage,
  // eslint-disable-next-line prefer-object-spread
  'fr-FR': Object.assign({}, baseMap, frFrFile) as ILanguage
};

const keyLanguages = Object.keys(dictionaryList) as KeysLanguageType[];

const shortnameLanguages: Record<string, KeysLanguageType> = {};
keyLanguages.forEach((key) => {
  shortnameLanguages[key.substring(0, 2)] = key;
});

export const languageSelectorHelper = (language?: KeysLanguageType): keyof typeof dictionaryList => {
  if (language) {
    const shortSPLanguage = language.substring(0, 2);

    // Check if the SP language correspond to a known language
    if (keyLanguages.includes(language)) {
      return language;
    }

    // Check if the SP language correspond to a short-name known language
    if (shortnameLanguages[shortSPLanguage]) {
      return shortnameLanguages[shortSPLanguage];
    }
  }

  const browserLanguages = Array.isArray(window.navigator.language) ? window.navigator.language : [window.navigator.language];

  // eslint-disable-next-line no-restricted-syntax
  for (const browserLanguage of browserLanguages) {
    const lang = browserLanguage as KeysLanguageType;
    const wShortBrowserLanguage = lang.substring(0, 2);

    // Check if the Browser language correspond to a known language
    if (keyLanguages.includes(lang)) {
      return lang;
    }

    // Check if the Browser language correspond to a short-name known language
    if (shortnameLanguages[wShortBrowserLanguage]) {
      return shortnameLanguages[wShortBrowserLanguage];
    }
  }

  return 'en-US';
};
