import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import './globals.css';

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
      <head>
        {/* MathJax Configuration - Renderiza LaTeX en el cliente */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                  displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                  processEscapes: true,
                  processEnvironments: true
                },
                options: {
                  skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
                },
                startup: {
                  pageReady: () => {
                    return MathJax.startup.defaultPageReady();
                  }
                }
              };
            `,
          }}
        />
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />
      </head>
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

