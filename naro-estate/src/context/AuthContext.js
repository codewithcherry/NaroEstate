'use client';

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// Utility functions for cookies
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const setCookie = (name, value, days = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; Secure; HttpOnly`;
};

const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
};

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try {
            const tokenValue = getCookie('authToken');
            if (tokenValue) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error checking authentication token:', error);
        }
    }, []);

    const signout = useCallback(() => {
        try {
            deleteCookie('authToken');
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, signout }}>
            {children}
        </AuthContext.Provider>
    );
};
