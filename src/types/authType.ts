export interface User {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Date;
}
