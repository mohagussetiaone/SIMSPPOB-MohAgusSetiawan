import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '@/constant/routes';

interface RoutesProps {
  onNavigate: (route: string) => void;
}

const Routes: React.FC<RoutesProps> = ({ onNavigate }) => {
  return (
    <ul className="flex flex-col justify-start p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
      {routes.map((route) => (
        <li key={route.name} onClick={() => onNavigate(route.to)}>
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
  );
};

export default Routes;
