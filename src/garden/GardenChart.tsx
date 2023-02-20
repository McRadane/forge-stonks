import type { Datum, PlotData } from 'plotly.js';
import { FC, useEffect, useMemo, useRef } from 'react';

import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguageItems } from '../resources/lang/type';

import type { IDataSourceItem } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Plotly: any;

export interface IGardenProps {
  dataSource: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
  highlightItem: keyof ILanguageItems;
  showLabel?: boolean;
  text: 'name' | 'price' | 'ratio';
}

const colorHighlight = 'rgba(222,45,38,0.8)';
const colorCheaper = 'rgba(204,204,204,1)';
const colorCostier = 'rgba(204,204,204,0.2)';

export const GardenChart: FC<IGardenProps> = ({ dataSource, highlightItem, showLabel, text }) => {
  const lang = useLanguage();

  const ref = useRef<HTMLDivElement>(null);

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

      switch (text) {
        case 'name':
          (trace.text as string[]).push(name);
          break;
        case 'price':
          (trace.text as string[]).push(Math.ceil(price).toLocaleString());
          break;
        case 'ratio':
        default:
          (trace.text as string[]).push(Math.ceil(ratio).toLocaleString());
          break;
      }

      if (trace.marker && color) {
        (trace.marker as { color: string[] }).color.push(color);
      }
    });

    return [trace];
  }, [dataSource, highlightItem, lang.items, lang.ui.itemPrice, lang.ui.itemPricePerCompost, text]);

  useEffect(() => {
    if (ref.current) {
      Plotly.newPlot(ref.current, data, {
        xaxis: {
          autotick: false,
          ticks: 'outside'
        }
      });
    }
  }, [data]);

  return <div ref={ref} />;
  //return <ReactPlotly data={data} layout={{}} />;
};
