// app/[materia]/page.tsx
// Nivel 2: Lista de unidades de una materia

import Link from 'next/link';
import { getAllSubjects, getUnitsInfoForSubject } from '@/lib/content-utils';
import { SUBJECT_CONFIG, SUBJECT_COLORS } from '@/types/content';
import Breadcrumb from '@/components/Breadcrumb';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    materia: string;
  }>;
}

// Generar rutas estáticas
export async function generateStaticParams() {
  const subjects = getAllSubjects();
  return subjects.map((materia) => ({ materia }));
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { materia } = await params;
  const config = SUBJECT_CONFIG[materia];

  if (!config) {
    return {
      title: 'Materia no encontrada',
    };
  }

  return {
    title: `${config.name} - Ediprofe`,
    description: config.description,
  };
}

export default async function SubjectPage({ params }: PageProps) {
  const { materia } = await params;
  const config = SUBJECT_CONFIG[materia];
  const colors = SUBJECT_COLORS[config?.color as keyof typeof SUBJECT_COLORS];
  const units = getUnitsInfoForSubject(materia);

  if (!config) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ⚠️ Materia no encontrada
        </h1>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  // Breadcrumb items
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Breadcrumb sticky */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        {/* Header de la materia */}
        <div className="mb-8 md:mb-12">
        <div className="flex items-start md:items-center gap-3 md:gap-4 mb-4">
          <span className="text-4xl md:text-6xl flex-shrink-0">{config.icon}</span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 break-words">{config.name}</h1>
            <p className="text-sm md:text-lg text-gray-600 mt-2">{config.description}</p>
          </div>
        </div>
      </div>

      {/* Lista de unidades */}
      {units.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No hay unidades disponibles para esta materia
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            📚 Unidades disponibles ({units.length})
          </h2>

          <div className="grid gap-4 md:gap-5">
            {units.map((unit) => (
              <Link
                key={unit.slug}
                href={`/${materia}/${unit.slug}`}
                className="group"
              >
                <div
                  className="relative bg-white rounded-xl border-2 border-gray-200 hover:shadow-xl transition-all duration-300 p-5 md:p-6 overflow-hidden"
                  style={{
                    borderColor: colors?.light,
                  }}
                >
                  {/* Barra lateral de color */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1.5 group-hover:w-2 transition-all duration-300"
                    style={{ backgroundColor: colors?.primary }}
                  />
                  
                  <div className="flex items-start justify-between gap-3 ml-3">
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-base md:text-xl font-bold mb-2 break-words transition-colors duration-200"
                        style={{ color: colors?.dark }}
                      >
                        {unit.metadata.title}
                      </h3>

                      {unit.metadata.description && (
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {unit.metadata.description}
                        </p>
                      )}
                    </div>

                    {/* Flecha indicadora con color de materia */}
                    <div 
                      className="ml-4 transition-all duration-200 group-hover:translate-x-1"
                      style={{ color: colors?.primary }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Efecto de fondo en hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: colors?.primary }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
