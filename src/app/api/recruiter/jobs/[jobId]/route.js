import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request, { params }) {
  let connection;
  
  try {
    // Await params in Next.js 15
    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    connection = await db.getConnection();

    // Get job details
    const [jobs] = await connection.execute(
      `SELECT j.* FROM jobs j WHERE j.j_id = ?`,
      [parseInt(jobId)]
    );

    if (jobs.length === 0) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      job: jobs[0]
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// PUT method for pause functionality
export async function PUT(request, { params }) {
  let connection;
  
  try {
    // Await params in Next.js 15
    const { jobId } = await params;
    const { isPaused } = await request.json();

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    connection = await db.getConnection();

    // Update job pause status - now the column exists!
    const [result] = await connection.execute(
      `UPDATE jobs SET j_is_paused = ? WHERE j_id = ?`,
      [isPaused ? 1 : 0, parseInt(jobId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Job ${isPaused ? 'paused' : 'resumed'} successfully`,
      jobId: jobId,
      isPaused: isPaused
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to update job status' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}