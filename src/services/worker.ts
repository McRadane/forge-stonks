import { createSlice } from '@reduxjs/toolkit';


interface IWorkerState {
  loading: boolean;
  loadingTimestamp: number;
}

const initialState: IWorkerState = {
  loading: false,
  loadingTimestamp: 0
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
    }
  }
});

export const { setLoading, setNotLoading } = workerSlice.actions;

export const { reducer: workerReducer } = workerSlice;
