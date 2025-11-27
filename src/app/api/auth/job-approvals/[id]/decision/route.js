import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function POST(request, { params }) {
  let connection;
  
  try {
    const { id } = params;
    const { action, comments } = await request.json();
    
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const newStatus = action === 'approve' ? 1 : 4; 
    const jobStatus = action === 'approve' ? 1 : 4; 

    // For testing - use admin ID 1
    const admin_user_id = 1;

    // Start transaction
    await connection.beginTransaction();

    // Update job status in jobs table
    const [jobResult] = await connection.execute(
      'UPDATE jobs SET j_status = ?, j_reviewer_id = ?, j_review_comments = ?, j_reviewed_at = NOW(), j_updated_at = NOW() WHERE j_id = ?',
      [jobStatus, admin_user_id, comments, id]
    );

    if (jobResult.affectedRows === 0) {
      await connection.rollback();
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Update approval record
    await connection.execute(`
      UPDATE job_approvals 
      SET ja_current_status = ?, ja_previous_status = 2, ja_admin_reviewer_id = ?, 
          ja_review_comments = ?, ja_reviewed_at = NOW()
      WHERE ja_job_id = ?
    `, [newStatus, admin_user_id, comments, id]);

    await connection.commit();

    return NextResponse.json({ 
      success: true,
      message: `Job ${action === 'approve' ? 'approved' : 'rejected'} successfully` 
    });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}