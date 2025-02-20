export interface IOptionsState {
  auctionsBINOnly: boolean;
  cacheDuration: number;
  hotm: number;
  includeAuctionsFlip: boolean;
  includePerfectGems: boolean;
  intermediateCraft: boolean;
  maxCraftingCost: number;
  playerName?: string;
  playerProfile?: string;
  playFrequency: PlayFrequencyType;
  quickForge: number;
}

type PlayFrequencyType = 'everyday' | 'less' | 'nonstop' | 'three-time' | 'twice';

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
