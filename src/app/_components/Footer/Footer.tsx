'use client';

import { FC } from 'react';
import styles from './Footer.module.scss';
import { useAuthStore } from '@/store/auth';

const Footer: FC = () => {
  const { user } = useAuthStore();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <span>{year}</span>
        {user && <span className={styles.user}>Logged as {user.email}</span>}
      </div>
    </footer>
  );
};

export default Footer;
