'use client';

import { useEffect, useRef, useState } from 'react';
import MarkdownContent from './MarkdownContent';

interface CollapsibleContentProps {
  content: string;
  className?: string;
  collapsedHeight?: number; // altura en px cuando está plegado
}

export default function CollapsibleContent({
  content,
  className = '',
  collapsedHeight = 180,
}: CollapsibleContentProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // detectar si el contenido excede la altura colapsada para mostrar el indicador
    const el = containerRef.current;
    if (!el) return;
    // Timeout para asegurar que el HTML ya fue pintado
    const t = setTimeout(() => {
      setIsOverflowing(el.scrollHeight > collapsedHeight + 8);
    }, 0);
    return () => clearTimeout(t);
  }, [content, collapsedHeight]);

  return (
    <div className={`collapsible-content ${className}`}>
      <div
        ref={containerRef}
        className={`relative prose prose-lg max-w-none ${expanded ? '' : 'overflow-hidden'} cursor-pointer transition-[max-height] duration-300 ease-in-out`}
        style={expanded ? undefined : { maxHeight: collapsedHeight }}
        onClick={() => setExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
      >
        <MarkdownContent content={content} />
        {!expanded && isOverflowing && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {isOverflowing && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
            aria-expanded={expanded}
          >
            {expanded ? 'Ocultar texto' : 'Mostrar texto'}
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}