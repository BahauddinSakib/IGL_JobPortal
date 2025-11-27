import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

// Helper function to get display name from numeric jt_name
const getDisplayName = (jt_name) => {
  const jt_name_str = jt_name.toString();
  
  // Predefined types mapping
  const predefinedMapping = {
    '1': 'Full-time',
    '2': 'Part-time', 
    '3': 'Contractual',
    '4': 'Intern',
    '5': 'Freelance'
  };
  
  // If it's a predefined type (1-5), return the mapped name
  if (predefinedMapping[jt_name_str]) {
    return predefinedMapping[jt_name_str];
  }
  
  // For custom types (6+), we need to get the actual names from somewhere
  // Since we're storing only numbers, we'll need to maintain a mapping
  const customMapping = {
    '6': 'Remote Job',
    '7': 'Temporary Job', 
    '8': 'Call Job',
    '9': 'Shift Job'
    // Add more as you create them
  };
  
  return customMapping[jt_name_str] || `Job Type ${jt_name_str}`;
};

// GET all job types with display names
export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const [jobTypes] = await connection.execute(`
      SELECT * FROM job_type 
      ORDER BY jt_createdAt DESC
    `);

    // Add display names to each job type
    const jobTypesWithDisplayNames = jobTypes.map(jobType => ({
      ...jobType,
      display_name: getDisplayName(jobType.jt_name)
    }));

    return NextResponse.json(jobTypesWithDisplayNames);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job types' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// CREATE new job type
export async function POST(request) {
  let connection;
  
  try {
    const { jobTypeName, jt_status } = await request.json();
    
    console.log('Received data:', { jobTypeName, jt_status });
    
    if (!jobTypeName) {
      return NextResponse.json(
        { error: 'Job type name is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    // Get all existing job types to find the next number
    const [allJobTypes] = await connection.execute(`
      SELECT jt_name FROM job_type 
    `);

    // Find the next available number starting from 6
    let nextNumber = 6;
    const existingNumbers = allJobTypes
      .map(job => {
        const num = parseInt(job.jt_name);
        return isNaN(num) ? null : num;
      })
      .filter(num => num !== null && num >= 6);

    if (existingNumbers.length > 0) {
      nextNumber = Math.max(...existingNumbers) + 1;
    }

    // For predefined types, map to specific numbers
    const predefinedTypes = {
      'full-time': '1',
      'part-time': '2', 
      'contractual': '3',
      'intern': '4',
      'freelance': '5'
    };

    let jt_name_to_store;
    const lowerCaseName = jobTypeName.toLowerCase().trim();
    
    if (predefinedTypes[lowerCaseName]) {
      // It's a predefined type, store as predefined number
      jt_name_to_store = predefinedTypes[lowerCaseName];
    } else {
      // It's a custom type, store as next available number
      jt_name_to_store = nextNumber.toString();
    }

    // Check if job type already exists
    const [existing] = await connection.execute(
      'SELECT jt_id FROM job_type WHERE jt_name = ?',
      [jt_name_to_store]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Job type already exists' },
        { status: 400 }
      );
    }

    console.log('Storing job type:', { 
      input_name: jobTypeName, 
      stored_number: jt_name_to_store 
    });

    // Insert new job type - store ONLY the number
    const [result] = await connection.execute(
      'INSERT INTO job_type (jt_name, jt_status) VALUES (?, ?)',
      [jt_name_to_store, jt_status || 1]
    );

    return NextResponse.json({
      success: true,
      jobTypeId: result.insertId,
      message: 'Job type created successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create job type: ' + error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}