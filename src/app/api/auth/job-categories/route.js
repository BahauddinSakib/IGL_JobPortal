import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// GET all job categories
export async function GET(request) {
  let connection;
  
  try {
    const { searchParams } = new URL(request.url);
    const dropdown = searchParams.get('dropdown');
    
    connection = await mysql.createConnection(dbConfig);

    // If dropdown=true, return simple data for dropdowns
    if (dropdown === 'true') {
      const [rows] = await connection.execute(
        `SELECT jc_id, jc_name FROM job_categories WHERE jc_status = 1 ORDER BY jc_name`
      );
      return NextResponse.json(rows);
    }

    // Otherwise return full job data (your existing functionality)
    const [rows] = await connection.execute(
      `SELECT jc_id, jc_title, jc_date, jc_category, jc_location, jc_vacancy, 
              jc_employmentStatus, jc_workPlace, jc_description, jc_salary, 
              jc_image, jc_gender, jc_age, jc_degreeName, jc_institution, 
              jc_skills, jc_matchingStrength, jc_status, jc_created_at 
       FROM job_categories 
       ORDER BY jc_created_at DESC`
    );
    
    return NextResponse.json(rows);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job categories' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// POST create new job category (your existing code remains unchanged)
export async function POST(request) {
  let connection;
  
  try {
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

    // Check for duplicate job title
    const [duplicates] = await connection.execute(
      'SELECT jc_id FROM job_categories WHERE jc_title = ?',
      [jc_title.trim()]
    );

    if (duplicates.length > 0) {
      return NextResponse.json(
        { error: 'Job title already exists' },
        { status: 409 }
      );
    }

    // Create job category
    const [result] = await connection.execute(
      `INSERT INTO job_categories (
        jc_title, jc_date, jc_category, jc_location, jc_vacancy,
        jc_employmentStatus, jc_workPlace, jc_description, jc_salary,
        jc_image, jc_gender, jc_age, jc_degreeName, jc_institution,
        jc_skills, jc_matchingStrength, jc_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jc_title.trim(), jc_date, jc_category.trim(), jc_location.trim(), jc_vacancy,
        jc_employmentStatus, jc_workPlace, jc_description.trim(), jc_salary.trim(),
        jc_image.trim(), jc_gender, jc_age.trim(), jc_degreeName.trim(), jc_institution.trim(),
        jc_skills.trim(), jc_matchingStrength, status
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Job category created successfully',
      data: {
        jc_id: result.insertId,
        jc_title: jc_title.trim(),
        jc_category: jc_category.trim(),
        jc_status: status
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create job category' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}