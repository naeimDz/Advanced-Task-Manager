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
import { collection, query, where, orderBy, getDocs, FirestoreError } from "firebase/firestore";

/**
 * جلب الملاحظات العامة الخاصة بمستخدم معيّن (public فقط)
 * @param uid معرف المستخدم
 * @returns نتيجة العملية مع البيانات أو رسالة الخطأ
 */
export async function getUserPublicNotes(uid: string): Promise<ServiceResult<Note[]>> {
  // التحقق من صحة المعاملات
  if (!uid || typeof uid !== 'string') {
    return createErrorResult(
      ServiceErrorCode.VALIDATION_ERROR,
      'معرف المستخدم مطلوب ويجب أن يكون نص صالح',
      { providedUid: uid }
    );
  }

  if (uid.trim().length === 0) {
    return createErrorResult(
      ServiceErrorCode.VALIDATION_ERROR,
      'معرف المستخدم لا يمكن أن يكون فارغاً'
    );
  }

  try {
    const notesRef = collection(db, "notes");
    const q = query(
      notesRef,
      where("authorId", "==", uid.trim()),
      where("isPublic", "==", true),
    //  orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    // التحقق من وجود البيانات
    if (snapshot.empty) {
      return createSuccessResult<Note[]>([]);
    }

    const notes: Note[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // التأكد من تحويل Timestamps إلى strings إذا لزم الأمر
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      } as Note;
    });

    return createSuccessResult(notes);

  } catch (error) {
    console.error("❌ خطأ في getUserPublicNotes:", error);

    // معالجة أخطاء Firestore المختلفة
    if (error instanceof FirestoreError) {
      switch (error.code) {
        case 'permission-denied':
          return createErrorResult(
            ServiceErrorCode.PERMISSION_DENIED,
            'ليس لديك صلاحية للوصول إلى هذه البيانات',
            { firestoreCode: error.code }
          );
        
        case 'unavailable':
          return createErrorResult(
            ServiceErrorCode.NETWORK_ERROR,
            'الخدمة غير متاحة حالياً، يرجى المحاولة لاحقاً',
            { firestoreCode: error.code }
          );
        
        case 'failed-precondition':
          return createErrorResult(
            ServiceErrorCode.FIRESTORE_ERROR,
            'يجب إنشاء فهرس مركب في Firestore للاستعلام',
            { firestoreCode: error.code, suggestion: 'تحقق من Firebase Console' }
          );
        
        default:
          return createErrorResult(
            ServiceErrorCode.FIRESTORE_ERROR,
            'خطأ في قاعدة البيانات',
            { firestoreCode: error.code, message: error.message }
          );
      }
    }

    // خطأ غير معروف
    return createErrorResult(
      ServiceErrorCode.UNKNOWN_ERROR,
      'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى',
      { originalError: error }
    );
  }
}