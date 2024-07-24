import { useState, useEffect, useCallback } from 'react';
import { db, auth } from '@/lib/firebase';
import { Task } from '@/model/taskType';
import { useAuthState } from '@/hooks/useAuthState';


export function useFirebaseTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState();
  useEffect(() => {
    const loadTasks = async () => {
      const { collection, query,where, onSnapshot } = await import('firebase/firestore');
      console.log('//////////////////////')
      console.log(user)
      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', user.uid),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const taskList: Task[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Task));

        setTasks(taskList);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching tasks: ", error);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    loadTasks();
  }, [user]);

  const addTask = useCallback(async (title: string) => {
    const { collection, addDoc } = await import('firebase/firestore');
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        completed: false,
        createdAt: new Date(),
        userId: user.uid,
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    const { doc, updateDoc } = await import('firebase/firestore');
    const taskRef = doc(db, 'tasks', id);
    try {
      await updateDoc(taskRef, updates);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    const { doc, deleteDoc } = await import('firebase/firestore');
    const taskRef = doc(db, 'tasks', id);
    try {
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  }, []);

  return { tasks, loading, addTask, updateTask, deleteTask };
}
