import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Authentication middleware
async function authenticateRequest(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Unauthorized - No token provided', status: 401 };
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const connection = await mysql.createConnection(dbConfig);
    const [users] = await connection.execute(
      'SELECT au_id, au_type, au_first_name, au_last_name FROM admin_user WHERE au_id = ?',
      [decoded.userId]
    );
    
    await connection.end();

    if (users.length === 0) {
      return { error: 'User not found', status: 404 };
    }

    return { user: users[0] };
  } catch (error) {
    console.error('Authentication error:', error);
    return { error: 'Authentication failed', status: 401 };
  }
}

export async function GET(request) {
  let connection;
  
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const currentUser = authResult.user;
    const userType = parseInt(currentUser.au_type);
    
    // STRICT SECURITY: Only recruiters can access this endpoint
    if (userType !== 3) {
      console.log(`SECURITY BLOCK: User ${currentUser.au_id} (type: ${userType}) tried to access recruiter endpoint`);
      return NextResponse.json(
        { error: 'Unauthorized - This endpoint is for recruiters only' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    console.log(`Recruiter ${currentUser.au_id} (${currentUser.au_first_name}) accessing their jobs with status: ${status}`);

    connection = await mysql.createConnection(dbConfig);

    // SECURE QUERY: Join with job_approvals and filter by ja_recruiter_id
    const query = `
      SELECT 
        j.*, 
        ja.ja_id,
        ja.ja_current_status, 
        ja.ja_review_comments, 
        ja.ja_reviewed_at,
        ja.ja_submitted_at,
        ja.ja_previous_status,
        jt.jt_name as job_type_name
      FROM job_approvals ja
      INNER JOIN jobs j ON ja.ja_job_id = j.j_id
      LEFT JOIN job_type jt ON j.j_type_id = jt.jt_id
      WHERE ja.ja_recruiter_id = ? 
      ${status ? 'AND ja.ja_current_status = ?' : ''}
      ORDER BY ja.ja_submitted_at DESC
    `;

    const params = [currentUser.au_id];
    if (status) {
      params.push(parseInt(status));
    }

    console.log('Secure query for recruiter:', currentUser.au_id);
    const [jobs] = await connection.execute(query, params);

    // FINAL SECURITY CHECK
    const otherRecruiterJobs = jobs.filter(job => job.j_recruiter_id !== currentUser.au_id);
    if (otherRecruiterJobs.length > 0) {
      console.error('CRITICAL SECURITY BREACH: Recruiter can see other recruiter jobs!');
      return NextResponse.json(
        { error: 'Security violation detected' },
        { status: 500 }
      );
    }

    console.log(`Recruiter ${currentUser.au_id} found ${jobs.length} jobs`);

    return NextResponse.json({
      success: true,
      jobs: jobs || [],
      userType: userType,
      userId: currentUser.au_id,
      message: `Found ${jobs.length} jobs`
    });

  } catch (error) {
    console.error('Database error in recruiter jobs API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', details: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}