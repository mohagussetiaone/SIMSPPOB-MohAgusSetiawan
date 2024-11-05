export interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
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
  user: AuthResponse['user'] | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
