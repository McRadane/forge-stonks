import { FC, useState } from 'react';

import { LanguageContext } from './LanguageContext';
import { dictionaryList, languageSelectorHelper } from './language';
import type { KeysLanguageType, ILanguageContextDefinition } from './type';

interface ILanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: KeysLanguageType;
}

export const LanguageProvider: FC<ILanguageProviderProps> = ({
  children,
  defaultLanguage: defaultLanguageBase
}: ILanguageProviderProps) => {
  const defaultLangage = languageSelectorHelper(defaultLanguageBase);
  const [userLanguage, setUserLanguage] = useState<KeysLanguageType>(defaultLangage);

  const provider: ILanguageContextDefinition = {
    allDictionary: dictionaryList,

    dictionary: dictionaryList[userLanguage],
    userLanguage,
    /**
     * Update the site language
     * @param selected SP Language identifier
     */
    userLanguageChange: (selected) => {
      const resultLanguage = languageSelectorHelper(selected);
      localStorage.setItem('language', resultLanguage);
      setUserLanguage(resultLanguage);
    }
  };

  return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>;
};
