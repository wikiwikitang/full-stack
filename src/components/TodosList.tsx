import Button from 'react-bootstrap/Button';
import { todoProps } from '../utils/interfaces';

export const TodosList: React.FC<todoProps> = ({ todos, modTodo, delTodo }) => {
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
