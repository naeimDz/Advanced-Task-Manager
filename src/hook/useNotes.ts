// hooks/useNotes.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { collection, query, where, getDocs, addDoc, Timestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Note } from "@/types/noteType";
import { useAuthContext } from "@/context/AuthContext";

// 🎯 Simple cache - قابل للتوسع لاحقاً
const notesCache = new Map<string, Note[]>();

type NotesState = {
  notes: Note[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
};

export function useNotes() {
  const { user, isReady: authReady } = useAuthContext();
  const [state, setState] = useState<NotesState>({
    notes: [],
    loading: false,
    error: null,
    isInitialized: false,
  });

  // 🎯 Track current user to avoid unnecessary fetches
  const currentUserRef = useRef<string | null>(null);

  const fetchNotes = useCallback(async (userId: string) => {
    // 🚀 Check cache first
    if (notesCache.has(userId)) {
      const cachedNotes = notesCache.get(userId)!;
      setState(prev => ({ 
        ...prev, 
        notes: cachedNotes, 
        isInitialized: true 
      }));
      return cachedNotes;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const q = query(collection(db, "notes"), where("authorId", "==", userId));
      const snapshot = await getDocs(q);
      const notes = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Note));

      // 🎯 Cache and update state in one go
      notesCache.set(userId, notes);
      setState(prev => ({ 
        ...prev, 
        notes, 
        loading: false, 
        isInitialized: true 
      }));

      return notes;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'فشل في تحميل الملاحظات', 
        loading: false 
      }));
      console.error('Error fetching notes:', error);
      return [];
    }
  }, []);

  // 🎯 Single effect with clear conditions
  useEffect(() => {
    if (!authReady) return; // انتظار جاهزية المصادقة

    const userId = user?.uid;
    
    if (userId) {
      // 🚀 Only fetch if user changed or not initialized
      if (currentUserRef.current !== userId || !state.isInitialized) {
        currentUserRef.current = userId;
        fetchNotes(userId);
      }
    } else {
      // 🎯 Clear data when logged out
      if (currentUserRef.current) {
        setState({ notes: [], loading: false, error: null, isInitialized: false });
        currentUserRef.current = null;
      }
    }
  }, [user?.uid, authReady, state.isInitialized, fetchNotes]);

  const addNote = useCallback(async (noteData: Partial<Note>) => {
    if (!noteData.content?.trim() || !user?.uid) return false;

    try {
      const newNote = {
        ...noteData,
        authorId: user.uid,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, "notes"), newNote);
      const noteWithId = { id: docRef.id, ...newNote } as Note;
      
      // 🎯 Update both cache and state
      const updatedNotes = [...state.notes, noteWithId];
      notesCache.set(user.uid, updatedNotes);
      
      setState(prev => ({ ...prev, notes: updatedNotes }));
      
      return true;
    } catch (error) {
      setState(prev => ({ ...prev, error: 'فشل في إضافة الملاحظة' }));
      console.error('Error adding note:', error);
      return false;
    }
  }, [user?.uid, state.notes]);

  const refreshNotes = useCallback(() => {
    if (user?.uid) {
      notesCache.delete(user.uid); // مسح الـ cache
      setState(prev => ({ ...prev, isInitialized: false })); // إعادة التحميل
    }
  }, [user?.uid]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Delete
  const deleteNote = useCallback(async (noteId: string) => {
    if (!noteId || !user?.uid) return false;

    try {
      // 🎯 حذف من Firebase
      await deleteDoc(doc(db, "notes", noteId));
      
      // 🎯 تحديث الـ cache والـ state
      const updatedNotes = state.notes.filter(note => note.id !== noteId);
      notesCache.set(user.uid, updatedNotes);
      
      setState(prev => ({ ...prev, notes: updatedNotes }));
      
      return true;
    } catch (error) {
      setState(prev => ({ ...prev, error: 'فشل في حذف الملاحظة' }));
      console.error('Error deleting note:', error);
      return false;
    }
  }, [user?.uid, state.notes]);

  // updates: Partial<Note>
  const updateNote = useCallback(async (id: string, updates: Partial<Note>) => {
  if (!id || !user?.uid) {
    console.error('Missing note ID or user');
    return false;
  }

  // 🔍 التحقق من وجود الملاحظة في الحالة المحلية
  const noteExists = state.notes.find(note => note.id === id);
  if (!noteExists) {
    setState(prev => ({ ...prev, error: 'الملاحظة غير موجودة' }));
    return false;
  }

  // 🚫 منع تحديث الحقول الثابتة
  const { id: _, authorId, createdAt, ...allowedUpdates } = updates;

  try {
    // 🔄 إضافة updatedAt تلقائياً
    const updateData = {
      ...allowedUpdates,
      updatedAt: Timestamp.now()
    };

    // 🔥 تحديث Firestore
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, updateData);

    // 🎯 تحديث الحالة المحلية والـ cache
    const updatedNotes = state.notes.map(note => 
      note.id === id 
        ? { ...note, ...updateData }
        : note
    );

    // 🔄 تحديث Cache
    if (user.uid) {
      notesCache.set(user.uid, updatedNotes);
    }

    setState(prev => ({ ...prev, notes: updatedNotes }));
    
    return true;

  } catch (error) {
    setState(prev => ({ 
      ...prev, 
      error: 'فشل في تحديث الملاحظة' 
    }));
    console.error('Error updating note:', error);
    return false;
  }
}, [user?.uid, state.notes]);


  return {
    notes: state.notes,
    loading: state.loading,
    error: state.error,
    isReady: authReady && state.isInitialized,
    hasNotes: state.notes.length > 0,
    updateNote,
    addNote,
    deleteNote,
    refreshNotes,
    clearError,
  };
}