import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, role: UserRole) => Promise<void>;
    signup: (name: string, email: string, role: UserRole) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Simulate checking for stored session
    useEffect(() => {
        // In a real app, check AsyncStorage here
    }, []);

    const login = async (email: string, role: UserRole) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockUser: User = {
                id: '123',
                name: 'Test User',
                email,
                role,
                avatar: 'https://i.pravatar.cc/150?u=test_user',
            };
            setUser(mockUser);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (name: string, email: string, role: UserRole) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockUser: User = {
                id: '124',
                name,
                email,
                role,
                avatar: 'https://i.pravatar.cc/150?u=new_user',
            };
            setUser(mockUser);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
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
