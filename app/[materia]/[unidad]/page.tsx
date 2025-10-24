// app/[materia]/[unidad]/page.tsx
// Nivel 3: Contenido de una unidad con sistema de tabs

import Link from 'next/link';
import { getFullUnit, generateAllRouteParams } from '@/lib/content-utils';
import { SUBJECT_CONFIG } from '@/types/content';
import TabsSystem from '@/components/TabsSystem';
import TableOfContents from '@/components/TableOfContents';
import Breadcrumb from '@/components/Breadcrumb';
import ExternalResources from '@/components/ExternalResources';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    materia: string;
    unidad: string;
  }>;
}

// Deshabilitar parámetros dinámicos - solo rutas pre-generadas
export const dynamicParams = false;

// Generar todas las rutas estáticas posibles
export function generateStaticParams() {
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
      <div className="w-full mx-auto flex gap-0 lg:gap-8 px-0 md:px-4 py-6 md:py-10 max-w-[1920px]">
        {/* Tabla de contenidos (sidebar izquierdo) */}
        <TableOfContents items={toc} />

        {/* Contenido principal */}
        <div className="flex-1 w-full lg:w-auto min-w-0 px-4 md:px-0">
          {/* Header de la unidad - Más compacto y elegante */}
          <div className="card-modern p-5 md:p-8 mb-8 md:mb-12 relative overflow-hidden border-l-4 border-indigo-500">
            {/* Decoración de fondo sutil */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl lg:text-5xl flex-shrink-0">{config.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-bold text-indigo-600 uppercase tracking-wider mb-1">
                    {config.name}
                  </p>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 break-words leading-tight">
                    {unit.metadata.title}
                  </h1>
                </div>
              </div>

              {unit.metadata.description && (
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {unit.metadata.description}
                </p>
              )}
            </div>
          </div>

          {/* Secciones con tabs - Diseño mejorado */}
          <div className="space-y-6 md:space-y-10">
            {unit.sections.map((section) => (
              <section key={section.id} className="card-modern p-5 md:p-8 lg:p-10 border-l-4 border-purple-400 hover:border-purple-600 transition-colors duration-300">
                <TabsSystem section={section} />
              </section>
            ))}
          </div>

          {/* Recursos externos al final */}
          {unit.externalResources && unit.externalResources.length > 0 && (
            <section className="card-modern p-5 md:p-8 lg:p-10 mt-6 md:mt-10 border-l-4 border-indigo-500">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-5 md:mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Recursos externos
              </h2>
              <ExternalResources resources={unit.externalResources} />
            </section>
          )}

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
