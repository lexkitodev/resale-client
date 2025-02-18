import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { socket } from '../socket';
import { tokenService } from './tokenService';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface SignUpData {
  email: string;
  password: string;
  marketingEmails: boolean;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    marketingEmails: boolean;
  };
}

class AuthService {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      console.log('Making signup request to:', `${API_URL}/auth/signup`);
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/signup', data);
      console.log('Signup response:', response.data);
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error('Signup request failed:', error);
      throw error;
    }
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signin', data);
    const { token } = response.data;

    tokenService.setToken(token);
    socket.auth = { token };
    socket.disconnect().connect();

    return response.data;
  }

  async signOut(): Promise<void> {
    try {
      await api.post('/auth/signout');
    } finally {
      tokenService.removeToken();
      socket.disconnect();
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return tokenService.hasToken();
  }
}

export const authService = new AuthService();
