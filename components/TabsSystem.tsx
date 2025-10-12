'use client';

// components/TabsSystem.tsx
// Sistema de tabs interactivo con estado client-side

import { useState } from 'react';
import type { Section } from '@/types/content';
import VideoEmbed from './VideoEmbed';

interface TabsSystemProps {
  section: Section;
  className?: string;
}

export default function TabsSystem({ section, className = '' }: TabsSystemProps) {
  const [activeTabId, setActiveTabId] = useState(section.tabs[0]?.id || '');

  const activeTab = section.tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className={`tabs-system ${className}`}>
      {/* Título de la sección */}
      <h2 id={section.id} className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 scroll-mt-20">
        {section.title}
      </h2>

      {/* Navegación de tabs - Horizontal con scroll */}
      <div className="tabs-nav-wrapper overflow-x-auto mb-6 border-b-2 border-gray-200">
        <div className="flex gap-1 min-w-max">
          {section.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                px-4 py-3 font-medium text-sm md:text-base whitespace-nowrap
                transition-all duration-200 border-b-2 -mb-[2px]
                ${
                  activeTabId === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
              aria-selected={activeTabId === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido de la tab activa */}
      <div
        className="tab-content animate-fade-in"
        role="tabpanel"
        aria-labelledby={activeTabId}
      >
        {activeTab && (
          <>
            {/* Mostrar videos si la tab los tiene */}
            {activeTab.videos && activeTab.videos.length > 0 && (
              <div className="videos-section mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeTab.videos.map((video, index) => (
                    <VideoEmbed key={index} video={video} />
                  ))}
                </div>
              </div>
            )}

            {/* Mostrar contenido HTML */}
            {activeTab.content && (
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-800
                  prose-p:text-gray-700
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-ul:text-gray-700
                  prose-ol:text-gray-700
                  prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:text-gray-100
                  prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:text-gray-700
                "
                dangerouslySetInnerHTML={{ __html: activeTab.content }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
