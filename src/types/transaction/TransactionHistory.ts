export interface History {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

export interface TransactionHistory {
  data: {
    offset: number;
    limit: number;
    records: History[];
  };
}

export interface TransactionHistoryState {
  transactionHistory: TransactionHistory | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
