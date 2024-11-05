import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signinUser, signupUser } from './authThunks';
import {
  AuthState,
  AuthResponseSignIn,
  AuthResponseSignUp,
} from '@/types/membership/Auth';

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
        (state, action: PayloadAction<AuthResponseSignIn>) => {
          state.status = 'succeeded';
          state.token = action.payload.data.token;
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
        (state, action: PayloadAction<AuthResponseSignUp>) => {
          if (action.payload.status === 0) {
            state.status = 'succeeded';
            state.error = action.payload.message;
          } else {
            state.status = 'failed';
            state.error = action.payload.message;
          }
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
