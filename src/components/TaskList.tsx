import React from 'react';
import { useTasksContext } from '@/context/TasksContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks, loading, updateTask, deleteTask } = useTasksContext();

  if (loading) {
    return <p className="text-center">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add a task to get started!</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;