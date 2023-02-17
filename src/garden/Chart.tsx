import { FC, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguageItems } from '../resources/lang/type';

export interface IGardenProps {
  dataSource: Partial<
    Record<
      keyof ILanguageItems,
      {
        price: number;
        ratio: number;
      }
    >
  >;
}

export const Chart: FC<IGardenProps> = ({ dataSource }) => {
  const lang = useLanguage();

  const data = useMemo(() => {
    const dataMemo: { name: string; price: number; ratio: number }[] = [];
    Object.keys(dataSource).forEach((key) => {
      const price = dataSource[key as keyof typeof dataSource];
      const item = {
        name: lang.items[key as keyof ILanguageItems],
        price: Math.ceil(price?.price ?? 0),
        ratio: Math.round((price?.ratio ?? 1) * 100) / 100
      };

      if (item.ratio < 50) {
        dataMemo.push(item);
      }
    });

    return dataMemo.filter((item) => item.price !== 0).sort((a, b) => a.ratio - b.ratio);
  }, [lang.items, dataSource]);

  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart /*width={150} height={40}*/ data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis orientation="left" yAxisId="left" />
        <YAxis orientation="right" yAxisId="right" />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" yAxisId="left" />
        <Bar dataKey="ratio" fill="#82ca9d" yAxisId="right" />
      </BarChart>
    </ResponsiveContainer>
  );
};
