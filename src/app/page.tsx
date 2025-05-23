'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuthStore } from '@/store/auth';
import api from '@/utils/api';
import ProductCard from '@/app/_components/ProductCard';
import LoadingIndicator from '@/app/_components/LoadingIndicator';
import ErrorBoundary from '@/app/_components/ErrorBoundary';
import LandingSection, { LandingSectionBackgrounds } from '@/app/_components/LandingSection';
import styles from './page.module.scss';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.get('/products?limit=12');
        setProducts(data.data.products);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError('Failed to fetch products: ' + error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.products}>
      <div className={styles.header}>
        <h1 className={styles.title}>Latest Products</h1>
      </div>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isAuthenticated={!!user}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <ErrorBoundary>
      <LandingSection backgroundColor={LandingSectionBackgrounds.white}>
        <Suspense fallback={<LoadingIndicator />}>
          <ProductsList />
        </Suspense>
      </LandingSection>
    </ErrorBoundary>
  );
}
