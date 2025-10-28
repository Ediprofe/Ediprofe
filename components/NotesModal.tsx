'use client';

import { useEffect, useMemo, useState } from 'react';
import MarkdownContent from './MarkdownContent';
import VideoEmbed from './VideoEmbed';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { getYouTubeId } from '@/lib/utils';
import type { VideoLink } from '@/types/content';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title?: string;
}

// Extrae videos de YouTube del contenido markdown
function extractYouTubeVideos(markdown: string): VideoLink[] {
  const videos: VideoLink[] = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('video:')) {
      const url = trimmed.replace(/^video:\s*/, '').trim();
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = getYouTubeId(url);
        if (videoId) {
          videos.push({
            url,
            platform: 'youtube',
            embed: true
          });
        }
      }
    }
  }
  
  return videos;
}

// Extrae enlaces (como TikTok) del contenido markdown
function extractLinks(markdown: string): Array<{ href: string; label: string }> {
  const links: Array<{ href: string; label: string }> = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  
  while ((match = linkRegex.exec(markdown)) !== null) {
    const label = match[1];
    const href = match[2];
    // Excluir líneas que empiezan con 'video:'
    if (!markdown.substring(0, match.index).split('\n').pop()?.trim().startsWith('video:')) {
      links.push({ label, href });
    }
  }
  
  return links;
}

// Procesa el markdown y retorna las partes antes y después del video
function splitMarkdownByVideo(markdown: string): { before: string; after: string; videoIndex: number } {
  const lines = markdown.split('\n');
  const videoIndex = lines.findIndex(line => line.trim().startsWith('video:'));
  
  if (videoIndex === -1) {
    return { before: markdown, after: '', videoIndex: -1 };
  }
  
  const before = lines.slice(0, videoIndex).join('\n').trim();
  const after = lines.slice(videoIndex + 1).join('\n').trim();
  
  return { before, after, videoIndex };
}

// Limpia el markdown removiendo enlaces de hipervínculo (pero mantiene el resto)
function cleanMarkdownLinks(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '') // Remover enlaces markdown
    .trim();
}

// Extrae el texto dentro de bloques markdown o md del HTML ya renderizado por remark
function extractPlainMarkdown(html: string): string | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const codeBlocks = Array.from(
      doc.querySelectorAll<HTMLElement>(
        'pre > code[class*="language-markdown"], pre > code[class*="language-md"], code[class*="language-markdown"], code[class*="language-md"]'
      )
    );

    const texts = codeBlocks
      .map((el) => el.textContent || '')
      .filter((t) => t.trim().length > 0);

    let joined = texts.join('\n\n').trim();

    // Fallback robusto: si el contenido parece incompleto, usar regex sobre el HTML
    if (!joined || joined.split('\n').length < 3) {
      const regex = /<code[^>]*class=["'][^"']*(?:language-)?(?:markdown|md)[^"']*["'][^>]*>([\s\S]*?)<\/code>/gi;
      const matches: string[] = [];
      let m: RegExpExecArray | null;
      while ((m = regex.exec(html)) !== null) {
        const inner = m[1];
        // Decodificar entidades HTML y extraer texto plano de lo que pueda haber envuelto en spans
        const tempDoc = parser.parseFromString(`<div>${inner}</div>`, 'text/html');
        const text = tempDoc.body.textContent || '';
        if (text.trim()) matches.push(text.trim());
      }
      const fallback = matches.join('\n\n').trim();
      if (fallback) joined = fallback;
    }

    return joined.length > 0 ? joined : null;
  } catch {
    return null;
  }
}

// Simplifica el HTML: elimina numeración/viñetas en listas, enlaces de TikTok y oculta bloques markdown
function simplifyHtml(html: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Quitar enlaces a TikTok dentro del contenido del modal
    doc.querySelectorAll('a[href*="tiktok.com"], a[href*="vt.tiktok.com"]').forEach((a) => a.remove());

    // Aplanar listas: convertir <li> en párrafos y quitar marcadores
    doc.querySelectorAll('ul, ol').forEach((list) => {
      const wrapper = doc.createElement('div');
      Array.from(list.children).forEach((child) => {
        const li = child as HTMLElement;
        const p = doc.createElement('p');
        p.innerHTML = li.innerHTML; // conservar negritas, enlaces, latex, etc.
        wrapper.appendChild(p);
      });
      list.replaceWith(wrapper);
    });

    // Ocultar bloques de código con lenguaje markdown/md para evitar fondo oscuro duplicado
    doc
      .querySelectorAll('pre > code[class*="language-markdown"], pre > code[class*="language-md"]')
      .forEach((code) => {
        const pre = code.parentElement as HTMLElement | null;
        if (!pre) return;
        // Reemplazar por contenido plano en párrafos
        const plain = code.textContent || '';
        const container = doc.createElement('div');
        plain.split('\n').forEach((line) => {
          if (line.trim().length === 0) return;
          const p = doc.createElement('p');
          p.textContent = line;
          container.appendChild(p);
        });
        pre.replaceWith(container);
      });

    return doc.body.innerHTML;
  } catch {
    // Si algo falla, mostrar el HTML original
    return html;
  }
}

