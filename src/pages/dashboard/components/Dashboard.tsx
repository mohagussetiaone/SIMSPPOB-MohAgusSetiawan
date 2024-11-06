import ServiceCategory from './ServiceCategory';
import BannerPromo from './BannerPromo';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Loading from '@/components/loading';
import Error from '@/components/error';

const Dashboard = () => {
  const { status: profileStatus, error: profileError } = useSelector(
    (state: RootState) => state.profile
  );
  const { status: balanceStatus, error: balanceError } = useSelector(
    (state: RootState) => state.balance
  );
  const { status: bannerStatus, error: bannerError } = useSelector(
    (state: RootState) => state.banner
  );
  const { status: servicesStatus, error: servicesError } = useSelector(
    (state: RootState) => state.services
  );

  const isLoading =
    profileStatus === 'loading' ||
    balanceStatus === 'loading' ||
    bannerStatus === 'loading' ||
    servicesStatus === 'loading';

  const hasError = profileError || balanceError || bannerError || servicesError;

  if (hasError) {
    return <Error />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <ServiceCategory />
      <BannerPromo />
    </>
  );
};

export default Dashboard;
