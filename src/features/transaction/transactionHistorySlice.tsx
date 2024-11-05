import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTransactionHistory } from './transactionHistoryThunks';
import {
  TransactionHistory,
  TransactionHistoryState,
} from '@/types/transaction/TransactionHistory';

const initialState: TransactionHistoryState = {
  transactionHistory: null,
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactionHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchTransactionHistory.fulfilled,
        (state, action: PayloadAction<TransactionHistory>) => {
          state.status = 'succeeded';
          state.transactionHistory = action.payload;
        }
      )
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
