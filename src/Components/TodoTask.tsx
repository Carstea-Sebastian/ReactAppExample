import React, { FC } from 'react';
import { TodoTaskProps } from '../Interfaces';

const TodoTask: FC<TodoTaskProps> = ({ task, eliminaTask, reverseComplet }) => {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: task.completed ? '#e6ffe6' : 'white', 
        border: `1px solid ${task.completed ? '#4CAF50' : '#dfddddff'}`,
        borderRadius: '5px',
        gap: '10px',
        opacity: task.completed ? 0.7 : 1,
        transition: 'all 0.3s'
      }}
    >
      <input
        type="checkbox"
        checked={task.completed} 
        onChange={() => reverseComplet(task.id)} 
        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
      />
      
      <div style={{ flex: 1 }}>

        <div 
          style={{ 
            fontWeight: '500',
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#898888ff' : '#353535ff'
          }}
        >
          {task.taskName}
        </div>
        
        <div style={{ fontSize: '12px', color: '#6a6969ff', marginTop: '5px' }}>
          Termen: {task.deadline}
        </div>
      </div>
      
      <button
        onClick={() => eliminaTask(task.id)}
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