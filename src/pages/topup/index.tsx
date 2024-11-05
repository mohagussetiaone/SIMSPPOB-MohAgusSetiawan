import Topup from './components/Topup';
import { useAuthValidation } from '@/hooks/useLoader';

const index = () => {
  useAuthValidation();

  return <Topup />;
};

export default index;
