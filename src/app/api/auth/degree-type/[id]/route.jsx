import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET degree type by ID
export async function GET(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid degree type ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT dt_id, dt_name, dt_level, dt_status, dt_createdAt FROM degree_type WHERE dt_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Degree type not found' },
        { status: 404 }
      );
    }

    const degreeType = rows[0];
    
    return NextResponse.json({
      success: true,
      data: degreeType
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch degree type' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// PUT (Update) degree type
export async function PUT(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid degree type ID is required' },
        { status: 400 }
      );
    }

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

    // Check if degree type exists
    const [existing] = await connection.execute(
      'SELECT dt_id FROM degree_type WHERE dt_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Degree type not found' },
        { status: 404 }
      );
    }

    // Check for duplicate degree name (excluding current record)
    const [duplicates] = await connection.execute(
      'SELECT dt_id FROM degree_type WHERE dt_name = ? AND dt_level = ? AND dt_id != ?',
      [dt_name.trim(), dt_level.trim(), id]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Degree type with this name and level already exists' },
        { status: 409 }
      );
    }

    // Update degree type
    await connection.execute(
      'UPDATE degree_type SET dt_name = ?, dt_level = ?, dt_status = ? WHERE dt_id = ?',
      [dt_name.trim(), dt_level.trim(), status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Degree type updated successfully',
      data: {
        dt_id: parseInt(id),
        dt_name: dt_name.trim(),
        dt_level: dt_level.trim(),
        dt_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update degree type' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// DELETE degree type
export async function DELETE(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid degree type ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    // Check if degree type exists
    const [existing] = await connection.execute(
      'SELECT dt_id FROM degree_type WHERE dt_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Degree type not found' },
        { status: 404 }
      );
    }

    // Delete degree type
    await connection.execute(
      'DELETE FROM degree_type WHERE dt_id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Degree type deleted successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete degree type' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}