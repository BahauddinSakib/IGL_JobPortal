import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(request, { params }) {
  let connection;
  
  try {
    // Await params in Next.js 15
    const { jobId } = await params;
    const { deadline } = await request.json();

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    if (!deadline) {
      return NextResponse.json({ error: 'Deadline is required' }, { status: 400 });
    }

    connection = await db.getConnection();

    // Get current job to check the existing deadline
    const [jobs] = await connection.execute(
      `SELECT j_deadline FROM jobs WHERE j_id = ?`,
      [parseInt(jobId)]
    );

    if (jobs.length === 0) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const currentDeadline = new Date(jobs[0].j_deadline);
    const newDeadline = new Date(deadline);

    // Check if new deadline is after current deadline (not allowed)
    if (newDeadline > currentDeadline) {
      return NextResponse.json({ 
        error: 'Cannot extend job deadline. You can only reduce it.' 
      }, { status: 400 });
    }

    // Check if new deadline is in the past
    if (newDeadline < new Date()) {
      return NextResponse.json({ 
        error: 'New deadline cannot be in the past' 
      }, { status: 400 });
    }

    // Update job deadline
    const [result] = await connection.execute(
      `UPDATE jobs SET j_deadline = ? WHERE j_id = ?`,
      [deadline, parseInt(jobId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Failed to update deadline' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Deadline updated successfully',
      jobId: jobId,
      newDeadline: deadline
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      error: 'Failed to update deadline',
      details: error.message 
    }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}