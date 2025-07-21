"use client";
import { useState, useEffect, useCallback } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { User } from '@/types/authType';
import { ServiceResult, createSuccessResult, createErrorResult, ServiceErrorCode } from "@/firebase/services/serviceTypes";

type AuthState = {
  user: User | null;
  isInitialized: boolean;
  isProcessing: boolean;
  error: ServiceErrorCode | null;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isInitialized: false,
    isProcessing: false,
    error: null,
  });

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
            error: ServiceErrorCode.FIRESTORE_ERROR
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

  const signInWithGoogle = useCallback(async (): Promise<ServiceResult<User>> => {
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

      const user: User = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        createdAt: new Date(),
      };

      return createSuccessResult(user);
    } catch (error: any) {
      const code = error.code === 'auth/network-request-failed'
        ? ServiceErrorCode.NETWORK_ERROR
        : ServiceErrorCode.UNKNOWN_ERROR;

      setState(prev => ({ ...prev, error: code, isProcessing: false }));
      return createErrorResult<User>(code, 'فشل في تسجيل الدخول', error);
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  }, []);

  const logout = useCallback(async (): Promise<ServiceResult<null>> => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      await signOut(auth);
      return createSuccessResult(null);
    } catch (error: any) {
      const code = ServiceErrorCode.UNKNOWN_ERROR;
      setState(prev => ({ ...prev, error: code, isProcessing: false }));
      return createErrorResult<null>(code, 'فشل في تسجيل الخروج', error);
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    user: state.user,
    loading: !state.isInitialized,
    authLoading: state.isProcessing,
    error: state.error,
    signInWithGoogle,
    logout,
    clearError,
    isAuthenticated: !!state.user,
    isReady: state.isInitialized,
  };
}
