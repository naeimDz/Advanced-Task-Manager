import { Note } from '@/types/noteType';

// أنواع البيانات
export interface SearchOptions {
  mode: 'single' | 'multiple' | 'best';
  searchIn: ('title' | 'content' | 'tags')[];
  caseSensitive: boolean;
  maxResults: number;
  minScore: number;
  fuzzySearch: boolean;
  includePartial: boolean;
  sortBy: 'score' | 'date' | 'popularity' | 'alphabetical';
  boostRecent: boolean;
  boostPopular: boolean;
}

export interface SearchResult {
  note: Note;
  score: number;
  matchType: string;
  matchedText: string;
  confidence: number;
}

export interface SearchFactors {
  exactTitle: number;      // 100 نقطة
  titleStart: number;      // 80 نقطة
  titleContains: number;   // 60 نقطة
  exactContent: number;    // 40 نقطة
  contentContains: number; // 20 نقطة
  tagMatch: number;        // 70 نقطة
  fuzzyMatch: number;      // 30 نقطة
  recentBonus: number;     // 10 نقطة إضافية
  popularBonus: number;    // 15 نقطة إضافية
}

// الإعدادات الافتراضية
export const DEFAULT_SEARCH_OPTIONS: SearchOptions = {
  mode: 'single',
  searchIn: ['title', 'content', 'tags'],
  caseSensitive: false,
  maxResults: 10,
  minScore: 33,
  fuzzySearch: true,
  includePartial: true,
  sortBy: 'score',
  boostRecent: true,
  boostPopular: true,
};

export const DEFAULT_FACTORS: SearchFactors = {
  exactTitle: 100,
  titleStart: 80,
  titleContains: 60,
  exactContent: 40,
  contentContains: 20,
  tagMatch: 70,
  fuzzyMatch: 30,
  recentBonus: 10,
  popularBonus: 15,
};

export class SmartNoteFinder {
  private notes: Note[];
  private options: SearchOptions;
  private factors: SearchFactors;

  constructor(
    notes: Note[], 
    options: Partial<SearchOptions> = {}, 
    factors: Partial<SearchFactors> = {}
  ) {
    this.notes = notes;
    this.options = { ...DEFAULT_SEARCH_OPTIONS, ...options };
    this.factors = { ...DEFAULT_FACTORS, ...factors };
  }

  /**
   * البحث الرئيسي - الدالة الأساسية
   */
  public search(query: string): SearchResult[] {
    if (!query || query.trim() === '') return [];

    const cleanQuery = this.cleanQuery(query);
    let results: SearchResult[] = [];

    // البحث في كل ملاحظة
    for (const note of this.notes) {
      const score = this.calculateNoteScore(note, cleanQuery);
      
      if (score >= this.options.minScore) {
        results.push({
          note,
          score,
          matchType: this.getMatchType(note, cleanQuery),
          matchedText: this.getMatchedText(note, cleanQuery),
          confidence: this.calculateConfidence(score),
        });
      }
    }

    // ترتيب النتائج
    results = this.sortResults(results);

    // تطبيق حدود العدد والنمط
    return this.applyResultLimits(results);
  }

  /**
   * البحث السريع - للاستخدام في الروابط
   */
  public findLinkedNote(linkText: string,excludeNoteId?: string): Note | Note[] | null {
    const results = this.search(linkText).filter(result => result.note.id !== excludeNoteId);
    
    switch (this.options.mode) {
      case 'single':
        return results.length > 0 ? results[0].note : null;
      case 'multiple':
        return results.map(r => r.note);
      case 'best':
        return results.slice(0, 3).map(r => r.note);
      default:
        return null;
    }
  }

  /**
   * حساب نقاط الملاحظة
   */
  private calculateNoteScore(note: Note, query: string): number {
    let score = 0;
    const queryLower = this.options.caseSensitive ? query : query.toLowerCase();
    
    // البحث في العنوان
    if (this.options.searchIn.includes('title')) {
      score += this.calculateTitleScore(note.title, queryLower);
    }

    // البحث في المحتوى
    if (this.options.searchIn.includes('content')) {
      score += this.calculateContentScore(note.content, queryLower);
    }

    // البحث في الوسوم
    if (this.options.searchIn.includes('tags')) {
      score += this.calculateTagsScore(note.tags, queryLower);
    }

    // البحث الضبابي إذا كان مفعل
    if (this.options.fuzzySearch) {
      score += this.calculateFuzzyScore(note, queryLower);
    }

    // المكافآت الإضافية
    if (this.options.boostRecent) {
      score += this.calculateRecencyBonus(note);
    }

    if (this.options.boostPopular) {
      score += this.calculatePopularityBonus(note);
    }

    return Math.round(score);
  }

