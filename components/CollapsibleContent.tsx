'use client';

import { useEffect, useRef } from 'react';
import MarkdownContent from './MarkdownContent';

interface CollapsibleContentProps {
  content: string;
  className?: string;
  collapsedHeight?: number; // altura en px cuando está plegado
  expanded?: boolean; // modo controlado
  onToggle?: () => void; // alterna expandido/plegado
}

export default function CollapsibleContent({
  content,
  className = '',
  collapsedHeight = 180,
  expanded = false,
  onToggle,
}: CollapsibleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOverflowingRef = useRef<boolean>(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      isOverflowingRef.current = el.scrollHeight > collapsedHeight + 8;
    }, 0);
    return () => clearTimeout(t);
  }, [content, collapsedHeight]);

  const handleClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    // No alternar si el click viene de elementos interactivos
    const target = e.target as Element;
    if (target.closest('a, button, input, textarea, select, video, iframe')) {
      return;
    }
    onToggle?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle?.();
    }
  };

  return (
    <div className={`collapsible-content ${className}`}>
      <div
        ref={containerRef}
        className={`relative prose prose-lg max-w-none ${expanded ? '' : 'overflow-hidden'} transition-[max-height] duration-300 ease-in-out`}
        style={expanded ? undefined : { maxHeight: collapsedHeight }}
        onClick={handleClickContainer}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-label={expanded ? 'Ocultar texto' : 'Mostrar texto'}
      >
        <MarkdownContent content={content} />
        {!expanded && isOverflowingRef.current && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Botón explícito para accesibilidad */}
      {isOverflowingRef.current && (
        <div className="mt-3">
          <button
            type="button"
            onClick={onToggle}
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