import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import { pool } from '@/app/utils/dbConnect';

export async function PUT(req: Request) {
  const { id, todo, date } = await req.json();

  try {
    await dbConnect();

    if (todo == ' ' || date == ' ') {
      return NextResponse.json(
        { message: 'Todo and Date should be provided..!' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'UPDATE todo_table SET todo = $1, due_date = $2 WHERE id = $3 RETURNING *',
      [todo, date, id]
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
