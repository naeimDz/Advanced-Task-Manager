// hooks/useNotesService.ts

import { Note } from '@/types/noteType';
import { useMemo } from 'react';

type UseNotesServiceParams = {
  notes: Note[];
  searchTerm?: string;
  selectedTag?: string;
  onlyPublic?: boolean;
  currentPage: number;
  notesPerPage?: number;
};

export function UseNotesService({
  notes,
  searchTerm = '',
  selectedTag = '',
  onlyPublic = true,
  currentPage,
  notesPerPage = 2,
}: UseNotesServiceParams) {
  
  // تحسين: فصل العمليات وتحسين dependencies
  const filteredNotes = useMemo(() => {
    if (!notes.length) return [];
    
    let result = notes;

    // فلترة العامة فقط
    if (onlyPublic) {
      result = result.filter(note => note.isPublic);
    }

    // فلترة بالوسم
    if (selectedTag) {
      result = result.filter(note => note.tags?.includes(selectedTag));
    }

    // البحث
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
      );
    }

    return result;
  }, [notes, onlyPublic, selectedTag, searchTerm]);

  // تحسين: فصل حساب الوسوم
  const allTags = useMemo(() => {
    if (!notes.length) return [];
    
    const tagSet = new Set<string>();
    for (const note of notes) {
      if (note.tags) {
        for (const tag of note.tags) {
          tagSet.add(tag);
        }
      }
    }
    return Array.from(tagSet);
  }, [notes]);

  // تحسين: حساب الصفحات
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  // تحسين: تقسيم الصفحات
  const paginatedNotes = useMemo(() => {
    const start = currentPage * notesPerPage;
    return filteredNotes.slice(start, start + notesPerPage);
  }, [filteredNotes, currentPage, notesPerPage]);

  return {
    filteredNotes: paginatedNotes,
    totalPages,
    allTags,
  };
}