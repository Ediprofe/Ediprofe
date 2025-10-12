'use client';

// components/TabsSystem.tsx
// Sistema de tabs interactivo con estado client-side

import { useState, useEffect } from 'react';
import type { Section } from '@/types/content';
import VideoEmbed from './VideoEmbed';

interface TabsSystemProps {
  section: Section;
  className?: string;
}

export default function TabsSystem({ section, className = '' }: TabsSystemProps) {
  const [activeTabId, setActiveTabId] = useState(section.tabs[0]?.id || '');

  // Observar cambios en el hash de la URL para activar tabs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remover el #
      
      // Verificar si el hash corresponde a una tab de esta sección
      const matchingTab = section.tabs.find(tab => tab.id === hash);
      if (matchingTab) {
        setActiveTabId(matchingTab.id);
        
        // Scroll suave al título de la sección
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Ejecutar al montar por si ya hay un hash
    handleHashChange();

    // Escuchar cambios de hash
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [section]);

  const activeTab = section.tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className={`tabs-system ${className}`}>
      {/* Título de la sección */}
      <h2 id={section.id} className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-gray-800 scroll-mt-20 break-words">
        {section.title}
      </h2>

      {/* Navegación de tabs - Horizontal con scroll */}
      <div className="tabs-nav-wrapper relative mb-4 md:mb-6">
        {/* Gradient para indicar scroll horizontal en móvil */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden z-10" />
        
        <div className="overflow-x-auto pb-2 border-b-2 border-gray-200 -mx-4 md:mx-0 px-4 md:px-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="flex gap-1 min-w-max">
            {section.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`
                  px-3 md:px-4 py-2 md:py-3 font-medium text-xs md:text-sm lg:text-base whitespace-nowrap rounded-t-lg
                  transition-all duration-200 border-b-2 -mb-[2px]
                  ${
                    activeTabId === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
                aria-selected={activeTabId === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido de la tab activa */}
      <div
        className="tab-content animate-fade-in"
        role="tabpanel"
        aria-labelledby={activeTabId}
      >
        {activeTab && (
          <>
            {/* Mostrar videos si la tab los tiene */}
            {activeTab.videos && activeTab.videos.length > 0 && (
              <div className="videos-section mb-6 md:mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {activeTab.videos.map((video, index) => (
                    <VideoEmbed key={index} video={video} />
                  ))}
                </div>
              </div>
            )}

            {/* Mostrar contenido HTML */}
            {activeTab.content && (
              <div
                className="prose prose-sm md:prose-base lg:prose-lg max-w-none
                  prose-headings:text-gray-800 prose-headings:break-words
                  prose-p:text-gray-700 prose-p:break-words
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:break-words
                  prose-strong:text-gray-900
                  prose-ul:text-gray-700
                  prose-ol:text-gray-700
                  prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded prose-code:text-xs md:prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:text-xs md:prose-pre:text-sm prose-pre:overflow-x-auto
                  prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:text-gray-700
                  prose-table:text-sm md:prose-table:text-base prose-table:overflow-x-auto prose-table:block md:prose-table:table
                "
                dangerouslySetInnerHTML={{ __html: activeTab.content }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
