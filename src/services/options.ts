import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { initialState, IOptionsState } from './common';

const optionsSlice = createSlice({
  initialState,
  name: 'Response-Options',
  reducers: {
    setOptions: (state, action: PayloadAction<Partial<IOptionsState>>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setOptions } = optionsSlice.actions;

export const { reducer: optionsReducer } = optionsSlice;
