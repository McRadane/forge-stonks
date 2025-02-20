import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ICraft, ICraftWithCosts, ICraftWithPrice } from '../resources/types';
import type { ITimer, IWorkerResponseGetPricesResult } from '../worker/type';

interface IWorkerState {
  loading: boolean;
  loadingTimestamp: number;
  materialPrices: Partial<Record<ICraft['itemId'], ICraftWithPrice>>;
  prices: Partial<Record<ICraft['itemId'], ICraftWithCosts>>;
  timerLaunched: ICraft['itemId'][];
  timers: ITimer[];
}

const initialState: IWorkerState = {
  loading: false,
  loadingTimestamp: 0,
  materialPrices: {},
  prices: {},
  timerLaunched: [],
  timers: []
};

const workerSlice = createSlice({
  initialState,
  name: 'worker',
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setNotLoading: (state) => {
      state.loading = false;
      state.loadingTimestamp = Date.now();
    },
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
    setTimers: (state, action: PayloadAction<ITimer[]>) => {
      state.timers = action.payload;
    }
  }
});

export const { setLoading, setNotLoading, setPrices, setTimerLaunched, setTimerPressed, setTimers } = workerSlice.actions;

export const { reducer: workerReducer } = workerSlice;
