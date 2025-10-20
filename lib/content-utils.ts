// lib/content-utils.ts
// Utilidades para cargar y procesar contenido completo
// Este archivo SOLO se ejecuta en el servidor (Server Components)

import 'server-only';
import { getMarkdownContent, getRawMarkdown, getUnitMetadata, getUnitFeatures, getAllSubjects as getAllSubjectsFromFs, getUnitsForSubject, findUnitFileByCleanSlug } from './markdown';
import { generateTabsFromMarkdown, extractExternalResources } from './tabs-generator';
import type { Unit, Subject } from '@/types/content';
import { SUBJECT_CONFIG, SUBJECT_ORDER } from '@/types/content';
import { cache, getCacheKey } from './cache';
import { removeNumberPrefix } from './utils';

// Re-exportar para uso externo
export { getAllSubjectsFromFs as getAllSubjects };

/**
 * Obtiene una unidad completa con todo su contenido procesado
 * Esta es la función principal que combina markdown + tabs
 * @param materia - Nombre de la materia
 * @param cleanSlug - Slug limpio sin prefijo numérico (ej: "la-materia")
 */
export async function getFullUnit(materia: string, cleanSlug: string): Promise<Unit | null> {
  // Buscar el archivo real con el prefijo numérico
  const fileSlug = findUnitFileByCleanSlug(materia, cleanSlug);
  if (!fileSlug) return null;
  
  // Usar caché en desarrollo para acelerar navegación
  const cacheKey = getCacheKey('unit', materia, cleanSlug);
  
  return cache.getOrCompute(cacheKey, async () => {
    const rawContent = getRawMarkdown(materia, fileSlug);
    if (!rawContent) return null;

    const parsed = await getMarkdownContent(materia, fileSlug);
    if (!parsed) return null;

    // Extraer recursos externos (Google Drive, YouTube Playlists)
    const { resources: externalResources, cleanedContent } = extractExternalResources(rawContent);

    // Generar tabs desde el contenido limpio (sin los enlaces externos)
    const { sections, toc, allVideos } = await generateTabsFromMarkdown(cleanedContent);
    const features = getUnitFeatures(materia, fileSlug);

    const fullUnit: Unit = {
      slug: cleanSlug, // Usar slug limpio para la URL
      metadata: parsed.metadata,
      sections,
      materia,
      fullPath: `${materia}/${cleanSlug}`, // URL limpia
      rawContent,
      hasVideos: (allVideos?.length || 0) > 0 || features.hasVideos,
      hasExercises: features.hasExercises,
      hasActivities: features.hasActivities,
      externalResources: externalResources.length > 0 ? externalResources : undefined,
    };

    return fullUnit;
  });
}

/**
 * Obtiene todas las materias con sus unidades
 * Usado para la página principal (catálogo)
 */
export async function getAllSubjectsWithUnits(): Promise<Subject[]> {
  // Usar caché para toda la estructura
  const cacheKey = getCacheKey('all-subjects');
  
  return cache.getOrCompute(cacheKey, async () => {
    // Incluir todas las materias configuradas, aunque la carpeta no exista
    const subjectSlugs = Object.keys(SUBJECT_CONFIG);
    const subjects: Subject[] = [];

    for (const slug of subjectSlugs) {
      const config = SUBJECT_CONFIG[slug];
      if (!config) continue; // Saltar carpetas no configuradas

      const unitSlugs = getUnitsForSubject(slug);
      const units: Unit[] = [];

      for (const unitSlug of unitSlugs) {
        const cleanSlug = removeNumberPrefix(unitSlug);
        const unit = await getFullUnit(slug, cleanSlug);
        if (unit) units.push(unit);
      }

      subjects.push({
        slug,
        name: config.name,
        icon: config.icon,
        description: config.description,
        color: config.color,
        units,
        unitCount: units.length,
      });
    }

    // Ordenar según SUBJECT_ORDER (mostrar todas las materias, incluso sin contenido)
    return subjects.sort((a, b) => {
      const indexA = SUBJECT_ORDER.indexOf(a.slug);
      const indexB = SUBJECT_ORDER.indexOf(b.slug);
      
      // Si ambos están en el orden, usar ese orden
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      
      // Si solo uno está en el orden, ese va primero
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      // Si ninguno está en el orden, orden alfabético
      return a.slug.localeCompare(b.slug);
    });
  });
}

/**
 * Obtiene información básica de todas las unidades de una materia
 * Usado para la página de índice de unidades (Nivel 2)
 */
export function getUnitsInfoForSubject(materia: string) {
  const unitSlugs = getUnitsForSubject(materia);

  return unitSlugs.map((fileSlug) => {
    const metadata = getUnitMetadata(materia, fileSlug);
    const features = getUnitFeatures(materia, fileSlug);
    const cleanSlug = removeNumberPrefix(fileSlug);

    return {
      slug: cleanSlug, // Usar slug limpio para URLs
      metadata: metadata || { title: 'Sin título', description: '' },
      features,
    };
  });
}

/**
 * Genera todos los parámetros posibles para rutas dinámicas
 * Usado en generateStaticParams de Next.js
 */
export function generateAllRouteParams(): { materia: string; unidad: string }[] {
  const subjects = getAllSubjectsFromFs();
  const params: { materia: string; unidad: string }[] = [];

  for (const materia of subjects) {
    const units = getUnitsForSubject(materia);
    for (const fileSlug of units) {
      const cleanSlug = removeNumberPrefix(fileSlug);
      params.push({ materia, unidad: cleanSlug }); // Usar slug limpio
    }
  }

  return params;
}

/**
 * Verifica si una materia existe
 */
export function subjectExists(materia: string): boolean {
  const subjects = getAllSubjectsFromFs();
  return subjects.includes(materia);
}

/**
 * Verifica si una unidad existe en una materia (usando slug limpio)
 */
export function unitExists(materia: string, cleanSlug: string): boolean {
  const fileSlug = findUnitFileByCleanSlug(materia, cleanSlug);
  return fileSlug !== null;
}
