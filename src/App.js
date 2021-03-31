import "./App.scss";
import { useEffect, useState } from "react";
import Todos from "./Todos";

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
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ content: todoContent, isCompleted: false }), // body data type must match "Content-Type" header
    });
    const data = await rawData.json();
    console.log(data);
  };

  const modTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const delTodo = (index) => {
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
