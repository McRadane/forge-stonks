import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { ICraft, ICraftWithCosts } from '../resources/types';
import type { ITimer } from '../worker/type';

interface IWorkerState {
  loading: boolean;
  prices: Partial<Record<ICraft['itemId'], ICraftWithCosts>>;
  timerLaunched: ICraft['itemId'][];
  timers: ITimer[];
}

const initialState: IWorkerState = {
  loading: false,
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
    },
    setPrices: (state, action: PayloadAction<Record<ICraft['itemId'], ICraftWithCosts>>) => {
      state.prices = action.payload;
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
