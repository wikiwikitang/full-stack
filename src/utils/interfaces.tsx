export interface todoFE {
  content: string;
  isCompleted: boolean;
}

interface todo {
  content: string;
  isCompleted: boolean;
  _id: string;
}

export interface todoProps {
  todos: todo[];
  modTodo: (_id: string, index: number) => void;
  delTodo: (_id: string, index: number) => void;
}
