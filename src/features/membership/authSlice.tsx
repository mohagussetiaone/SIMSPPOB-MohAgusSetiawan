import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signinUser, signupUser } from './authThunks';
import { AuthState, AuthResponse } from '@/types/Auth';

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        signinUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = 'succeeded';
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signinUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = 'succeeded';
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
