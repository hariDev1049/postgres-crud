'use client';
import { useState, useEffect } from 'react';
import AddTodo from '../AddTodo';
import DisplayTodos from '../DisplayTodos';
export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      const response = await fetch('/api/getAllTodos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newTodos = await response.json();
      setTodos(newTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  const handleAddTodo = async (todo, date) => {
    try {
      const response = await fetch('/api/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo, date }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, todo, date) => {
    try {
      const response = await fetch(`/api/editTodo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, todo, date }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedTodo = await response.json();
      setTodos(todos.map((item: any) => (item.id === id ? updatedTodo : item)));
      setEditItem(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/deleteTodo`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <AddTodo
        onAddTodo={handleAddTodo}
        onUpdateTodo={handleUpdateTodo}
        editItem={editItem}
      />
      <DisplayTodos todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
