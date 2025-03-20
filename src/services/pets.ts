import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IPetPrices, IWorkerResponseGetPetPricesResult } from '../worker/type';
import { ILanguage } from '../resources/lang/type';

interface IPetsState {
  materialPrices: Partial<Record<keyof ILanguage['items'], number>>;
  petPrices: IPetPrices[];
}

const initialState: IPetsState = {
  materialPrices: {},
  petPrices: []
};

const petsSlice = createSlice({
  initialState,
  name: 'pets',
  reducers: {
    setPetPrices: (state, action: PayloadAction<IWorkerResponseGetPetPricesResult>) => {
      state.petPrices = action.payload.pets;
      state.materialPrices = action.payload.materials;
    }
  }
});

export const { setPetPrices } = petsSlice.actions;

export const { reducer: petsReducer } = petsSlice;
