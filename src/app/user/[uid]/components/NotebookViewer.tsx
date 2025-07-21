"use client"
import React, { useState } from 'react';
import { Search, BookOpen, User, Feather } from 'lucide-react';
import { Note } from '@/types/noteType';
import NotebookPages from './NotebookPage';


interface OpenNotebookProps {
  publicNotes: Note[],
}

const NotebookViewer = ({ publicNotes }: OpenNotebookProps) => {


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // تصفية الملاحظات
  const filteredNotes = publicNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // تقسيم الملاحظات إلى صفحات (ملاحظتان في كل صفحة)
  const notesPerPage = 2;
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const currentNotes = filteredNotes.slice(currentPage * notesPerPage, (currentPage + 1) * notesPerPage);

  // جميع الوسوم
    const allTags = [...new Set(publicNotes.flatMap(note => note.tags))];



  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-amber-800 p-3 rounded-full shadow-lg">
              <BookOpen className="w-8 h-8 text-amber-100" />
            </div>
            <div>
              <h1 className="text-4xl font-serif text-amber-900 mb-2">The Open Notebook</h1>
              <p className="text-amber-700 italic">دفتر الأفكار المفتوح</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-amber-800 mb-6">
            <User className="w-5 h-5" />
            <span className="font-serif">بقلم: أحمد المفكر</span>
            <Feather className="w-4 h-4 ml-2" />
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
              <input
                type="text"
                placeholder="ابحث في الأفكار..."
                className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg bg-white/70 backdrop-blur-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-serif"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-3 border-2 border-amber-200 rounded-lg bg-white/70 backdrop-blur-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-serif"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">جميع المواضيع</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Open Book Layout */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Book Background */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            {/* Book Binding */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-amber-800 transform -translate-x-1/2 shadow-lg"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-900/20 to-transparent transform -translate-x-4 blur-sm"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-900/20 to-transparent transform translate-x-4 blur-sm"></div>

            {/* Pages */}
            <NotebookPages currentNotes={currentNotes} />


            {/* Page Navigation */}
            <div className="flex justify-between items-center mt-8 px-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-6 py-2 bg-amber-800 text-amber-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-serif hover:bg-amber-900 transition-colors"
              >
                ← الصفحة السابقة
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({length: totalPages}, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 rounded-full font-serif text-sm ${
                      currentPage === i 
                        ? 'bg-amber-800 text-amber-100' 
                        : 'bg-amber-200 text-amber-800 hover:bg-amber-300 z-0'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-6 py-2 bg-amber-800 text-amber-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-serif hover:bg-amber-900 transition-colors"
              >
                الصفحة التالية →
              </button>
            </div>

            
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-amber-600 font-serif">
        <p className="italic">"الأفكار تنمو عندما نشاركها مع العالم"</p>
      </div>
    </div>
  );
};

export default NotebookViewer;