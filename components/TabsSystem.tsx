'use client';

// components/TabsSystem.tsx
// Sistema de tabs interactivo con estado client-side

import { useState, useEffect, useRef } from 'react';
import type { Section } from '@/types/content';
import VideoEmbed from './VideoEmbed';
import MarkdownContent from './MarkdownContent';
import NotesModal from './NotesModal';

interface TabsSystemProps {
  section: Section;
  className?: string;
}

export default function TabsSystem({ section, className = '' }: TabsSystemProps) {
  const [activeTabId, setActiveTabId] = useState(section.tabs[0]?.id || '');
  // Modal de notas de clase por pestaña activa
  const [isNotesOpen, setIsNotesOpen] = useState(false);



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

  // Overlay flotante eliminado: sin observer ni estado asociado.

  const activeTab = section.tabs.find((tab) => tab.id === activeTabId);
  const tabIds = section.tabs.map((t) => t.id);
  const activeIndex = Math.max(0, tabIds.indexOf(activeTabId));



  const navRef = useRef<HTMLDivElement>(null);

  const activateTab = (id: string) => {
    setActiveTabId(id);
    // Actualiza el hash para navegación directa y persistencia
    if (typeof window !== 'undefined') {
      window.location.hash = id;
    }
    // Desplaza el botón activo a la vista
    setTimeout(() => {
      const btn = navRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${id}"]`);
      btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, 0);
  };

  const goToIndex = (idx: number) => {
    const next = section.tabs[idx];
    if (next) activateTab(next.id);
  };

  // Navegación por teclado deshabilitada a petición.
  // Usa los botones Anterior/Siguiente para cambiar de pestaña.

  return (
    // Mostrar/ocultar botones flotantes según visibilidad de la sección
    // (eliminado: ya no usamos overlay flotante)
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
          <div ref={navRef} className="flex gap-2 min-w-max border-b-2 border-slate-200">
            {section.tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => activateTab(tab.id)}
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

        {/* Controles Anterior/Siguiente */}
        <div className="mt-3 flex items-center justify-end gap-2">
        <button
        className="px-3 py-2 text-sm font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => goToIndex(Math.max(activeIndex - 1, 0))}
        disabled={activeIndex <= 0}
        aria-label="Anterior"
        title="Anterior"
        >
        Anterior
        </button>
        <button
        className="px-3 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => goToIndex(Math.min(activeIndex + 1, section.tabs.length - 1))}
        disabled={activeIndex >= section.tabs.length - 1}
        aria-label="Siguiente"
        title="Siguiente"
        >
        Siguiente
        </button>
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
                    
                    {/* Botón para abrir notas de clase en modal */}
                    {activeTab.content && (
                      <div className="mt-4 flex items-center gap-3">
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => setIsNotesOpen(true)}
                          aria-label="Ver notas de clase"
                          title="Ver notas de clase"
                        >
                          Ver notas de clase
                        </button>
                      </div>
                    )}

                    {/* Modal de notas con todo el contenido de la pestaña */}
                    <NotesModal
                      isOpen={isNotesOpen}
                      onClose={() => setIsNotesOpen(false)}
                      content={activeTab.content || ''}
                      title="Notas de clase"
                    />
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

      {/* Navegación flotante eliminada */}
    </div>
  );
}
