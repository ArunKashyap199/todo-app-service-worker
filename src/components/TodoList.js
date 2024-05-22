import React, { useState, useEffect } from 'react';
import db from '../db';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const allTodos = await db.todos.toArray();
            setTodos(allTodos);
        };
        fetchData();
    }, []);

    const addTodo = async () => {
        const newTodo = { title, completed: false };
        await db.todos.add(newTodo);
        setTodos([...todos, newTodo]);
        setTitle('');
    };

    const deleteTodo = async (id) => {
        await db.todos.delete(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = async (id) => {
        const todo = await db.todos.get(id);
        await db.todos.update(id, { completed: !todo.completed });
        setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
    };

    return (
        <div className='App'>
            <h1>To-Do List</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={addTodo}>Add</button>
            <ul style={{listStyle: 'none'}}>
                {todos.map(todo => (
                    <li key={todo.id} style={{ display: "flex", justifyContent: "space-evenly"}}>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.title}
                        </span>
                        <button onClick={() => toggleComplete(todo.id)}>
                            {todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
