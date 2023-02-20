import type { Datum, PlotData } from 'plotly.js';
import { FC, useMemo } from 'react';
import ReactPlotly from 'react-plotly.js';

import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguageItems } from '../resources/lang/type';

import type { IDataSourceItem } from './types';

export interface IGardenProps {
  dataSource: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
  highlightItem: keyof ILanguageItems;
}

const colorHighlight = 'rgba(222,45,38,0.8)';
const colorCheaper = 'rgba(204,204,204,1)';
const colorCostier = 'rgba(204,204,204,0.2)';

export const GardenChart: FC<IGardenProps> = ({ dataSource, highlightItem }) => {
  const lang = useLanguage();

  const data = useMemo(() => {
    const trace: Partial<PlotData> = {
      hovertemplate: '%{hovertext}<extra></extra>',
      hovertext: [],
      name: lang.ui.itemPricePerCompost,
      text: [],
      textinfo: 'value',
      type: 'bar',
      x: [],
      y: []
    };

    let preparedData: { id: string; name: string; price: number; ratio: number; color?: string }[] = [];

    Object.keys(dataSource).forEach((key) => {
      const price = dataSource[key as keyof typeof dataSource];
      const name = lang.items[key as keyof ILanguageItems];

      preparedData.push({
        id: key,
        name,
        price: price?.price ?? 0,
        ratio: price?.ratio ?? 1
      });
    });

    preparedData.sort((a, b) => a.ratio - b.ratio);

    const highlightedItem = preparedData.find((item) => item.id === highlightItem);
    if (highlightedItem) {
      trace.marker = { color: [] };
      preparedData = preparedData.map((item) => {
        if (highlightedItem.id === item.id) {
          return { ...item, color: colorHighlight };
        } else if (item.ratio < highlightedItem.ratio) {
          return { ...item, color: colorCheaper };
        }
        return { ...item, color: colorCostier };
      });
    }

    preparedData.forEach(({ color, name, price, ratio }) => {
      (trace.x as Datum[]).push(name);
      (trace.y as Datum[]).push(ratio);

      (trace.hovertext as string[]).push(
        `<b>${name}</b><br />${lang.ui.itemPrice}: ${Math.ceil(price).toLocaleString()}<br />${lang.ui.itemPricePerCompost}: ${Math.ceil(
          ratio
        ).toLocaleString()}`
      );

      (trace.text as string[]).push(Math.ceil(ratio).toLocaleString());

      if (trace.marker && color) {
        (trace.marker as { color: string[] }).color.push(color);
      }
    });

    return [trace];
  }, [dataSource, highlightItem, lang.items, lang.ui.itemPrice, lang.ui.itemPricePerCompost]);

  return <ReactPlotly data={data} layout={{}} />;
};
