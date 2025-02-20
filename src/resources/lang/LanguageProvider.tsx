import { type FC, type ReactNode, useMemo, useState } from 'react';

import { LanguageContext } from './LanguageContext';
import { dictionaryList, languageSelectorHelper } from './language';
import type { KeysLanguageType, ILanguageContextDefinition } from './type';

interface ILanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: FC<ILanguageProviderProps> = ({ children }: ILanguageProviderProps) => {
  const [userLanguage, setUserLanguage] = useState<KeysLanguageType>(languageSelectorHelper());

  const provider: ILanguageContextDefinition = useMemo(() => {
    return {
      allDictionary: dictionaryList,

      dictionary: dictionaryList[userLanguage],
      userLanguage,

      userLanguageChange: (selected) => {
        const resultLanguage = languageSelectorHelper(selected);
        setUserLanguage(resultLanguage);

        return resultLanguage;
      }
    };
  }, [userLanguage]);

  return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>;
};
