import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getServices } from '@/api/information/ServiceApi';

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getServices();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to fetch services'
        );
      } else {
        return rejectWithValue('Failed to fetch services');
      }
    }
  }
);
