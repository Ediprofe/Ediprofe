// lib/content-utils.ts
// Utilidades para cargar y procesar contenido completo
// Este archivo SOLO se ejecuta en el servidor (Server Components)

import 'server-only';
import { getMarkdownContent, getRawMarkdown, getUnitMetadata, getUnitFeatures, getAllSubjects as getAllSubjectsFromFs, getUnitsForSubject } from './markdown';
import { generateTabsFromMarkdown } from './tabs-generator';
import type { Unit, Subject } from '@/types/content';
import { SUBJECT_CONFIG } from '@/types/content';
import { cache, getCacheKey } from './cache';

// Re-exportar para uso externo
export { getAllSubjectsFromFs as getAllSubjects };

/**
 * Obtiene una unidad completa con todo su contenido procesado
 * Esta es la función principal que combina markdown + tabs
 */
export async function getFullUnit(materia: string, unidad: string): Promise<Unit | null> {
  // Usar caché en desarrollo para acelerar navegación
  const cacheKey = getCacheKey('unit', materia, unidad);
  
  return cache.getOrCompute(cacheKey, async () => {
    const rawContent = getRawMarkdown(materia, unidad);
    if (!rawContent) return null;

    const parsed = await getMarkdownContent(materia, unidad);
    if (!parsed) return null;

    const { sections, toc, allVideos } = await generateTabsFromMarkdown(rawContent);
    const features = getUnitFeatures(materia, unidad);

    const fullUnit: Unit = {
      slug: unidad,
      metadata: parsed.metadata,
      sections,
      materia,
      fullPath: `${materia}/${unidad}`,
      rawContent,
      hasVideos: (allVideos?.length || 0) > 0 || features.hasVideos,
      hasExercises: features.hasExercises,
      hasActivities: features.hasActivities,
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
    const subjectSlugs = getAllSubjectsFromFs();
    const subjects: Subject[] = [];

    for (const slug of subjectSlugs) {
      const config = SUBJECT_CONFIG[slug];
      if (!config) continue; // Saltar carpetas no configuradas

      const unitSlugs = getUnitsForSubject(slug);
      const units: Unit[] = [];

      for (const unitSlug of unitSlugs) {
        const unit = await getFullUnit(slug, unitSlug);
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

    return subjects.filter((s) => s.unitCount > 0);
  });
}

/**
 * Obtiene información básica de todas las unidades de una materia
 * Usado para la página de índice de unidades (Nivel 2)
 */
export function getUnitsInfoForSubject(materia: string) {
  const unitSlugs = getUnitsForSubject(materia);

  return unitSlugs.map((slug) => {
    const metadata = getUnitMetadata(materia, slug);
    const features = getUnitFeatures(materia, slug);

    return {
      slug,
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
    for (const unidad of units) {
      params.push({ materia, unidad });
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
 * Verifica si una unidad existe en una materia
 */
export function unitExists(materia: string, unidad: string): boolean {
  const units = getUnitsForSubject(materia);
  return units.includes(unidad);
}
