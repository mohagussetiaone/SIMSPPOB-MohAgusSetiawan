import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signin, signup } from '@/api/authApi';
import { AuthResponse, SigninData, SignupData } from '@/types/Auth';

export const signinUser = createAsyncThunk<AuthResponse, SigninData>(
  'auth/signinUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await signin(data);
      return response.data;
    } catch (error) {
      // Pastikan error adalah instance dari AxiosError
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to sign in'
        );
      } else {
        return rejectWithValue('Failed to sign in');
      }
    }
  }
);

export const signupUser = createAsyncThunk<AuthResponse, SignupData>(
  'auth/signupUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await signup(data);
      return response.data;
    } catch (error) {
      // Pastikan error adalah instance dari AxiosError
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to sign up'
        );
      } else {
        return rejectWithValue('Failed to sign up');
      }
    }
  }
);
