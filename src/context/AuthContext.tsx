import React, { createContext, useContext, useState } from 'react';
import type { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS = [
  { id: '1', email: 'admin@edu.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: '2', email: 'student@edu.com', password: 'student123', role: 'student', name: 'John Student' },
] as const;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string) => {
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    setAuthState({
      user: userWithoutPassword,
      isAuthenticated: true,
    });
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    // In a real app, this would make an API call to create the user
    console.log('Registering user:', userData);
    // For demo, automatically log them in
    setAuthState({
      user: {
        id: crypto.randomUUID(),
        email: userData.email,
        name: userData.name,
        role: 'student',
      },
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
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