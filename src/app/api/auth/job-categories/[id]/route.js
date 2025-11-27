import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET job category by ID
export async function GET(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job category ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      `SELECT jc_id, jc_title, jc_date, jc_category, jc_location, jc_vacancy, 
              jc_employmentStatus, jc_workPlace, jc_description, jc_salary, 
              jc_image, jc_gender, jc_age, jc_degreeName, jc_institution, 
              jc_skills, jc_matchingStrength, jc_status, jc_created_at 
       FROM job_categories WHERE jc_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Job category not found' },
        { status: 404 }
      );
    }

    const jobCategory = rows[0];
    
    return NextResponse.json({
      success: true,
      data: jobCategory
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job category' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// PUT (Update) job category
export async function PUT(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job category ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      jc_title, jc_date, jc_category, jc_location, jc_vacancy,
      jc_employmentStatus, jc_workPlace, jc_description, jc_salary,
      jc_image, jc_gender, jc_age, jc_degreeName, jc_institution,
      jc_skills, jc_matchingStrength, jc_status
    } = body;

    // Validation
    if (!jc_title || jc_title.trim() === '') {
      return NextResponse.json(
        { error: 'Job title is required' },
        { status: 400 }
      );
    }

    if (!jc_category || jc_category.trim() === '') {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    const status = jc_status === 1 ? 1 : 0;

    connection = await mysql.createConnection(dbConfig);

    // Check if job category exists
    const [existing] = await connection.execute(
      'SELECT jc_id FROM job_categories WHERE jc_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job category not found' },
        { status: 404 }
      );
    }

    // Check for duplicate job title (excluding current record)
    const [duplicates] = await connection.execute(
      'SELECT jc_id FROM job_categories WHERE jc_title = ? AND jc_id != ?',
      [jc_title.trim(), id]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Job title already exists' },
        { status: 409 }
      );
    }

    // Update job category
    await connection.execute(
      `UPDATE job_categories SET 
        jc_title = ?, jc_date = ?, jc_category = ?, jc_location = ?, jc_vacancy = ?,
        jc_employmentStatus = ?, jc_workPlace = ?, jc_description = ?, jc_salary = ?,
        jc_image = ?, jc_gender = ?, jc_age = ?, jc_degreeName = ?, jc_institution = ?,
        jc_skills = ?, jc_matchingStrength = ?, jc_status = ?
       WHERE jc_id = ?`,
      [
        jc_title.trim(), jc_date, jc_category.trim(), jc_location.trim(), jc_vacancy,
        jc_employmentStatus, jc_workPlace, jc_description.trim(), jc_salary.trim(),
        jc_image.trim(), jc_gender, jc_age.trim(), jc_degreeName.trim(), jc_institution.trim(),
        jc_skills.trim(), jc_matchingStrength, status, id
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Job category updated successfully',
      data: {
        jc_id: parseInt(id),
        jc_title: jc_title.trim(),
        jc_category: jc_category.trim(),
        jc_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update job category' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// DELETE job category
export async function DELETE(request, { params }) {
  let connection;
  
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: 'Valid job category ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    // Check if job category exists
    const [existing] = await connection.execute(
      'SELECT jc_id FROM job_categories WHERE jc_id = ?',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Job category not found' },
        { status: 404 }
      );
    }

    // Delete job category
    await connection.execute(
      'DELETE FROM job_categories WHERE jc_id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Job category deleted successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job category' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}