export default function NotesModal({ isOpen, onClose, content, title = 'Notas de clase' }: NotesModalProps) {
  // Modal component for displaying class notes
  // Intentar extraer markdown del HTML (para compatibilidad con contenido antiguo)
  // o usar directamente el contenido si ya es markdown raw
  const plainMarkdown = useMemo(() => {
    if (!content) return null;
    
    // Detectar si es markdown raw vs HTML procesado
    const trimmedContent = content.trim();
    const startsWithVideo = trimmedContent.startsWith('video:');
    const startsWithLink = trimmedContent.startsWith('[Ver');
    const startsWithFence = trimmedContent.startsWith('```');
    const isMarkdownRaw = startsWithVideo || startsWithLink || startsWithFence;
    
    // Si NO es markdown raw, verificar si es HTML
    if (!isMarkdownRaw) {
      const htmlTagPattern = /<(p|div|span|h[1-6]|ul|ol|li|table|tr|td|th|pre|code|a|strong|em|br|hr)[>\s]/i;
      const isHtml = htmlTagPattern.test(content);
      
      if (isHtml) {
        return extractPlainMarkdown(content);
      }
    }
    
    // Es markdown raw, extraer solo los bloques markdown
    const lines = content.split('\n');
    let inMarkdownFence = false;
    const markdownLines: string[] = [];
    const FENCE = '```';
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith(FENCE)) {
        const afterFence = trimmed.substring(3).trim().toLowerCase();
        
        if (!inMarkdownFence && (afterFence === 'markdown' || afterFence === 'md' || afterFence.startsWith('markdown') || afterFence.startsWith('md'))) {
          inMarkdownFence = true;
          continue;
        } else if (inMarkdownFence) {
          inMarkdownFence = false;
          continue;
        }
      }
      
      if (inMarkdownFence) {
        markdownLines.push(line);
      }
    }
    
    return markdownLines.length > 0 ? markdownLines.join('\n') : null;
  }, [content]);
  
  const youtubeVideos = useMemo(() => plainMarkdown ? extractYouTubeVideos(plainMarkdown) : [], [plainMarkdown]);
  const links = useMemo(() => plainMarkdown ? extractLinks(plainMarkdown) : [], [plainMarkdown]);
  const { before: markdownBefore, after: markdownAfter, videoIndex } = useMemo(
    () => plainMarkdown ? splitMarkdownByVideo(plainMarkdown) : { before: '', after: '', videoIndex: -1 },
    [plainMarkdown]
  );
  const cleanedBefore = useMemo(() => cleanMarkdownLinks(markdownBefore), [markdownBefore]);
  const cleanedAfter = useMemo(() => cleanMarkdownLinks(markdownAfter), [markdownAfter]);
  const [sizeIdx, setSizeIdx] = useState(1); // 0: pequeño, 1: normal, 2: grande
  const [htmlBefore, setHtmlBefore] = useState<string>('');
  const [htmlAfter, setHtmlAfter] = useState<string>('');
  const hasVideo = youtubeVideos.length > 0;

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const simplifiedHtml = useMemo(() => simplifyHtml(content), [content]);

  // Renderizar Markdown (con títulos y ecuaciones) cuando haya bloque detectado
  useEffect(() => {
    let cancelled = false;
    async function renderMd() {
      if (!cleanedBefore && !cleanedAfter) {
        setHtmlBefore('');
        setHtmlAfter('');
        return;
      }
      try {
        // Renderizar la parte antes del video
        if (cleanedBefore) {
          const resultBefore = await remark()
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeKatex)
            .use(rehypeStringify, { allowDangerousHtml: true })
            .process(cleanedBefore);
          if (!cancelled) {
            setHtmlBefore(resultBefore.toString());
          }
        }
        
        // Renderizar la parte después del video
        if (cleanedAfter) {
          const resultAfter = await remark()
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeKatex)
            .use(rehypeStringify, { allowDangerousHtml: true })
            .process(cleanedAfter);
          if (!cancelled) {
            setHtmlAfter(resultAfter.toString());
          }
        }
      } catch (err) {
        // Si falla el render, mostrar texto plano
        if (!cancelled) {
          setHtmlBefore('');
          setHtmlAfter('');
        }
      }
    }
    renderMd();
    return () => {
      cancelled = true;
    };
  }, [cleanedBefore, cleanedAfter]);

  if (!isOpen) return null;

  const proseSizeClass = sizeIdx === 0 ? 'prose-sm' : sizeIdx === 2 ? 'prose-lg' : 'prose';

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-x-4 md:inset-x-16 top-8 bottom-8 z-[65] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          </div>

          {/* Controles de tamaño */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSizeIdx((s) => Math.max(0, s - 1))}
              className="px-2 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
              title="Reducir tamaño"
            >
              A−
            </button>
            <button
              onClick={() => setSizeIdx((s) => Math.min(2, s + 1))}
              className="px-2 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
              title="Aumentar tamaño"
            >
              A+
            </button>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          {/* Layout unificado con contenedor destacado - ancho completo */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 md:p-10 shadow-lg border-2 border-indigo-200">
            {/* Título de notas - siempre visible */}
            <div className="mb-8 flex items-center gap-3 pb-4 border-b-2 border-indigo-200">
              <div className="text-4xl">📝</div>
              <h4 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Notas de clase
              </h4>
            </div>
            
            {/* Contenido antes del video */}
            {htmlBefore && (
              <MarkdownContent 
                content={htmlBefore} 
                className="notes-modal-content prose prose-lg max-w-none prose-headings:text-indigo-900 prose-headings:font-bold prose-p:text-slate-800 prose-p:leading-relaxed prose-strong:text-indigo-800 prose-strong:font-bold prose-table:w-full prose-table:border-collapse prose-thead:bg-gradient-to-r prose-thead:from-indigo-600 prose-thead:to-purple-600 prose-th:text-white prose-th:font-bold prose-th:p-4 prose-th:text-left prose-td:p-4 prose-td:border-b prose-td:border-indigo-100 prose-tr:transition-colors prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-slate-800" 
              />
            )}
            
            {/* Videos de YouTube embebidos en su posición original */}
            {youtubeVideos.length > 0 && videoIndex !== -1 && (
              <div className="my-6 space-y-4">
                {youtubeVideos.map((video, index) => (
                  <div key={index} className="w-full">
                    <VideoEmbed video={video} />
                  </div>
                ))}
              </div>
            )}

            {/* Enlaces externos (como TikTok) después del video */}
            {links.length > 0 && videoIndex !== -1 && (
              <div className="my-4 flex flex-wrap gap-3">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span>{link.label}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
            
            {/* Contenido después del video */}
            {htmlAfter && (
              <MarkdownContent 
                content={htmlAfter} 
                className="notes-modal-content prose prose-lg max-w-none prose-headings:text-indigo-900 prose-headings:font-bold prose-p:text-slate-800 prose-p:leading-relaxed prose-strong:text-indigo-800 prose-strong:font-bold prose-table:w-full prose-table:border-collapse prose-thead:bg-gradient-to-r prose-thead:from-indigo-600 prose-thead:to-purple-600 prose-th:text-white prose-th:font-bold prose-th:p-4 prose-th:text-left prose-td:p-4 prose-td:border-b prose-td:border-indigo-100 prose-tr:transition-colors prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-slate-800" 
              />
            )}
            
            {/* Fallback si no hay contenido procesado */}
            {!htmlBefore && !htmlAfter && plainMarkdown && (
              <div className="whitespace-pre-wrap break-words text-slate-900 text-base md:text-lg">
                {plainMarkdown}
              </div>
            )}
            {!htmlBefore && !htmlAfter && !plainMarkdown && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                <p className="font-semibold mb-2">⚠️ No se encontró contenido markdown</p>
                <p className="text-sm">Esta pestaña no contiene un bloque markdown con notas de clase.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}