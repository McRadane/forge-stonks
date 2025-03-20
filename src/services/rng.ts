import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ILanguage, ILanguageUIRNGFlips } from '../resources/lang/type';
import type { IWorkerResponseGetRNGPricesResult } from '../worker/type';

interface IRNGState {
  flips: Partial<Record<keyof ILanguageUIRNGFlips, Partial<Record<keyof ILanguage['items'], { price: number; ratio: number }>>>>;
}

const initialState: IRNGState = {
  flips: {}
};

const rngSlice = createSlice({
  initialState,
  name: 'rng',
  reducers: {
    setRNGPrices: (state, action: PayloadAction<IWorkerResponseGetRNGPricesResult>) => {
      state.flips = action.payload.flips;
    }
  }
});

export const { setRNGPrices } = rngSlice.actions;

export const { reducer: rngReducer } = rngSlice;
