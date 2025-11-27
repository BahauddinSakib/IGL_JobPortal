import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { stat } from 'fs/promises';

export async function GET(request, { params }) {
  try {
    const { path: imagePath } = params;
    const filename = imagePath[0];
    
    // Path where your images are stored
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'jobs');
    const filePath = path.join(uploadDir, filename);

    // Check if file exists
    try {
      await stat(filePath);
    } catch (error) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Read and serve the image
    const imageBuffer = await readFile(filePath);
    
    // Get file extension for content type
    const ext = path.extname(filename).toLowerCase();
    const contentTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    };
    const contentType = contentTypes[ext] || 'image/png';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
  }
}