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
