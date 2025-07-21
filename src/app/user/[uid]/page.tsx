// ===================================
// app/user/[uid]/page.tsx
// ===================================

import { getUserPublicNotes, getUserTags } from "@/firebase/services/noteService";
import NotebookViewer from "./components/NotebookViewer";
import { notFound } from "next/navigation";
import { ServiceErrorCode } from "@/firebase/services/serviceTypes";
import { ErrorDisplay } from "../../../components/ErrorDisplay";
import { EmptyNotebook, NotFound } from "./components/EmptyNotebook";

interface PageProps {
  params: { uid: string };
  searchParams?: { 
    search?: string; 
    tag?: string;
    page?: string;
  };
}

/**
 * التحقق من صحة معرف المستخدم
 */
function validateUid(uid: string): boolean {
  if (!uid || typeof uid !== 'string') return false;
  if (uid.trim().length === 0) return false;
  if (uid.length > 128) return false;
  
  const validUidPattern = /^[a-zA-Z0-9_-]+$/;
  return validUidPattern.test(uid);
}

export default async function OpenNotebookPage({ params, searchParams }: PageProps) {
  const { uid } = params;
  const { search, tag } = searchParams || {};

  // التحقق من صحة المعاملات
  if (!validateUid(uid)) {
    notFound();
  }

  // جلب البيانات مع الفلاتر
  const notesResult = await getUserPublicNotes(uid, {
    pageSize: 50, 
    searchTerm: search,
    selectedTag: tag
  });

  // معالجة أخطاء الملاحظات
  if (!notesResult.success) {
    const { error } = notesResult;
    
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

  // الحصول على البيانات
  const { notes, totalFetched } = notesResult.data;

  // حالة عدم وجود ملاحظات
  if (totalFetched === 0) {
    return <EmptyNotebook uid={uid} />;
  }

  // عرض الملاحظات مع معلومات الـ pagination
  return (
    <NotebookViewer 
      notes={notes}
    />
  );
}