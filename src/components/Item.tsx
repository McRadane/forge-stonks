import React, { FC } from 'react';
import { useLanguage } from '../resources/lang/LanguageContext';
import { ILanguage } from '../resources/lang/type';

export const Item: FC<{ children: React.ReactNode }> = ({ children }) => {
  const lang = useLanguage();
  const childString = String(children) as keyof ILanguage['items'];

  if (lang.items[childString] !== undefined) {
    return <>{lang.items[childString]}</>;
  }
  return <>{children}</>;
};
