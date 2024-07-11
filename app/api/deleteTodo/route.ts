import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import { pool } from '@/app/utils/dbConnect';

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await dbConnect();

    const result = await pool.query('DELETE FROM todo_table WHERE id = $1', [
      id,
    ]);

    console.log(result);

    return NextResponse.json(
      { message: 'Delete Successfull' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DB operation:', error);
    return NextResponse.json(
      { message: 'Error in DB operation' },
      { status: 500 }
    );
  }
}
