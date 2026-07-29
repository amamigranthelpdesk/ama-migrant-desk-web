import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'AMA Migrant Desk',
  description:
    'The AMA Migrant Desk connects vulnerable migrants in Accra to protection, legal support, medical assistance, and counselling. Operated by the Accra Metropolitan Assembly in partnership with IOM Ghana, funded by GIZ/GEC.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-white font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
