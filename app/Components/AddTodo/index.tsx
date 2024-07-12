import { useState, useEffect } from 'react';

export default function AddTodo({ onAddTodo, onUpdateTodo, editItem }) {
  const [todo, setTodo] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editItem) {
      setTodo(editItem.todo);
      setDate(editItem.due_date);
    } else {
      resetForm();
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editItem) {
      await onUpdateTodo(editItem.id, todo, date);
    } else {
      await onAddTodo(todo, date);
    }
    resetForm();
  };

  const resetForm = () => {
    setTodo('');
    setDate('');
  };

  return (
    <div className="p-12">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
        <button className="w-full bg-purple-900 p-3 rounded-md" type="submit">
          {editItem ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
}
