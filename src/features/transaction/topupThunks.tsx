import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { topup } from '@/api/transaction/topUpApi';
import { TopupData, TopUpResponse } from '@/types/transaction/Topup';

export const topupUser = createAsyncThunk<TopUpResponse, TopupData>(
  'topup/topupUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await topup(data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to topup'
        );
      } else {
        return rejectWithValue('Failed to topup');
      }
    }
  }
);
