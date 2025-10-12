// lib/tabs-generator.ts
// Generador automático de tabs desde H2/H3

import type { Section, Tab, VideoLink, TOCItem } from '@/types/content';
import { slugify, getYouTubeId } from './utils';

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
 * Parsea el contenido Markdown y genera estructura de secciones y tabs
 * 
 * REGLAS:
 * - H2 (##) = Nueva sección
 * - H3 (###) = Nueva tab dentro de la sección actual
 * - Si hay videos después de H2 pero antes de cualquier H3, crear tab "🎬 Videos"
 * - El nombre de la tab es EXACTAMENTE el texto del H3
 * 
 * @param rawContent - Contenido Markdown original
 * @returns Array de secciones con tabs anidadas
 */
export function generateTabsFromMarkdown(rawContent: string): {
  sections: Section[];
  toc: TOCItem[];
  allVideos: VideoLink[];
} {
  const sections: Section[] = [];
  const toc: TOCItem[] = [];
  const allVideos: VideoLink[] = [];

  // Split por líneas
  const lines = rawContent.split('\n');

  let currentSection: Section | null = null;
  let currentTab: Tab | null = null;
  let currentContent: string[] = [];
  let sectionOrder = 0;

  const flushTab = () => {
    if (currentTab && currentSection) {
      currentTab.content = currentContent.join('\n').trim();
      currentSection.tabs.push(currentTab);
      currentContent = [];
    }
  };

  const flushSection = () => {
    flushTab();
    if (currentSection) {
      sections.push(currentSection);
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detectar H2 (nueva sección)
    if (line.startsWith('## ')) {
      flushSection();

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

      // Buscar videos después de este H2 (hasta el próximo H3 o H2)
      let videoLines: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('###') || lines[j].startsWith('##')) break;
        videoLines.push(lines[j]);
      }

      const videoContent = videoLines.join('\n');
      const sectionVideos = extractVideos(videoContent);

      if (sectionVideos.length > 0) {
        allVideos.push(...sectionVideos);

        // Crear tab automática de videos
        const videoTab: Tab = {
          id: `${currentSection.id}-videos`,
          label: '🎬 Videos',
          videos: sectionVideos,
          type: 'videos',
        };
        currentSection.tabs.push(videoTab);
      }

      // Crear tab de "Teoría" para el contenido inicial
      currentTab = {
        id: `${currentSection.id}-teoria`,
        label: '📖 Teoría',
        type: 'content',
      };

      continue;
    }

    // Detectar H3 (nueva tab)
    if (line.startsWith('### ')) {
      flushTab();

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

    // Acumular contenido
    // Saltar líneas de video (ya fueron procesadas)
    if (!line.startsWith('video:')) {
      currentContent.push(line);
    }
  }

  // Flush final
  flushSection();

  return { sections, toc, allVideos };
}

/**
 * Genera estructura de tabs desde contenido HTML ya procesado
 * Alternativa si ya tienes HTML en lugar de Markdown
 */
export function generateTabsFromHTML(htmlContent: string, rawMarkdown: string): {
  sections: Section[];
  toc: TOCItem[];
} {
  // Esta función es un wrapper que usa el raw markdown
  const { sections, toc } = generateTabsFromMarkdown(rawMarkdown);
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
