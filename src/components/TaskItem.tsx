import { Task } from '@/model/taskType';
import React, { useState } from 'react';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleUpdate = async () => {
    await onUpdate(task.id, { title: editedTitle });
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="flex-grow mr-2 p-1 border rounded"
        />
      ) : (
        <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </span>
      )}
      <div>
        {isEditing ? (
          <button onClick={handleUpdate} className="mr-2 px-3 py-1 bg-green-500 text-white rounded-md">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded-md">
            Edit
          </button>
        )}
        <button
          onClick={toggleComplete}
          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md"
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;