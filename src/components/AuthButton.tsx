"use client";

import { useAuth } from "@/hook/useAuth";
import { ErrorMessage } from "./ErrorMessage";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";


export function AuthButton() {
  const { 
    user, 
    authLoading, 
    error, 
    signInWithGoogle, 
    logout, 
    clearError,
    isAuthenticated 
  } = useAuth();

  // معالجة تسجيل الدخول
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // يمكن إضافة redirect أو toast notification هنا
    } catch (err) {
      // الخطأ محفوظ في الـ hook
      console.log('Login failed:', err);
    }
  };

  // معالجة تسجيل الخروج
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log('Logout failed:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* عرض الأخطاء */}
      {error && (
        <ErrorMessage error={error} onClose={clearError} />
      )}

      {/* عرض معلومات المستخدم إذا كان مسجلاً */}
      {isAuthenticated && user && (
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.name || 'User'} 
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <User className="w-10 h-10 p-2 bg-gray-200 rounded-full" />
          )}
          <div>
            <p className="font-medium text-green-800">{user.name}</p>
            <p className="text-sm text-green-600">{user.email}</p>
          </div>
        </div>
      )}

      {/* زر تسجيل الدخول/الخروج */}
      {!isAuthenticated ? (
        <Button
          onClick={handleLogin}
          loading={authLoading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          <LogIn className="w-5 h-5 mr-2" />
          تسجيل الدخول بـ Google
        </Button>
      ) : (
        <Button
          onClick={handleLogout}
          loading={authLoading}
          variant="outline"
          size="md"
          className="w-full"
        >
          <LogOut className="w-5 h-5 mr-2" />
          تسجيل الخروج
        </Button>
      )}
    </div>
  );
}

/*
=== ملاحظات للمرحلة القادمة ===

1. إضافة Context للمصادقة:
   - إنشاء AuthContext لمشاركة حالة المستخدم
   - إضافة دالة logout
   - إدارة حالة المستخدم في جميع أنحاء التطبيق

2. تحسينات الأمان:
   - إضافة Firebase Security Rules
   - تشفير البيانات الحساسة
   - إضافة rate limiting

3. تحسينات UX:
   - إضافة أنيميشن للانتقالات
   - تحسين responsive design
   - إضافة dark mode support

4. إضافة Testing:
   - Unit tests للمكونات
   - Integration tests للمصادقة
   - E2E tests للمسارات الكاملة

5. تحسينات الأداء:
   - استخدام React.memo
   - تحسين bundle size
   - إضافة Service Worker للـ offline support

6. إضافة Analytics:
   - تتبع أحداث تسجيل الدخول
   - إحصائيات المستخدمين
   - تتبع الأخطاء
*/