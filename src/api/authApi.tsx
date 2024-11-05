import api from './apiService';
import { AuthResponse, SigninData, SignupData } from '@/types/Auth';

export const signin = (data: SigninData): Promise<{ data: AuthResponse }> =>
  api.post('/login', data);

export const signup = (data: SignupData): Promise<{ data: AuthResponse }> =>
  api.post('/registration', data);
