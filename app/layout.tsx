import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Synthesis Tutor Clone',
  description: 'Clone of Synthesis Tutor',
};

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={workSans.className}>
      <body className='bg-dark-blue'>{children}</body>
    </html>
  );
}
