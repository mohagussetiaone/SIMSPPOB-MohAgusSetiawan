import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBanner } from '@/api/information/BannerApi';

export const fetchBanner = createAsyncThunk(
  'banner/fetchBanner',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBanner();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to fetch banner'
        );
      } else {
        return rejectWithValue('Failed to fetch banner');
      }
    }
  }
);
