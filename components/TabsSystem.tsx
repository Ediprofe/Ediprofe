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

    const fenceRegex = /<code[^>]*class=["'][^"']*(?:language-)?(?:markdown|md)[^"']*["'][^>]*>([\s\S]*?)<\/code>/i;
    const fenceMatch = fenceRegex.exec(html);
    if (fenceMatch && fenceMatch[1].trim().length > 0) return true;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el) => el.remove());
      const candidates = Array.from(doc.querySelectorAll('p, li'));
      for (const el of candidates) {
        const text = (el.textContent || '').trim();
        if (!text) continue;
        const anchors = Array.from(el.querySelectorAll('a'));
        if (anchors.length === 0) return true;
        let residual = text;
        anchors.forEach((a) => {
          const t = (a.textContent || '').trim();
          if (t) residual = residual.replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
        });
        residual = residual.replace(/[\s\-–—→↗↘↙↖…:;,.!?()]+/g, '');
        if (residual.length > 0) return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Limpia del HTML los bloques de notas (fences markdown/md) para que NO aparezcan en la página
  const stripMarkdownFences = (html?: string): string => {
    if (!html) return '';
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      // Eliminar <pre><code class="language-markdown|md">...</code></pre> y variantes
      doc
        .querySelectorAll('pre > code[class*="language-markdown"], pre > code[class*="language-md"], code[class*="language-markdown"], code[class*="language-md"]')
        .forEach((code) => {
          const pre = code.parentElement && code.parentElement.tagName.toLowerCase() === 'pre' ? code.parentElement : code;
          pre.remove();
        });
      return doc.body.innerHTML.trim();
    } catch {
      // Si falla el parseo, retornar el HTML original para no romper
      return html;
    }
  };

  // Extrae (y remueve) el primer enlace a TikTok del HTML
  const extractTikTokLink = (html?: string): { href: string; label: string; cleaned: string } | null => {
    if (!html) return null;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const anchors = Array.from(doc.querySelectorAll<HTMLAnchorElement>('a[href*="tiktok.com"], a[href*="vt.tiktok.com"]'));
      if (anchors.length === 0) return null;
      // Priorizar el que tenga texto
      const a = anchors.find((n) => (n.textContent || '').trim().length > 0) || anchors[0];
      const href = a.getAttribute('href') || '#';
      const label = (a.textContent || 'Ver en TikTok').trim();
      a.remove();
      return { href, label, cleaned: doc.body.innerHTML.trim() };
    } catch {
      return null;
    }
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

        {/* Controles superiores: notas + navegación */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {showNotesButton && (
              <button
                type="button"
                className="px-3 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => setIsNotesOpen(true)}
                aria-label="Ver notas de clase"
                title="Ver notas de clase"
              >
                Ver notas de clase
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
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
