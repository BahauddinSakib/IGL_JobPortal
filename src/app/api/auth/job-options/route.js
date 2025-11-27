import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);

    // Fetch all options from reference tables
    const [jobTypes] = await connection.execute('SELECT jt_id, jt_name FROM job_type WHERE jt_status = 1');
    const [jobSkills] = await connection.execute('SELECT js_id, js_name FROM job_skills WHERE js_status = 1');
    const [jobExperiences] = await connection.execute('SELECT je_id, je_experience FROM job_experience WHERE je_status = 1');
    const [degreeTypes] = await connection.execute('SELECT dt_id, dt_name FROM degree_type WHERE dt_status = 1');
    const [degreeLevels] = await connection.execute('SELECT dl_id, dl_name FROM degree_level WHERE dl_status = 1');

    return NextResponse.json({
      jobTypes,
      jobSkills,
      jobExperiences,
      degreeTypes,
      degreeLevels
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job options' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}