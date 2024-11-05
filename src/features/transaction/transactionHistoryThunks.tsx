import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionHistory } from '@/types/transaction/TransactionHistory';
import { getTransactionHistory } from '@/api/transaction/transactionHistoryApi';

export const fetchTransactionHistory = createAsyncThunk<
  TransactionHistory,
  { params: { offset: number; limit?: number } }
>(
  'transaction/fetchTransactionHistory',
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await getTransactionHistory(params); // Panggil dengan objek params
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
