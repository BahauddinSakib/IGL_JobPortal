import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET all job skills
export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT js_id, js_name, js_status, js_createdAt FROM job_skills ORDER BY js_createdAt DESC'
    );
    
    return NextResponse.json(rows);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job skills' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// POST create new job skill
export async function POST(request) {
  let connection;
  
  try {
    const body = await request.json();
    const { js_name, js_status } = body;

    // Validation
    if (!js_name || js_name.trim() === '') {
      return NextResponse.json(
        { error: 'Skill name is required' },
        { status: 400 }
      );
    }

    const status = js_status === 1 ? 1 : 0;

    connection = await mysql.createConnection(dbConfig);

    // Check for duplicate skill name
    const [duplicates] = await connection.execute(
      'SELECT js_id FROM job_skills WHERE js_name = ?',
      [js_name.trim()]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Skill name already exists' },
        { status: 409 }
      );
    }

    // Create job skill
    const [result] = await connection.execute(
      'INSERT INTO job_skills (js_name, js_status) VALUES (?, ?)',
      [js_name.trim(), status]
    );

    return NextResponse.json({
      success: true,
      message: 'Job skill created successfully',
      data: {
        js_id: result.insertId,
        js_name: js_name.trim(),
        js_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create job skill' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}