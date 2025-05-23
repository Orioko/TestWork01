import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.scss';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import pageStyles from '@/app/page.module.scss';
import styles from './layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Abelo Shop',
  description: 'Online shop for Abelo products',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className={styles.main}>
          <div className={pageStyles.container}>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
