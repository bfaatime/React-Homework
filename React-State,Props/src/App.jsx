import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); // Bütün task-lar
  const [input, setInput] = useState(""); // Input dəyəri
  const [filter, setFilter] = useState("all"); // Filtr: all, completed, pending

  // Yeni task əlavə etmək
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  // Task silmək
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Task tamamlandı olaraq işarələmək
  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Task-ları filtrləmək
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTodo}>ADD</button>
      </div>
      <div className="buttons">
        <button onClick={() => setFilter("all")}>All Todos</button>
        <button onClick={() => setFilter("completed")}>All Completed Todos</button>
        <button onClick={() => setFilter("pending")}>All Pending Todos</button>
        <button onClick={() => setTodos([])}>Clear All</button>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(index)}>{todo.text}</span>
            <button onClick={() => deleteTodo(index)}>X</button>
          </li>
        ))}
      </ul>
      <p>
        You have <strong>{todos.filter((todo) => !todo.completed).length}</strong>{" "}
        pending todos
      </p>
    </div>
  );
}

export default App;
