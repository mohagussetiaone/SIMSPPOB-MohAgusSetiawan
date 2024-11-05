import Dashboard from './components/Dashboard';
import { useAuthValidation } from '@/hooks/useLoader';
const index = () => {
  useAuthValidation();

  return <Dashboard />;
};

export default index;
