'use client';

// components/TabsSystem.tsx
// Sistema de tabs interactivo con estado client-side

import { useState, useEffect } from 'react';
import type { Section } from '@/types/content';
import VideoEmbed from './VideoEmbed';
import MarkdownContent from './MarkdownContent';
import CollapsibleContent from './CollapsibleContent';

interface TabsSystemProps {
  section: Section;
  className?: string;
}

export default function TabsSystem({ section, className = '' }: TabsSystemProps) {
  const [activeTabId, setActiveTabId] = useState(section.tabs[0]?.id || '');
  // Estado de plegado por pestaña (granular, persistente dentro del H2)
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

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
    <div className={`tabs-system ${className} min-h-[calc(100vh-20rem)]`}>
      {/* Título de la sección */}
      <h2 id={section.id} className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent scroll-mt-20 break-words">
        {section.title}
      </h2>

      {/* Navegación de tabs - Horizontal con scroll */}
      <div className="tabs-nav-wrapper relative mb-8">
        {/* Gradient para indicar scroll horizontal en móvil */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden z-10" />
        
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
          <div className="flex gap-2 min-w-max border-b-2 border-slate-200">
            {section.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`
                  relative px-6 py-3 font-semibold text-sm md:text-base whitespace-nowrap
                  transition-all duration-300 rounded-t-xl
                  ${
                    activeTabId === tab.id
                      ? 'text-indigo-600 bg-white shadow-md -mb-[2px] border-b-2 border-indigo-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }
                `}
                aria-selected={activeTabId === tab.id}
                role="tab"
              >
                {tab.label}
                {activeTabId === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido de la tab activa */}
      <div
        className="tab-content animate-fade-in min-h-[60vh]"
        role="tabpanel"
        aria-labelledby={activeTabId}
      >
        {activeTab && (
          <>
            {activeTab.content && activeTab.videos && activeTab.videos.length > 0 ? (
              // Si hay contenido Y videos, dividir por el marcador
              (() => {
                const parts = activeTab.content.split('<!-- VIDEO_PLACEHOLDER -->');
                const contentBefore = parts[0]?.trim();
                const contentAfter = parts[1]?.trim();
                
                return (
                  <>
                    {/* Contenido antes del video */}
                    {contentBefore && (
                      <MarkdownContent
                        content={contentBefore}
                        className="prose prose-lg max-w-none mb-10"
                      />
                    )}
                    
                    {/* Videos */}
                    <div className="videos-section mb-10">
                      <div className={`grid gap-8 ${activeTab.videos.length === 1 ? 'grid-cols-1 max-w-5xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
                        {activeTab.videos.map((video, index) => (
                          <div key={index} className="video-wrapper">
                            <VideoEmbed video={video} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contenido después del video (plegado por defecto) */}
                    {contentAfter && (
                      <CollapsibleContent
                        content={contentAfter}
                        className="mt-4"
                        expanded={!!expandedMap[activeTabId]}
                        onToggle={() => setExpandedMap((m) => ({ ...m, [activeTabId]: !m[activeTabId] }))}
                      />
                    )}
                  </>
                );
              })()
            ) : (
              // Si solo hay contenido O solo videos, mostrar normalmente
              <>
                {activeTab.content && (
                  <MarkdownContent
                    content={activeTab.content}
                    className="prose prose-lg max-w-none mb-10"
                  />
                )}
                
                {activeTab.videos && activeTab.videos.length > 0 && (
                  <div className="videos-section mb-10">
                    <div className={`grid gap-8 ${activeTab.videos.length === 1 ? 'grid-cols-1 max-w-5xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
                      {activeTab.videos.map((video, index) => (
                        <div key={index} className="video-wrapper">
                          <VideoEmbed video={video} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
