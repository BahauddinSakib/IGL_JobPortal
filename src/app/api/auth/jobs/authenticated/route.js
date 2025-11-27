import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';

// Database connection
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

export async function POST(request) {
  let connection;
  
  try {
    // 1. AUTHENTICATE USER
    const authResult = await authenticateRequest(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const currentUser = authResult.user;
    console.log('Authenticated user:', currentUser.au_id, 'Type:', currentUser.au_type);

    // === PERMISSION CHECK ===
    // Only allow recruiters (3) and admins (1) to create jobs
    if (currentUser.au_type != 3 && currentUser.au_type != 1) {
      return NextResponse.json(
        { error: 'Unauthorized - Only recruiters and admins can create jobs' },
        { status: 403 }
      );
    }
    // === END PERMISSION CHECK ===
    
    // 2. GET FORM DATA
    const formData = await request.formData();
    
    // Extract all fields from FormData
    const jobData = {
      j_title: formData.get('j_title'),
      j_date: formData.get('j_date'),
      j_deadline: formData.get('j_deadline'), 
      j_category: formData.get('j_category'),
      j_location: formData.get('j_location'),
      j_company_name: formData.get('j_company_name'),
      j_company_type: formData.get('j_company_type'),
      j_vacancy: formData.get('j_vacancy'),
      j_work_place: formData.get('j_work_place'),
      j_description: formData.get('j_description'),
      j_salary_min: formData.get('j_salary_min'),
      j_salary_max: formData.get('j_salary_max'),
      j_salary_type: formData.get('j_salary_type'),
      j_image: formData.get('j_image'),
      j_gender: formData.get('j_gender'),
      j_min_age: formData.get('j_min_age'),
      j_max_age: formData.get('j_max_age'),
      j_degree_name: formData.get('j_degree_name'),
      j_institution: formData.get('j_institution'),
      j_skills: formData.get('j_skills'),
      j_matching_strength: formData.get('j_matching_strength'),
      j_contact_email: formData.get('j_contact_email'),
      j_contact_phone: formData.get('j_contact_phone'),
      j_type_id: formData.get('j_type_id') || '',
      j_skills_id: formData.get('j_skills_id') || '',
      j_experience_id: formData.get('j_experience_id') || '',
      j_degree_type_id: formData.get('j_degree_type_id') || '',
      j_degree_level_id: formData.get('j_degree_level_id') || '',
      j_employment_status: formData.get('j_employment_status') || '1',
    };

    // 3. VALIDATE REQUIRED FIELDS
    const requiredFields = [
      'j_title', 'j_category', 'j_location', 'j_company_name', 'j_company_type',
      'j_vacancy', 'j_work_place', 'j_description'
    ];
    
    const missingFields = requiredFields.filter(field => !jobData[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // 4. CONNECT TO DATABASE
    connection = await mysql.createConnection(dbConfig);

    // 5. SALARY LOGIC
    let finalSalary = "Negotiable";
    if (jobData.j_salary_type === "range") {
      if (jobData.j_salary_min && jobData.j_salary_max) {
        finalSalary = `৳${jobData.j_salary_min} - ৳${jobData.j_salary_max}`;
      } else if (jobData.j_salary_min) {
        finalSalary = `৳${jobData.j_salary_min}`;
      } else {
        finalSalary = "Negotiable";
      }
    } else if (jobData.j_salary_type === "negotiable") {
      finalSalary = "Negotiable";
    } else if (jobData.j_salary_type === "nothing") {
      finalSalary = "Not Disclosed";
    }

    // 6. PREPARE AGE RANGE
    const ageRange = jobData.j_min_age && jobData.j_max_age 
      ? `${jobData.j_min_age}-${jobData.j_max_age} Years` 
      : "";

    // 7. SAFE PARSE INT FUNCTION
    const safeParseInt = (value) => {
      if (!value || value === '' || value === null || value === undefined) return null;
      const parsed = parseInt(value);
      return isNaN(parsed) ? null : parsed;
    };

    const j_type_id = safeParseInt(jobData.j_type_id);
    const j_skills_id = safeParseInt(jobData.j_skills_id);
    const j_experience_id = safeParseInt(jobData.j_experience_id);
    const j_degree_type_id = safeParseInt(jobData.j_degree_type_id);
    const j_degree_level_id = safeParseInt(jobData.j_degree_level_id);
    const j_gender = safeParseInt(jobData.j_gender) || 3;

    // 8. HANDLE IMAGE UPLOAD
    let imageFilename = null;
    const imageFile = jobData.j_image;
    
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      try {
        console.log('Processing image file:', imageFile.name);
        const fileExtension = imageFile.name.split('.').pop();
        imageFilename = `job-${Date.now()}.${fileExtension}`;
        
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'jobs');
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, imageFilename), buffer);
        
        console.log('Image uploaded successfully:', imageFilename);
      } catch (imageError) {
        console.error('Error uploading image:', imageError);
      }
    }

    // 9. AUTOMATIC USER DETECTION
    const j_status = 2; // Processing/Pending Approval

    let j_recruiter_id = null;
    let j_created_by_admin_id = null;

    if (currentUser.au_type == 3) {
      // Recruiter created job
      j_recruiter_id = currentUser.au_id;
      console.log('Job created by recruiter:', currentUser.au_id);
    } else if (currentUser.au_type == 1) {
      // Admin created job
      j_created_by_admin_id = currentUser.au_id;
      console.log('Job created by admin:', currentUser.au_id);
    }

    // 10. START TRANSACTION
    await connection.beginTransaction();

    try {
      // 11. INSERT JOB
      const [jobResult] = await connection.execute(`
        INSERT INTO jobs (
          j_title, j_date, j_deadline, j_category, j_location, j_company_name, j_company_type,
          j_vacancy, j_work_place, j_description, j_salary,
          j_gender, j_age, j_degree_name, j_institution, j_skills,
          j_matching_strength, j_type_id, j_skills_id, j_experience_id, 
          j_degree_type_id, j_degree_level_id, j_employment_status, j_status,
          j_image, j_recruiter_id, j_created_by_admin_id, j_submitted_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `, [
        jobData.j_title,
        jobData.j_date || new Date().toISOString().split('T')[0],
        jobData.j_deadline || null,
        jobData.j_category,
        jobData.j_location,
        jobData.j_company_name,
        jobData.j_company_type,
        parseInt(jobData.j_vacancy) || 1,
        parseInt(jobData.j_work_place) || 1,
        jobData.j_description,
        finalSalary,
        j_gender,
        ageRange,
        jobData.j_degree_name || '',
        jobData.j_institution || '',
        jobData.j_skills || '',
        parseFloat(jobData.j_matching_strength) || 3,
        j_type_id,
        j_skills_id,
        j_experience_id,
        j_degree_type_id,
        j_degree_level_id,
        parseInt(jobData.j_employment_status) || 1,
        j_status,
        imageFilename,
        j_recruiter_id,
        j_created_by_admin_id,
      ]);

      const jobId = jobResult.insertId;

      // 12. CREATE APPROVAL RECORD
      await connection.execute(`
        INSERT INTO job_approvals (
          ja_job_id, ja_recruiter_id, ja_current_status, ja_submitted_at, ja_created_at, ja_updated_at
        ) VALUES (?, ?, 2, NOW(), NOW(), NOW())
      `, [jobId, currentUser.au_id]);

      // 13. COMMIT TRANSACTION
      await connection.commit();

      const creatorType = currentUser.au_type == 1 ? 'Admin' : 'Recruiter';
      
      return NextResponse.json({
        success: true,
        jobId: jobId,
        message: `${creatorType} job submitted for approval! It will be published after review.`,
        salary: finalSalary,
        hasImage: !!imageFilename,
        status: j_status,
        userType: currentUser.au_type,
        recruiterId: j_recruiter_id,
        adminId: j_created_by_admin_id,
        autoDetected: true
      });

    } catch (error) {
      // Rollback transaction if any error occurs
      await connection.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Database error in authenticated POST:', error);
    
    let errorMessage = 'Failed to create job';
    if (error.code === 'ER_BAD_FIELD_ERROR') {
      errorMessage = 'Database configuration error: ' + error.message;
    } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      errorMessage = 'Invalid reference ID provided. Please check the selected options.';
    } else {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function GET(request) {
  let connection;
  
  try {
    // Authenticate user for protected endpoints
    const authResult = await authenticateRequest(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const currentUser = authResult.user;
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');

    connection = await mysql.createConnection(dbConfig);

    if (id) {
      // Get single job by ID
      const [jobs] = await connection.execute(
        `SELECT * FROM jobs WHERE j_id = ?`,
        [id]
      );

      if (jobs.length === 0) {
        return NextResponse.json(
          { error: 'Job not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        job: jobs[0]
      });
    }

    // Validate status parameter
    if (!status) {
      return NextResponse.json(
        { error: 'Status parameter is required' },
        { status: 400 }
      );
    }

    // Get jobs based on user type AND status
    let jobs;
    let query = '';
    let params = [];

    if (currentUser.au_type == 3) {
      // Recruiter: only see their own jobs with specific status
      query = `SELECT * FROM jobs WHERE j_recruiter_id = ? AND j_status = ? ORDER BY j_created_at DESC`;
      params = [currentUser.au_id, parseInt(status)];
    } else {
      // Admin: see all jobs with specific status
      query = `SELECT * FROM jobs WHERE j_status = ? ORDER BY j_created_at DESC`;
      params = [parseInt(status)];
    }

    console.log('Fetching jobs with query:', query, 'Params:', params); // Debug log
    [jobs] = await connection.execute(query, params);

    return NextResponse.json({
      success: true,
      jobs: jobs || [],
      userType: currentUser.au_type
    });

  } catch (error) {
    console.error('Database error in authenticated GET:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch jobs',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function OPTIONS(request) {
  // Authenticate user for options if needed
  const authResult = await authenticateRequest(request);
  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);

    const [
      categories,
      degreeTypes,
      jobExperiences,
      degreeLevels,
      jobTypes
    ] = await Promise.all([
      connection.execute('SELECT jc_id, jc_name FROM job_categories WHERE jc_status = 1 ORDER BY jc_name'),
      connection.execute('SELECT dt_id, dt_name FROM degree_type WHERE dt_status = 1 ORDER BY dt_name'),
      connection.execute('SELECT je_id, je_range, je_description FROM job_experience WHERE je_status = 1 ORDER BY je_id'),
      connection.execute('SELECT dl_id, dl_name FROM degree_level WHERE dl_status = 1 ORDER BY dl_id'),
      connection.execute('SELECT jt_id, jt_name FROM job_type WHERE jt_status = 1 ORDER BY jt_name')
    ]);

    return NextResponse.json({
      categories: categories[0],
      degreeTypes: degreeTypes[0],
      jobExperiences: jobExperiences[0],
      degreeLevels: degreeLevels[0],
      jobTypes: jobTypes[0]
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job options' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}