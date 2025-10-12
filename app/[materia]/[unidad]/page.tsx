// app/[materia]/[unidad]/page.tsx
// Nivel 3: Contenido de una unidad con sistema de tabs

import Link from 'next/link';
import { getFullUnit, generateAllRouteParams } from '@/lib/content-utils';
import { SUBJECT_CONFIG } from '@/types/content';
import TabsSystem from '@/components/TabsSystem';
import TableOfContents from '@/components/TableOfContents';
import Breadcrumb from '@/components/Breadcrumb';
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

  // Breadcrumb items personalizados
  const breadcrumbItems = [
    {
      label: 'Inicio',
      href: '/',
      icon: '🏠',
    },
    {
      label: config.name,
      href: `/${materia}`,
      icon: config.icon,
    },
    {
      label: unit.metadata.title,
      href: `/${materia}/${unidad}`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Breadcrumb sticky mejorado */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Layout con sidebar + contenido */}
      <div className="container mx-auto flex gap-0 lg:gap-8 px-0 md:px-4 py-6 md:py-10">
        {/* Tabla de contenidos (sidebar izquierdo) */}
        <TableOfContents items={toc} />

        {/* Contenido principal */}
        <div className="flex-1 max-w-6xl mx-auto lg:mx-0 min-w-0 px-4 md:px-0">
          {/* Header de la unidad con gradiente */}
          <div className="card-modern p-6 md:p-10 mb-8 md:mb-12 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-0" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <div className="flex items-start md:items-center gap-4 mb-6">
                <span className="text-5xl md:text-6xl flex-shrink-0 drop-shadow-lg">{config.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                    {config.name}
                  </p>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent break-words leading-tight">
                    {unit.metadata.title}
                  </h1>
                </div>
              </div>

              {unit.metadata.description && (
                <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
                  {unit.metadata.description}
                </p>
              )}

              {/* Metadata adicional con badges modernos */}
              <div className="flex flex-wrap gap-3">
                {unit.metadata.author && (
                  <span className="flex items-center gap-2 text-slate-700 bg-slate-100 px-4 py-2 rounded-xl font-medium shadow-sm">
                    <span className="text-lg">👤</span>
                    <span>{unit.metadata.author}</span>
                  </span>
                )}

                {unit.metadata.duration && (
                  <span className="flex items-center gap-2 text-indigo-700 bg-indigo-100 px-4 py-2 rounded-xl font-medium shadow-sm">
                    <span className="text-lg">⏱️</span>
                    <span>{unit.metadata.duration}</span>
                  </span>
                )}

                {unit.metadata.difficulty && (
                  <span className="flex items-center gap-2 text-purple-700 bg-purple-100 px-4 py-2 rounded-xl font-medium shadow-sm">
                    <span className="text-lg">📊</span>
                    <span className="capitalize">{unit.metadata.difficulty}</span>
                  </span>
                )}

                {unit.hasVideos && (
                  <span className="flex items-center gap-2 text-pink-700 bg-pink-100 px-4 py-2 rounded-xl font-medium shadow-sm">
                    <span className="text-lg">🎬</span>
                    <span>Videos</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Secciones con tabs */}
          <div className="space-y-8 md:space-y-12">
            {unit.sections.map((section) => (
              <div key={section.id} className="card-modern p-6 md:p-8 lg:p-10">
                <TabsSystem section={section} />
              </div>
            ))}
          </div>

          {/* Navegación siguiente/anterior */}
          <div className="mt-12 md:mt-16 flex justify-between items-center">
            <Link
              href={`/${materia}`}
              className="
                group flex items-center gap-3 px-6 py-3
                bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300
                text-slate-700 font-semibold rounded-xl
                transition-all duration-300 shadow-md hover:shadow-lg
                transform hover:-translate-x-1
              "
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
