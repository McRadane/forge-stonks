import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICraftWithCosts } from '../craft/functions';
import { ICraft } from '../resources/crafts';
import { ITimer } from '../worker/type';

export interface IWorkerState {
  prices: Partial<Record<ICraft['itemId'], ICraftWithCosts>>;
  loading: boolean;
  timers: ITimer[];
  timerLaunched: ICraft['itemId'][];
}

const initialState: IWorkerState = {
  prices: {},
  loading: false,
  timers: [],
  timerLaunched: []
};

export const workerSlice = createSlice({
  initialState,
  name: 'worker',
  reducers: {
    setPrices: (state, action: PayloadAction<Record<ICraft['itemId'], ICraftWithCosts>>) => {
      state.prices = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setNotLoading: (state) => {
      state.loading = false;
    },
    setTimers: (state, action: PayloadAction<ITimer[]>) => {
      state.timers = action.payload;
    },
    setTimerPressed: (state, action: PayloadAction<ICraft['itemId']>) => {
      state.timerLaunched.push(action.payload);
    },
    setTimerLaunched: (state, action: PayloadAction<ICraft['itemId']>) => {
      state.timerLaunched = state.timerLaunched.filter((item) => item !== action.payload);
    }
  }
});

export const { setPrices, setLoading, setNotLoading, setTimers, setTimerLaunched, setTimerPressed } = workerSlice.actions;

export const { reducer: workerReducer } = workerSlice;
