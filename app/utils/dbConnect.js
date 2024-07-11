import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

export default async function dbConnect() {
  try {
    const client = await pool.connect();
    console.log('Connection acquired from the pool.');
    try {
      const res = await client.query('SELECT NOW()');
      console.log('Connected to Database Successfully');
      console.log(res.rows);
    } finally {
      client.release();
      console.log('Connection released back to the pool.');
    }
  } catch (error) {
    console.error('Error in DB Connection', error);
    throw error;
  }
}
