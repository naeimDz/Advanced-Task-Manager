// app/context/AuthContext
"use client";
import { useAuth } from '@/hook/useAuth';
import { createContext, useContext, ReactNode } from 'react';

// إنشاء Context للمصادقة
const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

// Provider للمصادقة
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook لاستخدام Context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}


