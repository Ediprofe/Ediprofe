'use client';

import { useEffect, useMemo, useState } from 'react';
import MarkdownContent from './MarkdownContent';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title?: string;
}

// Extrae el texto dentro de bloques \```markdown o \```md del HTML ya renderizado por remark
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

// Simplifica el HTML: elimina numeración/viñetas en listas, enlaces de TikTok y oculta bloques ```markdown
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
  const plainMarkdown = useMemo(() => extractPlainMarkdown(content), [content]);
  const [sizeIdx, setSizeIdx] = useState(1); // 0: pequeño, 1: normal, 2: grande
  const [markdownHtml, setMarkdownHtml] = useState<string>('');

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
      if (!plainMarkdown) {
        setMarkdownHtml('');
        return;
      }
      try {
        const result = await remark()
          .use(remarkGfm)
          .use(remarkMath)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeKatex)
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(plainMarkdown);
        if (!cancelled) {
          setMarkdownHtml(result.toString());
        }
      } catch (err) {
        // Si falla el render, mostrar texto plano
        if (!cancelled) setMarkdownHtml('');
      }
    }
    renderMd();
    return () => {
      cancelled = true;
    };
  }, [plainMarkdown]);

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
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          {markdownHtml ? (
            <MarkdownContent content={markdownHtml} className={`prose max-w-none ${proseSizeClass}`} />
          ) : (
            <div className="whitespace-pre-wrap break-words text-slate-900 text-base md:text-lg">
              {plainMarkdown || 'No se encontró bloque ```markdown``` en el contenido.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}