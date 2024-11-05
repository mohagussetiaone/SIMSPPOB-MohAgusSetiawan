import NotFoundPage from './components/NotFound';
import { useAuthValidation } from '@/hooks/useLoader';
const index = () => {
  useAuthValidation();

  return <NotFoundPage />;
};

export default index;
