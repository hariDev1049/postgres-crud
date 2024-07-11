import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import { pool } from '@/app/utils/dbConnect';

export async function POST(req: Request) {
  const { todo, date } = await req.json();

  try {
    await dbConnect();

    const result = await pool.query(
      'INSERT INTO todo_table (todo, due_date) VALUES ($1, $2) RETURNING *',
      [todo, date]
    );

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error in DB operation:', error);
    return NextResponse.json(
      { message: 'Error in DB operation' },
      { status: 500 }
    );
  }
}
