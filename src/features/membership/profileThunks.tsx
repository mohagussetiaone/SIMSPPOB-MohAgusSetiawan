import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from '@/api/membership/profileApi';
import { UpdateProfileData } from '@/types/membership/Profile';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to fetch profile'
        );
      } else {
        return rejectWithValue('Failed to fetch profile');
      }
    }
  }
);

// Thunk untuk PUT Update Profile
export const putProfile = createAsyncThunk(
  'profile/putProfile',
  async (data: UpdateProfileData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to update profile'
        );
      } else {
        return rejectWithValue('Failed to update profile');
      }
    }
  }
);

// Thunk untuk Update Profile Image
export const updateProfileImage = createAsyncThunk(
  'profile/updateProfileImage',
  async (file: File, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('profile_image', file);

    try {
      const response = await uploadProfileImage(formData);
      return response.data.profile_image; // Assuming the response contains the updated image URL
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Failed to update profile image'
        );
      } else {
        return rejectWithValue('Failed to update profile image');
      }
    }
  }
);
