import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICraftWithCosts } from '../craft/functions';
import { ICraft } from '../resources/crafts';

export interface IWorkerState {
  prices: Partial<Record<ICraft['itemId'], ICraftWithCosts>>;
}

const initialState: IWorkerState = {
  prices: {}
};

export const workerSlice = createSlice({
  initialState,
  name: 'worker',
  reducers: {
    setPrices: (state, action: PayloadAction<Record<ICraft['itemId'], ICraftWithCosts>>) => {
      state.prices = action.payload;
    }
  }
});

export const { setPrices } = workerSlice.actions;

export const { reducer: workerReducer } = workerSlice;
