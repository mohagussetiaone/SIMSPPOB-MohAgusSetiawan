type Route = {
  name: string;
  to: string;
};

export const routes: Route[] = [
  { name: 'Top Up', to: '/topup' },
  { name: 'Transaction', to: '/transaction' },
  { name: 'Akun', to: '/account' },
];
