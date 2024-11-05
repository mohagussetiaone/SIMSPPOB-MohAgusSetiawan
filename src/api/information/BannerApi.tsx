import localforage from 'localforage';
import api from '../apiService';
import { Banner } from '@/types/information/Banner';

const getAuthToken = async () => await localforage.getItem<string>('authToken');

export const getBanner = async (): Promise<{ data: Banner }> => {
  const token = await getAuthToken();
  return api.get('/banner', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
