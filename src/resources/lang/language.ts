import { enUs } from './enUs';
import { frFr } from './frFr';
import type { KeysLanguageType } from './type';

export const dictionaryList = {
  'en-US': enUs,
  'fr-FR': frFr
};

const keyLanguages = Object.keys(dictionaryList) as KeysLanguageType[];

const shortnameLanguages: Record<string, KeysLanguageType> = {};
keyLanguages.forEach((key) => {
  shortnameLanguages[key.substring(0, 2)] = key;
});

const resolveLanguage = (lang: KeysLanguageType): KeysLanguageType | undefined => {
  const wShortBrowserLanguage = lang.substring(0, 2);

  // Check if the Cache language correspond to a known language
  if (keyLanguages.includes(lang)) {
    return lang;
  }

  // Check if the language correspond to a short-name known language
  if (shortnameLanguages[wShortBrowserLanguage]) {
    return shortnameLanguages[wShortBrowserLanguage];
  }
};

export const languageSelectorHelper = (language?: KeysLanguageType): keyof typeof dictionaryList => {
  if (language) {
    const lang = resolveLanguage(language);
    if (lang) {
      return lang;
    }
  }

  const browserLanguages = Array.isArray(window.navigator.language) ? window.navigator.language : [window.navigator.language];

  for (const browserLanguage of browserLanguages) {
    const lang = resolveLanguage(browserLanguage);
    if (lang) {
      return lang;
    }
  }

  return 'en-US';
};
