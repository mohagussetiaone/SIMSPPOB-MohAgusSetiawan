import localforage from 'localforage';
import api from '../apiService';
import { Balance } from '@/types/transaction/Balance';

const getAuthToken = async () => await localforage.getItem<string>('authToken');

export const getBalance = async (): Promise<{ data: Balance }> => {
  const token = await getAuthToken();
  return api.get('/balance', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
