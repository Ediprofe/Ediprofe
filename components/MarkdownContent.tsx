'use client';

import { useEffect, useRef } from 'react';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Agregar target="_blank" y rel="noopener noreferrer" a todos los enlaces
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        // Solo agregar a enlaces externos (que empiezan con http)
        if (link.href.startsWith('http')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });

      // Hacer tablas responsive automáticamente
      const tables = contentRef.current.querySelectorAll('table');
      tables.forEach((table) => {
        // Si la tabla no está ya envuelta, envolverla en un contenedor responsive
        if (!table.parentElement?.classList.contains('table-responsive-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'table-responsive-wrapper';
          table.parentNode?.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      });

      // Los bloques de código con mapas conceptuales ya se renderizan correctamente
      // con el estilo estándar de código (fondo oscuro, texto claro)
      // No necesitamos procesamiento adicional
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
