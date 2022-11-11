import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IOptionsState {
  auctionsBINOnly: boolean;
  cacheDuration: number;
  hotm: number;
  includeAuctionsFlip: boolean;
  intermediateCraft: boolean;
  playFrequency: 'everyday' | 'less' | 'nonstop' | 'three-time' | 'twice';
}

const initialState: IOptionsState = {
  auctionsBINOnly: true,
  cacheDuration: 60,
  hotm: 2,
  includeAuctionsFlip: true,
  intermediateCraft: false,
  playFrequency: 'nonstop'
};

export const optionsSlice = createSlice({
  initialState,
  name: 'options',
  reducers: {
    setCacheDuration: (state, action: PayloadAction<number>) => {
      state.cacheDuration = action.payload;
    },
    setHOTM: (state, action: PayloadAction<number>) => {
      state.hotm = action.payload;
    },
    setPlayFrequency: (state, action: PayloadAction<IOptionsState['playFrequency']>) => {
      state.playFrequency = action.payload;
    },
    toggleAuctionsBINOnly: (state) => {
      state.auctionsBINOnly = !state.auctionsBINOnly;
    },
    toggleIncludeAuctionsFlip: (state) => {
      state.includeAuctionsFlip = !state.includeAuctionsFlip;
    },
    toggleIntermediateCraft: (state) => {
      state.intermediateCraft = !state.intermediateCraft;
    }
  }
});

export const { setCacheDuration, setHOTM, setPlayFrequency, toggleAuctionsBINOnly, toggleIncludeAuctionsFlip, toggleIntermediateCraft } =
  optionsSlice.actions;

export const { reducer: optionsReducer } = optionsSlice;
