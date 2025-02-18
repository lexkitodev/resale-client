import { createContext, useState, ReactNode } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  signUp: (email: string, password: string, marketingEmails: boolean) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());

  const signUp = async (email: string, password: string, marketingEmails: boolean) => {
    await authService.signUp({ email, password, marketingEmails });
    setIsAuthenticated(true);
  };

  const signIn = async (email: string, password: string) => {
    await authService.signIn({ email, password });
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await authService.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
