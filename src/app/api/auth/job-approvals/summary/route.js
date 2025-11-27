import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);

    const [pending] = await connection.execute(
      'SELECT COUNT(*) as count FROM job_approvals WHERE ja_current_status = 2'
    );
    const [approved] = await connection.execute(
      'SELECT COUNT(*) as count FROM job_approvals WHERE ja_current_status = 1'
    );
    const [rejected] = await connection.execute(
      'SELECT COUNT(*) as count FROM job_approvals WHERE ja_current_status = 4'
    );
    const [total] = await connection.execute(
      'SELECT COUNT(*) as count FROM job_approvals'
    );

    const stats = {
      pending: pending[0].count,
      approved: approved[0].count,
      rejected: rejected[0].count,
      total: total[0].count
    };
    
    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}