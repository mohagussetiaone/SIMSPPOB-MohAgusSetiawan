import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBanner } from './bannerThunks';
import { BannerState, Banner } from '@/types/information/Banner';

const initialState: BannerState = {
  banner: null,
  status: 'idle',
  error: null,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchBanner.fulfilled,
        (state, action: PayloadAction<Banner>) => {
          state.status = 'succeeded';
          state.banner = action.payload;
        }
      )
      .addCase(fetchBanner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
