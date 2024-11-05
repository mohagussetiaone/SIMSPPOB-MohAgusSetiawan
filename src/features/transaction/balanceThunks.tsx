import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBalance } from '@/api/transaction/balanceApi';

export const fetchBalance = createAsyncThunk(
  'balance/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBalance();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to fetch balance'
        );
      } else {
        return rejectWithValue('Failed to fetch balance');
      }
    }
  }
);
