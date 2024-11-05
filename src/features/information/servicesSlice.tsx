import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchServices } from './servicesThunks';
import { ServicesState, Services } from '@/types/information/Service';

const initialState: ServicesState = {
  services: null,
  status: 'idle',
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Services>) => {
          state.status = 'succeeded';
          state.services = action.payload;
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default servicesSlice.reducer;
