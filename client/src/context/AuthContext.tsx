import React, { createContext, useContext, ReactNode, useState } from 'react';
import {saveToken, removeToken, isAuthenticatedToken} from "../utils/auth";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAuthenticatedToken());

    const login = (token: string) => {
        setIsAuthenticated(true);
        saveToken(token);
    }
    const logout = () => {
        setIsAuthenticated(false);
        removeToken();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
