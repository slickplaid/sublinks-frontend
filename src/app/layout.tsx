import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sublinks',
  description: 'Sublinks',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <html lang="en">
    <body className={inter.className}>
      <Header />
      <main className="h-full l:max-w-[1352px] xl:max-w-[1524px] m-auto border-x">{children}</main>
    </body>
  </html>
);

export default RootLayout;
