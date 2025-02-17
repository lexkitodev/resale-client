import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  signIn: async () => {},
});
