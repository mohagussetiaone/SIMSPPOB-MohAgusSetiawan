export interface Balance {
  data: {
    balance: number;
  };
}

export interface BalanceState {
  balance: Balance | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
