import { it } from 'node:test';
import { useEffect, useState } from 'react';

const index = () => {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    getTodos();

    // const interval = setInterval(() => {
    //   getTodos();
    // }, 5000);

    // return () => clearInterval(interval);
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

      const newTodo = await response.json();
      setAllTodos(newTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  if (!allTodos) {
    return 'Loading..!';
  }

  const handleDelete = (e: any) => {
    async function deleteTodo() {
      try {
        const response = await fetch('/api/deleteTodos', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {}
    }

    deleteTodo();
  };

  const handleEdit = () => {};

  return (
    <div>
      {allTodos.map((item) => {
        return (
          <li
            key={item.id}
            className="w-full flex justify-between mt-2 hover:bg-slate-600 p-6 text-white transition-all duration-400 ease-in-out rounded-md"
          >
            {item.todo}{' '}
            <div className="flex gap-3">
              <button className="bg-red-500 p-2 rounded" onClick={handleDelete}>
                Delete
              </button>{' '}
              <button className="bg-green-500 p-2 rounded" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default index;
