// lib/tabs-generator.ts
// Generador automático de tabs desde H2/H3

import type { Section, Tab, VideoLink, TOCItem, ExternalResource } from '@/types/content';
import { slugify, getYouTubeId } from './utils';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

// Re-exportar para compatibilidad
export { getYouTubeId };

/**
 * Extrae recursos externos (Google Drive, YouTube Playlists) de la sección "Recursos de la unidad"
 * Busca específicamente dentro de un H2 con ese título
 */
export function extractExternalResources(content: string): {
  resources: ExternalResource[];
  cleanedContent: string;
} {
  const resources: ExternalResource[] = [];
  const lines = content.split('\n');
  const cleanedLines: string[] = [];
  let inResourcesSection = false;
  let skipSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detectar inicio de sección "Recursos de la unidad"
    if (line.startsWith('## ')) {
      const title = line.replace(/^##\s+/, '').trim().toLowerCase();
      
      if (title === 'recursos de la unidad') {
        inResourcesSection = true;
        skipSection = true; // No incluir esta sección en el contenido final
        continue; // No agregar el H2 al contenido limpio
      } else {
        inResourcesSection = false;
        skipSection = false;
      }
    }

    // Si estamos en la sección de recursos, extraer enlaces
    if (inResourcesSection) {
      // Detectar Google Drive
      if (trimmed.startsWith('https://drive.google.com/')) {
        resources.push({
          type: 'google-drive',
          url: trimmed,
          label: 'Carpeta de la unidad',
          icon: '📁',
        });
        continue; // No agregar esta línea al contenido limpio
      }

      // Detectar YouTube Playlist
      if (trimmed.includes('youtube.com/playlist') || trimmed.includes('youtu.be/playlist')) {
        resources.push({
          type: 'youtube-playlist',
          url: trimmed,
          label: 'Lista de reproducción',
          icon: '📺',
        });
        continue; // No agregar esta línea al contenido limpio
      }

      // Saltar líneas vacías en la sección de recursos
      if (trimmed === '') {
        continue;
      }
    }

    // Si no estamos saltando la sección, mantener la línea
    if (!skipSection) {
      cleanedLines.push(line);
    }
  }

  return {
    resources,
    cleanedContent: cleanedLines.join('\n'),
  };
}

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
 * Convierte contenido Markdown a HTML con soporte para ecuaciones matemáticas y tablas
 * Usa KaTeX para renderizar ecuaciones en formato LaTeX
 * Usa GFM (GitHub Flavored Markdown) para tablas, strikethrough, etc.
 * Sintaxis: $ecuación inline$ o $$ecuación en bloque$$
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // Soporte para tablas, strikethrough, task lists, etc.
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
      
      // Dividir contenido en: antes del video y después del video
      const lines = content.split('\n');
      const videoLineIndex = lines.findIndex(line => line.trim().startsWith('video:'));
      
      let contentBeforeVideo = '';
      let contentAfterVideo = '';
      
      if (videoLineIndex !== -1) {
        // Hay video: dividir contenido
        contentBeforeVideo = lines.slice(0, videoLineIndex).join('\n').trim();
        contentAfterVideo = lines.slice(videoLineIndex + 1).join('\n').trim();
      } else {
        // No hay video: todo el contenido va antes
        contentBeforeVideo = content;
      }
      
      // Convertir ambas partes a HTML
      let htmlContent = '';
      
      if (contentBeforeVideo) {
        htmlContent += await markdownToHtml(contentBeforeVideo);
      }
      
      // Marcador especial para indicar dónde va el video
      if (tabVideos.length > 0) {
        htmlContent += '\n<!-- VIDEO_PLACEHOLDER -->\n';
      }
      
      if (contentAfterVideo) {
        htmlContent += await markdownToHtml(contentAfterVideo);
      }
      
      if (htmlContent.trim()) {
        currentTab.content = htmlContent;
      }
      
      currentSection.tabs.push(currentTab);
      currentContent = [];
    }
  };

  const flushSection = async () => {
    await flushTab();
    
    // Si la sección no tiene tabs pero tiene contenido acumulado, crear una tab automática
    // SOLO si hay contenido real (no solo líneas vacías)
    if (currentSection && currentSection.tabs.length === 0 && currentContent.length > 0) {
      // Verificar si hay contenido real (no solo líneas vacías)
      const hasRealContent = currentContent.some(line => line.trim() !== '');
      
      if (hasRealContent) {
        // Extraer videos del contenido
        const contentText = currentContent.join('\n');
        const videos = extractVideos(contentText);
        
        // Dividir contenido en: antes del video y después del video
        const videoLineIndex = currentContent.findIndex(line => line.trim().startsWith('video:'));
        
        let contentBeforeVideo = '';
        let contentAfterVideo = '';
        
        if (videoLineIndex !== -1) {
          // Hay video: dividir contenido
          contentBeforeVideo = currentContent.slice(0, videoLineIndex).join('\n').trim();
          contentAfterVideo = currentContent.slice(videoLineIndex + 1).join('\n').trim();
        } else {
          // No hay video: todo el contenido va antes
          contentBeforeVideo = contentText;
        }
        
        // Convertir ambas partes a HTML
        let htmlContent = '';
        
        if (contentBeforeVideo) {
          htmlContent += await markdownToHtml(contentBeforeVideo);
        }
        
        // Marcador especial para indicar dónde va el video
        if (videos.length > 0) {
          htmlContent += '\n<!-- VIDEO_PLACEHOLDER -->\n';
        }
        
        if (contentAfterVideo) {
          htmlContent += await markdownToHtml(contentAfterVideo);
        }
        
        // Solo crear la tab si hay contenido o videos
        if (htmlContent.trim() || videos.length > 0) {
          const autoTab: Tab = {
            id: currentSection.id,
            label: currentSection.title,
            type: videos.length > 0 && htmlContent ? 'mixed' : videos.length > 0 ? 'videos' : 'content',
            videos: videos.length > 0 ? videos : undefined,
          };
          
          if (htmlContent.trim()) {
            autoTab.content = htmlContent;
          }
          
          currentSection.tabs.push(autoTab);
        }
      }
    }
    
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
