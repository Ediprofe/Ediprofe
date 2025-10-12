// app/[materia]/[unidad]/page.tsx
// Nivel 3: Contenido de una unidad con sistema de tabs

import Link from 'next/link';
import { getFullUnit, generateAllRouteParams } from '@/lib/content-utils';
import { SUBJECT_CONFIG } from '@/types/content';
import TabsSystem from '@/components/TabsSystem';
import TableOfContents from '@/components/TableOfContents';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    materia: string;
    unidad: string;
  }>;
}

// Generar todas las rutas estáticas posibles
export async function generateStaticParams() {
  return generateAllRouteParams();
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { materia, unidad } = await params;
  const unit = await getFullUnit(materia, unidad);
  const config = SUBJECT_CONFIG[materia];

  if (!unit || !config) {
    return {
      title: 'Contenido no encontrado',
    };
  }

  return {
    title: `${unit.metadata.title} - ${config.name} - Ediprofe`,
    description: unit.metadata.description || `Aprende ${unit.metadata.title} de forma interactiva`,
    keywords: [config.name, unit.metadata.title, ...(unit.metadata.tags || [])],
  };
}

export default async function UnitPage({ params }: PageProps) {
  const { materia, unidad } = await params;
  const unit = await getFullUnit(materia, unidad);
  const config = SUBJECT_CONFIG[materia];

  if (!unit || !config) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ⚠️ Contenido no encontrado
        </h1>
        <Link href={`/${materia}`} className="text-blue-600 hover:underline">
          ← Volver a {config?.name || 'la materia'}
        </Link>
      </div>
    );
  }

  // Generar TOC desde las secciones
  const toc = unit.sections.map((section) => ({
    id: section.id,
    title: section.title,
    level: 2 as const,
    children: section.tabs
      .filter((tab) => tab.type !== 'videos') // Excluir tabs de videos del TOC
      .map((tab) => ({
        id: tab.id,
        title: tab.label,
        level: 3 as const,
      })),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-2 md:py-3">
          <nav className="text-xs md:text-sm text-gray-600 flex items-center gap-1 md:gap-2 overflow-x-auto">
            <Link href="/" className="hover:text-blue-600 whitespace-nowrap">
              Inicio
            </Link>
            <span className="flex-shrink-0">/</span>
            <Link href={`/${materia}`} className="hover:text-blue-600 whitespace-nowrap">
              <span className="hidden md:inline">{config.icon} </span>
              <span className="md:hidden">{config.icon}</span>
              <span className="hidden sm:inline">{config.name}</span>
            </Link>
            <span className="flex-shrink-0">/</span>
            <span className="text-gray-900 font-medium truncate">{unit.metadata.title}</span>
          </nav>
        </div>
      </div>

      {/* Layout con sidebar + contenido */}
      <div className="container mx-auto flex gap-0 lg:gap-6 px-0 md:px-4 py-4 md:py-8">
        {/* Tabla de contenidos (sidebar izquierdo) */}
        <TableOfContents items={toc} />

        {/* Contenido principal */}
        <div className="flex-1 max-w-4xl mx-auto lg:mx-0 min-w-0 px-4 md:px-0">
          {/* Header de la unidad */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-8 mb-6 md:mb-8">
            <div className="flex items-start md:items-center gap-3 mb-4">
              <span className="text-3xl md:text-4xl flex-shrink-0">{config.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide mb-1">
                  {config.name}
                </p>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 break-words">
                  {unit.metadata.title}
                </h1>
              </div>
            </div>

            {unit.metadata.description && (
              <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4">
                {unit.metadata.description}
              </p>
            )}

            {/* Metadata adicional */}
            <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
              {unit.metadata.author && (
                <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <span>👤</span>
                  <span>{unit.metadata.author}</span>
                </span>
              )}

              {unit.metadata.duration && (
                <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <span>⏱️</span>
                  <span>{unit.metadata.duration}</span>
                </span>
              )}

              {unit.metadata.difficulty && (
                <span className="flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  <span>📊</span>
                  <span className="capitalize">{unit.metadata.difficulty}</span>
                </span>
              )}

              {unit.hasVideos && (
                <span className="flex items-center gap-1 text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                  <span>🎬</span>
                  <span>Videos incluidos</span>
                </span>
              )}
            </div>
          </div>

          {/* Secciones con tabs */}
          <div className="space-y-6 md:space-y-12">
            {unit.sections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8">
                <TabsSystem section={section} />
              </div>
            ))}
          </div>

          {/* Navegación siguiente/anterior (futuro) */}
          <div className="mt-8 md:mt-12 flex justify-between items-center">
            <Link
              href={`/${materia}`}
              className="
                flex items-center gap-2 px-3 md:px-4 py-2
                bg-gray-100 hover:bg-gray-200
                text-gray-700 text-sm md:text-base rounded-lg
                transition-colors
              "
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Volver a unidades</span>
              <span className="sm:hidden">Volver</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
