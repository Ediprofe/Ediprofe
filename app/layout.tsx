import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import './globals.css';
import 'katex/dist/katex.min.css'; // Estilos de KaTeX para ecuaciones matemáticas

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ediprofe.com'),
  title: {
    default: 'Ediprofe - Guía Educativa de Ciencias y Matemáticas',
    template: '%s | Ediprofe',
  },
  description: 'Plataforma educativa interactiva con contenido de química, física, matemáticas y ciencias. Aprende con videos, ejercicios y recursos didácticos.',
  keywords: ['educación', 'química', 'física', 'matemáticas', 'ciencias', 'aprendizaje', 'recursos educativos', 'guía de estudio'],
  authors: [{ name: 'Ediprofe' }],
  creator: 'Ediprofe',
  publisher: 'Ediprofe',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://ediprofe.com',
    siteName: 'Ediprofe',
    title: 'Ediprofe - Guía Educativa de Ciencias y Matemáticas',
    description: 'Plataforma educativa interactiva con contenido de química, física, matemáticas y ciencias.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ediprofe - Plataforma Educativa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ediprofe - Guía Educativa de Ciencias y Matemáticas',
    description: 'Plataforma educativa interactiva con contenido de química, física, matemáticas y ciencias.',
    images: ['/og-image.png'],
  },
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

        <footer className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white py-6 mt-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">🎓 Ediprofe</h3>
              <p className="text-slate-300 text-sm mb-3">Guía educativa para ciencias y matemáticas</p>
              <div className="flex justify-center gap-6 text-xs text-slate-400">
                <span>&copy; 2025 Ediprofe</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
