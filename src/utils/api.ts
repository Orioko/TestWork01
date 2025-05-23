import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/store/auth';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error instanceof AxiosError && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const response = await api.post('/auth/refresh', {
          refreshToken,
          expiresInMins: 30,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
      expiresInMins: 30,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
    throw error;
  }
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
    throw error;
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post('/auth/refresh', {
      refreshToken,
      expiresInMins: 30,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to refresh session');
    }
    throw error;
  }
};

export const getProducts = async (_userId: string) => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
    throw error;
  }
};

export const getProductById = async (productId: number) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
    throw error;
  }
};
