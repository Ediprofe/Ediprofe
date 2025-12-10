'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    MathJax: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
      startup?: {
        promise: Promise<void>;
      };
      tex?: {
        inlineMath: string[][];
        displayMath: string[][];
      };
    };
  }
}

/**
 * MathJax Provider Component
 * 
 * Carga MathJax desde CDN y proporciona renderizado de LaTeX client-side.
 * Esta solución evita conflictos entre remark-gfm (tablas) y remark-math (LaTeX)
 * porque MathJax opera sobre el HTML final renderizado, no durante el parsing.
 * 
 * Sintaxis soportada:
 * - Inline: $...$ o \(...\)
 * - Display/Block: $$...$$ o \[...\]
 */
export default function MathJaxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Configuración de MathJax
    if (!window.MathJax) {
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
        },
      };
    }

    // Cargar MathJax desde CDN si no está cargado
    const existingScript = document.getElementById('mathjax-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'mathjax-script';
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return <>{children}</>;
}

/**
 * Hook para re-renderizar MathJax cuando cambia el contenido
 * Usar en componentes que muestran contenido dinámico con LaTeX
 */
export function useMathJax(dependency?: unknown) {
  useEffect(() => {
    // Esperar a que MathJax esté listo y luego renderizar
    const typeset = async () => {
      if (window.MathJax?.typesetPromise) {
        try {
          await window.MathJax.typesetPromise();
        } catch (err) {
          console.warn('MathJax typeset error:', err);
        }
      }
    };

    // Pequeño delay para asegurar que el DOM esté actualizado
    const timer = setTimeout(typeset, 100);
    return () => clearTimeout(timer);
  }, [dependency]);
}
