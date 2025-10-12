// app/page.tsx
// Nivel 1: Catálogo de materias

import Link from 'next/link';
import { getAllSubjectsWithUnits } from '@/lib/content-utils';

export default async function HomePage() {
  const subjects = await getAllSubjectsWithUnits();

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 md:mb-6">
          Bienvenido a Ediprofe
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto px-4 leading-relaxed">
          Explora nuestras materias y comienza a aprender de forma 
          <span className="font-semibold text-indigo-600"> interactiva</span> y 
          <span className="font-semibold text-purple-600"> moderna</span>
        </p>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-7xl mb-6">📚</div>
          <h2 className="text-3xl font-bold text-slate-700 mb-3">
            No hay contenido disponible
          </h2>
          <p className="text-slate-500 text-lg">
            Agrega archivos .md en la carpeta <code className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-lg font-mono text-sm">content/</code>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/${subject.slug}`}
              className="group"
            >
              <div className="card-modern overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full">
                {/* Header con gradiente de color */}
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="p-6 md:p-8 flex flex-col items-center text-center h-full">
                  {/* Icono grande con efecto hover */}
                  <div className="text-6xl md:text-7xl mb-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                    {subject.icon}
                  </div>

                  {/* Nombre de la materia */}
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 break-words group-hover:text-indigo-600 transition-colors">
                    {subject.name}
                  </h2>

                  {/* Descripción */}
                  <p className="text-slate-600 text-sm md:text-base mb-4 line-clamp-3 break-words leading-relaxed flex-grow">
                    {subject.description}
                  </p>

                  {/* Cantidad de unidades con badge */}
                  <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mt-auto">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>
                      {subject.unitCount} {subject.unitCount === 1 ? 'unidad' : 'unidades'}
                    </span>
                  </div>
                </div>

                {/* Decoración de esquina */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
