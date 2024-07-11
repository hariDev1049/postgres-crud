import Todo from './Components/Todo';

export default function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen w-screen text-slate-300">
      <h2>CRUD using Postgres</h2>
      <Todo />
    </div>
  );
}
