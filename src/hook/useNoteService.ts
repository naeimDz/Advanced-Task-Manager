// hooks/useNotesService.ts

import { Note } from '@/types/noteType';
import { useMemo } from 'react';

type UseNotesServiceParams = {
  notes: Note[];
  searchTerm?: string;
  selectedTags?: string[];
  onlyPublic?: boolean;
  currentPage: number;
  notesPerPage?: number;
};

export function UseNotesService({
  notes,
  searchTerm = '',
  selectedTags = [],
  onlyPublic = true,
  currentPage,
  notesPerPage = 2,
}: UseNotesServiceParams) {
  
  // تحسين: فصل العمليات وتحسين dependencies
  const filteredNotes = useMemo(() => {
    console.log('🔄 filteredNotes useMemo - Starting calculation');
    console.log('📊 filteredNotes - Dependencies:', {
      notesCount: notes.length,
      searchTerm,
      selectedTags,
      onlyPublic
    });
    
    const startTime = performance.now();
    
    if (!notes.length) {
      console.log('⚠️ filteredNotes - No notes found, returning empty array');
      return [];
    }
    
    let result = notes;
    console.log('📝 filteredNotes - Initial notes count:', result.length);

    // فلترة العامة فقط
    if (onlyPublic) {
      const beforePublicFilter = result.length;
      result = result.filter(note => note.isPublic);
      console.log(`🔒 filteredNotes - Public filter: ${beforePublicFilter} → ${result.length}`);
    }

    // فلترة بالوسم
     if (selectedTags.length > 0) {                                  
      const beforeTagFilter = result.length;
      result = result.filter(note => 
        selectedTags.some(tag => note.tags?.includes(tag))        
      );
      console.log(`🏷️ filteredNotes - Tags filter (${selectedTags.join(', ')}): ${beforeTagFilter} → ${result.length}`);
    }

    // البحث
    if (searchTerm.trim()) {
      const beforeSearchFilter = result.length;
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
      );
      console.log(`🔍 filteredNotes - Search filter (${term}): ${beforeSearchFilter} → ${result.length}`);
    }

    const endTime = performance.now();
    console.log(`✅ filteredNotes - Calculation completed in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('📊 filteredNotes - Final result count:', result.length);

    return result;
  }, [notes, onlyPublic, selectedTags, searchTerm]);

  // تحسين: فصل حساب الوسوم
  const allTags = useMemo(() => {
    console.log('🔄 allTags useMemo - Starting calculation');
    console.log('📊 allTags - Dependencies:', { notesCount: notes.length });
    
    const startTime = performance.now();
    
    if (!notes.length) {
      console.log('⚠️ allTags - No notes found, returning empty array');
      return [];
    }
    
    const tagSet = new Set<string>();
    let totalTagsFound = 0;
    
    for (const note of notes) {
      if (note.tags) {
        for (const tag of note.tags) {
          tagSet.add(tag);
          totalTagsFound++;
        }
      }
    }
    
    const uniqueTags = Array.from(tagSet);
    const endTime = performance.now();
    
    console.log(`🏷️ allTags - Found ${totalTagsFound} total tags, ${uniqueTags.length} unique tags`);
    console.log(`✅ allTags - Calculation completed in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('📊 allTags - Unique tags:', uniqueTags);
    
    return uniqueTags;
  }, [notes]);

  // تحسين: حساب الصفحات
  console.log('🧮 Calculating totalPages:', {
    filteredNotesCount: filteredNotes.length,
    notesPerPage,
    totalPages: Math.ceil(filteredNotes.length / notesPerPage)
  });
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  // تحسين: تقسيم الصفحات
  const paginatedNotes = useMemo(() => {
    console.log('🔄 paginatedNotes useMemo - Starting calculation');
    console.log('📊 paginatedNotes - Dependencies:', {
      filteredNotesCount: filteredNotes.length,
      currentPage,
      notesPerPage
    });
    
    const startTime = performance.now();
    const start = currentPage * notesPerPage;
    const end = start + notesPerPage;
    const result = filteredNotes.slice(start, end);
    const endTime = performance.now();
    
    console.log(`📄 paginatedNotes - Slicing: [${start}:${end}] from ${filteredNotes.length} notes`);
    console.log(`✅ paginatedNotes - Calculation completed in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('📊 paginatedNotes - Result count:', result.length);
    
    return result;
  }, [filteredNotes, currentPage, notesPerPage]);

  console.log('🎯 UseNotesService - Final return values:', {
    paginatedNotesCount: paginatedNotes.length,
    totalPages,
    allTagsCount: allTags.length
  });

  return {
    filteredNotes: paginatedNotes,
    totalPages,
    allTags,
  };
}