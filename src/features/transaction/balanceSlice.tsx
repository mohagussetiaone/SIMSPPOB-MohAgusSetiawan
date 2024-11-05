import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBalance } from './balanceThunks';
import { BalanceState, Balance } from '@/types/transaction/Balance';

const initialState: BalanceState = {
  balance: null,
  status: 'idle',
  error: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchBalance.fulfilled,
        (state, action: PayloadAction<Balance>) => {
          state.status = 'succeeded';
          state.balance = action.payload;
        }
      )
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default balanceSlice.reducer;
