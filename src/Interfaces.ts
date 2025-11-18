export interface Task {
  id: string;        
  taskName: string;
  deadline: string;
  completed: boolean;
}

export interface TodoTaskProps {
  task: Task;
  eliminaTask: (id: string) => void;
  reverseComplet: (id: string) => void; 
}