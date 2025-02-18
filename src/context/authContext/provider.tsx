import { useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse } from '../../services/authService';
import { AuthContext } from './context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await authService.signIn({ email, password });
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const signUp = async (email: string, password: string, marketingEmails: boolean) => {
    try {
      console.log('AuthProvider: Attempting signup');
      const response = await authService.signUp({ email, password, marketingEmails });
      console.log('AuthProvider: Signup successful');
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('AuthProvider: Signup failed', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
