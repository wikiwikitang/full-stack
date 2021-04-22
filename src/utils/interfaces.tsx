export interface todoFE {
  title: string;
  content: string;
  isCompleted: boolean;
}

interface todo {
  title: string;
  content: string;
  isCompleted: boolean;
  _id: string;
}

export interface todoProps {
  todos: todo[];
  modTodo: (_id: string, index: number) => void;
  delTodo: (_id: string, index: number) => void;
}

export interface modalProps {
  buttonTextContent: string;
  titleTextContent: string;
}
