import { createContext, useContext } from 'react';
import { dictionaryList } from './language';
import type { KeysLanguageType, ILanguage, ILanguageContextDefinition } from './type';

export const LanguageContext = createContext<ILanguageContextDefinition>({
  allDictionary: dictionaryList,
  dictionary: dictionaryList['en-US'],
  userLanguage: 'en-US',

  userLanguageChange: () => {
    // Nothing
  }
});

export const useLanguage = (): ILanguage => {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary;
};

export const useLanguageResolver = () => {
  const languageContext = useContext(LanguageContext);

  return (pathToken: string): string => {
    const tokens = pathToken.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = languageContext.dictionary;

    tokens.forEach((token) => {
      if (current[token] !== undefined) {
        current = current[token];
      }
    });

    if (typeof current === 'string') {
      return String(current);
    }

    return pathToken;
  };
};
export const useLocale = (): KeysLanguageType => {
  const languageContext = useContext(LanguageContext);

  return languageContext.userLanguage;
};
