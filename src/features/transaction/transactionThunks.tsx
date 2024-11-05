import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { transaction } from '@/api/transaction/transaction';
import {
  TransactionData,
  TransactionResponse,
} from '@/types/transaction/Transaction';

export const transactionUser = createAsyncThunk<
  TransactionResponse,
  TransactionData
>('transaction/transactionUser', async (data, { rejectWithValue }) => {
  try {
    const response = await transaction(data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(
        error.response.data?.message || 'Failed to transaction'
      );
    } else {
      return rejectWithValue('Failed to transaction');
    }
  }
});
