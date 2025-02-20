import { type FC, useMemo } from 'react';
import type React from 'react';

import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguage } from '../resources/lang/type';

interface IItemProps {
  children: React.ReactNode;
}

export const Item: FC<IItemProps> = ({ children }) => {
  const lang = useLanguage();
  const childString = useMemo(() => (typeof children === 'string' ? String(children) : '') as keyof ILanguage['items'], [children]);

  if (lang.items[childString] !== undefined) {
    return <>{lang.items[childString]}</>;
  }
  return <>{children}</>;
};
