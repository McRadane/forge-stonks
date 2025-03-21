import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuctionAttributes } from '@shared/types/requests';

interface IAttributesState {
  auctions: IAuctionAttributes[];
}

const initialState: IAttributesState = { auctions: [] };

const attributesSlice = createSlice({
  initialState,
  name: 'attributes',
  reducers: {
    setAttributes: (state, action: PayloadAction<IAuctionAttributes[]>) => {
      state.auctions = action.payload;
    }
  }
});

export const { setAttributes } = attributesSlice.actions;

export const attributesReducer = attributesSlice.reducer;
