'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import Auth from '@/components/Auth';
import { useTasksContext } from '@/context/TasksContext';
import { useAuthState } from '@/hooks/useAuthState';
import TaskList from '@/components/TaskList';

export default function Home() {
  const [user, loading] = useAuthState();
  const { addTask } = useTasksContext();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    await addTask(newTask);
    setNewTask('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Advanced Task Manager</h1>
      <form onSubmit={handleAddTask} className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add Task
        </button>
      </form>
      <TaskList />
      <button
        onClick={() => auth.signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Sign Out
      </button>
    </main>
  );
}