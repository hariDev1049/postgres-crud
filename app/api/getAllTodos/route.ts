import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import { pool } from '@/app/utils/dbConnect';

export async function GET() {
  try {
    await dbConnect();

    const result = await pool.query('SELECT * FROM todo_table');

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error in DB operation:', error);
    return NextResponse.json(
      { message: 'Error in DB operation' },
      { status: 500 }
    );
  }
}
