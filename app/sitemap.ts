import { MetadataRoute } from 'next';
import { getAllSubjects, getUnitsInfoForSubject } from '@/lib/content-utils';
import { SUBJECT_CONFIG } from '@/types/content';

/**
 * Genera el sitemap dinámicamente para todas las páginas del sitio
 * Next.js 15 generará automáticamente /sitemap.xml
 * Documentación: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ediprofe.com';
  const currentDate = new Date();
  
  // Array para almacenar todas las URLs
  const urls: MetadataRoute.Sitemap = [];

  // 1. Página principal
  urls.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // 2. Obtener todas las materias
  const subjects = getAllSubjects();

  for (const materia of subjects) {
    const config = SUBJECT_CONFIG[materia];
    if (!config) continue;

    // Página de índice de la materia
    urls.push({
      url: `${baseUrl}/${materia}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // 3. Obtener todas las unidades de cada materia
    const units = getUnitsInfoForSubject(materia);

    for (const unit of units) {
      urls.push({
        url: `${baseUrl}/${materia}/${unit.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return urls;
}
