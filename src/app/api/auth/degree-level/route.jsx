import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET all degree levels
export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT dl_id, dl_name, dl_status, dl_created_at FROM degree_level ORDER BY dl_created_at DESC'
    );
    
    return NextResponse.json(rows);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch degree levels' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// POST create new degree level
export async function POST(request) {
  let connection;
  
  try {
    const body = await request.json();
    const { dl_name, dl_status } = body;

    // Validation
    if (!dl_name || dl_name.trim() === '') {
      return NextResponse.json(
        { error: 'Degree level name is required' },
        { status: 400 }
      );
    }

    const status = dl_status === 1 ? 1 : 0;

    connection = await mysql.createConnection(dbConfig);

    // Check for duplicate degree level name
    const [duplicates] = await connection.execute(
      'SELECT dl_id FROM degree_level WHERE dl_name = ?',
      [dl_name.trim()]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Degree level name already exists' },
        { status: 409 }
      );
    }

    // Create degree level
    const [result] = await connection.execute(
      'INSERT INTO degree_level (dl_name, dl_status) VALUES (?, ?)',
      [dl_name.trim(), status]
    );

    return NextResponse.json({
      success: true,
      message: 'Degree level created successfully',
      data: {
        dl_id: result.insertId,
        dl_name: dl_name.trim(),
        dl_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create degree level' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}