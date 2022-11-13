import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { crafts, itemsSource, ICraft, itemsVendorPrice } from '../resources/crafts';
import { ILanguage } from '../resources/lang/type';
import { services } from '../services/hypixel';
import { IOptionsState } from '../services/options';
import { RootState } from '../store';

export const resolveItemPrices = async (
  id: keyof ILanguage['items'],
  source: 'auction' | 'bazaar' | 'vendor',
  auctionsBINOnly: boolean
): Promise<{ buy: number; sell: number }> => {
  if (source === 'bazaar') {
    const found = await services.getItemBazaarPrice(id);

    if (found) {
      return { buy: found.buyPrice, sell: found.sellPrice };
    }
    return { buy: NaN, sell: NaN };
  } else if (source === 'vendor') {
    const price = itemsVendorPrice[id] ?? 0;

    return { buy: price, sell: price };
  }

  const foundBins = await services.getItemBinsPrice(id);

  if (foundBins && auctionsBINOnly) {
    return { buy: foundBins?.buyPrice, sell: foundBins?.buyPrice };
  }

  const foundAuctions = await services.getItemAuctionsPrice(id);

  if (foundBins || foundAuctions) {
    const lowerPrice = Math.min(...([foundBins?.buyPrice, foundAuctions?.buyPrice].filter((price) => price) as number[]));

    return { buy: lowerPrice, sell: lowerPrice };
  }

  return { buy: NaN, sell: NaN };
};

export const resolveItemCraftPrice = async (id: string, intermediateCraft: boolean, auctionsBINOnly: boolean) => {
  const found = crafts.find((item) => item.itemId === id);

  if (found) {
    let sum = 0;
    for await (const material of found.craftMaterial) {
      if (intermediateCraft && material.intermediaryCraft) {
        const buy = await resolveItemCraftPrice(material.itemId, intermediateCraft, auctionsBINOnly);
        sum += buy * material.quantity;
      } else if (material.source === 'vendor') {
        sum += (itemsVendorPrice[material.itemId] ?? 0) * material.quantity;
      } else {
        const { buy } = await resolveItemPrices(material.itemId, material.source, auctionsBINOnly);
        sum += buy * material.quantity;
      }
    }

    return sum;
  }

  return NaN;
};

const updater = async (options: {
  auctionsBINOnly: boolean;
  costRef: number;
  id: keyof ILanguage['items'];
  intermediateCraft: boolean;
  isCraft: boolean;
  source?: string;
  callback(newPrice: number): void;
}) => {
  const { auctionsBINOnly, callback, costRef, id, intermediateCraft, isCraft, source } = options;
  if (isCraft) {
    const newCost = await resolveItemCraftPrice(id, intermediateCraft, auctionsBINOnly);
    if (costRef !== newCost) {
      callback(newCost);
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { buy } = await resolveItemPrices(id, source as any, auctionsBINOnly);
    if (costRef !== buy) {
      callback(buy);
    }
  }
};

export const useItemCraftPrice = (id: keyof ILanguage['items']) => {
  const [cost, setCost] = useState(0);
  const costRef = useRef(0);
  const isCraft = useRef(false);
  const source = useRef<undefined | string>();

  const { auctionsBINOnly, intermediateCraft } = useSelector((state: RootState) => state.options);

  source.current = itemsSource[id] ?? 'vendor';
  isCraft.current = crafts.find((item) => item.itemId === id) !== undefined;

  costRef.current = cost;

  useEffect(() => {
    updater({
      auctionsBINOnly,
      callback: setCost,
      costRef: costRef.current,
      id,
      intermediateCraft,
      isCraft: isCraft.current,
      source: source.current
    });
  }, [auctionsBINOnly, id, intermediateCraft]);

  return cost;
};

export interface ICraftWithCosts extends ICraft {
  craft: number;
  profit: number;
  profitHourly: number;
  sell: number;
}

export const useItemsWithCraftPrice = (crafts: ICraft[]) => {
  const [costs, setCosts] = useState<Record<ICraft['itemId'], ICraftWithCosts>>({} as Record<ICraft['itemId'], ICraftWithCosts>);
  const costsRef = useRef({} as Record<ICraft['itemId'], number>);

  const { auctionsBINOnly, intermediateCraft, playFrequency } = useSelector((state: RootState) => state.options);

  useEffect(() => {
    const updateAll = async () => {
      const newCosts = {} as Record<ICraft['itemId'], ICraftWithCosts>;
      for await (const craft of crafts) {
        const source = itemsSource[craft.itemId as keyof typeof itemsSource] ?? 'vendor';

        const itemDb = craft.bazaarItem
          ? await services.getItemPrice(craft.itemId, 'bazaar')
          : await services.getItemPrice(craft.itemId, 'bins');
        const sell = itemDb?.sellPrice ?? 0;

        await updater({
          auctionsBINOnly,
          costRef: costsRef.current[craft.itemId],
          id: craft.itemId,
          intermediateCraft,
          isCraft: true,
          source,
          callback: (newCost: number) => {
            const profit = sell - newCost;
            let period = 1;

            switch (playFrequency) {
              case 'everyday':
                period = 24;
                break;
              case 'three-time':
                period = 8;
                break;
              case 'twice':
                period = 12;
                break;
            }

            const profitHourly = (profit / Math.max(craft.time, period)) * period;

            newCosts[craft.itemId] = { ...craft, craft: newCost, profit, profitHourly, sell };
          }
        });
      }

      return newCosts;
    };

    updateAll().then((newCosts) => {
      setCosts(newCosts);
    });
  }, [auctionsBINOnly, crafts, intermediateCraft, playFrequency]);

  return Object.values(costs);
};

export const getProfitByTimeLabel = (playFrequency: IOptionsState['playFrequency'], ui: ILanguage['ui']) => {
  switch (playFrequency) {
    case 'everyday':
      return ui.profitByTimeEveryday;
      break;
    case 'less':
      // Hide the column
      break;

    case 'nonstop':
      return ui.profitByTimeNonStop;
      break;
    case 'three-time':
      return ui.profitByTimeThreeTime;
      break;
    case 'twice':
      return ui.profitByTimeTwice;
      break;
  }

  return;
};
