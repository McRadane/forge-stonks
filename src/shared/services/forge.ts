import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IForgeCraft, IForgeCraftWithCosts, IForgeCraftWithPrice } from '@shared/resources/types';
import { ITimerDB } from '@shared/types/requests';
import type { IWorkerResponseGetPricesResult } from '@shared/types/worker';

interface IForgeState {
  forgePrices: Partial<Record<IForgeCraft['itemId'], IForgeCraftWithCosts>>;
  materialPrices: Partial<Record<IForgeCraft['itemId'], IForgeCraftWithPrice>>;
  timerLaunched: IForgeCraft['itemId'][];
  timers: ITimerDB[];
}

const initialState: IForgeState = {
  forgePrices: {},
  materialPrices: {},
  timerLaunched: [],
  timers: []
};

const forgeSlice = createSlice({
  initialState,
  name: 'forge',
  reducers: {
    setForgePrices: (state, action: PayloadAction<IWorkerResponseGetPricesResult>) => {
      state.forgePrices = action.payload.crafts;
      state.materialPrices = action.payload.materials;
    },
    setTimerLaunched: (state, action: PayloadAction<IForgeCraft['itemId']>) => {
      state.timerLaunched = state.timerLaunched.filter((item) => item !== action.payload);
    },
    setTimerPressed: (state, action: PayloadAction<IForgeCraft['itemId']>) => {
      state.timerLaunched.push(action.payload);
    },
    setTimers: (state, action: PayloadAction<ITimerDB[]>) => {
      state.timers = action.payload;
    }
  }
});

export const { setForgePrices, setTimerLaunched, setTimerPressed, setTimers } = forgeSlice.actions;

export const { reducer: forgeReducer } = forgeSlice;
