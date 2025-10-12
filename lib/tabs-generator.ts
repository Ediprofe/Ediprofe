// lib/tabs-generator.ts
// Generador automático de tabs desde H2/H3

import type { Section, Tab, VideoLink, TOCItem } from '@/types/content';
import { slugify, getYouTubeId } from './utils';
import { remark } from 'remark';
import html from 'remark-html';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

// Re-exportar para compatibilidad
export { getYouTubeId };

/**
 * Detecta videos en el contenido
 * Formato esperado: video: https://youtu.be/... o video: https://vt.tiktok.com/...
 */
function extractVideos(content: string): VideoLink[] {
  const videos: VideoLink[] = [];
  const videoRegex = /^video:\s+(https?:\/\/[^\s]+)/gm;
  let match;

  while ((match = videoRegex.exec(content)) !== null) {
    const url = match[1].trim();

    if (url.includes('youtu.be') || url.includes('youtube.com')) {
      videos.push({
        platform: 'youtube',
        url,
        embed: true,
      });
    } else if (url.includes('tiktok.com')) {
      videos.push({
        platform: 'tiktok',
        url,
        embed: false,
      });
    }
  }

  return videos;
}

/**
 * Convierte contenido Markdown a HTML con soporte para ecuaciones matemáticas
 * Usa KaTeX para renderizar ecuaciones en formato LaTeX
 * Sintaxis: $ecuación inline$ o $$ecuación en bloque$$
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkMath) // Parsear sintaxis matemática ($...$, $$...$$)
    .use(remarkRehype, { allowDangerousHtml: true }) // Convertir a rehype (HTML AST) con soporte completo
    .use(rehypeKatex) // Renderizar ecuaciones con KaTeX
    .use(rehypeStringify, { allowDangerousHtml: true }) // Convertir a HTML string
    .process(markdown);
  return result.toString();
}

/**
 * Parsea el contenido Markdown y genera estructura de secciones y tabs
 * 
 * REGLAS SIMPLES:
 * - H2 (##) = Nueva sección
 * - H3 (###) = Nueva tab dentro de la sección actual
 * - TODO el contenido entre H3s pertenece a esa tab (incluyendo videos)
 * - Si hay contenido entre H2 y el primer H3, se ignora (debe haber al menos 1 H3)
 * - NO se crean tabs automáticas, SOLO las que están definidas con H3
 * 
 * @param rawContent - Contenido Markdown original
 * @returns Array de secciones con tabs anidadas
 */
export async function generateTabsFromMarkdown(rawContent: string): Promise<{
  sections: Section[];
  toc: TOCItem[];
  allVideos: VideoLink[];
}> {
  const sections: Section[] = [];
  const toc: TOCItem[] = [];
  const allVideos: VideoLink[] = [];

  // Split por líneas
  const lines = rawContent.split('\n');

  let currentSection: Section | null = null;
  let currentTab: Tab | null = null;
  let currentContent: string[] = [];
  let sectionOrder = 0;

  const flushTab = async () => {
    if (currentTab && currentSection) {
      const content = currentContent.join('\n').trim();
      
      // Extraer videos del contenido de esta tab
      const tabVideos = extractVideos(content);
      if (tabVideos.length > 0) {
        currentTab.videos = tabVideos;
        allVideos.push(...tabVideos);
      }
      
      // Remover líneas de video del contenido para no duplicar
      const contentWithoutVideos = content
        .split('\n')
        .filter(line => !line.trim().startsWith('video:'))
        .join('\n')
        .trim();
      
      // Convertir Markdown a HTML
      if (contentWithoutVideos) {
        currentTab.content = await markdownToHtml(contentWithoutVideos);
      }
      
      currentSection.tabs.push(currentTab);
      currentContent = [];
    }
  };

  const flushSection = async () => {
    await flushTab();
    if (currentSection && currentSection.tabs.length > 0) {
      sections.push(currentSection);
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detectar H2 (nueva sección)
    if (line.startsWith('## ')) {
      await flushSection();

      const title = line.replace(/^##\s+/, '').trim();
      currentSection = {
        id: slugify(title),
        title,
        tabs: [],
        order: sectionOrder++,
      };

      toc.push({
        id: currentSection.id,
        title,
        level: 2,
        children: [],
      });

      currentTab = null;
      currentContent = [];
      continue;
    }

    // Detectar H3 (nueva tab)
    if (line.startsWith('### ')) {
      await flushTab();

      if (!currentSection) {
        // Si hay H3 sin H2 previo, crear sección por defecto
        currentSection = {
          id: 'contenido',
          title: 'Contenido',
          tabs: [],
          order: sectionOrder++,
        };
        toc.push({
          id: currentSection.id,
          title: 'Contenido',
          level: 2,
          children: [],
        });
      }

      const label = line.replace(/^###\s+/, '').trim();
      const id = slugify(label);

      currentTab = {
        id: currentSection ? `${currentSection.id}-${id}` : id,
        label, // EXACTAMENTE como aparece en el H3
        type: 'content',
      };

      // Agregar a TOC
      const lastTocItem = toc[toc.length - 1];
      if (lastTocItem && lastTocItem.level === 2) {
        if (!lastTocItem.children) lastTocItem.children = [];
        lastTocItem.children.push({
          id: currentTab.id,
          title: label,
          level: 3,
        });
      }

      currentContent = [];
      continue;
    }

    // Acumular TODO el contenido (incluidas líneas video:)
    currentContent.push(line);
  }

  // Flush final
  await flushSection();

  return { sections, toc, allVideos };
}

/**
 * Genera estructura de tabs desde contenido HTML ya procesado
 * Alternativa si ya tienes HTML en lugar de Markdown
 */
export async function generateTabsFromHTML(htmlContent: string, rawMarkdown: string): Promise<{
  sections: Section[];
  toc: TOCItem[];
}> {
  // Esta función es un wrapper que usa el raw markdown
  const { sections, toc } = await generateTabsFromMarkdown(rawMarkdown);
  return { sections, toc };
}

/**
 * Valida que una estructura de secciones sea correcta
 */
export function validateSections(sections: Section[]): boolean {
  if (sections.length === 0) return false;

  for (const section of sections) {
    if (!section.title || !section.id) return false;
    if (section.tabs.length === 0) return false;

    for (const tab of section.tabs) {
      if (!tab.label || !tab.id) return false;
    }
  }

  return true;
}

/**
 * Encuentra una tab específica por su ID
 */
export function findTabById(sections: Section[], tabId: string): Tab | null {
  for (const section of sections) {
    const tab = section.tabs.find((t) => t.id === tabId);
    if (tab) return tab;
  }
  return null;
}

/**
 * Obtiene todas las tabs de todas las secciones (flat list)
 */
export function getAllTabs(sections: Section[]): Tab[] {
  return sections.flatMap((section) => section.tabs);
}
