'use client';

import { FC } from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import styles from './Header.module.scss';
import { useAuthStore } from '@/store/auth';

const Header: FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.topbarСontent}>
          <div className={styles.left}>
            <span><FaPhone className={styles.icon} /> +021-95-51-84</span>
            <span><FaEnvelope className={styles.icon} /> shop@abelohost.com</span>
            <span><FaMapMarkerAlt className={styles.icon} /> 1734 Stonecoal Road</span>
          </div>
          <div className={styles.right}>
            {user ? (
              <>
                <span>Hello, {user.username}</span>
                <button onClick={logout}>Выйти</button>
              </>
            ) : (
              <Link href="/login"><FaUser className={styles.icon} /> Login</Link>
            )}
          </div>
        </div>
      </div>
      <header className={styles.header}>
        <div className={styles.headerСontent}>
          <Link href="/" className={styles.logo}>Abelohost Shop<span>.</span></Link>
          <div className={styles.banner}>600 x 70</div>
        </div>
      </header>
      <nav className={styles.menu}>
        <div className={styles.menuСontent}>
          <Link href="/">Home</Link>
          <Link href="#">Hot Deals</Link>
          <Link href="#">Categories</Link>
          <Link href="#">Laptops</Link>
          <Link href="#">Smartphones</Link>
          <Link href="#">Cameras</Link>
          <Link href="#">Accessories</Link>
        </div>
      </nav>
    </>
  );
};

export default Header;