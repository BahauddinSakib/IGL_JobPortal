import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  let connection;
  
  try {
    // Get the token from the request headers
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify the token and get user data
    const userResponse = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: 'Invalid token. Please login again.' }, { status: 401 });
    }

    const userData = await userResponse.json();

    console.log('User data from auth:', userData); // Debug log

    // Check if user is a seeker (au_type = '2') - use direct access
    if (userData.au_type !== '2') {
      return NextResponse.json({ error: 'Only job seekers can apply for jobs' }, { status: 403 });
    }

    const formData = await request.formData();
    
    const jobId = formData.get('jobId');
    const phoneNumber = formData.get('phoneNumber');
    const expectedSalary = formData.get('expectedSalary');
    const cvFile = formData.get('cvFile');

    // Use the actual USER ID (au_id), not nested user object
    const applicantId = userData.au_id; // This is the actual user ID

    console.log('Received application data from seeker:', { 
      userId: applicantId, // Actual user ID
      applicantType: userData.au_type, // User type '2'
      jobId, 
      phoneNumber, 
      expectedSalary, 
      cvFile: cvFile ? cvFile.name : 'No file' 
    });

    // Validate required fields
    if (!jobId || !phoneNumber || !expectedSalary || !cvFile) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    connection = await db.getConnection();

    // Verify job exists and is published (status = 1)
    const [jobs] = await connection.execute(
      'SELECT j_id, j_status FROM jobs WHERE j_id = ?',
      [jobId]
    );

    if (jobs.length === 0) {
      console.log('Job not found:', jobId);
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check if job is published
    if (jobs[0].j_status !== 1) {
      console.log('Job is not published:', jobId);
      return NextResponse.json({ error: 'This job is not available for applications' }, { status: 400 });
    }

    // Check if this specific user already applied to this job (using ACTUAL USER ID)
    const [existingApplications] = await connection.execute(
      'SELECT ja_id FROM job_application WHERE ja_jobid = ? AND ja_applicantid = ?',
      [parseInt(jobId), applicantId] // Use the actual user ID here
    );

    if (existingApplications.length > 0) {
      console.log('User already applied to this job:', { jobId, applicantId });
      return NextResponse.json({ 
        error: 'You have already applied to this job' 
      }, { status: 409 });
    }

    // Generate filename: yearmonthdate_userId_jobId.pdf
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    
    // Create unique filename with user ID and job ID
    const fileName = `cv_${year}${month}${date}_${applicantId}_${jobId}.pdf`;
    
    // Define the CV storage path
    const cvStoragePath = 'F:/Sakib File/JobPost/Jobnova/Jobnova_NextJs/public/applicantsCV';
    
    // Create directory if it doesn't exist
    await mkdir(cvStoragePath, { recursive: true });
    
    // Convert CV file to buffer and save to file system
    const cvBuffer = await cvFile.arrayBuffer();
    const filePath = join(cvStoragePath, fileName);
    await writeFile(filePath, Buffer.from(cvBuffer));

    console.log('CV saved to:', filePath);

    // Insert job application with the ACTUAL USER ID
    const [applicationResult] = await connection.execute(
      `INSERT INTO job_application 
       (ja_jobid, ja_applicantid, ja_phone, ja_expected_salary, ja_status, ja_cv, ja_applyDate) 
       VALUES (?, ?, ?, ?, 3, ?, NOW())`,
      [parseInt(jobId), applicantId, phoneNumber, parseFloat(expectedSalary), fileName] // Use applicantId (actual user ID)
    );

    console.log('Application inserted successfully for user ID:', applicantId);

    return NextResponse.json({ 
      message: 'Application submitted successfully',
      applicationId: applicationResult.insertId 
    }, { status: 201 });

  } catch (error) {
    console.error('Job application error:', error);
    
    // Handle duplicate entry error specifically
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ 
        error: 'You have already applied to this job' 
      }, { status: 409 });
    }
    
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message }, 
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

// GET endpoint to count applications for a job
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

    console.log(`Application count for job ${jobId}:`, applicationCount);

    return NextResponse.json({ 
      jobId: parseInt(jobId),
      count: applicationCount
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching application count:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message }, 
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}