import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../views/Navbar';
import Banner from '@/pages/dashboard/components/Banner';

export default function Layout() {
  const location = useLocation();
  const isAccountsPage = location.pathname === '/account';

  return (
    <div className="flex h-full max-w-6xl mx-auto">
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className={`h-full flex-none transition-all`}>
          <div className="h-full">
            <Navbar />
            {!isAccountsPage && <Banner />}
            <div className="mx-auto mb-auto h-auto min-h-[70vh]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
