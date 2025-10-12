import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import './globals.css';
import 'katex/dist/katex.min.css'; // Estilos de KaTeX para ecuaciones matemáticas

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ediprofe',
  description: 'Guía educativa para ciencias y matemáticas',
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
        <header className="sticky top-0 z-50 glass-effect border-b border-slate-200/50 shadow-md backdrop-blur-lg bg-white/95">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between gap-4">
              <Link href="/">
                <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="text-2xl md:text-3xl">🎓</span>
                  <span>Ediprofe</span>
                </h1>
              </Link>
              <Navigation />
            </div>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3">🎓 Ediprofe</h3>
              <p className="text-slate-300 mb-6">Guía educativa para ciencias y matemáticas</p>
              <div className="flex justify-center gap-6 text-sm text-slate-400">
                <span>&copy; 2025 Ediprofe</span>
                <span>•</span>
                <span>Todos los derechos reservados</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
