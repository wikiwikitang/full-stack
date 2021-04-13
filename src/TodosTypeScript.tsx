import Button from 'react-bootstrap/Button';
import { todo } from './utils/interfaces';

export const Todos: React.FC<{
  todos: todo[];
  modTodo: (_id: string, index: number) => void;
  delTodo: (_id: string, index: number) => void;
}> = ({ todos, modTodo, delTodo }) => {
  const todoContent = todos.map(({ content, isCompleted, _id }, index) => {
    return (
      <div key={_id} className='todo-list-element'>
        <span
          style={{
            textDecoration: isCompleted ? 'line-through' : 'none',
            userSelect: 'none',
          }}
          onDoubleClick={() => modTodo(_id, index)}
        >
          {content}
        </span>
        <Button
          className='del-btn'
          size='sm'
          variant='danger'
          onClick={() => delTodo(_id, index)}
        >
          Delete
        </Button>
      </div>
    );
  });

  return <div className='todos-content'>{todoContent}</div>;
};
