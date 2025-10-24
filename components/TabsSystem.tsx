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

  // Detecta si hay notas de clase: bloque ```markdown``` o texto no solo hipervínculo (basado en HTML)
  const hasNotesContent = (html: string): boolean => {
    if (!html) return false;

    // 1) Bloques de notas (fences) renderizados como <pre><code class="language-markdown|md">...</code></pre>
    const fencePattern = /<pre>\s*<code[^>]*class=["'][^"']*(?:language-)?(?:markdown|md)[^"']*["'][^>]*>[\s\S]*?<\/code>\s*<\/pre>/i;
    if (fencePattern.test(html)) return true;

    // 2) Quitar headings y enlaces para detectar texto residual significativo
    let stripped = html
      .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, '')
      .replace(/<a[^>]*>[\s\S]*?<\/a>/gi, '')
      .replace(/<[^>]+>/g, ' ') // eliminar el resto de etiquetas
      .replace(/[\s\-–—→↗↘↙↖…:;,.!?()]+/g, ' ')
      .trim();

    return /[A-Za-z0-9áéíóúüñ]/i.test(stripped);
  };

  // Limpia del HTML los bloques de notas (fences markdown/md) para que NO aparezcan en la página
  const stripMarkdownFences = (html?: string): string => {
    if (!html) return '';
    return html
      .replace(/<pre>\s*<code[^>]*class=["'][^"']*(?:language-)?(?:markdown|md)[^"']*["'][^>]*>[\s\S]*?<\/code>\s*<\/pre>/gi, '')
      .replace(/<code[^>]*class=["'][^"']*(?:language-)?(?:markdown|md)[^"']*["'][^>]*>[\s\S]*?<\/code>/gi, '')
      .trim();
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

  const showNotesButton = hasNotesContent(activeTab?.content || '');

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
          {/* Botón de notas - Siempre visible pero solo funcional si hay notas */}
          <div className="flex items-center">
            {showNotesButton && (
              <button
                type="button"
                className="w-full sm:w-auto px-4 py-2.5 text-xs md:text-sm font-semibold rounded-lg border-2 border-amber-400 bg-amber-50 text-amber-900 hover:bg-amber-100 hover:border-amber-500 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => setIsNotesOpen(true)}
                aria-label="Ver notas de clase"
                title="Ver notas de clase"
              >
                <span className="text-base">📝</span>
                <span>Ver notas</span>
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

                const contentBefore = stripMarkdownFences(exBefore ? exBefore.cleaned : rawBefore);
                const contentAfterRaw = exAfter ? exAfter.cleaned : rawAfter;
                const contentAfter = stripMarkdownFences(contentAfterRaw);
                
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
                const cleaned = stripMarkdownFences(ex ? ex.cleaned : activeTab.content);
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

      {/* Modal de notas con el contenido de la pestaña activa */}
      <NotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        content={activeTab?.content || ''}
        title="Notas de clase"
      />
    </div>
  );
}
