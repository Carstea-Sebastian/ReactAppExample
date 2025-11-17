import React, { useState, useEffect } from 'react';
import './App.css';
import { ITask } from './Interfaces';
import TodoTask from './Components/TodoTask';

const App = () => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('todoList');
    if (saved) {
      try {
        setTodoList(JSON.parse(saved));
      } catch (error) {
        console.error('Eroare:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTask = () => {
    if (task.trim() && deadline) {
      const newTask: ITask = {
        id: Date.now().toString(),
        taskName: task.trim(),
        deadline: deadline,
        completed: false
      };
      setTodoList([...todoList, newTask]);
      setTask("");
      setDeadline("");
    }
  };

  const deleteTask = (id: string) => {
    if (window.confirm('Esti sigur ca vrei sa elimini acest task?')) {
      setTodoList(todoList.filter(t => t.id !== id));
    }
  };

  const toggleComplete = (id: string) => {
    setTodoList(todoList.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const clearCompleted = () => {
    const completedCount = todoList.filter(t => t.completed).length;
    if (completedCount > 0 && window.confirm(`Elimina ${completedCount} task-uri completate?`)) {
      setTodoList(todoList.filter(t => !t.completed));
    }
  };

  const stats = {
    total: todoList.length,
    active: todoList.filter(t => !t.completed).length,
    completed: todoList.filter(t => t.completed).length
  };

  const sortedTasks = [...todoList].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Task manager</h1>
        
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Nume task..."
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="input-task"
          />
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="input-date"
          />
          <button onClick={addTask} className="btn-add">
            Adauga task
          </button>
        </div>

        {stats.total > 0 && (
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.active}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        )}

        {stats.completed > 0 && (
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <button onClick={clearCompleted} className="btn-clear">
              Elimina task-uri ({stats.completed})
            </button>
          </div>
        )}
      </div>

      <div className="todoList">
        {sortedTasks.length === 0 ? (
          <div className="empty-state">
            <p>Nici un task momentan. Adauga unul pentru a incepe !</p>
          </div>
        ) : (
          sortedTasks.map(task => (
            <TodoTask
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;