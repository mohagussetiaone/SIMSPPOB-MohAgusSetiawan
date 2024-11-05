export interface TopupData {
  top_up_amount: number;
}

export interface TopUpResponse {
  status: number;
  message: string;
  data: {
    balance: number | null;
  };
}

export interface TopupState {
  topup: TopupData | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
