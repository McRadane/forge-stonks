// import { options } from "../options/options";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { services } from '../services/hypixel';
import { RootState } from '../store';

import { crafts, ICraft, itemsSource } from '../resources/crafts';

export const resolveItemPrices = async (
  id: string,
  source: 'bazaar' | 'auction',
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
  id: string;
  intermediateCraft: boolean;
  auctionsBINOnly: boolean;
  isCraft: boolean;
  costRef: number;
  source?: string;
  callback(newPrice: number): void;
}) => {
  const { auctionsBINOnly, costRef, id, intermediateCraft, isCraft, source, callback } = options;
  if (isCraft) {
    const newCost = await resolveItemCraftPrice(id, intermediateCraft, auctionsBINOnly);
    if (costRef !== newCost) {
      callback(newCost);
    }
  } else {
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
  const source = useRef<string | undefined>();

  const auctionsBINOnly = useSelector((state: RootState) => state.options.auctionsBINOnly);
  const intermediateCraft = useSelector((state: RootState) => state.options.intermediateCraft);

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
  sell: number;
  craft: number;
  profit: number;
  profitHourly: number;
}

export const useItemsWithCraftPrice = (crafts: ICraft[]) => {
  const [costs, setCosts] = useState<Record<ICraft['id'], ICraftWithCosts>>({} as Record<ICraft['id'], ICraftWithCosts>);
  const costsRef = useRef({} as Record<ICraft['id'], number>);

  const auctionsBINOnly = useSelector((state: RootState) => state.options.auctionsBINOnly);
  const intermediateCraft = useSelector((state: RootState) => state.options.intermediateCraft);

  useEffect(() => {
    const updateAll = async () => {
      const newCosts = {} as Record<ICraft['id'], ICraftWithCosts>;
      for await (const craft of crafts) {
        const source = itemsSource[craft.id as keyof typeof itemsSource] ?? 'vendor';

        const itemDb = craft.bazaarItem ? await services.getItemPrice(craft.id, 'bazaar') : await services.getItemPrice(craft.id, 'bins');
        const sell = itemDb?.sellPrice ?? 0;

        await updater({
          auctionsBINOnly,
          callback: (newCost: number) => {
            //setCosts((current) => ({ ...current, [craft.id]: newCost }));
            const profit = sell - newCost;

            newCosts[craft.id] = { ...craft, craft: newCost, sell, profit, profitHourly: profit / craft.time };
          },
          costRef: costsRef.current[craft.id],
          id: craft.id,
          intermediateCraft,
          isCraft: true,
          source
        });
      }

      return newCosts;
    };

    updateAll().then((newCosts) => {
      setCosts(newCosts);
    });
  }, [auctionsBINOnly, crafts, intermediateCraft]);

  return Object.values(costs);
};
