import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET job skill by ID
export async function GET(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job skill ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT js_id, js_name, js_status, js_createdAt FROM job_skills WHERE js_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Job skill not found' },
        { status: 404 }
      );
    }

    const jobSkill = rows[0];
    
    return NextResponse.json({
      success: true,
      data: jobSkill
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job skill' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// PUT (Update) job skill
export async function PUT(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job skill ID is required' },
        { status: 400 }
      );
    }

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

    // Check if job skill exists
    const [existing] = await connection.execute(
      'SELECT js_id FROM job_skills WHERE js_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job skill not found' },
        { status: 404 }
      );
    }

    // Check for duplicate skill name (excluding current record)
    const [duplicates] = await connection.execute(
      'SELECT js_id FROM job_skills WHERE js_name = ? AND js_id != ?',
      [js_name.trim(), id]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Skill name already exists' },
        { status: 409 }
      );
    }

    // Update job skill
    await connection.execute(
      'UPDATE job_skills SET js_name = ?, js_status = ? WHERE js_id = ?',
      [js_name.trim(), status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Job skill updated successfully',
      data: {
        js_id: parseInt(id),
        js_name: js_name.trim(),
        js_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update job skill' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// DELETE job skill
export async function DELETE(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job skill ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    // Check if job skill exists
    const [existing] = await connection.execute(
      'SELECT js_id FROM job_skills WHERE js_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job skill not found' },
        { status: 404 }
      );
    }

    // Delete job skill
    await connection.execute(
      'DELETE FROM job_skills WHERE js_id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Job skill deleted successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job skill' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}