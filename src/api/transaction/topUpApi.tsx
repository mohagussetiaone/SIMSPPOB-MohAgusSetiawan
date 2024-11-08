import localforage from 'localforage';
import api from '../apiService';
import { TopupData, TopUpResponse } from '@/types/transaction/Topup';

const getAuthToken = async () => await localforage.getItem<string>('authToken');

export const topup = async (
  data: TopupData
): Promise<{ data: TopUpResponse }> => {
  const token = await getAuthToken();
  return api.post('/topup', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
