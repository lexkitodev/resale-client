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
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    this.setToken(response.data.token);
    return response.data;
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await api.post('/auth/signin', data);
    this.setToken(response.data.token);
    return response.data;
  }

  signOut() {
    localStorage.removeItem('token');
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
