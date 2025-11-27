import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request, { params }) {
  try {
    const { applicationId } = params;
    const { originalFilename } = await request.json();

    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Define paths - adjust the target path as needed
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
      message: 'CV saved successfully.'
    });

  } catch (error) {
    console.error('Error saving CV:', error);
    return NextResponse.json({ 
      error: 'Failed to save CV to server',
      details: error.message 
    }, { status: 500 });
  }
}