import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ITimerDB } from '../requests/types';
import type { ICraft, ICraftWithCosts, ICraftWithPrice } from '../resources/types';
import type { IWorkerResponseGetPricesResult } from '../worker/type';

interface IForgeState {
  materialPrices: Partial<Record<ICraft['itemId'], ICraftWithPrice>>;
  prices: Partial<Record<ICraft['itemId'], ICraftWithCosts>>;
  timerLaunched: ICraft['itemId'][];
  timers: ITimerDB[];
}

const initialState: IForgeState = {
  materialPrices: {},
  prices: {},
  timerLaunched: [],
  timers: []
};

const forgeSlice = createSlice({
  initialState,
  name: 'forge',
  reducers: {
    setPrices: (state, action: PayloadAction<IWorkerResponseGetPricesResult>) => {
      state.prices = action.payload.crafts;
      state.materialPrices = action.payload.materials;
    },
    setTimerLaunched: (state, action: PayloadAction<ICraft['itemId']>) => {
      state.timerLaunched = state.timerLaunched.filter((item) => item !== action.payload);
    },
    setTimerPressed: (state, action: PayloadAction<ICraft['itemId']>) => {
      state.timerLaunched.push(action.payload);
    },
    setTimers: (state, action: PayloadAction<ITimerDB[]>) => {
      state.timers = action.payload;
    }
  }
});

export const { setPrices, setTimerLaunched, setTimerPressed, setTimers } = forgeSlice.actions;

export const { reducer: forgeReducer } = forgeSlice;
