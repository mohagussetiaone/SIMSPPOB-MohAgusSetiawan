import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../views/Navbar';
import Banner from '@/pages/dashboard/components/Banner';

const Layout: React.FC = () => {
  const location = useLocation();
  const isAccountsPage = location.pathname === '/account';

  return (
    <div className="flex h-full max-w-6xl mx-auto">
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className={`h-full flex-none transition-all`}>
          <div className="h-full">
            <Navbar />
            {!isAccountsPage && <Banner />}
            <div className="mx-auto mb-auto h-auto min-h-[70vh] px-4 md:px-2 xl:px-0">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
