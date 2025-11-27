import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Database connection
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
    const id = searchParams.get('id');

    connection = await mysql.createConnection(dbConfig);

    if (id) {
      // Get single job by ID - ADDED EXPIRATION FILTER
      const [jobs] = await connection.execute(
        `SELECT * FROM jobs WHERE j_id = ? AND j_status = 1 AND j_is_paused = 0 AND (j_deadline IS NULL OR j_deadline >= CURDATE())`,
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

    // Get all published jobs - ADDED EXPIRATION FILTER
    const [jobs] = await connection.execute(`
      SELECT 
        j_id, j_title, j_date,j_deadline, j_category, j_location, j_company_type, j_company_name,
        j_vacancy, j_work_place, j_description, j_salary, j_gender, j_age,
        j_degree_name, j_institution, j_skills, j_matching_strength,
        j_employment_status, j_created_at, j_image
      FROM jobs 
      WHERE j_status = 1 AND j_is_paused = 0 AND (j_deadline IS NULL OR j_deadline >= CURDATE())
      ORDER BY j_created_at DESC
    `);

    return NextResponse.json({
      success: true,
      jobs: jobs || []
    });

  } catch (error) {
    console.error('Database error in GET:', error);
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

export async function POST(request) {
  let connection;
  
  try {
    // Get FormData
    const formData = await request.formData();
    
    // Extract all fields from FormData
    const jobData = {
      // Step 1: Job Information
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
      
      // Step 2: Candidate Requirements
      j_gender: formData.get('j_gender'),
      j_min_age: formData.get('j_min_age'),
      j_max_age: formData.get('j_max_age'),
      j_degree_name: formData.get('j_degree_name'),
      j_institution: formData.get('j_institution'),
      j_skills: formData.get('j_skills'),
      
      // Step 3: Matching & Restrictions
      j_matching_strength: formData.get('j_matching_strength'),
      
      // Step 4: Contact Info
      j_contact_email: formData.get('j_contact_email'),
      j_contact_phone: formData.get('j_contact_phone'),
      
      // Reference IDs
      j_type_id: formData.get('j_type_id') || '',
      j_skills_id: formData.get('j_skills_id') || '',
      j_experience_id: formData.get('j_experience_id') || '',
      j_degree_type_id: formData.get('j_degree_type_id') || '',
      j_degree_level_id: formData.get('j_degree_level_id') || '',
      j_employment_status: formData.get('j_employment_status') || '1',
    };

    console.log('Received job data:', {
      title: jobData.j_title,
      salary_type: jobData.j_salary_type,
      has_image: !!jobData.j_image,
      deadline: jobData.j_deadline, 
      deadline_type: typeof jobData.j_deadline
    });

    // Validate required fields
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

    // Connect to database
    connection = await mysql.createConnection(dbConfig);

    // SALARY LOGIC
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

    console.log('Final salary:', finalSalary);

    // Prepare age range
    const ageRange = jobData.j_min_age && jobData.j_max_age 
      ? `${jobData.j_min_age}-${jobData.j_max_age} Years` 
      : "";

    // Safe parseInt function
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

    // Handle image file upload
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

    // Start transaction for job and approval insertion
    await connection.beginTransaction();

    try {
      // BOTH ADMIN AND RECRUITER GO FOR APPROVAL
      // For testing: Hardcode user info (replace with actual auth later)
      const current_user_id = 1; // TODO: Get from auth session
      const current_user_type = 1; // TODO: Get from auth session (1=admin, 3=recruiter)

      const j_status = 2; // Both admin and recruiter jobs go to Processing/Pending Approval

      // Determine who created the job
      let j_recruiter_id = null;
      let j_created_by = null;

      if (current_user_type === 3) {
        // Recruiter created job
        j_recruiter_id = current_user_id;
        j_created_by = 'recruiter';
      } else if (current_user_type === 1) {
        // Admin created job
        j_created_by = 'admin';
      }

      // Insert job into database with status 2 (Processing/Pending Approval)
      const [jobResult] = await connection.execute(`
        INSERT INTO jobs (
          j_title, j_date, j_deadline, j_category, j_location, j_company_name, j_company_type,
          j_vacancy, j_work_place, j_description, j_salary,
          j_gender, j_age, j_degree_name, j_institution, j_skills,
          j_matching_strength, j_type_id, j_skills_id, j_experience_id, 
          j_degree_type_id, j_degree_level_id, j_employment_status, j_status,
          j_image, j_recruiter_id, j_submitted_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
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
        j_recruiter_id
      ]);

      const jobId = jobResult.insertId;

      // Create approval record for BOTH admin and recruiter jobs
      await connection.execute(`
        INSERT INTO job_approvals (
          ja_job_id, ja_recruiter_id, ja_current_status, ja_submitted_at
        ) VALUES (?, ?, 2, NOW())
      `, [jobId, current_user_id]); // Use current_user_id for both cases

      // Commit transaction
      await connection.commit();

      const creatorType = current_user_type === 1 ? 'Admin' : 'Recruiter';
      
      return NextResponse.json({
        success: true,
        jobId: jobId,
        message: `${creatorType} job submitted for approval! It will be published after review.`,
        salary: finalSalary,
        hasImage: !!imageFilename,
        status: j_status,
        createdBy: creatorType.toLowerCase()
      });

    } catch (error) {
      // Rollback transaction if any error occurs
      await connection.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Database error in POST:', error);
    
    let errorMessage = 'Failed to create job';
    if (error.code === 'ER_BAD_FIELD_ERROR' && error.message.includes('j_recruiter_id')) {
      errorMessage = 'Database configuration error: Missing j_recruiter_id column. Please run: ALTER TABLE jobs ADD COLUMN j_recruiter_id INT NULL;';
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

export async function OPTIONS() {
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

export async function PATCH(request) {
  let connection;
  
  try {
    const { jobId, status } = await request.json();
    
    if (!jobId || status === undefined) {
      return NextResponse.json(
        { error: 'Job ID and status are required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      'UPDATE jobs SET j_status = ?, j_updated_at = NOW() WHERE j_id = ?',
      [status, jobId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Job ${status === 1 ? 'published' : 'unpublished'} successfully`
    });

  } catch (error) {
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

export async function DELETE(request) {
  let connection;
  
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('id');
    
    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      'DELETE FROM jobs WHERE j_id = ?',
      [jobId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}