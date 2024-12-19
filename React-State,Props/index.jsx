import React, { useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Task əlavə etmək
  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  // Task tamamlanma statusunu dəyişmək
  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Task silmək
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni task əlavə edin"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={addTodo} style={{ padding: '5px 10px' }}>Əlavə et</button>
      </div>
      <ul style={{ listStyle: 'none', padding: '20px' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(index)}
              style={{ marginLeft: '10px', padding: '3px 8px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
      <p>Taskların sayı: {todos.length}</p>
    </div>
  );
};

export default App;