import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

export async function getCVTextContent(cvFilename) {
  try {
    // Use the exact path you provided
    const uploadsPath = 'F:/Sakib File/JobPost/Jobnova/Jobnova_NextJs/public/applicantsCV';
    const filePath = path.join(uploadsPath, cvFilename);
    
    console.log('Looking for CV file at:', filePath);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`CV file not found: ${cvFilename} at path: ${filePath}`);
    }
    
    // Read file as buffer
    const fileBuffer = fs.readFileSync(filePath);
    
    // Parse PDF
    const pdfData = await pdfParse(fileBuffer);
    return pdfData.text;
  } catch (error) {
    console.error('Error reading CV file:', error);
    throw error;
  }
}