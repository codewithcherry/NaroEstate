'use client';

import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(base64));
    return decodedPayload;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname(); // Detect current route

  const signout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    // router.push('/login'); // Redirect to login page after signing out
  }, [router]);

  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      if (isTokenExpired(token)) {
        console.log("token expired")
        toast({
          title: 'Session Expired',
          description: 'Your login session has expired. Please log in again.',
        });
        signout();
      } else {
        console.log("token valid")
        setIsLoggedIn(true);
      }
    } else {
        console.log('token not found/invalid');   
        signout();
    }
  }, [signout, toast]);

  useEffect(() => {
    checkAuthStatus(); // Check token on initial render and on every route change
  }, [pathname, checkAuthStatus]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
