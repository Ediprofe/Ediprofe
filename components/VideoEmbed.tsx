'use client';

// components/VideoEmbed.tsx
// Componente para embeder videos de YouTube y mostrar links de TikTok

import type { VideoLink } from '@/types/content';
import { getYouTubeId } from '@/lib/utils';

interface VideoEmbedProps {
  video: VideoLink;
  className?: string;
}

export default function VideoEmbed({ video, className = '' }: VideoEmbedProps) {
  // YouTube: Embed completo con iframe
  if (video.platform === 'youtube' && video.embed) {
    const videoId = getYouTubeId(video.url);

    if (!videoId) {
      return (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 md:p-6 text-red-700 shadow-md">
          <p className="text-sm md:text-base break-words font-medium">⚠️ URL de YouTube inválida: {video.url}</p>
        </div>
      );
    }

    return (
      <div className={`youtube-embed group ${className}`}>
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-indigo-500/50" style={{ paddingBottom: '56.25%', maxHeight: '80vh' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
            title="Video educativo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="font-medium">Video de YouTube</span>
        </div>
      </div>
    );
  }

  // TikTok: Botón discreto que abre en nueva pestaña
  if (video.platform === 'tiktok') {
    return (
      <div className={`tiktok-link ${className}`}>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex items-center justify-center gap-3
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600
            text-white font-semibold text-sm md:text-base
            px-8 py-5 rounded-2xl
            hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700
            transition-all duration-300
            shadow-xl hover:shadow-2xl
            transform hover:scale-105 hover:-translate-y-1
            ring-2 ring-purple-500/50
          "
        >
          <svg
            className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
          <span>Ver en TikTok</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    );
  }

  // Fallback para plataformas no soportadas
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 md:p-4">
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm md:text-base break-words"
      >
        Ver video externo →
      </a>
    </div>
  );
}
