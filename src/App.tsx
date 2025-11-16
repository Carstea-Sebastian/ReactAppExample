import React,{FC,ChangeEvent, useState} from 'react';
import './App.css';
import { ITask } from './Interfaces';
import TodoTask from './Components/TodoTask';

const App:FC=() =>{
  const [task, setTask]=useState<string>("");
  const [deadline, setDeadline]=useState<string>("");
  const [todoList, setTodoList]=useState<ITask[]>([]);
  
  const handleChange = (event:ChangeEvent<HTMLInputElement>): void =>{
   if(event.target.name==="task"){
        setTask(event.target.value)
   }else{
    setDeadline(event.target.value);
   }
  }
  
  const addTask=():void=>{
    const newTask={taskName:task,deadline:deadline};
    setTodoList([...todoList,newTask]);
    setTask("");
    setDeadline("");
  }
  
  const completeTask = (taskNameToDelete:string):void=>{
    setTodoList(todoList.filter((task)=>{
      return task.taskName !== taskNameToDelete;
    }))
  }
  
  return (
    <div className='App'>
      <div className="header">
        <div className="inputContainer"> 
          <input 
          type="text" 
          placeholder="Task..."
          name='task' 
          value={task}
          onChange={handleChange}/>
          <input 
          type="date"
          placeholder='Deadline' 
          name="deadline"
          value={deadline}
          onChange={handleChange}/>
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="todoList">
          {todoList.map((task: ITask,key:number)=>{
            return<TodoTask key={key} task={task} completeTask={completeTask}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;