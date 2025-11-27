import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  let connection;
  
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    connection = await db.getConnection();

    // Count applications for this job
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as applicationCount FROM job_application WHERE ja_jobid = ?',
      [parseInt(jobId)]
    );

    const applicationCount = countResult[0]?.applicationCount || 0;

    return NextResponse.json({ 
      jobId: parseInt(jobId),
      count: applicationCount
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching application count:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}