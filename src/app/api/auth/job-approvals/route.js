import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET(request) {
  let connection;
  
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    connection = await mysql.createConnection(dbConfig);

    let query = `
      SELECT 
        j.*,
        ja.ja_id,
        ja.ja_current_status,
        ja.ja_review_comments,
        ja.ja_submitted_at,
        ja.ja_reviewed_at,
        recruiter.au_first_name as recruiter_first_name,
        recruiter.au_last_name as recruiter_last_name,
        recruiter.au_email as recruiter_email,
        admin.au_first_name as admin_first_name,
        admin.au_last_name as admin_last_name
      FROM job_approvals ja
      INNER JOIN jobs j ON ja.ja_job_id = j.j_id
      INNER JOIN admin_user recruiter ON ja.ja_recruiter_id = recruiter.au_id
      LEFT JOIN admin_user admin ON ja.ja_admin_reviewer_id = admin.au_id
      WHERE ja.ja_current_status = ?
      ORDER BY ja.ja_submitted_at DESC
    `;

    const statusMap = {
      'pending': 2,
      'approved': 1, 
      'rejected': 4
    };

    const statusValue = statusMap[status] || 2;

    const [jobs] = await connection.execute(query, [statusValue]);

    return NextResponse.json({
      success: true,
      jobs: jobs || []
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs for approval' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}