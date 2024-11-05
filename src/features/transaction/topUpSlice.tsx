import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { topupUser } from './topupThunks';
import { TopUpResponse, TopupState } from '@/types/transaction/Topup';

const initialState: TopupState = {
  topup: null,
  token: null,
  status: 'idle',
  error: null,
};

const topupSlice = createSlice({
  name: 'topup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        topupUser.fulfilled,
        (state, action: PayloadAction<TopUpResponse>) => {
          if (action.payload.status === 0) {
            state.status = 'succeeded';
            state.error = action.payload.message;
          } else {
            state.status = 'failed';
            state.error = action.payload.message;
          }
        }
      )
      .addCase(topupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default topupSlice.reducer;
