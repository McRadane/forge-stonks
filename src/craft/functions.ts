// import { options } from "../options/options";
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { services } from '../services/hypixel';
import { RootState } from '../store';

import { crafts } from './crafts';

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

export const useItemCraftPrice = (id: string) => {
  const [cost, setCost] = useState(0);
  const costRef = useRef(0);

  const auctionsBINOnly = useSelector((state: RootState) => state.options.auctionsBINOnly);
  const intermediateCraft = useSelector((state: RootState) => state.options.intermediateCraft);

  costRef.current = cost;

  useEffect(() => {
    const updater = async () => {
      console.log('useEffect useItemCraftPrice', id);
      const newCost = await resolveItemCraftPrice(id, intermediateCraft, auctionsBINOnly);
      if (costRef.current !== newCost) {
        setCost(newCost);
      }
    };

    updater();
  });

  return cost;
};
