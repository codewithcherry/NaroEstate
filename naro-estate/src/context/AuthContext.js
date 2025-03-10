"use client";

import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie"; // 🛠 Import js-cookie

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 🛠 Axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

// 🛠 Decode token
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));
    return decodedPayload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// 🛠 Check if token is expired
const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const signout = useCallback(async () => {
    setLoading(true);  // 🟡 Start loading
    try {
      const response = await axios.post("/api/user/signout");
      if (response.status === 200) {
        console.log("Successfully signed out");
        setIsLoggedIn(false);
        toast({
          title: "Signed Out",
          description: "You have been signed out successfully.",
        });
        router.push("/");
      } else {
        console.warn("Signout failed:", response);
      }
    } catch (error) {
      console.error("Error during signout:", error?.response?.data || error);
      toast({
        title: "Signout Failed",
        description: "Something went wrong while signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);  // 🟢 Stop loading
    }
  }, [router, toast]);
  

  const refreshAccessToken = useCallback(async () => {
    setLoading(true);
    try {
      const { status, data } = await axios.get("/api/user/refresh-token");
  
      if (status === 200) {
        console.log("Token refreshed successfully");
        setIsLoggedIn(true);
        return true;  // ✅ Success
      } else {
        console.warn("Failed to refresh token:", status, data);
      }
    } catch (error) {
      if (error?.response?.status !== 401) {  // 🟡 Ignore 401 (Unauthorized) errors
        console.error("Error refreshing token:", error?.response?.data || error);
      } else {
        console.log("No valid refresh token or session expired.");
      }
    } finally {
      setLoading(false);
    }
  
    return false;  // ❌ Fail, but don’t sign out
  }, []);
  
  

  // 🛠 Check auth status for all pages
  const checkAuthStatus = useCallback(async () => {
   await refreshAccessToken()
  }, [refreshAccessToken, signout]);

  useEffect(() => {
    checkAuthStatus(); // 🛠 Check auth status on every route
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
