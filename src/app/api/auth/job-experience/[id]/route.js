import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET job experience by ID
export async function GET(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job experience ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT je_id, je_experience, je_status, je_createdAt FROM job_experience WHERE je_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Job experience not found' },
        { status: 404 }
      );
    }

    const jobExperience = rows[0];
    
    return NextResponse.json({
      success: true,
      data: jobExperience
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job experience' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// PUT (Update) job experience
export async function PUT(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job experience ID is required' },
        { status: 400 }
      );
    }

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

    // Check if job experience exists
    const [existing] = await connection.execute(
      'SELECT je_id FROM job_experience WHERE je_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job experience not found' },
        { status: 404 }
      );
    }

    // Check for duplicate experience (excluding current record)
    const [duplicates] = await connection.execute(
      'SELECT je_id FROM job_experience WHERE je_experience = ? AND je_id != ?',
      [je_experience.trim(), id]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Experience level already exists' },
        { status: 409 }
      );
    }

    // Update job experience
    await connection.execute(
      'UPDATE job_experience SET je_experience = ?, je_status = ? WHERE je_id = ?',
      [je_experience.trim(), status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Job experience updated successfully',
      data: {
        je_id: parseInt(id),
        je_experience: je_experience.trim(),
        je_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update job experience' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// DELETE job experience
export async function DELETE(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job experience ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    // Check if job experience exists
    const [existing] = await connection.execute(
      'SELECT je_id FROM job_experience WHERE je_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job experience not found' },
        { status: 404 }
      );
    }

    // Delete job experience
    await connection.execute(
      'DELETE FROM job_experience WHERE je_id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Job experience deleted successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job experience' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}