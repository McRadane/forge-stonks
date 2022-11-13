import { ICraftWithCosts } from '../craft/functions';
import { crafts, itemsSource, ICraft, itemsVendorPrice } from '../resources/crafts';
import { ILanguage } from '../resources/lang/type';

import { Services } from './database';
import { QueryWorkerCommandGetPrices } from './type';

const resolveItemPrices = async (
  id: keyof ILanguage['items'],
  source: 'auction' | 'bazaar' | 'vendor',
  auctionsBINOnly: boolean,
  services: Services
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

const resolveItemCraftPrice = async (id: string, intermediateCraft: boolean, auctionsBINOnly: boolean, services: Services) => {
  const found = crafts.find((item) => item.itemId === id);

  if (found) {
    let sum = 0;
    for await (const material of found.craftMaterial) {
      if (intermediateCraft && material.intermediaryCraft) {
        const buy = await resolveItemCraftPrice(material.itemId, intermediateCraft, auctionsBINOnly, services);
        sum += buy * material.quantity;
      } else if (material.source === 'vendor') {
        sum += (itemsVendorPrice[material.itemId] ?? 0) * material.quantity;
      } else {
        const { buy } = await resolveItemPrices(material.itemId, material.source, auctionsBINOnly, services);
        sum += buy * material.quantity;
      }
    }

    return sum;
  }

  return NaN;
};

const updater = async (
  options: {
    auctionsBINOnly: boolean;
    // costRef: number;
    id: keyof ILanguage['items'];
    intermediateCraft: boolean;
    isCraft: boolean;
    source?: string;
    callback(newPrice: number): void;
  },
  services: Services
) => {
  const { auctionsBINOnly, callback, id, intermediateCraft, isCraft, source } = options;
  if (isCraft) {
    const newCost = await resolveItemCraftPrice(id, intermediateCraft, auctionsBINOnly, services);
    //if (costRef !== newCost) {
    callback(newCost);
    //}
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { buy } = await resolveItemPrices(id, source as any, auctionsBINOnly, services);
    //if (costRef !== buy) {
    callback(buy);
    //}
  }
};

export const getItemsWithCraftPrice = async ({
  services,
  auctionsBINOnly,
  crafts,
  // costsRef,
  intermediateCraft,
  playFrequency
}: QueryWorkerCommandGetPrices & { services: Services }) => {
  const newCosts = {} as Record<ICraft['itemId'], ICraftWithCosts>;
  for await (const craft of crafts) {
    const source = itemsSource[craft.itemId as keyof typeof itemsSource] ?? 'vendor';

    const itemDb = craft.bazaarItem
      ? await services.getItemPrice(craft.itemId, 'bazaar')
      : await services.getItemPrice(craft.itemId, 'bins');
    const sell = itemDb?.sellPrice ?? 0;

    await updater(
      {
        auctionsBINOnly,
        // costRef: costsRef[craft.itemId],
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
      },
      services
    );
  }

  return newCosts;
};
