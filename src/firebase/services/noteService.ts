// ===================================
// app/firebase/services/noteService.ts
// ===================================

import { db } from "@/firebase/firebase";
import { Note } from "@/types/noteType";
import { 
  ServiceResult, 
  ServiceErrorCode, 
  createSuccessResult, 
  createErrorResult 
} from "./serviceTypes";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  getDocs, 
  FirestoreError,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore";

// نوع البيانات المُرجعة مع معلومات الصفحات
export interface PaginatedNotesResult {
  notes: Note[];
  hasNextPage: boolean;
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
  totalFetched: number;
}

export interface GetNotesOptions {
  pageSize?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
  searchTerm?: string;
  selectedTag?: string;
}

/**
 * جلب الملاحظات العامة مع Firestore Pagination
 * @param uid معرف المستخدم
 * @param options خيارات الصفحات والفلترة
 */
export async function getUserPublicNotes(
  uid: string, 
  options: GetNotesOptions = {}
): Promise<ServiceResult<PaginatedNotesResult>> {
  
  const { pageSize = 12, lastDoc, searchTerm, selectedTag } = options;

  // التحقق من صحة المعاملات
  if (!uid?.trim()) {
    return createErrorResult(
      ServiceErrorCode.VALIDATION_ERROR,
      'معرف المستخدم مطلوب ويجب أن يكون نص صالح'
    );
  }

  if (pageSize < 1 || pageSize > 50) {
    return createErrorResult(
      ServiceErrorCode.VALIDATION_ERROR,
      'حجم الصفحة يجب أن يكون بين 1 و 50'
    );
  }

  try {
    const notesRef = collection(db, "notes");
    
    // بناء الاستعلام الأساسي
    let q = query(
      notesRef,
      where("authorId", "==", uid.trim()),
      where("isPublic", "==", true),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    // إضافة فلترة بالوسم إذا كان موجوداً
    if (selectedTag?.trim()) {
      q = query(
        notesRef,
        where("authorId", "==", uid.trim()),
        where("isPublic", "==", true),
        where("tags", "array-contains", selectedTag.trim()),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    }

    // إضافة pagination cursor
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    
    // تحويل البيانات
    const notes: Note[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Note;
    });

    // فلترة البحث النصي (client-side للبحث المرن)
    let filteredNotes = notes;
    if (searchTerm?.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
      );
    }

    // تحديد آخر مستند للصفحة التالية
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    const hasNextPage = snapshot.docs.length === pageSize;

    const result: PaginatedNotesResult = {
      notes: filteredNotes,
      hasNextPage,
      lastDoc: hasNextPage ? lastDocument : undefined,
      totalFetched: snapshot.docs.length
    };

    return createSuccessResult(result);

  } catch (error) {
    console.error("❌ خطأ في getUserPublicNotes:", error);

    if (error instanceof FirestoreError) {
      switch (error.code) {
        case 'permission-denied':
          return createErrorResult(
            ServiceErrorCode.PERMISSION_DENIED,
            'ليس لديك صلاحية للوصول إلى هذه البيانات'
          );
        
        case 'unavailable':
          return createErrorResult(
            ServiceErrorCode.NETWORK_ERROR,
            'الخدمة غير متاحة حالياً، يرجى المحاولة لاحقاً'
          );
        
        case 'failed-precondition':
          return createErrorResult(
            ServiceErrorCode.FIRESTORE_ERROR,
            'يجب إنشاء فهرس مركب في Firestore. تحقق من Firebase Console'
          );
        
        default:
          return createErrorResult(
            ServiceErrorCode.FIRESTORE_ERROR,
            'خطأ في قاعدة البيانات',
            { firestoreCode: error.code }
          );
      }
    }

    return createErrorResult(
      ServiceErrorCode.UNKNOWN_ERROR,
      'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى'
    );
  }
}

/**
 * جلب جميع الوسوم المتاحة للمستخدم (للفلترة)
 */
export async function getUserTags(uid: string): Promise<ServiceResult<string[]>> {
  if (!uid?.trim()) {
    return createErrorResult(
      ServiceErrorCode.VALIDATION_ERROR,
      'معرف المستخدم مطلوب'
    );
  }

  try {
    const notesRef = collection(db, "notes");
    const q = query(
      notesRef,
      where("authorId", "==", uid.trim()),
      where("isPublic", "==", true)
    );

    const snapshot = await getDocs(q);
    const tagSet = new Set<string>();

    snapshot.docs.forEach(doc => {
      const tags = doc.data().tags;
      if (Array.isArray(tags)) {
        tags.forEach(tag => tag && tagSet.add(tag));
      }
    });

    return createSuccessResult(Array.from(tagSet));

  } catch (error) {
    console.error("❌ خطأ في getUserTags:", error);
    return createErrorResult(
      ServiceErrorCode.FIRESTORE_ERROR,
      'فشل في جلب الوسوم'
    );
  }
}