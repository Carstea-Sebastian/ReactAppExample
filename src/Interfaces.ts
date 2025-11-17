export interface ITask {
  id: string;
  taskName: string;
  deadline: string;
  completed: boolean;
}

export interface TodoTaskProps {
  task: ITask;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}