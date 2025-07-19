import { Timestamp } from "firebase/firestore";

  // Collection: notes
export interface Note {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  isPublic: boolean;
  tags: string[];
  linkedNotes: string[]; // array of note IDs
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
