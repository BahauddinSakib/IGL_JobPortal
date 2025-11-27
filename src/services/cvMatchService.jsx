import natural from 'natural';
import sw from "stopword";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs-node";
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

// Education mapping - EXACTLY THE SAME AS YOUR API
const eduMap = {
  ssc: 1,
  hsc: 2,
  diploma: 2,
  bachelor: 3,
  masters: 4,
  phd: 5
};

// Function to read CV file with FULL PATH
async function getCVTextContent(cvFilename) {
  try {
    // FULL PATH to your CV files
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

// Extract skills dynamically from job description - EXACTLY THE SAME
function extractSkills(jobDescription) {
  const tokenizer = new natural.WordTokenizer();
  let words = tokenizer.tokenize(jobDescription.toLowerCase());
  words = sw.removeStopwords(words);
  const skills = [...new Set(words.filter(w => w.length > 2))];
  return skills;
}

// Match CV text against extracted skills - EXACTLY THE SAME
function matchSkills(cvText, jobSkills) {
  const cvLower = cvText.toLowerCase();
  let matched = 0;
  jobSkills.forEach(skill => {
    if (cvLower.includes(skill)) matched++;
  });
  return matched / jobSkills.length;
}

// Extract experience from CV - EXACTLY THE SAME
function extractExperience(cvText) {
  const expRegex = /(\d+)\s*(?:years|yrs|year).{0,20}(?:experience|exp)/gi;
  const matches = [...cvText.matchAll(expRegex)];
  if (matches.length === 0) return 0;
  return Math.max(...matches.map(m => parseInt(m[1])));
}

// Calculate education score - EXACTLY THE SAME
function calculateEducation(cvText, jobEduLevel) {
  const cvEduKey = Object.keys(eduMap).find(l => cvText.toLowerCase().includes(l)) || "ssc";
  const cvEduLevel = eduMap[cvEduKey];
  const jobLevel = eduMap[jobEduLevel?.toLowerCase()] || 1;
  return cvEduLevel >= jobLevel ? 1 : cvEduLevel / jobLevel;
}

// TF-IDF similarity - EXACTLY THE SAME
function tfidfSimilarity(cvText, jobDescription) {
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();
  tfidf.addDocument(jobDescription);
  tfidf.addDocument(cvText);

  let score = 0;
  tfidf.tfidfs(cvText, (i, measure) => {
    score += measure;
  });

  return Math.min(score / 5, 1);
}

// BERT similarity - EXACTLY THE SAME
async function bertSimilarity(cvText, jobDescription) {
  const model = await use.load();
  const embeddings = await model.embed([cvText, jobDescription]);
  const emb1 = embeddings.slice([0, 0], [1, -1]);
  const emb2 = embeddings.slice([1, 0], [1, -1]);
  const sim = tf.losses.cosineDistance(emb1, emb2, 1).dataSync()[0];
  return 1 - sim;
}

// Main function to calculate match score for an application
export async function calculateApplicationMatch(application, jobDetails) {
  try {
    // Check if CV exists
    if (!application.ja_cv) {
      return {
        score: 0,
        details: {
          skillScore: 0,
          expScore: 0,
          eduScore: 0,
          tfidfScore: 0,
          bertScore: 0,
          matchedKeywords: []
        }
      };
    }

    // Get CV text content from the file using FULL PATH
    const cvText = await getCVTextContent(application.ja_cv);

    // Extract skills dynamically - EXACTLY THE SAME AS YOUR API
    const extractedSkills = extractSkills(jobDetails.j_description || jobDetails.j_title);
    const skillScore = matchSkills(cvText, extractedSkills);

    // Calculate experience score - handle division by zero
    const expYears = extractExperience(cvText);
    const expScore = jobDetails.minExperience > 0 ? expYears / jobDetails.minExperience : 0;
    
    const eduScore = calculateEducation(cvText, jobDetails.educationLevel);
    const tfidfScore = tfidfSimilarity(cvText, jobDetails.j_description || jobDetails.j_title);
    const bertScore = await bertSimilarity(cvText, jobDetails.j_description || jobDetails.j_title);

    // Get matched keywords
    const matchedKeywords = extractedSkills.filter(skill => 
      cvText.toLowerCase().includes(skill.toLowerCase())
    );

    // Weighted final score - EXACTLY THE SAME WEIGHTS AS YOUR API
    const finalScore =
      skillScore * 0.4 +
      expScore * 0.15 +
      eduScore * 0.1 +
      tfidfScore * 0.15 +
      bertScore * 0.2;

    return {
      score: Math.round(finalScore * 100),
      details: {
        skillScore: Math.round(skillScore * 100),
        expScore: Math.round(expScore * 100),
        eduScore: Math.round(eduScore * 100),
        tfidfScore: Math.round(tfidfScore * 100),
        bertScore: Math.round(bertScore * 100),
        matchedKeywords
      }
    };
  } catch (error) {
    console.error('Error calculating CV match:', error);
    return {
      score: 0,
      details: {
        skillScore: 0,
        expScore: 0,
        eduScore: 0,
        tfidfScore: 0,
        bertScore: 0,
        matchedKeywords: [],
        error: error.message
      }
    };
  }
}