// src/app/api/auth/jobs/[id]/route.js
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request, { params }) {
  try {
    // Make sure to await params
    const { id } = await params;
    
    console.log('Fetching job with ID:', id);
    
    const connection = await db.getConnection();
    
    const [jobs] = await connection.execute(
      `SELECT 
        j_id as id,
        j_title as title,
        j_company_name as company_name
       FROM jobs 
       WHERE j_id = ?`,
      [id]
    );
    
    connection.release();

    console.log('Found jobs:', jobs);

    if (jobs.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(jobs[0]);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Remove other HTTP methods if they're causing conflicts