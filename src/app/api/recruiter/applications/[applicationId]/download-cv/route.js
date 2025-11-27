import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Use this for both GET and POST requests
export async function GET(request, { params }) {
  try {
    const { applicationId } = params;
    
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch application details from database
    const application = await getApplicationById(applicationId, token);
    
    if (!application || !application.ja_cv) {
      return NextResponse.json({ error: 'CV not found' }, { status: 404 });
    }

    // Define the path to the CV file
    const cvPath = path.join(process.cwd(), 'public', 'applicantsCV', application.ja_cv);
    
    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      return NextResponse.json({ error: 'CV file not found' }, { status: 404 });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(cvPath);
    
    // Return the file as a download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${application.ja_cv}"`,
      },
    });
  } catch (error) {
    console.error('Error downloading CV:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { applicationId } = params;
    const { originalFilename } = await request.json();

    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Define paths
    const sourceDir = path.join(process.cwd(), 'public', 'applicantsCV');
    const targetDir = path.join(process.cwd(), 'public', 'downloadedCV');
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const sourcePath = path.join(sourceDir, originalFilename);
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    
    // Generate new filename: yearMonthDateId.pdf
    const fileExtension = path.extname(originalFilename);
    const newFilename = `${year}${month}${date}${applicationId}${fileExtension}`;
    const targetPath = path.join(targetDir, newFilename);

    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      return NextResponse.json({ error: 'Source CV file not found' }, { status: 404 });
    }

    // Copy file to target directory
    fs.copyFileSync(sourcePath, targetPath);

    return NextResponse.json({
      success: true,
      filename: newFilename,
      filePath: targetPath,
      message: 'CV saved successfully to server folder'
    });

  } catch (error) {
    console.error('Error saving CV:', error);
    return NextResponse.json({ 
      error: 'Failed to save CV to server',
      details: error.message 
    }, { status: 500 });
  }
}

// Actual database query function
async function getApplicationById(applicationId, token) {
  try {
    // Replace this with your actual API call to get application details
    const response = await fetch(`http://localhost:3000/api/recruiter/applications/${applicationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.application; // Adjust based on your API response structure
    }
    return null;
  } catch (error) {
    console.error('Error fetching application:', error);
    return null;
  }
}