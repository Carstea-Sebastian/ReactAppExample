import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Task } from './Interfaces';
import TodoTask from './Components/TodoTask';

const LOCAL_STORAGE_KEY = "react-task-manager-data";

const App = () => {

  const iaDinStorage = (): Task[] => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  const [task, setTask] = useState("");
  const [dataLimita, setDataLimita] = useState("");
  const [vector, setVector] = useState<Task[]>(iaDinStorage);
  const [filtruStare, setFiltruStare] = useState<"toate" | "activ" | "terminat">("toate");
  
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vector));
      console.log("Date salvate in localStorage.")
    } catch (error) {
      console.error("Eroare la salvare in storage.");
    }
  }, [vector]);

  const SortareTask = useMemo(() => {
    let Prelucrat = vector.filter(task => {
      if (filtruStare === "activ") {
        return !task.completed;
      }
      if (filtruStare === "terminat") {
        return task.completed;
      }
      return true;
    });
    
    return Prelucrat;
  }, [vector, filtruStare]);

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
    setVector(vector.map(t => t.id === id ? { ...t, completed: !t.completed } : t ));
  };

  return (
    <div className='App'>
      <div className='header'>
        <h1 className="title">Task Manager</h1>
        <div className='input'>
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

        <div className='container'>
          <div className='filtru'>
            <label>Filtru stare task:</label>
            <select
              value={filtruStare}
              onChange={(e) => setFiltruStare(e.target.value as "toate" | "activ" | "terminat")}
            >
              <option value="toate">Toate</option>
              <option value="activ">Active</option>
              <option value="terminat">Terminate</option>
            </select>
          </div>

          
        </div>
      </div>

      <div className='todoList'>
        {SortareTask.length === 0 ? (
          <div className='empty-state'>
            <p>Nici un task momentan. Daca ai introdus task-uri, verifica filtrele!</p>
          </div>
        ) : (
          SortareTask.map((taskItem) => (
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