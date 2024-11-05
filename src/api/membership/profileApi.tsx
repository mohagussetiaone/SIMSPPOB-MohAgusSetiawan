import api from '../apiService';
import localforage from 'localforage';
import { Profile, UpdateProfileData } from '@/types/membership/Profile';

// Fungsi untuk mendapatkan Bearer Token
const getAuthToken = async () => await localforage.getItem<string>('authToken');

// GET request untuk mengambil data profil
export const getProfile = async (): Promise<{ data: Profile }> => {
  const token = await getAuthToken();
  return api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// PUT request untuk mengupdate data profil
export const updateProfile = async (
  data: UpdateProfileData
): Promise<{ data: Profile }> => {
  const token = await getAuthToken();
  return api.put('/profile/update', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadProfileImage = async (
  formData: FormData
): Promise<{ data: { profile_image: string } }> => {
  const token = await getAuthToken();
  return api.post('/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};
