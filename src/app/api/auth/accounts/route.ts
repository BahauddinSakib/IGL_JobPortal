import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    // Fetch all users from admin_user table
    const [rows] = await connection.execute(`
      SELECT 
        au_id,
        au_first_name,
        au_last_name,
        au_email,
        au_phone,
        au_type,
        au_companyName,
        au_createdAt
      FROM admin_user 
      ORDER BY au_id DESC
    `);
    
    return NextResponse.json(rows);
    
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts from database' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}