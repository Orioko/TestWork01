'use client';

import { useEffect } from 'react';
import Header from '@/app/_components/Header';
import { useAuthStore } from '@/store/auth';
import styles from './layout.module.scss';
import FooterWrapper from '@/app/_components/FooterWrapper';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <FooterWrapper />
    </>
  );
}
