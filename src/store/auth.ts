import { create } from 'zustand';
import { login as apiLogin, getCurrentUser, logout as apiLogout } from '@/utils/api';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiLogin(email, password);
      set({ user: response, isLoading: false });
    } catch {
      set({ error: 'Login failed', isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await apiLogout();
      set({ user: null, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  initAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        set({ user: null, isLoading: false });
        return;
      }
      const user = await getCurrentUser(token);
      set({ user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));
