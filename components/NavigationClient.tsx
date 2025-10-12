'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Subject {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

interface NavigationClientProps {
  subjects: Subject[];
}

export default function NavigationClient({ subjects }: NavigationClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 text-slate-700 hover:text-indigo-600 transition-colors"
        aria-label="Menú de navegación"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menú desktop */}
      <nav className="hidden lg:flex items-center gap-1">
        {subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/${subject.slug}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <span className="text-lg">{subject.icon}</span>
            <span>{subject.name}</span>
          </Link>
        ))}
      </nav>

      {/* Menú móvil */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <nav className="lg:hidden fixed top-[72px] left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50 max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <Link
                    key={subject.slug}
                    href={`/${subject.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <div className="font-semibold">{subject.name}</div>
                      <div className="text-xs text-slate-500">{subject.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
