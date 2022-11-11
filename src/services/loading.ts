import { createSlice } from '@reduxjs/toolkit';

export interface ILoadingState {
  loading: boolean;
}

const initialState: ILoadingState = {
  loading: false
};

export const loadingSlice = createSlice({
  initialState,
  name: 'loading',
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setNotLoading: (state) => {
      state.loading = false;
    }
  }
});

export const { setLoading, setNotLoading } = loadingSlice.actions;

export const { reducer: loadingReducer } = loadingSlice;
