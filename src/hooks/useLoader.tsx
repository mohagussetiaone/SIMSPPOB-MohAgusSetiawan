import { useEffect } from 'react';
import { toast } from 'react-toastify';
import localforage from 'localforage';
import { jwtDecode } from 'jwt-decode';
import { redirect, useNavigate } from 'react-router-dom';
import { clearAllStorage } from '@/store/authForage';

type AuthLoaderProps = {
  request: Request;
};

type TokenPayload = {
  exp: number;
};

export const authLoader = async ({ request }: AuthLoaderProps) => {
  const url = new URL(request.url);
  const authToken = await localforage.getItem<string>('authToken');

  // const isAuthenticated = authResponse?.data?.message === "Authenticated";
  const publicPaths = ['/signin', '/signup'];
  const isPublicPath = publicPaths.includes(url.pathname);

  // Redirect to '/signin' if not authenticated and accessing '/' or any protected path
  if (!authToken && (url.pathname === '/' || !isPublicPath)) {
    return redirect('/signin');
  }

  // If authenticated, allow access to '/signup' and '/signup/error'
  if (authToken && ['/signin', '/signup'].includes(url.pathname)) {
    return redirect('/');
  }

  // If authenticated, allow access to the requested route
  return authToken;
};

export function useAuthValidation() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthValidation = async () => {
      try {
        const authToken = await localforage.getItem<string>('authToken');
        if (!authToken) {
          // If no token, redirect to login
          navigate('/signin');
          return;
        }
        const tokenDecode = jwtDecode<TokenPayload>(authToken);
        const currentUnixTime = Math.floor(Date.now() / 1000);

        if (tokenDecode.exp < currentUnixTime) {
          // If token expired, clear storage and show toast notification
          await clearAllStorage();
          await new Promise((resolve) => {
            toast.error('Token is expired, back to login', {
              delay: 2350,
              onClose: resolve,
            });
            navigate('/signin');
          });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/signin');
      }
    };
    handleAuthValidation();
  }, [navigate]);
}
