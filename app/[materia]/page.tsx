// app/[materia]/page.tsx
// Nivel 2: Lista de unidades de una materia

import Link from 'next/link';
import { getAllSubjects, getUnitsInfoForSubject } from '@/lib/content-utils';
import { SUBJECT_CONFIG } from '@/types/content';
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{config.name}</span>
      </nav>

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

          <div className="grid gap-3 md:gap-4">
            {units.map((unit) => (
              <Link
                key={unit.slug}
                href={`/${materia}/${unit.slug}`}
                className="group"
              >
                <div
                  className="
                    bg-white rounded-lg border-2 border-gray-200
                    hover:border-blue-500 hover:shadow-lg
                    transition-all duration-200
                    p-4 md:p-6
                  "
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 break-words">
                        {unit.metadata.title}
                      </h3>

                      {unit.metadata.description && (
                        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                          {unit.metadata.description}
                        </p>
                      )}

                      {/* Indicadores de contenido */}
                      <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
                        {unit.features.hasVideos && (
                          <span className="flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                            <span>🎬</span>
                            <span>Videos</span>
                          </span>
                        )}

                        {unit.features.hasExercises && (
                          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <span>✏️</span>
                            <span>Ejercicios</span>
                          </span>
                        )}

                        {unit.features.hasActivities && (
                          <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                            <span>🔬</span>
                            <span>Actividades</span>
                          </span>
                        )}

                        {unit.metadata.duration && (
                          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            <span>⏱️</span>
                            <span>{unit.metadata.duration}</span>
                          </span>
                        )}

                        {unit.metadata.difficulty && (
                          <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            <span>📊</span>
                            <span className="capitalize">{unit.metadata.difficulty}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Flecha indicadora */}
                    <div className="ml-4 text-gray-400 group-hover:text-blue-600 transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
