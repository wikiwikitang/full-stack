const Todos = ({ todos, modTodo, delTodo }) => {
  const todoContent = todos.map(({ content, isCompleted, _id }, index) => {
    return (
      <div key={_id}>
        <span
          style={{
            textDecoration: isCompleted ? 'line-through' : 'none',
            userSelect: 'none',
          }}
          onDoubleClick={() => modTodo(_id, index)}
        >
          {content}
        </span>
        <button className='del-btn' onClick={() => delTodo(_id, index)}>
          Delete
        </button>
      </div>
    );
  });

  return <div className='todos-content'>{todoContent}</div>;
};

export default Todos;
