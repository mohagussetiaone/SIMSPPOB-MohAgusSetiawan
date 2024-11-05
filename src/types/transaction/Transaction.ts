export interface Transaction {
  service_code: string;
  invoice_number: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}

export interface TransactionResponse {
  status: number;
  message: string;
  data: Transaction;
}

export interface TransactionData {
  total_amount: number;
  service_code?: string;
}

export interface TransactionState {
  transaction: Transaction | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
