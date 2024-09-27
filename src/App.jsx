import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [editTodo, setEditTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const startEditTodo = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setEditTodo(todos[index]);
  };

  const updateTodo = () => {
    if (editTodo.trim() !== '') {
      const updatedTodos = todos.map((todo, index) =>
        index === currentTodoIndex ? editTodo.trim() : todo
      );
      setTodos(updatedTodos);
      setIsEditing(false);
      setCurrentTodoIndex(null);
      setEditTodo('');
    }
  };

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter') {
      action();
    }
  };


  
  return (
    <div className="main-container">
      <h2>↓WHAT CHUU GONNA DO?↓</h2>
      <div className="header-container">
        <h2>Welcome to Your To-Do Application</h2>
      </div>

      <div className="app-container">
        <h1>My To-Do List...</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, addTodo)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <span>{todo}</span>
              <div className="delete-edit">
                <button onClick={() => startEditTodo(index)}>Edit</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>


        {isEditing && (
          <div className="edit-container">
            <input
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, updateTodo)}
            />
            <button onClick={updateTodo}>Update</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;