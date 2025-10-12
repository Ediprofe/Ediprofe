'use client';

// components/TableOfContents.tsx
// Sidebar con tabla de contenidos interactiva

import { useState, useEffect } from 'react';
import type { TOCItem } from '@/types/content';

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export default function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Observar qué sección está visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    // Observar todos los H2
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setIsOpen(false); // Cerrar en móvil después de click
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Botón para móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          lg:hidden fixed bottom-6 right-6 z-50
          bg-blue-600 text-white
          p-4 rounded-full shadow-lg
          hover:bg-blue-700 transition-colors
        "
        aria-label="Abrir tabla de contenidos"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          table-of-contents ${className}
          fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)]
          w-72 bg-white border-r border-gray-200
          overflow-y-auto p-6
          transition-transform duration-300 ease-in-out
          z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">Contenido</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm
                    transition-colors duration-150
                    ${
                      activeId === item.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.title}
                </button>

                {/* Subsecciones (H3) */}
                {item.children && item.children.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <button
                          onClick={() => handleClick(child.id)}
                          className={`
                            w-full text-left px-2 py-1 rounded text-xs
                            transition-colors duration-150
                            ${
                              activeId === child.id
                                ? 'text-blue-600 font-medium'
                                : 'text-gray-600 hover:text-gray-900'
                            }
                          `}
                        >
                          {child.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
