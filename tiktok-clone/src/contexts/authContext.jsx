'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api-config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (stored && token) {
      try {
        const parsedUser = JSON.parse(stored);
        parsedUser.id = parseInt(parsedUser.id);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { token, user: userData } = response.data;
  userData.id = parseInt(userData.id);
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  setUser(userData);
  return userData;
};

  const signup = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    const { token, user: userData } = response.data;
    userData.id = parseInt(userData.id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}