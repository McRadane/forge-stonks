import { FC, useState } from 'react';
import { dictionaryList, languageSelectorHelper } from './language';
import { LanguageContext } from './LanguageContext';
import type { ILanguageContextDefinition, KeysLanguageType } from './type';

interface ILanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: KeysLanguageType;
}

const LanguageProvider: FC<ILanguageProviderProps> = ({ children, defaultLanguage: defaultLanguageBase }: ILanguageProviderProps) => {
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

      setUserLanguage(resultLanguage);
    }
  };

  return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
