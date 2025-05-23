export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}
