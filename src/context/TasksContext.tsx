"use client"
import React, { createContext, useContext } from 'react';
import { useFirebaseTasks } from '@/hooks/useFirebaseTasks';
import { Task } from '@/model/taskType';

interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tasks, loading, addTask, updateTask, deleteTask } = useFirebaseTasks();

  return (
    <TasksContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }
  return context;
};