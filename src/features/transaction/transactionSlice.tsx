import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { transactionUser } from './transactionThunks';
import {
  TransactionResponse,
  TransactionState,
} from '@/types/transaction/Transaction';

const initialState: TransactionState = {
  transaction: null,
  token: null,
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transactionUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        transactionUser.fulfilled,
        (state, action: PayloadAction<TransactionResponse>) => {
          if (action.payload.status === 0) {
            state.status = 'succeeded';
            state.error = action.payload.message;
          } else {
            state.status = 'failed';
            state.error = action.payload.message;
          }
        }
      )
      .addCase(transactionUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
