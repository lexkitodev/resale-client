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
    const response = await authService.signUp({ email, password, marketingEmails });
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
