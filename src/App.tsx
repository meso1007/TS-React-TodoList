import { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // Defining the type for Todo object in TypeScript
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  // Handles the change in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handles form submission to add a new todo
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ignore if input is empty
    if (!inputValue.trim()) return;

    // Create a new Todo item
    const newTodo: Todo = {
      inputValue,
      id: Math.random(), // Assigning a random ID for simplicity
      checked: false,
    };

    // Add the new todo to the list
    setTodos([newTodo, ...todos]);
    setInputValue(''); // Reset the input field after adding the todo
  };

  // Handles editing an existing todo item
  const handleEdit = (id: number, newInputValue: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, inputValue: newInputValue } : todo
      )
    );
  };

  // Handles toggling the checkbox to mark a todo as checked or unchecked
  const handleChecked = (id: number, checked: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !checked } : todo
      )
    );
  };

  // Handles deleting a todo item
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);  // Filter out the todo with the given ID
    setTodos(newTodos); // Update the todos state with the new list
  };

  return (
    <>
      <h2 className='bigtext'>TodoList with Typescript</h2>
      <div className='todoApp'>
        <div className='right'>
          {/* Form to input a new task */}
          <form onSubmit={handleSubmit} className='enter'>
            <input
              type="text"
              placeholder='Enter your task'
              onChange={handleChange}
              className='inputtext'
              value={inputValue}
            />
            <input type='submit' value="Create" className='submitBtn' />
          </form>
        </div>
        <div>
          {/* Displaying the list of todos */}
          <ul className='todolist'>
            {todos.map((todo) => (
              <li key={todo.id} className='lists'>
                {/* Input field for editing a todo */}
                <input
                  type="text"
                  placeholder='Enter your task'
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  className='inputtext'
                  value={todo.inputValue}
                  disabled={todo.checked} // Disable input when the todo is checked
                />
                {/* Checkbox to toggle the completion status of the todo */}
                <input
                  type="checkbox"
                  onChange={() => handleChecked(todo.id, todo.checked)}
                  value={todo.inputValue}
                />
                {/* Button to delete the todo */}
                <button className='delete' onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