  /**
   * حساب نقاط العنوان
   */
  private calculateTitleScore(title: string, query: string): number {
    const titleToCheck = this.options.caseSensitive ? title : title.toLowerCase();
    
    if (titleToCheck === query) {
      return this.factors.exactTitle;
    }
    
    if (titleToCheck.startsWith(query)) {
      return this.factors.titleStart;
    }
    
    if (titleToCheck.includes(query)) {
      return this.factors.titleContains;
    }

    return 0;
  }

  /**
   * حساب نقاط المحتوى
   */
  private calculateContentScore(content: string, query: string): number {
    const contentToCheck = this.options.caseSensitive ? content : content.toLowerCase();
    
    // إزالة الروابط من المحتوى للبحث
    const cleanContent = contentToCheck.replace(/\[\[([^\]]+)\]\]/g, '$1');
    
    if (cleanContent.includes(query)) {
      // حساب عدد المطابقات لزيادة النقاط
      const matches = cleanContent.split(query).length - 1;
      const baseScore = cleanContent.trim() === query ? 
        this.factors.exactContent : 
        this.factors.contentContains;
      
      return baseScore + (matches - 1) * 5; // نقاط إضافية للتكرارات
    }

    return 0;
  }

  /**
   * حساب نقاط الوسوم
   */
  private calculateTagsScore(tags: string[], query: string): number {
    for (const tag of tags) {
      const tagToCheck = this.options.caseSensitive ? tag : tag.toLowerCase();
      if (tagToCheck === query || tagToCheck.includes(query)) {
        return this.factors.tagMatch;
      }
    }
    return 0;
  }

  /**
   * البحث الضبابي
   */
  private calculateFuzzyScore(note: Note, query: string): number {
    // حساب المسافة التحريرية البسيطة
    const titleSimilarity = this.calculateStringSimilarity(
      note.title.toLowerCase(), 
      query
    );
    
    if (titleSimilarity > 0.7) {
      return this.factors.fuzzyMatch * titleSimilarity;
    }

    return 0;
  }

  /**
   * حساب التشابه بين النصوص
   */
  private calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  /**
   * حساب المسافة التحريرية
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,     // deletion
          matrix[j - 1][i] + 1,     // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * مكافأة حداثة الملاحظة
   */
  private calculateRecencyBonus(note: Note): number {
    if (!note.createdAt) return 0;
    
    const daysSinceCreation = Math.floor(
      (Date.now() - note.createdAt.toDate().getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // مكافأة أكبر للملاحظات الأحدث
    if (daysSinceCreation <= 7) return this.factors.recentBonus;
    if (daysSinceCreation <= 30) return this.factors.recentBonus * 0.5;
    
    return 0;
  }

  /**
   * مكافأة شعبية الملاحظة
   */
  private calculatePopularityBonus(note: Note): number {
    const linkCount = note.linkedNotes?.length || 0;
    
    if (linkCount >= 5) return this.factors.popularBonus;
    if (linkCount >= 2) return this.factors.popularBonus * 0.5;
    
    return 0;
  }

  /**
   * تنظيف الاستعلام
   */
  private cleanQuery(query: string): string {
    return query.trim()
      .replace(/\[\[|\]\]/g, '') // إزالة أقواس الربط
      .replace(/\s+/g, ' '); // توحيد المسافات
  }

  /**
   * تحديد نوع المطابقة
   */
  private getMatchType(note: Note, query: string): string {
    const title = this.options.caseSensitive ? note.title : note.title.toLowerCase();
    const content = this.options.caseSensitive ? note.content : note.content.toLowerCase();
    
    if (title === query) return 'exact_title';
    if (title.startsWith(query)) return 'title_start';
    if (title.includes(query)) return 'title_contains';
    if (content.includes(query)) return 'content_match';
    if (note.tags.some(tag => (this.options.caseSensitive ? tag : tag.toLowerCase()).includes(query))) {
      return 'tag_match';
    }
    
    return 'fuzzy_match';
  }

  /**
   * الحصول على النص المطابق
   */
  private getMatchedText(note: Note, query: string): string {
    const title = this.options.caseSensitive ? note.title : note.title.toLowerCase();
    
    if (title.includes(query)) {
      return note.title;
    }
    
    // البحث في المحتوى وإرجاع جملة تحتوي على الاستعلام
    const sentences = note.content.split(/[.!?]/);
    for (const sentence of sentences) {
      const sentenceToCheck = this.options.caseSensitive ? sentence : sentence.toLowerCase();
      if (sentenceToCheck.includes(query)) {
        return sentence.trim() + '...';
      }
    }
    
    return note.title;
  }

  /**
   * حساب مستوى الثقة
   */
  private calculateConfidence(score: number): number {
    const maxPossible = this.factors.exactTitle + this.factors.recentBonus + this.factors.popularBonus;
    return Math.min(100, Math.round((score / maxPossible) * 100));
  }

  /**
   * ترتيب النتائج
   */
  private sortResults(results: SearchResult[]): SearchResult[] {
    switch (this.options.sortBy) {
      case 'score':
        return results.sort((a, b) => b.score - a.score);
      case 'date':
        return results.sort((a, b) => {
          const dateA = a.note.createdAt?.toDate().getTime() || 0;
          const dateB = b.note.createdAt?.toDate().getTime() || 0;
          return dateB - dateA;
        });
      case 'alphabetical':
        return results.sort((a, b) => a.note.title.localeCompare(b.note.title));
      case 'popularity':
        return results.sort((a, b) => {
          const linksA = a.note.linkedNotes?.length || 0;
          const linksB = b.note.linkedNotes?.length || 0;
          return linksB - linksA;
        });
      default:
        return results;
    }
  }

  /**
   * تطبيق حدود النتائج
   */
  private applyResultLimits(results: SearchResult[]): SearchResult[] {
    let limitedResults = results;

    // تطبيق حد العدد الأقصى
    if (this.options.maxResults > 0) {
      limitedResults = limitedResults.slice(0, this.options.maxResults);
    }

    return limitedResults;
  }

  /**
   * إحصائيات البحث
   */
  public getSearchStats(query: string): {
    totalResults: number;
    avgScore: number;
    topMatchType: string;
    searchTime: number;
  } {
    const startTime = performance.now();
    const results = this.search(query);
    const endTime = performance.now();

    const avgScore = results.length > 0 ? 
      results.reduce((sum, r) => sum + r.score, 0) / results.length : 0;

    const matchTypes = results.reduce((acc, r) => {
      acc[r.matchType] = (acc[r.matchType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topMatchType = Object.keys(matchTypes).reduce((a, b) => 
      matchTypes[a] > matchTypes[b] ? a : b
    , Object.keys(matchTypes)[0] || 'none');

    return {
      totalResults: results.length,
      avgScore: Math.round(avgScore),
      topMatchType,
      searchTime: endTime - startTime,
    };
  }

  /**
   * تحديث الإعدادات
   */
  public updateOptions(newOptions: Partial<SearchOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * تحديث عوامل النقاط
   */
  public updateFactors(newFactors: Partial<SearchFactors>): void {
    this.factors = { ...this.factors, ...newFactors };
  }
}

// دوال مساعدة للاستخدام السريع
export const createSmartFinder = (
  notes: Note[], 
  options?: Partial<SearchOptions>
): SmartNoteFinder => {
  return new SmartNoteFinder(notes, options);
};

export const findNote = (
  notes: Note[], 
  query: string, 
  options?: Partial<SearchOptions>
): Note | null => {
  const finder = new SmartNoteFinder(notes, { ...options, mode: 'single' });
  const result = finder.findLinkedNote(query);
  return Array.isArray(result) ? result[0] || null : result;
};

export const findAllNotes = (
  notes: Note[], 
  query: string, 
  options?: Partial<SearchOptions>
): Note[] => {
  const finder = new SmartNoteFinder(notes, { ...options, mode: 'multiple' });
  const result = finder.findLinkedNote(query);
  return Array.isArray(result) ? result : result ? [result] : [];
};