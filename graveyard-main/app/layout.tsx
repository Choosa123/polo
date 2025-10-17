import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GraveyardProvider } from '@/contexts/GraveyardContext';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Graveyard Management System',
  description: 'Modern graveyard plot and grave management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GraveyardProvider>
          <div className="flex h-screen overflow-hidden bg-slate-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </GraveyardProvider>
      </body>
    </html>
  );
}
