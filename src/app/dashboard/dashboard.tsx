"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, EyeOff, Edit3, Trash2, Link, Network, Hash, Brain, BookOpen, Globe, Lock } from 'lucide-react';

// تعريف الأنواع للملاحظات
interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  linkedNotes: number[];
  createdAt: string;
  lastEdited: string;
}

// نوع البيانات لفرم الملاحظة الجديدة
interface FormData {
  title: string;
  content: string;
  tags: string;
  isPublic: boolean;
}

const DigitalKnowledgeGarden = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "فلسفة التعلم التفاعلي",
      content: "التعلم الحقيقي يحدث عندما نربط الأفكار الجديدة بالمعرفة الموجودة. هذا يشبه [[نظرية الشبكات]] في علم النفس المعرفي.",
      tags: ["فلسفة", "تعلم", "معرفة"],
      isPublic: true,
      linkedNotes: [2, 3],
      createdAt: "2025-01-15",
      lastEdited: "2025-01-16"
    },
    {
      id: 2,
      title: "نظرية الشبكات",
      content: "الدماغ يعمل كشبكة معقدة من الروابط. كل معلومة جديدة تتصل بمعلومات سابقة لتشكيل [[خريطة ذهنية]] متماسكة.",
      tags: ["علم نفس", "شبكات", "دماغ"],
      isPublic: false,
      linkedNotes: [1, 3],
      createdAt: "2025-01-14",
      lastEdited: "2025-01-15"
    },
    {
      id: 3,
      title: "خريطة ذهنية",
      content: "الخرائط الذهنية تساعد في تنظيم الأفكار بصريًا. تشبه [[فلسفة التعلم التفاعلي]] في ربط المفاهيم.",
      tags: ["تنظيم", "بصري", "أفكار"],
      isPublic: true,
      linkedNotes: [1, 2],
      createdAt: "2025-01-13",
      lastEdited: "2025-01-14"
    }
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // تعديل لتحديد النوع
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'network' | 'public'>('grid'); // تعديل النوع
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    tags: '',
    isPublic: false
  });

  // استخراج جميع الوسوم
    const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  // تصفية الملاحظات
    const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = filterTags.length === 0 || 
                       filterTags.some(tag => note.tags.includes(tag));
    const matchesView = viewMode === 'public' ? note.isPublic : true;
    
    return matchesSearch && matchesTags && matchesView;
  });

  // إضافة ملاحظة جديدة
  const addNote = () => {
    if (formData.title && formData.content) {
      const newNote = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPublic: formData.isPublic,
        linkedNotes: [],
        createdAt: new Date().toISOString().split('T')[0],
        lastEdited: new Date().toISOString().split('T')[0]
      };
      
      setNotes([...notes, newNote]);
      setFormData({ title: '', content: '', tags: '', isPublic: false });
      setShowForm(false);
    }
  };

  // حذف ملاحظة
  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    setSelectedNote(null);
  };

  // تبديل حالة الخصوصية
  const togglePublic = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPublic: !note.isPublic } : note
    ));
  };

  // استخراج الروابط من النص
  const extractLinks = (text: string) => {
    const linkPattern = /\[\[([^\]]+)\]\]/g;
    const links: string[] = [];
    let match;
    
    while ((match = linkPattern.exec(text)) !== null) {
      links.push(match[1]);
    }
    
    return links;
  };

  // تحويل النص مع الروابط
  const renderContentWithLinks = (content: string) => {
    const linkPattern = /\[\[([^\]]+)\]\]/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;



    while ((match = linkPattern.exec(content)) !== null) {
      // النص قبل الرابط
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      
      // الرابط
      parts.push(
        <span 
          key={match.index}
          className="text-blue-600 hover:text-blue-800 cursor-pointer bg-blue-50 px-1 rounded"
          onClick={() => {
            const linkedNote = notes.find(n => n.title === match![1]);
            if (linkedNote) setSelectedNote(linkedNote);
          }}
        >
          {match[1]}
        </span>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // النص المتبقي
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }
    
    return parts;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Digital Knowledge Garden</h1>
                <p className="text-gray-600">حديقة معرفية تفاعلية</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              ملاحظة جديدة
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في الملاحظات..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <BookOpen className="w-4 h-4" />
                شبكة
              </button>
              <button
                onClick={() => setViewMode('network')}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${viewMode === 'network' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <Network className="w-4 h-4" />
                خريطة
              </button>
              <button
                onClick={() => setViewMode('public')}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${viewMode === 'public' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'}`}
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
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filterTags.includes(tag)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Add Note Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">ملاحظة جديدة</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="عنوان الملاحظة..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              <textarea
                placeholder="محتوى الملاحظة... (استخدم [[اسم الملاحظة]] للربط)"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
              <input
                type="text"
                placeholder="الوسوم (مفصولة بفواصل)..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">
                  جعل الملاحظة عامة
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addNote}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  إضافة
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNotes.map(note => (
                <div
                  key={note.id}
                  className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all hover:shadow-xl border-l-4 ${
                    note.isPublic ? 'border-green-500' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 truncate">{note.title}</h3>
                    <div className="flex gap-1">
                      {note.isPublic ? (
                        <Globe className="w-4 h-4 text-green-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePublic(note.id);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {note.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {note.content.replace(/\[\[([^\]]+)\]\]/g, '$1')}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {note.tags.map(tag => (
                      <span key={tag} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>آخر تحديث: {note.lastEdited}</span>
                    <span className="flex items-center gap-1">
                      <Link className="w-3 h-3" />
                      {note.linkedNotes.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note Details */}
          <div className="lg:col-span-1">
            {selectedNote ? (
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{selectedNote.title}</h2>
                  <button
                    onClick={() => deleteNote(selectedNote.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="prose prose-sm max-w-none mb-4">
                  {renderContentWithLinks(selectedNote.content)}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedNote.tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">الروابط المتصلة:</h3>
                  <div className="space-y-2">
                    {selectedNote.linkedNotes.map(linkedId => {
                      const linkedNote = notes.find(n => n.id === linkedId);
                      return linkedNote ? (
                        <button
                          key={linkedId}
                          onClick={() => setSelectedNote(linkedNote)}
                          className="block w-full text-left p-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          {linkedNote.title}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-4 border-t">
                  <span>تم الإنشاء: {selectedNote.createdAt}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    selectedNote.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedNote.isPublic ? 'عامة' : 'خاصة'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">اختر ملاحظة لعرض تفاصيلها</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{notes.length}</div>
            <div className="text-sm text-gray-600">إجمالي الملاحظات</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{notes.filter(n => n.isPublic).length}</div>
            <div className="text-sm text-gray-600">ملاحظات عامة</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{allTags.length}</div>
            <div className="text-sm text-gray-600">الوسوم</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {notes.reduce((sum, note) => sum + note.linkedNotes.length, 0)}
            </div>
            <div className="text-sm text-gray-600">الروابط</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalKnowledgeGarden;
