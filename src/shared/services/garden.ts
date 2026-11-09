import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { itemsFuels, itemsOrganicMatter } from '@shared/resources/garden';
import type { IWorkerResponseGetGardenPricesResult } from '@shared/types/worker';

interface IGardenState {
  fuels: Partial<Record<keyof typeof itemsFuels, { price: number; ratio: number }>>;
  organicMatters: Partial<Record<keyof typeof itemsOrganicMatter, { price: number; ratio: number }>>;
}

const initialState: IGardenState = {
  fuels: {},

  organicMatters: {}
};

const gardenSlice = createSlice({
  initialState,
  name: 'garden',
  reducers: {
    setGardenPrices: (state, action: PayloadAction<IWorkerResponseGetGardenPricesResult>) => {
      state.organicMatters = action.payload.organics;
      state.fuels = action.payload.fuels;
    }
  }
});

export const { setGardenPrices } = gardenSlice.actions;

export const { reducer: gardenReducer } = gardenSlice;
