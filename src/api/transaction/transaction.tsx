import localforage from 'localforage';
import api from '../apiService';
import {
  TransactionData,
  TransactionResponse,
} from '@/types/transaction/Transaction';

const getAuthToken = async () => await localforage.getItem<string>('authToken');

export const transaction = async (
  data: TransactionData
): Promise<{ data: TransactionResponse }> => {
  const token = await getAuthToken();
  return api.post('/transaction', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
