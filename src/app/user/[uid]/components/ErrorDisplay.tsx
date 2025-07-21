// ===================================
// app/open-notebook/[uid]/components/ErrorDisplay.tsx
// ===================================

import { ServiceErrorCode } from "@/app/firebase/services/serviceTypes";
import { RetryButton } from "@/components/RetryButton";


interface ErrorDisplayProps {
  title: string;
  message: string;
  code: ServiceErrorCode;
  showRetry?: boolean;
}

export function ErrorDisplay({ title, message, code, showRetry = false }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-4">{message}</p>
          
          {showRetry && <RetryButton />}

          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">رمز الخطأ: {code}</p>
          </div>
        </div>
      </div>
    </div>
  );
}