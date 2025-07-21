// ===================================
// app/open-notebook/[uid]/page.tsx
// ===================================

import { getUserPublicNotes } from "@/app/firebase/services/noteService";
import NotebookViewer from "./components/NotebookViewer";

import { notFound } from "next/navigation";
import { ServiceErrorCode } from "@/app/firebase/services/serviceTypes";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { EmptyNotebook, NotFound } from "./components/EmptyNotebook";

interface PageProps {
  params: { uid: string };
}

/**
 * التحقق من صحة معرف المستخدم
 */
function validateUid(uid: string): boolean {
  if (!uid || typeof uid !== 'string') return false;
  if (uid.trim().length === 0) return false;
  if (uid.length > 128) return false; // حد أقصى معقول
  
  // التحقق من الأحرف المسموحة (Firebase UID pattern)
  const validUidPattern = /^[a-zA-Z0-9_-]+$/;
  return validUidPattern.test(uid);
}

export default async function OpenNotebookPage({ params }: PageProps) {
  const { uid } = params;

  // التحقق من صحة المعاملات
  if (!validateUid(uid)) {
    notFound();
  }

  // جلب البيانات
  const result = await getUserPublicNotes(uid);

  // معالجة النتائج
  if (!result.success) {
    const { error } = result;
    
    switch (error.code) {
      case ServiceErrorCode.VALIDATION_ERROR:
        notFound();
        
      case ServiceErrorCode.NOT_FOUND:
        return <NotFound uid={uid} />;
        
      case ServiceErrorCode.PERMISSION_DENIED:
        return (
          <ErrorDisplay
            title="غير مسموح"
            message="هذا المستخدم لم يشارك أي ملاحظات عامة"
            code={error.code}
          />
        );
        
      case ServiceErrorCode.NETWORK_ERROR:
        return (
          <ErrorDisplay
            title="مشكلة في الاتصال"
            message={error.message}
            code={error.code}
            showRetry
          />
        );
        
      default:
        return (
          <ErrorDisplay
            title="خطأ في النظام"
            message={error.message}
            code={error.code}
            showRetry
          />
        );
    }
  }

  const { data: notes } = result;

  // حالة عدم وجود ملاحظات
  if (notes.length === 0) {
    return <EmptyNotebook uid={uid} />;
  }

  // عرض الملاحظات
  return <NotebookViewer publicNotes={notes} />;
}
