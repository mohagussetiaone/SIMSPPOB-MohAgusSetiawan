import api from '../apiService';
import { TopupData, TopUpResponse } from '@/types/transaction/Topup';

export const topup = (data: TopupData): Promise<{ data: TopUpResponse }> =>
  api.post('/topup', data);
