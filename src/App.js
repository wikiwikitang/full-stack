import './App.scss';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Todos from './Todos';
import { sharedAjaxConfig } from './utils/index';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoContent, setTodoContent] = useState('');

  const retrieveTodo = async () => {
    const rawData = await fetch('/allTodos');
    const todosData = await rawData.json();
    setTodos(todosData);
  };

  useEffect(() => {
    retrieveTodo();
  }, []);

  const handleInputTodo = (e) => {
    e.stopPropagation();
    const content = e.target.value;
    setTodoContent(content);
  };

  const addTodo = async () => {
    if (!todoContent || !todoContent.trim()) {
      setTodoContent('');
      return;
    }

    //communicate with backend for adding new todo
    const rawData = await fetch('/addTodo', {
      ...sharedAjaxConfig,
      body: JSON.stringify({ content: todoContent, isCompleted: false }), // body data type must match "Content-Type" header
    });

    const data = await rawData.json();
    if (data.addTodo === 'failed') {
      alert('Add Todo failed ');
    }

    //reset the input
    setTodoContent('');

    //reflesh the todos from back end
    await retrieveTodo();
  };

  const modTodo = async (_id, index) => {
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

  const delTodo = async (_id, index) => {
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

  return (
    <div className='App'>
      <div className='add-todo-section'>
        <input type='text' value={todoContent} onChange={handleInputTodo} />
        <Button variant='success' className='add-btn' onClick={addTodo}>
          Add Todo
        </Button>
      </div>
      <div className='todos-section'>
        <hr />
        <Todos todos={todos} modTodo={modTodo} delTodo={delTodo} />
      </div>
    </div>
  );
};

export default App;
