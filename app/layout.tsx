import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ediprofe - Plataforma Educativa',
  description: 'Plataforma educativa interactiva con contenido en Markdown y sistema de tabs',
  keywords: ['educación', 'química', 'física', 'matemáticas', 'ciencias'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-xl md:text-2xl font-bold text-blue-600">
              🎓 Ediprofe
            </h1>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>&copy; 2025 Ediprofe. Plataforma educativa interactiva.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
