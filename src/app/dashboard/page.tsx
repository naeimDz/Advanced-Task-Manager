"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Eye, EyeOff, Trash2, Link, Network, Brain, BookOpen, Globe, Lock } from 'lucide-react';
import { useNotes } from '@/hook/useNotes';
import { Note } from '@/types/noteType';
import { SmartNoteFinder } from '@/lib/linkedNotes';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { NoteDetailModal } from './components/NoteDetailModal';
import { ErrorDisplay } from '../user/[uid]/components/ErrorDisplay';

interface FormData {
  title: string;
  content: string;
  tags: string;
  isPublic: boolean;
}

const DigitalKnowledgeGarden = () => {
  // Firebase hook
  const { notes , loading, error, isReady,addNote,updateNote,deleteNote } = useNotes();
const router = useRouter();


  // Local state
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'network' | 'public'>('grid');
  const [showForm, setShowForm] = useState<boolean>(false);
  const { user } = useAuthContext();
  // إضافة state منفصل للبحث المؤجل
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // انتظار 300ms قبل البحث

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm])
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    tags: '',
    isPublic: false
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const finder = useMemo(() => {
    return new SmartNoteFinder(notes, {
      mode: 'single',
      fuzzySearch: true,
      maxResults: 5,
      // boostRecent:false
    });
}, [notes]); 

    // Extract all tags
  const allTags = useMemo(() => {
    return Array.from(new Set(notes.flatMap(note => note.tags)));
  }, [notes]);

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = filterTags.length === 0 || 
                       filterTags.some(tag => note.tags.includes(tag));
    const matchesView = viewMode === 'public' ? note.isPublic : true;
    
    return matchesSearch && matchesTags && matchesView;
  });

// إضافة useEffect للاستماع لـ Escape key

  useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedNote) {
      setSelectedNote(null);
    }
  };
  
  if (selectedNote) {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }
}, [selectedNote]);

  // Add note using Firebase hook
  const handleAddNote = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('يرجى ملء العنوان والمحتوى');
      return;
    }

    setIsSubmitting(true);
    try {
      const noteData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPublic: formData.isPublic,
        linkedNotes: extractLinks(formData.content)
      };

      await addNote(noteData);
      
      // Reset form
      setFormData({ title: '', content: '', tags: '', isPublic: false });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding note:', error);
      alert('حدث خطأ أثناء إضافة الملاحظة');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    // إغلاق التفاصيل فوراً لتجنب عرض بيانات محذوفة
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
    
    const success = await deleteNote(id);
    
    if (!success) {
      // إذا فشل الحذف، أعد فتح الملاحظة
      const note = notes.find(n => n.id === id);
      if (note) setSelectedNote(note);
    }
  };

  const togglePublic = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      updateNote(id, { isPublic: !note.isPublic });
    }
  };

  // Extract links from text
  const extractLinks = (text: string) => {
    const linkPattern = /\[\[([^\]]+)\]\]/g;
    const links: string[] = [];
    let match;
    
    while ((match = linkPattern.exec(text)) !== null) {
      links.push(match[1]);
    }
    
    return links;
  };


