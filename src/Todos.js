const Todos = ({ todos, modTodo, delTodo }) => {
  const todoContent = todos.map(({ content, isCompleted }, index) => {
    return (
      <div key={`${content}-${index}`}>
        <span
          style={{
            textDecoration: isCompleted ? "line-through" : "none",
            userSelect: "none",
          }}
          onDoubleClick={() => modTodo(index)}
        >
          {content}
        </span>
        <button className="del-btn" onClick={() => delTodo(index)}>
          Delete
        </button>
      </div>
    );
  });

  return <div className="todos-content">{todoContent}</div>;
};

export default Todos;
