import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET degree level by ID
export async function GET(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid degree level ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT dl_id, dl_name, dl_status, dl_created_at FROM degree_level WHERE dl_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Degree level not found' },
        { status: 404 }
      );
    }

    const degreeLevel = rows[0];
    
    return NextResponse.json({
      success: true,
      data: degreeLevel
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch degree level' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// PUT (Update) degree level
export async function PUT(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid degree level ID is required' },
        { status: 400 }
      );
    }

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

    // Check if degree level exists
    const [existing] = await connection.execute(
      'SELECT dl_id FROM degree_level WHERE dl_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Degree level not found' },
        { status: 404 }
      );
    }

    // Check for duplicate degree level name (excluding current record)
    const [duplicates] = await connection.execute(
      'SELECT dl_id FROM degree_level WHERE dl_name = ? AND dl_id != ?',
      [dl_name.trim(), id]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Degree level name already exists' },
        { status: 409 }
      );
    }

    // Update degree level
    await connection.execute(
      'UPDATE degree_level SET dl_name = ?, dl_status = ? WHERE dl_id = ?',
      [dl_name.trim(), status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Degree level updated successfully',
      data: {
        dl_id: parseInt(id),
        dl_name: dl_name.trim(),
        dl_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update degree level' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// DELETE degree level
export async function DELETE(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid degree level ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    // Check if degree level exists
    const [existing] = await connection.execute(
      'SELECT dl_id FROM degree_level WHERE dl_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Degree level not found' },
        { status: 404 }
      );
    }

    // Delete degree level
    await connection.execute(
      'DELETE FROM degree_level WHERE dl_id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Degree level deleted successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete degree level' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}