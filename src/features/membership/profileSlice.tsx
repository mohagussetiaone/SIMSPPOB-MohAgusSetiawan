import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile, putProfile, updateProfileImage } from './profileThunks';
import { ProfileState, Profile } from '@/types/membership/Profile';

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.status = 'succeeded';
          state.profile = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // PUT Update Profile
      .addCase(putProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        putProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.status = 'succeeded';
          state.profile = action.payload;
        }
      )
      .addCase(putProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // POST Upload Profile Image
      .addCase(updateProfileImage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
