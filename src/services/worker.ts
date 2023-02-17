import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { itemsFuels, itemsOrganicMatter } from '../resources/garden';
import type { ICraft, ICraftWithCosts, ICraftWithPrice } from '../resources/types';
import type { ITimer, IWorkerResponseGetGardenPricesResult, IWorkerResponseGetPricesResult } from '../worker/type';

interface IWorkerState {
  fuels: Partial<Record<keyof typeof itemsFuels, { price: number; ratio: number }>>;
  loading: boolean;
  materialPrices: Partial<Record<ICraft['itemId'], ICraftWithPrice>>;
  organicMatters: Partial<Record<keyof typeof itemsOrganicMatter, { price: number; ratio: number }>>;
  prices: Partial<Record<ICraft['itemId'], ICraftWithCosts>>;
  timerLaunched: ICraft['itemId'][];
  timers: ITimer[];
}

const initialState: IWorkerState = {
  fuels: {},
  loading: false,
  materialPrices: {},
  organicMatters: {},
  prices: {},
  timerLaunched: [],
  timers: []
};

const workerSlice = createSlice({
  initialState,
  name: 'worker',
  reducers: {
    setGardenPrices: (state, action: PayloadAction<IWorkerResponseGetGardenPricesResult>) => {
      state.organicMatters = action.payload.organics;
      state.fuels = action.payload.fuels;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setNotLoading: (state) => {
      state.loading = false;
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

export const { setGardenPrices, setLoading, setNotLoading, setPrices, setTimerLaunched, setTimerPressed, setTimers } = workerSlice.actions;

export const { reducer: workerReducer } = workerSlice;
