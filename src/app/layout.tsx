import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.scss';
import ClientLayout from './ClientLayout';
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
      <body className={`${inter.className} ${styles.body}`}>
        <ClientLayout>
          <div className={pageStyles.container}>{children}</div>
        </ClientLayout>
      </body>
    </html>
  );
}
