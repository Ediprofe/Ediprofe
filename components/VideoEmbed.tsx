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
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4 text-red-700">
          <p className="text-xs md:text-sm break-words">⚠️ URL de YouTube inválida: {video.url}</p>
        </div>
      );
    }

    return (
      <div className={`youtube-embed ${className}`}>
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full border-0"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Video de YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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
            flex items-center justify-center gap-2 md:gap-3
            bg-gradient-to-r from-pink-500 to-purple-600
            text-white font-medium text-sm md:text-base
            px-4 py-3 md:px-6 md:py-4 rounded-lg
            hover:from-pink-600 hover:to-purple-700
            transition-all duration-200
            shadow-md hover:shadow-lg
            transform hover:scale-105
          "
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
          <span>Ver en TikTok</span>
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
