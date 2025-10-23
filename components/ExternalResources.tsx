'use client';

import type { ExternalResource } from '@/types/content';

interface ExternalResourcesProps {
  resources: ExternalResource[];
}

export default function ExternalResources({ resources }: ExternalResourcesProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative overflow-hidden
              bg-gradient-to-br from-indigo-50 to-purple-50
              hover:from-indigo-100 hover:to-purple-100
              border-2 border-indigo-200 hover:border-indigo-400
              rounded-2xl p-6
              transition-all duration-300
              shadow-md hover:shadow-xl
              transform hover:-translate-y-1
              flex items-center gap-4
            "
          >
            {/* Icono */}
            <div className="
              flex-shrink-0 w-14 h-14 md:w-16 md:h-16
              bg-gradient-to-br from-indigo-500 to-purple-600
              rounded-xl
              flex items-center justify-center
              text-3xl md:text-4xl
              shadow-lg
              group-hover:scale-110 transition-transform duration-300
            ">
              {resource.icon}
            </div>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
              <h3 className="
                text-base md:text-lg font-bold
                text-slate-800 group-hover:text-indigo-700
                transition-colors duration-300
                mb-1
              ">
                {resource.label}
              </h3>
              <p className="
                text-xs md:text-sm text-slate-600
                group-hover:text-slate-700
                transition-colors duration-300
                flex items-center gap-2
              ">
                {resource.type === 'google-drive' && 'Materiales y recursos'}
                {resource.type === 'youtube-playlist' && 'Todos los videos a un link'}
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </p>
            </div>

            {/* Decoración de fondo */}
            <div className="
              absolute top-0 right-0 w-32 h-32
              bg-gradient-to-br from-indigo-400/10 to-purple-400/10
              rounded-full blur-2xl
              group-hover:scale-150 transition-transform duration-500
              -z-10
            " />
          </a>
        ))}
      </div>
    </div>
  );
}
