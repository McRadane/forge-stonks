import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IOptionsState {
  auctionsBINOnly: boolean;
  cacheDuration: number;
  hotm: number;
  includeAuctionsFlip: boolean;
  intermediateCraft: boolean;
  maxCraftingCost: number;
  playFrequency: 'everyday' | 'less' | 'nonstop' | 'three-time' | 'twice';
  quickForge: number;
}

export const initialState: IOptionsState = {
  auctionsBINOnly: true,
  cacheDuration: 60,
  hotm: 2,
  includeAuctionsFlip: true,
  intermediateCraft: false,
  maxCraftingCost: 0,
  playFrequency: 'nonstop',
  quickForge: 0
};

const optionsSlice = createSlice({
  initialState,
  name: 'Response-Options',
  reducers: {
    setOptions: (state, action: PayloadAction<Partial<IOptionsState>>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setOptions } = optionsSlice.actions;

export const { reducer: optionsReducer } = optionsSlice;
