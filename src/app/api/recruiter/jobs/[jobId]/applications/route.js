import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobportal_db',
};

export async function GET(request, { params }) {
  let connection;
  
  try {
    const { jobId } = await params;
    console.log('🔍 Fetching applications for job:', jobId);

    connection = await mysql.createConnection(dbConfig);

    // Get applications with applicant info
    const [applications] = await connection.execute(
      `SELECT 
        ja.ja_id, ja.ja_jobid, ja.ja_applicantid, ja.ja_phone,
        ja.ja_expected_salary, ja.ja_cv, ja.ja_status, ja.ja_applyDate,
        au.au_first_name, au.au_last_name, au.au_email
       FROM job_application ja
       LEFT JOIN admin_user au ON ja.ja_applicantid = au.au_id
       WHERE ja.ja_jobid = ?`,
      [parseInt(jobId)]
    );

    console.log(`✅ Found ${applications.length} applications for job ${jobId}`);

    return NextResponse.json({
      success: true,
      applications: applications || []
    });

  } catch (error) {
    console.error('❌ Database error in applications API:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch applications',
      details: error.message,
      applications: []
    }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}