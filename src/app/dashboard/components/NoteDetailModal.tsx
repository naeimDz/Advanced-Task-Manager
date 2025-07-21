"use client"
import React, { useMemo, Suspense, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Note } from '@/types/noteType';
import { SmartNoteFinder } from '@/lib/linkedNotes';
import { formatDate } from '@/lib/dateUtils';
import { useEscapeKey } from '@/hook/useEscapeKey';
import { renderContentWithLinks } from '@/lib/contentRenderer';


interface NoteDetailModalProps {
  note: Note | null;
  onClose: () => void;
  onNoteSelect: (note: Note) => void;
  finder: SmartNoteFinder;
}

// Loading component for Suspense
const ModalSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-slate-700 rounded mb-4 w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-700 rounded"></div>
      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    </div>
  </div>
);

export const NoteDetailModal: React.FC<NoteDetailModalProps> = React.memo(({
  note,
  onClose,
  onNoteSelect,
  finder
}) => {
  // Custom hook for escape key
  useEscapeKey(onClose, !!note);
    
  // Memoize linked notes to avoid recalculation
  const linkedNotes = useMemo(() => {
    if (!note?.linkedNotes) return [];
    return note.linkedNotes
      .map(linkedId => finder.findLinkedNote(linkedId, note.id) as Note)
      .filter(Boolean);
  }, [note?.linkedNotes, note?.id, finder]);

  
  const handleLinkClick = useCallback((linkText: string) => {
    const linkedNote = finder.findLinkedNote(linkText, note?.id);
    if (linkedNote) onNoteSelect(linkedNote as Note);
  }, [finder, note?.id, onNoteSelect]);

  if (!note) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-label="Close modal"
      />
      
      {/* Modal */}
      <div 
        className="fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl shadow-2xl border-l border-white/20 z-50 overflow-y-auto transition-transform duration-300 transform translate-x-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-4">
          <Suspense fallback={<ModalSkeleton />}>
            {/* Header */}
            <header className="flex justify-between items-center mb-4">
              <h2 id="modal-title" className="text-lg font-semibold text-cyan-100">
                {note.title}
              </h2>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition-all"
                aria-label="Close modal"
              >
                ✕
              </button>
            </header>

            {/* Content */}
            <main className="prose prose-sm text-cyan-200/90 prose-headings:text-cyan-100 prose-links:text-blue-400">
                 {renderContentWithLinks(note.content, handleLinkClick)}
            </main>

            {/* Tags */}
            {note.tags.length > 0 && (
              <section className="flex flex-wrap gap-2 mt-4" aria-label="Note tags">
                {note.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 px-2 py-1 rounded-full text-sm border border-purple-400/30"
                  >
                    #{tag}
                  </span>
                ))}
              </section>
            )}

            {/* Linked Notes */}
            {linkedNotes.length > 0 && (
              <section className="border-t border-white/10 pt-4 mt-6">
                <h3 className="font-semibold mb-2 text-cyan-200">الروابط المتصلة:</h3>
                <nav className="space-y-2" role="navigation" aria-label="Linked notes">
                  {linkedNotes.map(linkedNote => (
                    <button
                      key={linkedNote.id}
                      onClick={() => onNoteSelect(linkedNote)}
                      className="block w-full text-left p-3 text-sm bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300 text-cyan-200 focus:ring-2 focus:ring-cyan-400"
                    >
                      {linkedNote.title}
                    </button>
                  ))}
                </nav>
              </section>
            )}

            {/* Footer */}
            <footer className="text-xs text-slate-400 mt-6">
              تم الإنشاء: {formatDate(note.createdAt?.toDate())}
            </footer>
          </Suspense>
        </div>
      </div>
    </>
  );

  // Use portal for better performance and avoid z-index issues
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
});

NoteDetailModal.displayName = 'NoteDetailModal';