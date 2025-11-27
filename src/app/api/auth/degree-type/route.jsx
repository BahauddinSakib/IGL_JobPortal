import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET all degree types - KEEPING YOUR ORIGINAL FORMAT
export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT dt_id, dt_name, dt_level, dt_status, dt_createdAt FROM degree_type ORDER BY dt_createdAt DESC'
    );
    
    // KEEP YOUR ORIGINAL RESPONSE FORMAT - no changes!
    return NextResponse.json(rows);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch degree types' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// POST create new degree type - NO CHANGES
export async function POST(request) {
  let connection;
  
  try {
    const body = await request.json();
    const { dt_name, dt_level, dt_status } = body;

    // Validation
    if (!dt_name || dt_name.trim() === '') {
      return NextResponse.json(
        { error: 'Degree name is required' },
        { status: 400 }
      );
    }

    if (!dt_level || dt_level.trim() === '') {
      return NextResponse.json(
        { error: 'Degree level is required' },
        { status: 400 }
      );
    }

    const status = dt_status === 1 ? 1 : 0;

    connection = await mysql.createConnection(dbConfig);

    // Check for duplicate degree name
    const [duplicates] = await connection.execute(
      'SELECT dt_id FROM degree_type WHERE dt_name = ? AND dt_level = ?',
      [dt_name.trim(), dt_level.trim()]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Degree type with this name and level already exists' },
        { status: 409 }
      );
    }

    // Create degree type
    const [result] = await connection.execute(
      'INSERT INTO degree_type (dt_name, dt_level, dt_status) VALUES (?, ?, ?)',
      [dt_name.trim(), dt_level.trim(), status]
    );

    return NextResponse.json({
      success: true,
      message: 'Degree type created successfully',
      data: {
        dt_id: result.insertId,
        dt_name: dt_name.trim(),
        dt_level: dt_level.trim(),
        dt_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create degree type' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}