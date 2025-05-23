'use client';

import { useEffect } from 'react';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { useAuthStore } from '@/store/auth';
import styles from './layout.module.scss';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
