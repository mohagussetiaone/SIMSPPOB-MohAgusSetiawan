export interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface AuthResponseSignIn {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

export interface AuthResponseSignUp {
  status: number;
  message: string;
  data: null;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
