import '../styles/App.scss';
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
// @ts-ignore
import { TodosList } from './TodosList.tsx';
// @ts-ignore
import { sharedAjaxConfig } from '../utils/index.ts';
import { todoFE } from '../utils/interfaces';
// @ts-ignore
import { TodoModal } from './TodoModal.tsx';

const TodoApp = () => {
  const [todos, setTodos] = useState<todoFE[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const todoInputRef = useRef(null);

  const retrieveTodo = async () => {
    const rawData = await fetch('/allTodos');
    const todosData = await rawData.json();
    setTodos(todosData);
  };

  useEffect(() => {
    retrieveTodo();
    todoInputRef.current.focus();
  }, []);

  const handleInputTodo = (setStateMethod) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    const content = e.target.value;
    setStateMethod(content);
  };

  const addTodo = async () => {
    if (!todoTitle || !todoTitle.trim()) {
      setTodoTitle('');
      todoInputRef.current.focus();
      return;
    }

    //communicate with backend for adding new todo
    const rawData = await fetch('/addTodo', {
      ...sharedAjaxConfig,
      body: JSON.stringify({
        title: todoTitle,
        content: todoContent,
        isCompleted: false,
      }), // body data type must match "Content-Type" header
    });

    const data = await rawData.json();
    if (data.addTodo === 'failed') {
      alert('Add Todo failed ');
    }

    //reset the input
    setTodoTitle('');
    setTodoContent('');

    //reflesh the todos from back end
    await retrieveTodo();

    //set focus to todo input
    todoInputRef.current.focus();
  };

  const modTodo = async (_id: string, index: number) => {
    //communicate with backend for updating an existing todo
    const rawResponse = await fetch('/modTodo', {
      ...sharedAjaxConfig,
      body: JSON.stringify({ index, _id }), // body data type must match "Content-Type" header
    });

    const response = await rawResponse.json();
    if (response.modTodo === 'failed') {
      alert('Change status failed ');
    }

    //update todos from state
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const delTodo = async (_id: string, index: number) => {
    //communicate with backend for deleting an existing todo
    const rawResponse = await fetch('/delTodo', {
      ...sharedAjaxConfig,
      body: JSON.stringify({ index, _id }), // body data type must match "Content-Type" header
    });

    const response = await rawResponse.json();
    if (response.delTodo === 'failed') {
      alert('Delete Todo failed ');
    }

    //remove todos from state
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(newTodos);
  };

  const cancelInputTodo = () => {
    setTodoTitle('');
    setTodoContent('');
  };

  return (
    <div className='App'>
      <div className='add-todo-section'>
        <input
          className='todo-title-input'
          type='text'
          ref={todoInputRef}
          value={todoTitle}
          onChange={handleInputTodo(setTodoTitle)}
          placeholder='  Todo Title'
        />
        <FormControl
          as='textarea'
          value={todoContent}
          onChange={handleInputTodo(setTodoContent)}
          className='todo-content-input'
          placeholder='Todo Content'
        />
        <Button variant='success' className='add-btn' onClick={addTodo}>
          Add Todo
        </Button>
        <Button
          variant='danger'
          className='cancel-btn'
          onClick={cancelInputTodo}
        >
          Cancel
        </Button>
      </div>

      <div className='todos-section'>
        <hr />
        <TodosList todos={todos} modTodo={modTodo} delTodo={delTodo} />
      </div>
    </div>
  );
};

export default TodoApp;
