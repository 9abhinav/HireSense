import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('hiresense_token');
    const savedUser = localStorage.getItem('hiresense_user');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('hiresense_token');
        localStorage.removeItem('hiresense_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call — replace with real FastAPI call
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockUser = {
        id: '1',
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        avatar: null,
        targetRole: 'Backend Developer',
        joinedAt: new Date().toISOString()
      };
      const mockToken = 'eyJhbGciOiJIUzI1NiJ9.mock_token';

      localStorage.setItem('hiresense_token', mockToken);
      localStorage.setItem('hiresense_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setToken(mockToken);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: '1',
        name,
        email,
        avatar: null,
        targetRole: 'Software Engineer',
        joinedAt: new Date().toISOString()
      };
      const mockToken = 'eyJhbGciOiJIUzI1NiJ9.mock_token';

      localStorage.setItem('hiresense_token', mockToken);
      localStorage.setItem('hiresense_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setToken(mockToken);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('hiresense_token');
    localStorage.removeItem('hiresense_user');
    setUser(null);
    setToken(null);
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('hiresense_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}
