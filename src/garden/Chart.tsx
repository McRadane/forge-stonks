import { FC, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguageItems } from '../resources/lang/type';

export interface IDataSourceItem {
  price: number;
  ratio: number;
}

export interface IGardenProps {
  dataSource: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
  labelRatio: string;
}

const CustomTooltip: FC<TooltipProps<ValueType, NameType>> = ({ active, label, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

export const Chart: FC<IGardenProps> = ({ dataSource, labelRatio }) => {
  const lang = useLanguage();

  const data = useMemo(() => {
    const dataMemo: {
      name: string;
      [key: string]: string | number;
    }[] = [];
    Object.keys(dataSource).forEach((key) => {
      const price = dataSource[key as keyof typeof dataSource];
      const item = {
        Price: Math.ceil(price?.price ?? 1),
        [labelRatio]: Math.ceil(price?.ratio ?? 1),
        name: lang.items[key as keyof ILanguageItems]
      };

      // if (item.ratio < 50) {
      dataMemo.push(item);
      // }
    });

    return dataMemo.filter((item) => item.Price !== 0).sort((a, b) => (a[labelRatio] as number) - (b[labelRatio] as number));
  }, [dataSource, lang.items, labelRatio]);

  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart /*width={150} height={40}*/ data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis orientation="left" yAxisId="left" />
        <YAxis label={'Price for one'} orientation="right" yAxisId="right" />
        <Tooltip /* content={<CustomTooltip />} */ />
        <Legend />
        <Bar dataKey="Price" fill="#8884d8" yAxisId="left" />
        <Bar dataKey={labelRatio} fill="#82ca9d" yAxisId="right" />
      </BarChart>
    </ResponsiveContainer>
  );
};
