import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { authLoader } from '@/hooks/useLoader';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layouts';
import Dashboard from './pages/dashboard';
import Payment from './pages/dashboard/components/Payment';
import Topup from './pages/topup';
import Transaction from './pages/transaction';
import Accounts from './pages/accounts';
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import NotFoundPage from './pages/notfound';

const router = createBrowserRouter([
  {
    path: '/',
    loader: authLoader,
    element: <Layout />,
    children: [
      {
        path: '/',
        loader: authLoader,
        Component() {
          return <Dashboard />;
        },
      },
      {
        path: '/payment/:idPayment',
        loader: authLoader,
        Component() {
          return <Payment />;
        },
      },
      {
        path: '/topup',
        loader: authLoader,
        Component() {
          return <Topup />;
        },
      },
      {
        path: '/transaction',
        loader: authLoader,
        Component() {
          return <Transaction />;
        },
      },
      {
        path: '/account',
        loader: authLoader,
        Component() {
          return <Accounts />;
        },
      },
    ],
  },
  {
    path: '/signin',
    loader: authLoader,
    Component: SignIn,
  },
  {
    path: '/signup',
    loader: authLoader,
    Component: SignUp,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
