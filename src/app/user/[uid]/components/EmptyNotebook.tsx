// ===================================
// app/open-notebook/[uid]/components/EmptyNotebook.tsx
// ===================================

interface EmptyNotebookProps {
  uid: string;
}

export function EmptyNotebook({ uid }: EmptyNotebookProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-2">لا توجد ملاحظات عامة</h1>
          <p className="text-gray-600">
            هذا المستخدم لم يشارك أي ملاحظات عامة بعد
          </p>
        </div>
      </div>
    </div>
  );
}

// ===================================
// app/open-notebook/[uid]/components/NotFound.tsx
// ===================================

interface NotFoundProps {
  uid: string;
}

export function NotFound({ uid }: NotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-100 rounded-full">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-2">المستخدم غير موجود</h1>
          <p className="text-gray-600">
            لا يمكن العثور على مستخدم بهذا المعرف
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 font-mono">{uid}</p>
          </div>
        </div>
      </div>
    </div>
  );
}