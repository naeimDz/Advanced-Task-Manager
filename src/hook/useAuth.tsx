// hooks/useAuth.ts
"use client";
import { useState, useEffect, useCallback } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { AuthError, User } from '@/types/authType';

// 🎯 Single state object - يقلل re-renders
type AuthState = {
  user: User | null;
  isInitialized: boolean; // بدلاً من loading
  isProcessing: boolean; // للعمليات (login/logout)
  error: AuthError | null;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isInitialized: false,
    isProcessing: false,
    error: null,
  });

  // 🚀 Single effect for auth state - تحديث واحد فقط
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          const userData = userDoc.data();
          
          const user: User = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            createdAt: userData?.createdAt?.toDate() || new Date(),
          };

          // ✅ تحديث واحد شامل
          setState(prev => ({
            ...prev,
            user,
            isInitialized: true,
            error: null
          }));
        } catch (error) {
          setState(prev => ({
            ...prev,
            user: null,
            isInitialized: true,
            error: { code: 'fetch-error', message: 'فشل في جلب بيانات المستخدم', type: 'firestore' }
          }));
        }
      } else {
        setState(prev => ({
          ...prev,
          user: null,
          isInitialized: true,
          error: null
        }));
      }
    });

    return unsubscribe;
  }, []);

  const handleError = useCallback((err: any): AuthError => {
    let errorType: AuthError['type'] = 'unknown';
    let message = 'حدث خطأ غير متوقع';

    if (err.code) {
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          errorType = 'popup';
          message = 'تم إغلاق النافذة. يرجى المحاولة مرة أخرى.';
          break;
        case 'auth/popup-blocked':
          errorType = 'popup';
          message = 'تم حظر النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة.';
          break;
        case 'auth/network-request-failed':
          errorType = 'network';
          message = 'مشكلة في الاتصال. يرجى التحقق من الإنترنت.';
          break;
        case 'permission-denied':
          errorType = 'firestore';
          message = 'لا يمكن حفظ البيانات. يرجى المحاولة لاحقاً.';
          break;
        default:
          errorType = 'auth';
          message = 'فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.';
      }
    }

    return { code: err.code || 'unknown', message, type: errorType };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        lastLogin: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });

      return firebaseUser;
    } catch (err) {
      const authError = handleError(err);
      setState(prev => ({ ...prev, error: authError, isProcessing: false }));
      throw authError;
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  }, [handleError]);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      await signOut(auth);
    } catch (err) {
      const authError = handleError(err);
      setState(prev => ({ ...prev, error: authError, isProcessing: false }));
      throw authError;
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  }, [handleError]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    user: state.user,
    loading: !state.isInitialized, // للتوافق مع الكود الحالي
    authLoading: state.isProcessing, // للعمليات النشطة
    error: state.error,
    signInWithGoogle,
    logout,
    clearError,
    isAuthenticated: !!state.user,
    isReady: state.isInitialized, // 🎯 حالة واضحة للجاهزية
  };
}