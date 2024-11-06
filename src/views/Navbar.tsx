import { useState, useEffect } from 'react';
import logoSims from '@/assets/images/logo/Logo.png';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Routes from './Routes';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleViewportChange = (
      event: MediaQueryListEvent | MediaQueryList
    ) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };
    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change', handleViewportChange);
    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-20 border-b border-gray-200">
      <div className="w-full p-4 md:px-0 bg-white flex items-center justify-between mx-auto">
        <NavLink to="/" className="flex items-center gap-2 justify-start">
          <img src={logoSims} className="h-6 text-center" alt="SimsLogo.jpg" />
          <h1 className="flex justify-center items-center text-xl text-black font-semibold">
            SIMS PPOB
          </h1>
        </NavLink>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <Routes onNavigate={() => {}} />
          </ul>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <Menu className="w-8 h-8" />
            </Button>
          </SheetTrigger>
          <SheetContent className="md:hidden">
            <SheetHeader>
              <SheetTitle className="flex">All Menu</SheetTitle>
              <Routes onNavigate={handleNavigate} />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
