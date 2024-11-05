import Accounts from './components/Accounts';
import { useAuthValidation } from '@/hooks/useLoader';

const index = () => {
  useAuthValidation();

  return <Accounts />;
};

export default index;
