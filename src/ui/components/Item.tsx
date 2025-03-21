import { useLanguage } from '@shared/resources/lang/LanguageContext';
import type { ILanguage } from '@shared/resources/lang/type';
import type React from 'react';
import { type FC, useMemo } from 'react';

interface IItemProps {
  children: React.ReactNode;
}

export const Item: FC<IItemProps> = ({ children }) => {
  const lang = useLanguage();
  const childString = useMemo(() => (typeof children === 'string' ? String(children) : '') as keyof ILanguage['items'], [children]);

  if ((lang.items[childString] as string | undefined) !== undefined) {
    return <>{lang.items[childString]}</>;
  }
  return <>{children}</>;
};