if (error) {
    return (
      <ErrorDisplay
        title="حدث خطأ أثناء تحميل الملاحظات"
        message="تعذر تحميل بياناتك، حاول مجددًا لاحقًا."
        code={error}
        showRetry
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">Digital Knowledge Garden</h1>
                <p className="text-cyan-200/80">حديقة معرفية تفاعلية</p>
              </div>
            </div>
              <div className="flex items-center gap-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/20"
                disabled={loading}
              >
                <Plus className="w-4 h-4" />
                ملاحظة جديدة
              </button>
              <button
                onClick={() =>   router.push(`/user/${user?.uid}`)}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/20"
              >
                <Globe className="w-4 h-4" />
                عرض الصفحة العامة
              </button>
              </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-cyan-300" />
              <input
                type="text"
                placeholder="ابحث في الملاحظات..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-cyan-300/60 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 border border-white/20 ${viewMode === 'grid' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'bg-white/10 backdrop-blur-sm text-cyan-200 hover:bg-white/20'}`}
              >
                <BookOpen className="w-4 h-4" />
                شبكة
              </button>
              <button
                onClick={() => setViewMode('network')}
                className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 border border-white/20 ${viewMode === 'network' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' : 'bg-white/10 backdrop-blur-sm text-cyan-200 hover:bg-white/20'}`}
              >
                <Network className="w-4 h-4" />
                خريطة
              </button>
              <button
                onClick={() => setViewMode('public')}
                className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 border border-white/20 ${viewMode === 'public' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' : 'bg-white/10 backdrop-blur-sm text-cyan-200 hover:bg-white/20'}`}
              >
                <Globe className="w-4 h-4" />
                عامة
              </button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setFilterTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className={`px-3 py-2 rounded-xl text-sm transition-all duration-300 border border-white/20 ${
                  filterTags.includes(tag)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-cyan-200 hover:bg-white/20'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
{isReady && (
      <>
        {/* كامل المحتوى الحالي */}

        {/* Add Note Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-cyan-200">ملاحظة جديدة</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="عنوان الملاحظة..."
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-cyan-300/60 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                disabled={isSubmitting}
              />
              <textarea
                placeholder="محتوى الملاحظة... (استخدم [[اسم الملاحظة]] للربط)"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-cyan-300/60 focus:ring-2 focus:ring-cyan-400 focus:border-transparent h-32 transition-all"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                disabled={isSubmitting}
              />
              <input
                type="text"
                placeholder="الوسوم (مفصولة بفواصل)..."
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-cyan-300/60 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                disabled={isSubmitting}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  className="w-4 h-4 text-cyan-600 bg-white/10 border-white/20 rounded focus:ring-cyan-500"
                  disabled={isSubmitting}
                />
                <label htmlFor="isPublic" className="text-sm text-cyan-200">
                  جعل الملاحظة عامة
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddNote}
                  disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-white/20"
                >
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isSubmitting ? 'جاري الإضافة...' : 'إضافة'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 border border-white/20"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 mb-6 text-center">
            <div className="inline-flex items-center gap-2 text-cyan-300">
              <div className="w-6 h-6 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
              جاري تحميل الملاحظات...
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredNotes.map(note => (
                <div
                  key={note.id}
                  className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:bg-white/15 ${
                    note.isPublic ? 'border-l-4 border-l-emerald-400' : 'border-l-4 border-l-slate-400/30'
                  }`}
                 /* onClick={() => {
                    if (selectedNote?.id === note.id) {
                        setSelectedNote(null);
                      } else {
                        setSelectedNote(note);
                      }}}*/
                     onClick={() => setSelectedNote(note)}
                    >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-cyan-100 truncate">{note.title}</h3>
                    <div className="flex gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation();handleDeleteNote(note.id!) }} 
                        aria-label={`حذف الملاحظة: ${note.title}`}
                        className="p-1 rounded-lg hover:bg-red-500/20 transition-all">
                        <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                      </button>
                      {note.isPublic ? (
                        <Globe className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePublic(note.id ?? "");
                        }}
                        className="p-1 rounded-lg hover:bg-cyan-500/20 transition-all"
                      >
                        {note.isPublic ? <EyeOff className="w-4 h-4 text-cyan-300" /> : <Eye className="w-4 h-4 text-cyan-300" />}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-cyan-200/80 text-sm mb-3 line-clamp-3">
                    {note.content.replace(/\[\[([^\]]+)\]\]/g, '$1')}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {note.tags.map(tag => (
                      <span key={tag} className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 px-2 py-1 rounded-full text-xs border border-purple-400/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-cyan-300">
                    <span className="flex items-center gap-1">
                      <Link className="w-3 h-3" />
                      {note.linkedNotes?.length || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )}
      </div>
      {/** Note Detail */}
      <NoteDetailModal 
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
        onNoteSelect={setSelectedNote}
        finder={finder}
      />

      {/* Stats */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-white/10 shadow-2xl p-2 ">
            <div className="absolute -top-2 left-0 right-0 h-4 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
              <div className="flex justify-around text-center ">
                <div>
                  <div className="font-bold text-cyan-400">{notes.length}</div>
                  <div className="text-slate-400">ملاحظات</div>
                </div>
                <div>
                  <div className="font-bold text-emerald-400">{notes.filter(n => n.isPublic).length}</div>
                  <div className="text-slate-400">عامة</div>
                </div>
                <div>
                  <div className="font-bold text-blue-400">{allTags.length}</div>
                  <div className="text-slate-400">وسوم</div>
                </div>
                <div>
                  <div className="font-bold text-purple-400">
                      {notes.reduce((sum, note) => sum + (note.linkedNotes?.length || 0), 0)}
                  </div>
                  <div className="text-slate-400">روابط</div>
                </div>
              </div>
        </div>
    </div>
  );
};

export default DigitalKnowledgeGarden;