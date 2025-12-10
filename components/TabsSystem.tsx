'use client';

// components/TabsSystem.tsx
// Sistema de tabs interactivo con estado client-side

import { useState, useEffect, useRef, useMemo } from 'react';
import type { Section } from '@/types/content';
import VideoEmbed from './VideoEmbed';
import MarkdownContent from './MarkdownContent';
import NotesModal from './NotesModal';

interface TabsSystemProps {
  section: Section;
  className?: string;
  // Información contextual para el modal
  subjectName?: string;
  subjectIcon?: string;
  unitTitle?: string;
  // Para navegación global
  allSections?: Section[];
}

export default function TabsSystem({ section, className = '', subjectName, subjectIcon, unitTitle, allSections = [] }: TabsSystemProps) {
  const [activeTabId, setActiveTabId] = useState(section.tabs[0]?.id || '');
  // Modal de notas de clase por pestaña activa
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Crear lista plana de todas las tabs de todas las secciones para navegación global
  const allTabs = useMemo(() => {
    if (allSections.length === 0) return section.tabs;
    return allSections.flatMap(sec => 
      sec.tabs.map(tab => ({ ...tab, sectionTitle: sec.title, sectionId: sec.id }))
    );
  }, [allSections, section.tabs]);

  // Funciones de navegación global entre todas las tabs
  const handlePreviousTab = () => {
    const currentIndex = allTabs.findIndex(tab => tab.id === activeTabId);
    if (currentIndex > 0) {
      setActiveTabId(allTabs[currentIndex - 1].id);
    }
  };

  const handleNextTab = () => {
    const currentIndex = allTabs.findIndex(tab => tab.id === activeTabId);
    if (currentIndex < allTabs.length - 1) {
      setActiveTabId(allTabs[currentIndex + 1].id);
    }
  };



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

  // Buscar la tab activa en todas las tabs (no solo en la sección actual)
  const activeTab = useMemo(() => {
    // Primero buscar en allTabs si está disponible
    if (allSections.length > 0) {
      for (const sec of allSections) {
        const found = sec.tabs.find((tab) => tab.id === activeTabId);
        if (found) return found;
      }
    }
    // Fallback a la sección actual
    return section.tabs.find((tab) => tab.id === activeTabId);
  }, [activeTabId, allSections, section.tabs]);
  const tabIds = section.tabs.map((t) => t.id);
  const activeIndex = Math.max(0, tabIds.indexOf(activeTabId));

  // Detecta si hay notas de clase: busca bloques ```markdown``` en el rawContent
  const hasNotesContent = (rawContent?: string): boolean => {
    if (!rawContent) return false;

    const lines = rawContent.split('\n');
    let inMarkdownFence = false;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('```')) {
        const lang = trimmed.match(/^```\s*(\w+)?/)?.[1]?.toLowerCase();
        if (!inMarkdownFence && (lang === 'markdown' || lang === 'md')) {
          return true; // Encontramos un bloque markdown
        }
      }
    }
    
    return false;
  };

  // Extrae (y remueve) el primer enlace a TikTok del HTML (SSR-safe)
  const extractTikTokLink = (html?: string): { href: string; label: string; cleaned: string } | null => {
    if (!html) return null;
    const anchorRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match: RegExpExecArray | null;
    let first: { href: string; label: string; index: number; length: number } | null = null;

    while ((match = anchorRegex.exec(html)) !== null) {
      const href = match[1];
      const text = (match[2] || '').trim();
      const isTikTok = /tiktok\.com/i.test(href) || /ver\s+en\s+tiktok/i.test(text);
      if (isTikTok) {
        first = { href, label: text || 'Ver en TikTok', index: match.index, length: match[0].length };
        break;
      }
    }

    if (!first) return null;
    const before = html.slice(0, first.index);
    const after = html.slice(first.index + first.length);
    const cleaned = (before + after).trim();
    return { href: first.href, label: first.label, cleaned };
  };

  const getTikTokFromVideos = (videos?: Section['tabs'][number]['videos']): { href: string; label: string } | null => {
    const tik = videos?.find((v) => v.platform === 'tiktok');
    if (!tik) return null;
    return { href: tik.url, label: 'Ver en TikTok' };
  };

  const showNotesButton = hasNotesContent(activeTab?.rawContent);

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
      {/* Título de la sección - Más prominente */}
      <div className="mb-6 md:mb-8">
        <h2 id={section.id} className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent scroll-mt-20 break-words leading-tight">
          {section.title}
        </h2>
        <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full" />
      </div>

      {/* Navegación de tabs - Diseño mejorado con pills */}
      <div className="tabs-nav-wrapper relative mb-5">
        {/* Gradient para indicar scroll horizontal en móvil */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden z-10" />
        
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent -mx-1 px-1">
          <div ref={navRef} className="flex gap-2 md:gap-3 min-w-max pb-2">
            {section.tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => activateTab(tab.id)}
                className={`
                  relative px-4 md:px-5 py-2.5 md:py-3 font-bold text-xs md:text-sm whitespace-nowrap
                  transition-all duration-300 rounded-xl
                  ${
                    activeTabId === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 hover:shadow-md'
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

        {/* Controles superiores: notas + navegación - Diseño mejorado */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Botón de notas - Estilo unificado y prominente */}
          <div className="flex items-center">
            {showNotesButton && (
              <button
                type="button"
                className="w-full sm:w-auto px-4 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-900 hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-600 shadow-md hover:shadow-lg"
                onClick={() => setIsNotesOpen(true)}
                aria-label="Ver notas de clase"
                title="Ver notas de clase"
              >
                <span className="text-base">📝</span>
                <span>Ver notas</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Botones de navegación */}
          <div className="flex items-center gap-2 justify-end">
            <button
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => goToIndex(Math.max(activeIndex - 1, 0))}
              disabled={activeIndex <= 0}
              aria-label="Anterior"
              title="Anterior"
            >
              <span className="hidden sm:inline">← Anterior</span>
              <span className="sm:hidden">←</span>
            </button>
            <button
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => goToIndex(Math.min(activeIndex + 1, section.tabs.length - 1))}
              disabled={activeIndex >= section.tabs.length - 1}
              aria-label="Siguiente"
              title="Siguiente"
            >
              <span className="hidden sm:inline">Siguiente →</span>
              <span className="sm:hidden">→</span>
            </button>
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
            {activeTab.content && activeTab.videos && activeTab.videos.length > 0 ? (
              // Si hay contenido Y videos, dividir por el marcador
              (() => {
                const parts = activeTab.content.split('<!-- VIDEO_PLACEHOLDER -->');
                const rawBefore = parts[0]?.trim();
                const rawAfter = parts[1]?.trim();

                const exBefore = extractTikTokLink(rawBefore);
                const exAfter = extractTikTokLink(rawAfter);
                const link = exBefore || exAfter || getTikTokFromVideos(activeTab.videos);

                const contentBefore = exBefore ? exBefore.cleaned : rawBefore;
                const contentAfterRaw = exAfter ? exAfter.cleaned : rawAfter;
                const contentAfter = contentAfterRaw;
                
                return (
                  <>
                    {contentBefore && (
                      <MarkdownContent
                        content={contentBefore}
                        className="prose prose-lg max-w-none mb-10"
                      />
                    )}

                    {/* Videos */}
                    <div className="videos-section mb-4">
                      <div className={`grid gap-8 ${activeTab.videos.length === 1 ? 'grid-cols-1 max-w-5xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
                        {activeTab.videos.map((video, index) => (
                          <div key={index} className="video-wrapper">
                            <VideoEmbed video={video} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enlace (uniforme) debajo del video */}
                    {link && (
                      <div className="mt-2 mb-6">
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline font-semibold"
                        >
                          {link.label}
                        </a>
                      </div>
                    )}

                    {contentAfter && (
                      <MarkdownContent
                        content={contentAfter}
                        className="prose prose-lg max-w-none"
                      />
                    )}

                    {/* Modal centralizado arriba */}
                  </>
                );
              })()
            ) : activeTab.content && !activeTab.videos ? (
              // Solo contenido: mostrar contenido, y el enlace (si existe) debajo
              (() => {
                const ex = extractTikTokLink(activeTab.content);
                const cleaned = ex ? ex.cleaned : activeTab.content;
                return (
                  <>
                    <MarkdownContent
                      content={cleaned}
                      className="prose prose-lg max-w-none mb-6"
                    />
                    {ex && (
                      <div className="mt-2 mb-10">
                        <a
                          href={ex.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline font-semibold"
                        >
                          {ex.label}
                        </a>
                      </div>
                    )}
                  </>
                );
              })()
            ) : (
              // Solo videos: mostrar videos y (si hay TikTok por video) un enlace uniforme
              <>
                {activeTab.videos && activeTab.videos.length > 0 && (
                  <div className="videos-section mb-10">
                    <div className={`grid gap-8 ${activeTab.videos.length === 1 ? 'grid-cols-1 max-w-5xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
                      {activeTab.videos.map((video, index) => (
                        <div key={index} className="video-wrapper">
                          <VideoEmbed video={video} />
                        </div>
                      ))}
                    </div>
                    {getTikTokFromVideos(activeTab.videos) && (
                      <div className="mt-4">
                        <a
                          href={getTikTokFromVideos(activeTab.videos)!.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline font-semibold"
                        >
                          {getTikTokFromVideos(activeTab.videos)!.label}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}


      </div>

      {/* Navegación flotante eliminada */}

      {/* Modal de notas con el contenido RAW de la pestaña activa (incluye bloques markdown) */}
      <NotesModal
        key={activeTabId} // Forzar re-render cuando cambia la pestaña
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        content={activeTab?.rawContent || activeTab?.content || ''}
        title="Notas de clase"
        // Navegación
        onPrevious={handlePreviousTab}
        onNext={handleNextTab}
        hasPrevious={allTabs.findIndex(tab => tab.id === activeTabId) > 0}
        hasNext={allTabs.findIndex(tab => tab.id === activeTabId) < allTabs.length - 1}
        // Contexto
        subjectName={subjectName}
        subjectIcon={subjectIcon}
        unitTitle={unitTitle}
        currentTabLabel={activeTab?.label}
        sectionTitle={(() => {
          const currentTab = allTabs.find(tab => tab.id === activeTabId);
          return (currentTab && 'sectionTitle' in currentTab) ? (currentTab as any).sectionTitle : section.title;
        })()}
      />
    </div>
  );
}
