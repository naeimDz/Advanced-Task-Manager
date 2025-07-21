import { BookOpen, Link2 } from 'lucide-react';
import { Note } from '@/types/noteType';
import { renderContentWithLinks } from '@/lib/contentRenderer';
import React from 'react';
import { formatDate } from '@/lib/dateUtils';

interface NotebookPagesProps {
  currentNotes: Note[];
}

const NotebookPages: React.FC<NotebookPagesProps> = ({ currentNotes }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
      {[0, 1].map((i) => {
        const note = currentNotes[i];

        return (
          <div
            key={i}
            className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg shadow-inner p-8 border-2 border-amber-200"
          >
            {/* Page lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {Array.from({ length: 25 }, (_, i) => (
                <div key={i} className="border-b border-amber-300" style={{ height: '24px' }} />
              ))}
            </div>

            {/* Margin */}
            <div
              className={`absolute top-0 bottom-0 w-px bg-red-300 opacity-50 ${i === 0 ? 'left-12' : 'right-12'}`}
            />

            {note ? (
              <div className="relative z-10">
                <div
                  className={`absolute -top-4 ${i === 0 ? '-right-4' : '-left-4'} bg-amber-800 text-amber-100 px-3 py-1 rounded-full text-xs font-serif transform ${
                    i === 0 ? 'rotate-12' : '-rotate-12'
                  } shadow-md`}
                >
                 {formatDate(note.createdAt)}
                </div>

                <h2 className="text-2xl font-serif text-amber-900 mb-6 leading-relaxed border-b-2 border-dotted border-amber-400 pb-2">
                  {note.title}
                </h2>

                <div className="prose prose-amber max-w-none">
                  <p className="text-amber-800 leading-relaxed font-serif text-lg whitespace-pre-line">
                    {renderContentWithLinks(note.content)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {note.tags.map((tag, index) => (
                    <div
                      key={tag}
                      className="px-3 py-1 text-xs font-serif border-2 border-amber-600 text-amber-800 bg-amber-100/50 shadow-sm"
                      style={{ transform: `rotate(${(index % 3 - 1) * (i === 0 ? 3 : -3)}deg)` }}
                    >
                      #{tag}
                    </div>
                  ))}
                </div>

                {note.linkedNotes.length > 0 && (
                  <div
                    className={`absolute top-32 w-24 ${
                      i === 0 ? '-right-2' : '-left-2'
                    }`}
                  >
                    <div
                      className={`text-xs text-amber-700 font-serif italic transform ${
                        i === 0 ? '-rotate-90 origin-left' : 'rotate-90 origin-right'
                      }`}
                    >
                      <Link2 className="w-3 h-3 inline mb-1" />
                      روابط: {note.linkedNotes.length}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-amber-600 opacity-50">
                  <BookOpen className="w-16 h-16 mx-auto mb-4" />
                  <p className="font-serif italic">صفحة فارغة</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NotebookPages;
