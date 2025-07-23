"use client"
import React, { useState, useEffect } from 'react';
import { Search, Settings, BarChart3, FileText, Tag, Calendar, TrendingUp, Filter, Info } from 'lucide-react';
import { SearchOptions, SearchResult, SmartNoteFinder } from '@/lib/SmartNoteFinder';
import { useDebouncedValue } from '@/hook/useDebouncedValue';
import { useNotes } from '@/hook/useNotesServer';
import { UseNotesService } from '@/hook/useNoteService';



const SmartNoteFinderDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
  const { notes , loading, error, isReady, } = useNotes();
  const {  allTags } = UseNotesService({
    notes,
    currentPage: 0,
    notesPerPage: notes.length // عرض جميع النتائج
  });
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    mode: 'multiple',
    searchIn: ['title', 'content', 'tags'],
    caseSensitive: false,
    maxResults: 10,
    minScore: 33,
    fuzzySearch: true,
    includePartial: true,
    sortBy: 'score',
    boostRecent: true,
    boostPopular: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [searchStats, setSearchStats] = useState<any>(null);
  const [finder, setFinder] = useState<any>(null);

  // تهيئة SmartNoteFinder
useEffect(() => {
  if (notes.length > 0) {
    const smartFinder = new SmartNoteFinder(notes, searchOptions);
    setFinder(smartFinder);
  }
}, [notes, searchOptions]);


 // تخديث النتائج عند تغيير الاعدادات او كلمة البحث
  useEffect(() => {
  if (finder && debouncedSearchQuery.trim()) {
    const results = finder.search(debouncedSearchQuery);
    const stats = finder.getSearchStats(debouncedSearchQuery);
    setSearchResults(results);
    setSearchStats(stats);
  } else {
    setSearchResults([]);
    setSearchStats(null);
  }
}, [debouncedSearchQuery, finder]);



  //  تنسيق نوع المطابقة
  const getMatchTypeColor = (matchType: string) => {
    const colors = {
      'exact_title': 'bg-green-100 text-green-800',
      'title_start': 'bg-blue-100 text-blue-800',
      'title_contains': 'bg-yellow-100 text-yellow-800',
      'content_match': 'bg-purple-100 text-purple-800',
      'tag_match': 'bg-orange-100 text-orange-800',
      'fuzzy_match': 'bg-gray-100 text-gray-800'
    };
    return colors[matchType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };


// تحويل نوع المطابقة إلى نص
  const getMatchTypeText = (matchType: string) => {
    const texts = {
      'exact_title': 'مطابقة تامة للعنوان',
      'title_start': 'بداية العنوان',  
      'title_contains': 'يحتوي العنوان',
      'content_match': 'مطابقة المحتوى',
      'tag_match': 'مطابقة الوسم',
      'fuzzy_match': 'مطابقة ضبابية'
    };
    return texts[matchType as keyof typeof texts] || 'غير محدد';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen" dir="rtl">
      {/* الهيدر */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Search className="w-8 h-8 text-blue-600" />
            Smart Note Finder - تجربة تفاعلية
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            الإعدادات
          </button>
        </div>
        
        {/* شريط البحث */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الملاحظات..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* لوحة الإعدادات */}
        {showSettings && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                إعدادات البحث
              </h3>
              
              {/* نمط البحث */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">نمط البحث</label>
                <select
                  value={searchOptions.mode}
                  onChange={(e) => setSearchOptions({...searchOptions, mode: e.target.value as any})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="single">واحد</option>
                  <option value="multiple">متعدد</option>
                  <option value="best">الأفضل</option>
                </select>
              </div>

              {/* البحث في */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">البحث في</label>
                <div className="space-y-2">
                  {['title', 'content', 'tags'].map(field => (
                    <label key={field} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={searchOptions.searchIn.includes(field as any)}
                        onChange={(e) => {
                          const newSearchIn = e.target.checked
                            ? [...searchOptions.searchIn, field as any]
                            : searchOptions.searchIn.filter(f => f !== field);
                          setSearchOptions({...searchOptions, searchIn: newSearchIn});
                        }}
                        className="mr-2"
                      />
                      {field === 'title' ? 'العنوان' : field === 'content' ? 'المحتوى' : 'الوسوم'}
                    </label>
                  ))}
                </div>
              </div>

              {/* ترتيب النتائج */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">ترتيب النتائج</label>
                <select
                  value={searchOptions.sortBy}
                  onChange={(e) => setSearchOptions({...searchOptions, sortBy: e.target.value as any})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="score">النقاط</option>
                  <option value="date">التاريخ</option>
                  <option value="popularity">الشعبية</option>
                  <option value="alphabetical">أبجدي</option>
                </select>
              </div>

              {/* الحد الأدنى للنقاط */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  الحد الأدنى للنقاط: {searchOptions.minScore}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={searchOptions.minScore}
                  onChange={(e) => setSearchOptions({...searchOptions, minScore: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              {/* خيارات أخرى */}
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchOptions.fuzzySearch}
                    onChange={(e) => setSearchOptions({...searchOptions, fuzzySearch: e.target.checked})}
                    className="mr-2"
                  />
                  البحث الضبابي
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchOptions.boostRecent}
                    onChange={(e) => setSearchOptions({...searchOptions, boostRecent: e.target.checked})}
                    className="mr-2"
                  />
                  تعزيز الحديث
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchOptions.boostPopular}
                    onChange={(e) => setSearchOptions({...searchOptions, boostPopular: e.target.checked})}
                    className="mr-2"
                  />
                  تعزيز الشائع
                </label>
              </div>
            </div>
          </div>
        )}

        {/* النتائج */}
        <div className={showSettings ? "lg:col-span-3" : "lg:col-span-4"}>
          {/* إحصائيات البحث */}
          {searchStats && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">إحصائيات البحث</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{searchStats.totalResults}</div>
                  <div className="text-gray-600">نتيجة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{searchStats.avgScore}</div>
                  <div className="text-gray-600">متوسط النقاط</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{getMatchTypeText(searchStats.topMatchType)}</div>
                  <div className="text-gray-600">أشهر مطابقة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{searchStats.searchTime.toFixed(1)}ms</div>
                  <div className="text-gray-600">وقت البحث</div>
                </div>
              </div>
            </div>
          )}

          {/* النتائج */}
          <div className="space-y-4">
            {searchResults.length === 0 && searchQuery && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
                <p className="text-gray-600">جرب تعديل كلمات البحث أو الإعدادات</p>
              </div>
            )}
            {searchResults.map((result, index) => (
              <div key={result.note.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{result.note.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchTypeColor(result.matchType)}`}>
                        {getMatchTypeText(result.matchType)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{result.note.content}</p>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-blue-600">{result.score}</div>
                    <div className="text-sm text-gray-500">نقطة</div>
                    <div className="text-sm text-green-600">{result.confidence}% ثقة</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {result.note.createdAt.toDate().toLocaleDateString('ar')}
                    </div>
                    {result.note.linkedNotes && result.note.linkedNotes.length > 0 && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {result.note.linkedNotes.length} رابط
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {result.note.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {result.matchedText !== result.note.title && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded border-r-4 border-yellow-400">
                    <div className="text-sm text-gray-600 mb-1">النص المطابق:</div>
                    <div className="text-sm">{result.matchedText}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* الملاحظات التجريبية */}
          {!searchQuery && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">ابدأ البحث</h3>
              <p className="text-gray-500 mb-4">اكتب في مربع البحث أعلاه للعثور على الملاحظات</p>
              <div className="flex flex-wrap justify-center gap-2">
                {allTags.map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartNoteFinderDemo;