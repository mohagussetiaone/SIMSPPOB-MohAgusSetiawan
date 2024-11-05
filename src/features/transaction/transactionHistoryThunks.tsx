import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactionHistory } from '@/api/transaction/transactionHistoryApi';

export const fetchTransactionHistory = createAsyncThunk(
  'transaction/fetchTransactionHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTransactionHistory();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to fetch transaction history'
        );
      } else {
        return rejectWithValue('Failed to fetch transaction history');
      }
    }
  }
);
