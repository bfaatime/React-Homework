import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false); 
  const [todoToDelete, setTodoToDelete] = useState(null); 
  const [editingTodo, setEditingTodo] = useState(null); 
  const [editedText, setEditedText] = useState(""); 

  const addTodo = () => {
    if (input.trim()) {
      const newTodo = { text: input, completed: false };
      setTodos([...todos, newTodo]);
      console.log("Added Todo: ", newTodo); 
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    console.log("Toggled Todo: ", updatedTodos[index]); 
  };

  const openModal = (index) => {
    setShowModal(true);
    setTodoToDelete(index); 
  };

  const closeModal = () => {
    setShowModal(false);
    setTodoToDelete(null); 
  };

  const confirmDelete = () => {
    const updatedTodos = todos.filter((_, i) => i !== todoToDelete);
    setTodos(updatedTodos);
    console.log("Deleted Todo: ", todos[todoToDelete]); 
    closeModal();
  };

  const startEditing = (index) => {
    setEditingTodo(index);
    setEditedText(todos[index].text);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setEditedText(""); 
  };

  const saveEditedTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: editedText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
    setEditedText(""); 
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <header>
        <h1>Todo App</h1>
      </header>
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
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setTodos([])}>Clear All</button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              {editingTodo === index ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span className="checkbox-label">{todo.text}</span>
              )}
            </label>
            <div className="todo-actions">
              {editingTodo === index ? (
                <>
                  <button className="save-btn" onClick={() => saveEditedTodo(index)}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={cancelEditing}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => startEditing(index)}>
                    <FaEdit /> {}
                  </button>
                  <button className="delete-btn" onClick={() => openModal(index)}>
                    <FaTrashAlt /> {}
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="pending-count">
        You have <strong>{todos.filter((todo) => !todo.completed).length}</strong> pending todos
      </p>

      {}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Are you sure you want to delete this todo?</h2>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                No, Keep it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
