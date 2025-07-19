// components/ErrorMessage.tsx
"use client";
import { AuthError } from '@/types/authType';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorMessageProps {
  error: AuthError;
  onClose: () => void;
}

export function ErrorMessage({ error, onClose }: ErrorMessageProps) {
  // ألوان مختلفة حسب نوع الخطأ
  const getErrorStyles = (type: AuthError['type']) => {
    switch (type) {
      case 'network':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'popup':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'auth':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`p-4 rounded-lg border flex items-center gap-3 ${getErrorStyles(error.type)}`}>
      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">{error.message}</p>
        <p className="text-xs opacity-75 mt-1">كود الخطأ: {error.code}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black/10 rounded-full transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}