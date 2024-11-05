import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signin, signup } from '@/api/membership/authApi';
import {
  AuthResponseSignIn,
  AuthResponseSignUp,
  SigninData,
  SignupData,
} from '@/types/membership/Auth';

export const signinUser = createAsyncThunk<AuthResponseSignIn, SigninData>(
  'auth/signinUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await signin(data);
      return response.data;
    } catch (error) {
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

export const signupUser = createAsyncThunk<AuthResponseSignUp, SignupData>(
  'auth/signupUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await signup(data);
      return response.data;
    } catch (error) {
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
