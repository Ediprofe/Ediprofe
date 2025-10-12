// app/page.tsx
// Nivel 1: Catálogo de materias

import Link from 'next/link';
import { getAllSubjectsWithUnits } from '@/lib/content-utils';
import { SUBJECT_COLORS } from '@/types/content';

export default async function HomePage() {
  const subjects = await getAllSubjectsWithUnits();

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 md:mb-8">
          Guía Educativa para Ciencias y Matemáticas
        </h1>
        <div className="space-y-4 px-4">
          <p className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed">
            Explora lecciones estructuradas con{' '}
            <span className="font-semibold text-indigo-600">videos explicativos</span>,{' '}
            material didáctico y recursos descargables que simplifican el aprendizaje de conceptos complejos. Cada unidad temática contiene múltiples lecciones organizadas de forma{' '}
            <span className="font-semibold text-purple-600">progresiva</span>{' '}
            para facilitar el aprendizaje paso a paso.
          </p>
        </div>
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
        <div className={`
          grid gap-6 md:gap-8
          ${subjects.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : ''}
          ${subjects.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' : ''}
          ${subjects.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' : ''}
          ${subjects.length >= 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''}
        `}>
          {subjects.map((subject) => {
            const colors = SUBJECT_COLORS[subject.color as keyof typeof SUBJECT_COLORS];
            return (
              <Link
                key={subject.slug}
                href={`/${subject.slug}`}
                className="group"
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-current overflow-hidden transform hover:scale-105 hover:-translate-y-2 cursor-pointer h-full"
                  style={{ 
                    '--hover-color': colors.primary,
                    color: 'var(--hover-color)'
                  } as React.CSSProperties}
                >
                  {/* Header con color de materia */}
                  <div className={`h-2 bg-${subject.color}`} style={{ backgroundColor: colors.primary }} />

                  <div className="p-6 md:p-8 flex flex-col items-center text-center h-full">
                    {/* Icono grande con fondo de color */}
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                      style={{ backgroundColor: colors.light }}
                    >
                      <span className="text-4xl md:text-5xl">{subject.icon}</span>
                    </div>

                    {/* Nombre de la materia */}
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 break-words group-hover:opacity-90 transition-opacity"
                      style={{ color: colors.dark }}
                    >
                      {subject.name}
                    </h2>

                    {/* Descripción */}
                    <p className="text-slate-600 text-sm md:text-base mb-4 line-clamp-3 break-words leading-relaxed flex-grow">
                      {subject.description}
                    </p>

                    {/* Cantidad de unidades con badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mt-auto text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>
                        {subject.unitCount} {subject.unitCount === 1 ? 'unidad' : 'unidades'}
                      </span>
                    </div>
                  </div>

                  {/* Decoración de esquina con color de materia */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: colors.primary }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Sección de Redes Sociales */}
      <div className="mt-16 md:mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            📱 Sígueme en mis redes
          </h2>
          <p className="text-slate-600 mb-8">
            Encuentra más contenido educativo y mantente actualizado
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* YouTube */}
            <a
              href="https://www.youtube.com/profeedi"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border-2 border-transparent hover:border-red-500 transform hover:scale-105"
            >
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col items-center">
                {/* Ícono de YouTube */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>

                {/* Texto */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                  YouTube
                </h3>
                <p className="text-sm md:text-base text-slate-600 mb-3">
                  /profeedi
                </p>
                
                {/* Botón */}
                <div className="inline-flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Visitar canal</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@ediprofe"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 border-2 border-transparent hover:border-black transform hover:scale-105"
            >
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col items-center">
                {/* Ícono de TikTok */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>

                {/* Texto */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-black transition-colors">
                  TikTok
                </h3>
                <p className="text-sm md:text-base text-slate-600 mb-3">
                  @ediprofe
                </p>
                
                {/* Botón */}
                <div className="inline-flex items-center gap-2 text-black font-semibold group-hover:gap-3 transition-all">
                  <span>Visitar perfil</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
