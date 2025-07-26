import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Practice TypeScript', completed: false },
  { id: 3, text: 'Build Projects', completed: true },
];

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

//   const handleToggle = (id: number) => {
//     // TODO: Implement toggle logic
    
//     let itemTodo = todos.filter((todo) => {
//         if(todo.id === id){
//             todo.completed = !todo.completed
//         }
//         return todo;  
//     })
//     setTodos(itemTodo)
//   };
    const handleToggle = (id: number) => {       
        const updatedTodos = todos.map((todo) => {
            if(todo.id === id){
                return {...todo, completed: !todo.completed}
            } else {
                return todo
            }            
        })
        setTodos(updatedTodos)
    };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              {todo.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
