import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to fetch products:', error.message);
    }
    throw error;
  }
};
