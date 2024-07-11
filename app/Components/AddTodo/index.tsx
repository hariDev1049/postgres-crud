import { useState } from 'react';

export default function AddTodo() {
  const [todo, setTodo] = useState('');
  const [date, setDate] = useState('');

  const handleClick = async (e: any) => {
    e.preventDefault();
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

      resetForm();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const resetForm = () => {
    setTodo('');
    setDate('');
  };

  return (
    <div className="p-12">
      <form className="flex flex-col gap-8">
        <div className="flex gap-4">
          <input
            type="text"
            className="p-3 rounded w-96 text-black"
            placeholder="Write your Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="date"
            className="p-3 rounded text-black"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-purple-900 p-3 rounded-md"
          onClick={handleClick}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}
