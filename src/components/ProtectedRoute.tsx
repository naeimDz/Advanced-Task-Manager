// components/ProtectedRoute.tsx
"use client";
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const { user, isReady } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // انتظر حتى يكتمل تحميل بيانات المصادقة
    if (isReady && !user) {
      router.push(redirectTo);
    }
  }, [user, isReady, router, redirectTo]);

  // إذا لم تكتمل البيانات بعد - أظهر loading
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // إذا لم يسجل دخول - أظهر loading أثناء التوجيه
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التوجيه...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}