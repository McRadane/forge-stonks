export interface IOptionsState {
  auctionsBINOnly: boolean;
  cacheDuration: number;
  hotm: number;
  includeAuctionsFlip: boolean;
  includePerfectGems: boolean;
  intermediateCraft: boolean;
  maxCraftingCost: number;
  playFrequency: 'everyday' | 'less' | 'nonstop' | 'three-time' | 'twice';
  playerName?: string;
  playerProfile?: string;
  quickForge: number;
}

export const initialState: IOptionsState = {
  auctionsBINOnly: true,
  cacheDuration: 60,
  hotm: 2,
  includeAuctionsFlip: true,
  includePerfectGems: false,
  intermediateCraft: false,
  maxCraftingCost: 0,
  playFrequency: 'nonstop',
  quickForge: 0
};
