import { User } from '../types';
import { TOKEN_KEY } from '../utils/constants';
import { getUserByUsername, saveUser } from './storageService';

export const login = (username: string, password: string): string | null => {
  const user = getUserByUsername(username);
  
  if (!user || user.password !== password) {
    return null;
  }
  
  // Create a simple token (in a real app, this would be a JWT)
  const token = btoa(JSON.stringify({ id: user.id, username: user.username, role: user.role }));
  localStorage.setItem(TOKEN_KEY, token);
  
  return token;
};

export const register = (username: string, password: string, role: 'teacher' | 'student'): string | null => {
  // Check if username already exists
  const existingUser = getUserByUsername(username);
  if (existingUser) {
    return null;
  }
  
  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}`,
    username,
    password,
    role,
    subjects: ['1', '2', '3'] // Assign all subjects by default
  };
  
  saveUser(newUser);
  
  // Create token
  const token = btoa(JSON.stringify({ id: newUser.id, username: newUser.username, role: newUser.role }));
  localStorage.setItem(TOKEN_KEY, token);
  
  return token;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = (): { id: string; username: string; role: string } | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return null;
  }
  
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const isTeacher = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'teacher';
};

export const isStudent = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'student';
};