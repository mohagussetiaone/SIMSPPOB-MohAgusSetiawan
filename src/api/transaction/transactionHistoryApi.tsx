import localforage from 'localforage';
import api from '../apiService';
import { TransactionHistory } from '@/types/transaction/TransactionHistory';

const getAuthToken = async () => await localforage.getItem<string>('authToken');

export const getTransactionHistory = async (params: {
  offset: number;
  limit?: number;
}): Promise<{ data: TransactionHistory }> => {
  const token = await getAuthToken();
  return api.get('/transaction/history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};
