import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { crafts, itemsSource, ICraft } from '../resources/crafts';
import { services } from '../services/hypixel';
import { RootState } from '../store';

export const resolveItemPrices = async (
  id: string,
  source: 'auction' | 'bazaar',
  auctionsBINOnly: boolean
): Promise<{ buy: number; sell: number }> => {
  //console.log("Resolving prices for", id, "on source", source);
  if (source === 'bazaar') {
    const found = await services.getItemBazaarPrice(id);

    if (found) {
      return { buy: found.buyPrice, sell: found.sellPrice };
    }
    //console.log("item not found");
    return { buy: NaN, sell: NaN };
  }

  const foundBins = await services.getItemBinsPrice(id);

  if (foundBins && auctionsBINOnly) {
    return { buy: foundBins?.buyPrice, sell: foundBins?.buyPrice };
  }

  const foundAuctions = await services.getItemAuctionsPrice(id);

  if (foundBins || foundAuctions) {
    //console.log("item found", foundBins, foundAuctions);

    const lowerPrice = Math.min(...([foundBins?.buyPrice, foundAuctions?.buyPrice].filter((price) => price) as number[]));

    return { buy: lowerPrice, sell: lowerPrice };
  }

  //console.log("item not found");

  return { buy: NaN, sell: NaN };
};

export const resolveItemCraftPrice = async (id: string, intermediateCraft: boolean, auctionsBINOnly: boolean) => {
  const found = crafts.find((item) => item.id === id);

  if (found) {
    let sum = 0;
    for await (const material of found.craftMaterial) {
      if (intermediateCraft && material.intermediaryCraft) {
        const buy = await resolveItemCraftPrice(material.id, intermediateCraft, auctionsBINOnly);
        sum += buy * material.quantity;
      } else if (material.source === 'vendor') {
        // nothing to do
      } else {
        const { buy } = await resolveItemPrices(material.id, material.source, auctionsBINOnly);
        sum += buy * material.quantity;
      }
    }
    /*found.craftMaterial.forEach(async (material) => {
      
    });*/

    return sum;
  }

  return NaN;
};

const updater = async (options: {
  auctionsBINOnly: boolean;
  costRef: number;
  id: string;
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

export const useItemCraftPrice = (id: string) => {
  const [cost, setCost] = useState(0);
  const costRef = useRef(0);
  const isCraft = useRef(false);
  const source = useRef<undefined | string>();

  const { auctionsBINOnly, intermediateCraft } = useSelector((state: RootState) => state.options);

  source.current = itemsSource[id as keyof typeof itemsSource] ?? 'vendor';
  isCraft.current = crafts.find((item) => item.id === id) !== undefined;

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
  const [costs, setCosts] = useState<Record<ICraft['id'], ICraftWithCosts>>({} as Record<ICraft['id'], ICraftWithCosts>);
  const costsRef = useRef({} as Record<ICraft['id'], number>);

  const { auctionsBINOnly, intermediateCraft, playFrequency } = useSelector((state: RootState) => state.options);

  useEffect(() => {
    const updateAll = async () => {
      const newCosts = {} as Record<ICraft['id'], ICraftWithCosts>;
      for await (const craft of crafts) {
        const source = itemsSource[craft.id as keyof typeof itemsSource] ?? 'vendor';

        const itemDb = craft.bazaarItem ? await services.getItemPrice(craft.id, 'bazaar') : await services.getItemPrice(craft.id, 'bins');
        const sell = itemDb?.sellPrice ?? 0;

        await updater({
          auctionsBINOnly,
          costRef: costsRef.current[craft.id],
          id: craft.id,
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

            newCosts[craft.id] = { ...craft, craft: newCost, profit, profitHourly, sell };
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
