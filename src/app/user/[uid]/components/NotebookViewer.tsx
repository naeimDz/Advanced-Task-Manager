"use client"
import React, { useState } from 'react';
import { Search, BookOpen, Calendar, Eye, Link2, User, Feather } from 'lucide-react';
import { Note } from '@/types/noteType';
import { formatDate } from '@/lib/dateUtils';


interface OpenNotebookProps {
  publicNotes: Note[],
}

const NotebookViewer = ({ publicNotes }: OpenNotebookProps) => {
  // بيانات وهمية للملاحظات العامة


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

  // تحويل النص مع الروابط
  const renderContentWithLinks = (content:string, linkedNotes:string[]) => {
    return content.split(' ').map((word, index) => {
      // البحث عن كلمات مرتبطة
      const isLinked = linkedNotes.some(linkedId => {
        const linkedNote = publicNotes.find(note => note.id === linkedId);
        return linkedNote && linkedNote.title.includes(word);
      });

      if (isLinked) {
        return (
          <span key={index} className="underline underline-offset-2 decoration-amber-600 decoration-wavy cursor-pointer hover:bg-amber-50 px-1 rounded">
            {word}
          </span>
        );
      }
      return word + ' ';
    });
  };

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
              {/* Left Page */}
              <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg shadow-inner p-8 border-2 border-amber-200">
                {/* Page Lines */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({length: 25}, (_, i) => (
                    <div key={i} className="border-b border-amber-300" style={{height: '24px'}}></div>
                  ))}
                </div>
                
                {/* Left margin */}
                <div className="absolute left-12 top-0 bottom-0 w-px bg-red-300 opacity-50"></div>
                
                {currentNotes[0] && (
                  <div className="relative z-10">
                    {/* Date in corner */}
                    <div className="absolute -top-4 -right-4 bg-amber-800 text-amber-100 px-3 py-1 rounded-full text-xs font-serif transform rotate-12 shadow-md">
                      {/*formatDate(currentNotes[0].createdAt.toDate())*/}
                    </div>

                    <h2 className="text-2xl font-serif text-amber-900 mb-6 leading-relaxed border-b-2 border-dotted border-amber-400 pb-2">
                      {currentNotes[0].title}
                    </h2>
                    
                    <div className="prose prose-amber max-w-none">
                      <p className="text-amber-800 leading-relaxed font-serif text-lg whitespace-pre-line">
                        {renderContentWithLinks(currentNotes[0].content, currentNotes[0].linkedNotes)}
                      </p>
                    </div>

                    {/* Tags as stamps */}
                    <div className="flex flex-wrap gap-2 mt-8">
                      {currentNotes[0].tags.map((tag, index) => (
                        <div key={tag} 
                             className={`px-3 py-1 text-xs font-serif border-2 border-amber-600 text-amber-800 transform rotate-${[-2, 1, -1][index % 3]} bg-amber-100/50 shadow-sm`}
                             style={{transform: `rotate(${(index % 3 - 1) * 3}deg)`}}>
                          #{tag}
                        </div>
                      ))}
                    </div>

                    {/* Linked notes in margin */}
                    {currentNotes[0].linkedNotes.length > 0 && (
                      <div className="absolute -right-2 top-32 w-24">
                        <div className="text-xs text-amber-700 font-serif italic transform -rotate-90 origin-left">
                          <Link2 className="w-3 h-3 inline mb-1" />
                          روابط: {currentNotes[0].linkedNotes.length}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Page */}
              <div className="relative bg-gradient-to-bl from-yellow-50 to-amber-50 rounded-lg shadow-inner p-8 border-2 border-amber-200">
                {/* Page Lines */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({length: 25}, (_, i) => (
                    <div key={i} className="border-b border-amber-300" style={{height: '24px'}}></div>
                  ))}
                </div>

                {/* Right margin */}
                <div className="absolute right-12 top-0 bottom-0 w-px bg-red-300 opacity-50"></div>
                
                {currentNotes[1] ? (
                  <div className="relative z-10">
                    {/* Date in corner */}
                    <div className="absolute -top-4 -left-4 bg-amber-800 text-amber-100 px-3 py-1 rounded-full text-xs font-serif transform -rotate-12 shadow-md">
                      {/*formatDate(currentNotes[1].createdAt.toDate())*/}
                    </div>

                    <h2 className="text-2xl font-serif text-amber-900 mb-6 leading-relaxed border-b-2 border-dotted border-amber-400 pb-2">
                      {currentNotes[1].title}
                    </h2>
                    
                    <div className="prose prose-amber max-w-none">
                      <p className="text-amber-800 leading-relaxed font-serif text-lg whitespace-pre-line">
                        {renderContentWithLinks(currentNotes[1].content, currentNotes[1].linkedNotes)}
                      </p>
                    </div>

                    {/* Tags as stamps */}
                    <div className="flex flex-wrap gap-2 mt-8">
                      {currentNotes[1].tags.map((tag, index) => (
                        <div key={tag} 
                             className={`px-3 py-1 text-xs font-serif border-2 border-amber-600 text-amber-800 bg-amber-100/50 shadow-sm`}
                             style={{transform: `rotate(${(index % 3 - 1) * -3}deg)`}}>
                          #{tag}
                        </div>
                      ))}
                    </div>

                    {/* Linked notes in margin */}
                    {currentNotes[1].linkedNotes.length > 0 && (
                      <div className="absolute -left-2 top-32 w-24">
                        <div className="text-xs text-amber-700 font-serif italic transform rotate-90 origin-right">
                          <Link2 className="w-3 h-3 inline mb-1" />
                          روابط: {currentNotes[1].linkedNotes.length}
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
            </div>

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
                        : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
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

            {/* Book Info */}
            <div className="text-center mt-6 text-amber-700 font-serif text-sm">
              <div className="flex items-center justify-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {publicNotes.length} أفكار عامة
                </span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  آخر تحديث: {formatDate(new Date())}
                </span>
              </div>
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