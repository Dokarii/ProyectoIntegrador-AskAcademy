import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, isAuthenticated, login, logout, register } from '../services/authService';
import { initializeStorage } from '../services/storageService';

interface AuthContextType {
  user: { id: string; username: string; role: string } | null;
  isLoggedIn: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, role: 'teacher' | 'student') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isTeacher: false,
  isStudent: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; username: string; role: string } | null>(null);
  
  useEffect(() => {
    initializeStorage();
    
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);
  
  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const token = await login(username, password);
      if (token) {
        const user = getCurrentUser();
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  const handleRegister = async (username: string, password: string, role: 'teacher' | 'student'): Promise<boolean> => {
    try {
      const token = await register(username, password, role);
      if (token) {
        const user = getCurrentUser();
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };
  
  const handleLogout = () => {
    logout();
    setUser(null);
  };
  
  const value = {
    user,
    isLoggedIn: isAuthenticated(),
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};