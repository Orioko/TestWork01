'use client';

import { useAuthStore } from '@/store/auth';
import styles from './Footer.module.scss';

const Footer = () => {
  const { user } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span>© {currentYear}</span>
        {user && <span className={styles.userEmail}>Logged as {user.email}</span>}
      </div>
    </footer>
  );
};

export default Footer;
