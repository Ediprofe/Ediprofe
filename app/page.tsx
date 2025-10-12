// app/page.tsx
// Nivel 1: Catálogo de materias

import Link from 'next/link';
import { getAllSubjectsWithUnits } from '@/lib/content-utils';

export default async function HomePage() {
  const subjects = await getAllSubjectsWithUnits();

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
          Bienvenido a Ediprofe
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Explora nuestras materias y comienza a aprender de forma interactiva
        </p>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No hay contenido disponible
          </h2>
          <p className="text-gray-500">
            Agrega archivos .md en la carpeta <code className="bg-gray-100 px-2 py-1 rounded">content/</code>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/${subject.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                {/* Header con color de materia */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 md:h-3" />

                <div className="p-4 md:p-6">
                  {/* Icono grande */}
                  <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 text-center">
                    {subject.icon}
                  </div>

                  {/* Nombre de la materia */}
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 text-center break-words">
                    {subject.name}
                  </h2>

                  {/* Descripción */}
                  <p className="text-gray-600 text-xs md:text-sm text-center mb-3 md:mb-4 line-clamp-2 break-words">
                    {subject.description}
                  </p>

                  {/* Cantidad de unidades */}
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-xs md:text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>
                      {subject.unitCount} {subject.unitCount === 1 ? 'unidad' : 'unidades'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
