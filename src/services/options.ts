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

export const optionsSlice = createSlice({
  initialState,
  name: 'Response-Options',
  reducers: {
    setOptions: (state, action: PayloadAction<Partial<IOptionsState>>) => {
      return { ...state, ...action.payload };
    }
    /*setCacheDuration: (state, action: PayloadAction<number>) => {
      state.cacheDuration = action.payload;
    },
    setHOTM: (state, action: PayloadAction<number>) => {
      state.hotm = action.payload;
    },
    setMaxCraftingCost: (state, action: PayloadAction<number>) => {
      state.maxCraftingCost = action.payload;
    },
    setPlayFrequency: (state, action: PayloadAction<IOptionsState['playFrequency']>) => {
      state.playFrequency = action.payload;
    },
    setQuickForge: (state, action: PayloadAction<number>) => {
      state.quickForge = action.payload;
    },
    toggleAuctionsBINOnly: (state) => {
      state.auctionsBINOnly = !state.auctionsBINOnly;
    },
    toggleIncludeAuctionsFlip: (state) => {
      state.includeAuctionsFlip = !state.includeAuctionsFlip;
    },
    toggleIntermediateCraft: (state) => {
      state.intermediateCraft = !state.intermediateCraft;
    }*/
  }
});

export const {
  /*setCacheDuration,
  setHOTM,
  setMaxCraftingCost,
  setPlayFrequency,
  setQuickForge,
  toggleAuctionsBINOnly,
  toggleIncludeAuctionsFlip,
  toggleIntermediateCraft,*/
  setOptions
} = optionsSlice.actions;

export const { reducer: optionsReducer } = optionsSlice;
