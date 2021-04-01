import "./App.scss";
import { useEffect, useState } from "react";
import Todos from "./Todos";
import { sharedAjaxConfig } from "./utils/index";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoContent, setTodoContent] = useState("");

  useEffect(() => {
    const retrieveTodo = async () => {
      const rawData = await fetch("/allTodos");
      const todosData = await rawData.json();
      setTodos(todosData);
    };
    retrieveTodo();
  }, []);

  const handleInputTodo = (e) => {
    e.stopPropagation();
    const content = e.target.value;
    if (content.trim() === "") {
      return;
    }
    setTodoContent(content);
  };

  const addTodo = async () => {
    if (!todoContent) {
      return;
    }

    setTodos([...todos, { content: todoContent, isCompleted: false }]);
    setTodoContent("");
    const rawData = await fetch("/addTodo", {
      ...sharedAjaxConfig,
      body: JSON.stringify({ content: todoContent, isCompleted: false }), // body data type must match "Content-Type" header
    });
    const data = await rawData.json();
    console.log(data);
  };

  const modTodo = async (index) => {
    const rawResponse = await fetch("/modTodo", {
      ...sharedAjaxConfig,
      body: JSON.stringify({ index }), // body data type must match "Content-Type" header
    });

    const response = await rawResponse.json();
    if (response.modTodo === "failed") {
      alert("Change status failed ");
    }

    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const delTodo = async (index) => {
    const rawResponse = await fetch("/delTodo", {
      ...sharedAjaxConfig,
      body: JSON.stringify({ index }), // body data type must match "Content-Type" header
    });

    const response = await rawResponse.json();
    if (response.delTodo === "failed") {
      alert("Delete Todo failed ");
    }
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="add-todo-section">
        <input type="text" value={todoContent} onChange={handleInputTodo} />
        <button className="add-btn" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <div className="todos-section">
        <hr />
        <Todos todos={todos} modTodo={modTodo} delTodo={delTodo} />
      </div>
    </div>
  );
};

export default App;
