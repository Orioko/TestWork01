import { create } from 'zustand';
import api from '@/utils/api';

interface User {
  id: number;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      set({ user: response.data.user, token: response.data.token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to login');
    }
  },
  logout: () => {
    set({ user: null, token: null });
  },
}));
