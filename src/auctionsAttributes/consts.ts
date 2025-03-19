import { ILanguageUI } from '../resources/lang/type';

export const CARD_WIDTH = 400;
export const CARD_HEIGHT = 400;

export const auctionTypes: { text: keyof ILanguageUI; value: string }[] = [
  { text: 'both', value: '' },
  { text: 'bin', value: 'BIN' },
  { text: 'auction', value: 'Auction' }
];
