import axios from 'axios';

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
      const response = await api.post('/auth/signup', data);
      console.log('Signup response:', response.data);
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error('Signup request failed:', error);
      throw error;
    }
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await api.post('/auth/signin', data);
    this.setToken(response.data.token);
    return response.data;
  }

  async signOut(): Promise<void> {
    try {
      await api.post('/auth/signout');
    } finally {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
