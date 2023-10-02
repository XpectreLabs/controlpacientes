import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from '@/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className={inter.className}>
          {children}
          <div id="modal-root" />
          <ToastContainer />
        </body>
      </ContextProvider>
    </html>
  );
}