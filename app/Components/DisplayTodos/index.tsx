import { useEffect, useState } from 'react';

export default function DisplayTodo({ todos, onEdit, onDelete }) {
  if (!todos || todos.length === 0) {
    return <h3 className="text-center">Loading please wait..!</h3>;
  }

  return (
    <div>
      {todos.map((item) => (
        <li
          key={item.id}
          className="w-full flex justify-between mt-2 hover:bg-slate-600 p-6 text-white transition-all duration-400 ease-in-out rounded-md items-center"
        >
          {item.todo}
          <div className="flex gap-3 items-center">
            <span className="mr-10">{item.due_date}</span>
            <button
              className="bg-red-500 p-2 rounded"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
            <button
              className="bg-green-500 p-2 rounded"
              onClick={() => onEdit(item)}
            >
              Edit
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}
