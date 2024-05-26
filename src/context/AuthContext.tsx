// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as userService from '../service/userService'; // Adjust the import path as necessary

interface User {
    username: string;
    fullName: string;
    avatar: string;
    email: string;
    // Add other user properties as needed
}

interface AuthContextData {
    isAuthenticated: boolean;
    user: User | null;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userService.isAuthenticated());
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
    }, [isAuthenticated]);

    const logout = async () => {
        await userService.logoutUser();
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
