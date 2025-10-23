'use client';

import { useEffect } from 'react';
import MarkdownContent from './MarkdownContent';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title?: string;
}

export default function NotesModal({ isOpen, onClose, content, title = 'Notas de clase' }: NotesModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-x-4 md:inset-x-16 top-8 bottom-8 z-[65] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <h3 className="text-lg md:text-xl font-bold">{title}</h3>
            <span className="text-xs md:text-sm text-slate-500">Fuente: Markdown</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          <MarkdownContent content={content} className="prose prose-lg max-w-none" />
        </div>
      </div>
    </div>
  );
}