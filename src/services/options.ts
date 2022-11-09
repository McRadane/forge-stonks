import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IOptionsState {
  playFrequency: 'nonstop' | 'three-time' | 'twice' | 'everyday' | 'less';
  includeAuctionsFlip: boolean;
  auctionsBINOnly: boolean;
  intermediateCraft: boolean;
  hotm: number;
  language: 'en' | 'fr';
}

const initialState: IOptionsState = {
  playFrequency: 'nonstop',
  includeAuctionsFlip: true,
  auctionsBINOnly: true,
  hotm: 2,
  intermediateCraft: false,
  language: 'en'
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setPlayFrequency: (state, action: PayloadAction<IOptionsState['playFrequency']>) => {
      state.playFrequency = action.payload;
    },
    toggleIncludeAuctionsFlip: (state) => {
      state.includeAuctionsFlip = !state.includeAuctionsFlip;
    },
    toggleAuctionsBINOnly: (state) => {
      state.auctionsBINOnly = !state.auctionsBINOnly;
    },
    toggleIntermediateCraft: (state) => {
      state.intermediateCraft = !state.intermediateCraft;
    },
    setHOTM: (state, action: PayloadAction<number>) => {
      state.hotm = action.payload;
    },
    setLanguage: (state, action: PayloadAction<IOptionsState['language']>) => {
      state.language = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setHOTM, setLanguage, setPlayFrequency, toggleAuctionsBINOnly, toggleIncludeAuctionsFlip, toggleIntermediateCraft } =
  optionsSlice.actions;

export default optionsSlice.reducer;
