// lib/db.ts (أو lib/noteService.ts)
import { db } from "@/lib/firebase";
import { Note } from "@/types/noteType";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

/**
 * جلب الملاحظات العامة الخاصة بمستخدم معيّن (public فقط)
 * @param uid معرف المستخدم
 * @returns قائمة الملاحظات العامة
 */
export async function getUserPublicNotes(uid: string): Promise<Note[]> {
  if (!uid) return [];

  try {
    const notesRef = collection(db, "notes");
    const q = query(
      notesRef,
      where("authorId", "==", uid),
      where("isPublic", "==", true),
     // orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const notes: Note[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Note, "id">),
    }));

    return notes;
  } catch (error) {
    console.error("❌ خطأ في getUserPublicNotes:", error);
    return [];
  }
}
