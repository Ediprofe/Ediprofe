// lib/markdown.ts
// Parser de Markdown usando remark/unified
// Este archivo SOLO se ejecuta en el servidor (Server Components)

import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { ContentMetadata, ParsedMarkdown } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Lee y procesa un archivo Markdown
 * @param materia - Nombre de la carpeta de la materia
 * @param unidad - Nombre del archivo sin extensión
 * @returns Contenido procesado con metadata y HTML
 */
export async function getMarkdownContent(materia: string, unidad: string): Promise<ParsedMarkdown | null> {
  try {
    const fullPath = path.join(contentDirectory, materia, `${unidad}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parsear frontmatter
    const { data, content } = matter(fileContents);

    // Convertir Markdown a HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);

    const rawHtml = processedContent.toString();

    // Metadata con valores por defecto
    const metadata: ContentMetadata = {
      title: data.title || 'Sin título',
      description: data.description || '',
      author: data.author,
      date: data.date,
      duration: data.duration,
      difficulty: data.difficulty,
      tags: data.tags,
    };

    // Retornar resultado inicial (sections y toc se generarán en tabs-generator)
    return {
      metadata,
      sections: [],
      toc: [],
      videos: [],
      rawHtml,
    };
  } catch (error) {
    console.error(`Error reading markdown file ${materia}/${unidad}:`, error);
    return null;
  }
}

/**
 * Obtiene todas las materias disponibles
 * @returns Array de nombres de carpetas en /content/
 */
export function getAllSubjects(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
    return [];
  }

  const subjects = fs.readdirSync(contentDirectory).filter((file) => {
    const filePath = path.join(contentDirectory, file);
    return fs.statSync(filePath).isDirectory();
  });

  return subjects;
}

/**
 * Obtiene todas las unidades de una materia
 * @param materia - Nombre de la materia
 * @returns Array de slugs de unidades (nombres de archivos sin .md)
 */
export function getUnitsForSubject(materia: string): string[] {
  const subjectPath = path.join(contentDirectory, materia);

  if (!fs.existsSync(subjectPath)) {
    return [];
  }

  const units = fs
    .readdirSync(subjectPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .sort(); // Ordenar alfabéticamente (01-, 02-, etc.)

  return units;
}

/**
 * Obtiene metadata rápida de una unidad sin procesar todo el contenido
 * @param materia - Nombre de la materia
 * @param unidad - Slug de la unidad
 * @returns Solo el frontmatter parseado
 */
export function getUnitMetadata(materia: string, unidad: string): ContentMetadata | null {
  try {
    const fullPath = path.join(contentDirectory, materia, `${unidad}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      title: data.title || 'Sin título',
      description: data.description || '',
      author: data.author,
      date: data.date,
      duration: data.duration,
      difficulty: data.difficulty,
      tags: data.tags,
    };
  } catch (error) {
    console.error(`Error reading metadata for ${materia}/${unidad}:`, error);
    return null;
  }
}

/**
 * Cuenta características de una unidad (videos, ejercicios, etc.)
 * @param materia - Nombre de la materia
 * @param unidad - Slug de la unidad
 * @returns Objeto con contadores de características
 */
export function getUnitFeatures(materia: string, unidad: string): {
  hasVideos: boolean;
  hasExercises: boolean;
  hasActivities: boolean;
} {
  try {
    const fullPath = path.join(contentDirectory, materia, `${unidad}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const hasVideos = /^video:\s+https?:\/\//m.test(fileContents);
    const hasExercises = /###\s+.*ejercicio/i.test(fileContents);
    const hasActivities = /###\s+.*actividad/i.test(fileContents);

    return { hasVideos, hasExercises, hasActivities };
  } catch (error) {
    return { hasVideos: false, hasExercises: false, hasActivities: false };
  }
}

/**
 * Obtiene el contenido raw de un archivo Markdown
 * @param materia - Nombre de la materia
 * @param unidad - Slug de la unidad
 * @returns Contenido raw sin procesar
 */
export function getRawMarkdown(materia: string, unidad: string): string | null {
  try {
    const fullPath = path.join(contentDirectory, materia, `${unidad}.md`);
    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error reading raw markdown for ${materia}/${unidad}:`, error);
    return null;
  }
}

// Exportar slugify desde utils (re-export para compatibilidad)
export { slugify } from './utils';
