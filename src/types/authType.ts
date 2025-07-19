export interface User {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Date;
}

export interface AuthError {
  code: string;
  message: string;
  type: 'network' | 'popup' | 'auth' | 'firestore' | 'unknown';
}