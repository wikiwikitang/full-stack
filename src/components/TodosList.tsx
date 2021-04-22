import Button from 'react-bootstrap/Button';
import { todoProps } from '../utils/interfaces';
// @ts-ignore
import { TodoModal } from './TodoModal.tsx';
import '../styles/TodosList.scss';

export const TodosList: React.FC<todoProps> = ({ todos, modTodo, delTodo }) => {
  const todoContent = todos.map(
    ({ title, content, isCompleted, _id }, index) => {
      return (
        <div key={_id} className='todo-list-element'>
          <div
            className='todo-title'
            style={{
              textDecoration: isCompleted ? 'line-through' : 'none',
              userSelect: 'none',
            }}
            onDoubleClick={() => modTodo(_id, index)}
          >
            {title}
          </div>
          <div className='todo-content'>{content}</div>
          <Button
            className='del-btn'
            size='sm'
            variant='danger'
            onClick={() => delTodo(_id, index)}
          >
            Delete
          </Button>
          <TodoModal
            buttonTextContent='Modify'
            titleTextContent='Modify An Todo'
          />
        </div>
      );
    }
  );

  return <div className='todos-content'>{todoContent}</div>;
};
