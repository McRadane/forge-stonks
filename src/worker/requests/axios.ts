import { cleanAuctionName } from '@shared/functions/requests';
import { itemsWithAttributes } from '@shared/resources/attributes';
import { PetNames, petsAuctions } from '@shared/resources/pets';
import type {
  IAuctions,
  IAuctionsAPIPaginatedResponse,
  IAuctionsAPIPaginatedResponseWithCleanNames,
  IAuctionsAPIWithCleanNames,
  IBazaar,
  IBazaarAPIResponse,
  IPlayerAPIResponse,
  IProfile
} from '@shared/types/requests';
import axios from 'axios';

export const getBazaarPriceData = (): Promise<IBazaar[]> => {
  return axios
    .get<IBazaarAPIResponse>('https://api.hypixel.net/skyblock/bazaar')
    .then((response) => response.data)
    .then((data) => {
      if (!data?.success) {
        throw new Error('Invalid query to bazaar');
      }

      const result: IBazaar[] = Object.keys(data.products).map((key) => ({
        buyPrice: data.products[key].quick_status.buyPrice,
        item_name: key,
        sellPrice: data.products[key].quick_status.sellPrice
      }));

      return result;
    });
};

const getPageAuctionsRequests = async (page: number): Promise<IAuctionsAPIPaginatedResponseWithCleanNames['auctions']> => {
  const pageDataResponse = await axios.get<IAuctionsAPIPaginatedResponse>(`https://api.hypixel.net/skyblock/auctions?page=${page}`);
  const pageData = pageDataResponse.data;

  if (pageData?.success) {
    return pageData.auctions
      .filter((auction) => !auction.claimed)
      .map((auction) => ({
        ...auction,
        buyPrice: auction.bin || auction.highest_bid_amount ? auction.starting_bid : auction.highest_bid_amount,
        cleanName: cleanAuctionName(auction.item_name),
        sellPrice: auction.bin || auction.highest_bid_amount ? auction.starting_bid : auction.highest_bid_amount
      }));
  }

  return Promise.reject(new Error('No results'));
};

const filterAuctions = (data: IAuctionsAPIPaginatedResponse) => {
  const auctions: Map<string, IAuctions & { bin: boolean }> = new Map();

  data.auctions
    .filter((auction) => !auction.claimed)
    .forEach(({ bin, highest_bid_amount: highestBidAmount, item_name: itemName, rarity, starting_bid: startingBid, uuid }) => {
      auctions.set(uuid, {
        bin,
        buyPrice: bin || highestBidAmount ? startingBid : highestBidAmount,
        item_name: itemName,
        rarity,
        sellPrice: bin || highestBidAmount ? startingBid : highestBidAmount
      });
    });

  return auctions;
};

const sortResults = (
  results: {
    bin: boolean;
    category: string;
    claimed: boolean;
    highest_bid_amount: number;
    item_name: string;
    starting_bid: number;
    tier: string;
    uuid: string;
  }[][],
  auctions: Map<
    string,
    IAuctions & {
      bin: boolean;
    }
  >
) => {
  results.forEach((element) => {
    element.forEach((item) => {
      const { bin, highest_bid_amount: highestBidAmount, item_name: itemName, starting_bid: startingBid, uuid } = item;

      auctions.set(uuid, {
        bin,
        buyPrice: bin || highestBidAmount === 0 ? startingBid : highestBidAmount,
        item_name: itemName,
        sellPrice: bin || highestBidAmount === 0 ? startingBid : highestBidAmount
      });
    });
  });
};

export const getAuctionPriceData = (): Promise<{
  attributes: IAuctionsAPIWithCleanNames[];
  petsPrices: IAuctionsAPIWithCleanNames[];
  price: Array<IAuctions & { bin: boolean }>;
}> => {
  return axios
    .get<IAuctionsAPIPaginatedResponse>('https://api.hypixel.net/skyblock/auctions')
    .then((response) => response.data)
    .then((data) => {
      if (!data?.success) {
        throw new Error('Invalid query to auctions');
      }

      const allAuctions = data.auctions.map((auction) => ({
        ...auction,
        buyPrice: auction.bin || auction.highest_bid_amount ? auction.starting_bid : auction.highest_bid_amount,
        cleanName: cleanAuctionName(auction.item_name),
        sellPrice: auction.bin || auction.highest_bid_amount ? auction.starting_bid : auction.highest_bid_amount
      }));

      const auctionsPrices = filterAuctions(data);
      const auctionsWithAttribute = allAuctions.filter((auction) => itemsWithAttributes.includes(auction.cleanName));
      const petsPrices = allAuctions.filter((auction) => petsAuctions.includes(auction.cleanName as PetNames));

      const promises: Promise<IAuctionsAPIPaginatedResponseWithCleanNames['auctions']>[] = [];

      if (data.totalPages > 1) {
        for (let page = 1; page < data.totalPages; page++) {
          promises.push(getPageAuctionsRequests(page));
        }
      }
      return Promise.all(promises).then((results) => {
        sortResults(results, auctionsPrices);
        const newAuctionsWithAttribute = results.flat().filter((auction) => itemsWithAttributes.includes(auction.cleanName));
        const newPetsPrices = results.flat().filter((auction) => petsAuctions.includes(auction.cleanName as PetNames));

        auctionsWithAttribute.push(...newAuctionsWithAttribute);
        petsPrices.push(...newPetsPrices);

        return { attributes: auctionsWithAttribute, petsPrices, price: Array.from(auctionsPrices.values()) };
      });
    });
};

export const getPlayerData = async (playerName: string, profileName: string): Promise<IProfile | undefined> => {
  if (!playerName || !profileName) {
    return;
  }

  return axios
    .get<IPlayerAPIResponse>(`https://sky.shiiyu.moe/api/v2/profile/${playerName}?cache=${Date.now()}`)
    .then((response) => response.data)
    .then((response) => {
      return response.profiles[profileName];
    });
};
