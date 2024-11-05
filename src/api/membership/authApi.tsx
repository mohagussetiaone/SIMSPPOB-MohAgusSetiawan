import api from '../apiService';
import {
  AuthResponseSignUp,
  AuthResponseSignIn,
  SigninData,
  SignupData,
} from '@/types/membership/Auth';

export const signin = (
  data: SigninData
): Promise<{ data: AuthResponseSignIn }> => api.post('/login', data);

export const signup = (
  data: SignupData
): Promise<{ data: AuthResponseSignUp }> => api.post('/registration', data);
