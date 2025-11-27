import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET all job experiences
export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT je_id, je_experience, je_status, je_createdAt FROM job_experience ORDER BY je_createdAt DESC'
    );
    
    return NextResponse.json(rows);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job experiences' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// POST create new job experience
export async function POST(request) {
  let connection;
  
  try {
    const body = await request.json();
    const { je_experience, je_status } = body;

    // Validation
    if (!je_experience || je_experience.trim() === '') {
      return NextResponse.json(
        { error: 'Experience level is required' },
        { status: 400 }
      );
    }

    const status = je_status === 1 ? 1 : 0;

    connection = await mysql.createConnection(dbConfig);

    // Check for duplicate experience
    const [duplicates] = await connection.execute(
      'SELECT je_id FROM job_experience WHERE je_experience = ?',
      [je_experience.trim()]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Experience level already exists' },
        { status: 409 }
      );
    }

    // Create job experience
    const [result] = await connection.execute(
      'INSERT INTO job_experience (je_experience, je_status) VALUES (?, ?)',
      [je_experience.trim(), status]
    );

    return NextResponse.json({
      success: true,
      message: 'Job experience created successfully',
      data: {
        je_id: result.insertId,
        je_experience: je_experience.trim(),
        je_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create job experience' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}