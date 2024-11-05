import { Fragment, useState } from 'react';
import logoSims from '@/assets/images/logo/Logo.png';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from '@headlessui/react';
import { Link } from 'react-router-dom';

const routes = [
  { name: 'Top Up', to: '/topup' },
  { name: 'Transaction', to: '/transaction' },
  { name: 'Akun', to: '/account' },
];

const Navbar = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  //   let [isOpen, setIsOpen] = useState(false);

  //   function closeModal() {
  //     setIsOpen(!isOpen);
  //   }

  //   function openModal() {
  //     setIsOpen(!isOpen);
  //   }

  return (
    <nav className="bg-white sticky top-0 z-20 border-b border-gray-200">
      <Transition show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={setMobileFiltersOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="relative w-full flex h-full max-w-xs flex-col overflow-y-auto bg-white py-4 px-0 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg mx-4 font-medium text-gray-900">
                    Menu Jajanian
                  </h2>
                  <span
                    className="mr-2 flex h-10 w-10 items-center justify-center bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  >
                    <X className="h-6 w-6" />
                  </span>
                </div>
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only text-black">Categories</h3>
                  <div className="flex-col justify-center text-center pt-2 pb-1 px-2 py-3 font-medium text-gray-900">
                    {routes.map((menu) => (
                      <div
                        key={menu.name}
                        className="mb-2 rounded-md border hover:border-black border-gray-300"
                      >
                        <Link
                          to={menu.to}
                          className="block px-2 py-3 hover:text-black text-gray-700"
                        >
                          {menu.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <div className="w-full px-4 md:px-0 bg-white flex items-center justify-between mx-auto py-2">
        <NavLink to="/" className="flex gap-2 justify-start">
          <img src={logoSims} className="h-10" alt="SimsLogo.jpg" />
          <h1 className="flex justify-center items-center text-2xl text-black font-semibold">
            SIMS PPOB
          </h1>
        </NavLink>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {routes.map((route) => (
              <li key={route.name}>
                <NavLink
                  to={route.to}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded hover:text-[#F42619] md:p-0 ${isActive ? 'underline-offset-4 text-primary decoration-brand-600' : 'text-gray-900'}`
                  }
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex justify-end md:order-2 space-x-2 md:space-x-4">
            <span
              data-collapse-toggle="navbar-sticky"
              className="inline-flex items-center justify-center rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-500 hover:text-gray-700"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              // onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Menu className="w-6 h-6" />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
