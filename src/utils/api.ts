import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const getProducts = async (token: string) => {
  try {
    const response = await api.get('/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to fetch products:', error.message);
    }
    throw error;
  }
};
