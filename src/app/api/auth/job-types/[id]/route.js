import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET job type by ID
export async function GET(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job type ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT jt_id, jt_name, jt_status, jt_createdAt FROM job_type WHERE jt_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Job type not found' },
        { status: 404 }
      );
    }

    const jobType = rows[0];
    
    return NextResponse.json({
      success: true,
      data: jobType
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job type' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// PUT (Update) job type
export async function PUT(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job type ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { jt_name, jt_status } = body;

    // Validation
    if (!jt_name || jt_name.toString().trim() === '') {
      return NextResponse.json(
        { error: 'Job type name is required' },
        { status: 400 }
      );
    }

    if (jt_status === undefined || jt_status === null) {
      return NextResponse.json(
        { error: 'Job type status is required' },
        { status: 400 }
      );
    }

    const status = parseInt(jt_status) === 1 ? 1 : 0;
    const name = parseInt(jt_name);

    connection = await mysql.createConnection(dbConfig);

    // Check if job type exists
    const [existing] = await connection.execute(
      'SELECT jt_id FROM job_type WHERE jt_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job type not found' },
        { status: 404 }
      );
    }

    // Check for duplicate job type name (excluding current record)
    const [duplicates] = await connection.execute(
      'SELECT jt_id FROM job_type WHERE jt_name = ? AND jt_id != ?',
      [name, id]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Job type name already exists' },
        { status: 409 }
      );
    }

    // Update job type
    await connection.execute(
      'UPDATE job_type SET jt_name = ?, jt_status = ? WHERE jt_id = ?',
      [name, status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Job type updated successfully',
      data: {
        jt_id: parseInt(id),
        jt_name: name,
        jt_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update job type' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// DELETE job type
export async function DELETE(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    connection = await mysql.createConnection(dbConfig);

    // Check if job type exists
    const [existing] = await connection.execute(
      'SELECT jt_id FROM job_type WHERE jt_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job type not found' },
        { status: 404 }
      );
    }

    // Delete job type
    await connection.execute(
      'DELETE FROM job_type WHERE jt_id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Job type deleted successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job type' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}