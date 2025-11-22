import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type { LoginCredentials, RegisterCredentials, AuthResponse, User };

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  async logout(token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/user/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  getToken(): string | null {
    const token = localStorage.getItem('auth_token');
    if (!token || token === 'undefined') return null;
    return token;
  },

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  },

  removeToken(): void {
    localStorage.removeItem('auth_token');
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) return null; // nothing stored yet

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Failed to parse auth_user from localStorage:', error);
      localStorage.removeItem('auth_user'); // remove invalid value
      return null;
    }
  },

  setUser(user: User): void {
    localStorage.setItem('auth_user', JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem('auth_user');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
