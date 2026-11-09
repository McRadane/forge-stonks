import { createContext, useContext } from 'react';

import { dictionaryList } from './language';
import type { ILanguage, ILanguageContextDefinition } from './type';

export const LanguageContext = createContext<ILanguageContextDefinition>({
  allDictionary: dictionaryList,
  dictionary: dictionaryList['en-US'],
  userLanguage: 'en-US',

  userLanguageChange: () => {
    // Nothing
    return 'en-US';
  }
});

export const useLanguage = (): ILanguage => {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary;
};
