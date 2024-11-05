export interface Transaction {
  service_code: string;
  invoice_number: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}
