'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { ROLE_PERMISSIONS, ROLES } from '../utils/permissions';

const AuthContext = createContext({
    user: null,
    login: async () => { },
    logout: () => { },
    hasPermission: () => false,
    isLoading: true,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage or session
        const storedUser = localStorage.getItem('nucleus_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            setUser(data.user);
            localStorage.setItem('nucleus_user', JSON.stringify(data.user));
            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false; // Or throw/return error message
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nucleus_user');
    };

    const hasPermission = (permission) => {
        if (!user) return false;
        const permissions = ROLE_PERMISSIONS[user.role] || [];
        return permissions.includes(permission);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasPermission, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
