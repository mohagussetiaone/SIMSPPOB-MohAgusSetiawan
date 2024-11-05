import localforage from 'localforage';
import api from '../apiService';
import { Services } from '@/types/information/Service';

const getAuthToken = async () => await localforage.getItem<string>('authToken');

export const getServices = async (): Promise<{ data: Services }> => {
  const token = await getAuthToken();
  return api.get('/services', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
