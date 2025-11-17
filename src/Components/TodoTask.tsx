import React, { FC } from 'react';
import { ITask } from '../Interfaces';

interface Props {
  task: ITask;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

const TodoTask: FC<Props> = ({ task, deleteTask, toggleComplete }) => {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: task.completed ? '#f0f0f0' : 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        gap: '10px'
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ 
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#888' : '#333',
          fontWeight: '500'
        }}>
          {task.taskName}
        </div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          {task.deadline}
        </div>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          padding: '8px 15px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '13px'
        }}
      >
        Elimina
      </button>
    </div>
  );
};

export default TodoTask;