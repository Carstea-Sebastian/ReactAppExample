import React, { useState } from 'react';
import './App.css';
import { Task } from './Interfaces'; 
import TodoTask from './Components/TodoTask';

const App = () => {
  const [task, setTask] = useState("");
  const [dataLimita, setDataLimita] = useState("");
  const [vector, setVector] = useState<Task[]>([]);

  const adaugaTask = () => {
    if (task.trim() && dataLimita) {
      const newTask: Task = {
        id: Date.now().toString(),
        taskName: task.trim(),
        deadline: dataLimita,
        completed: false, 
      };

      setVector([...vector, newTask]);

      setTask("");
      setDataLimita("");
    }
  };

  const eliminaTask = (id: string) => {
    setVector(vector.filter(t => t.id !== id));
  };
  
  const reverseComplet = (id: string) => {
    setVector(vector.map(t => 
      t.id === id 
        ? { ...t, completed: !t.completed } : t 
    ));
  };
  
  return(
    <div className='App'>
      <div className='header'>
        <h1 className="title">Task Manager</h1>
        <div className='inputContainer'> 
          <input 
            type="text" 
            placeholder='Nume task' 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            className='input-task'
          />
          <input 
            type="date" 
            value={dataLimita} 
            onChange={(e) => setDataLimita(e.target.value)} 
            className='input-date'
          />
          <button onClick={adaugaTask} className='btn-add'>
            Adauga task
          </button>
        </div>
      </div>
      
      <div className='todoList'>
        {vector.length === 0 ? (
          <div className='empty-state'>
            <p>Nici un task momentan. Adauga unul pentru a incepe!</p>
          </div>
        ) : (
          vector.map((taskItem) => (
            <TodoTask 
              key={taskItem.id} 
              task={taskItem}
              eliminaTask={eliminaTask}
              reverseComplet={reverseComplet} 
            />
          ))
        )} 
      </div>
    </div>
  );
};

export default App;