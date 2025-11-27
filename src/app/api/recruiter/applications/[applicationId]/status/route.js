import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(request, { params }) {
  let connection;
  
  try {
    const applicationId = params.applicationId;
    const { status } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json({ error: 'Application ID and status are required' }, { status: 400 });
    }

    connection = await db.getConnection();

    // Update application status
    const [result] = await connection.execute(
      `UPDATE job_application SET ja_status = ? WHERE ja_id = ?`,
      [parseInt(status), parseInt(applicationId)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to update application status' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}