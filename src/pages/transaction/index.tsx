import Transaction from './components/Transaction';
import { useAuthValidation } from '@/hooks/useLoader';

const index = () => {
  useAuthValidation();

  return <Transaction />;
};

export default index;
