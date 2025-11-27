import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import natural from "natural";
import sw from "stopword";

// Education mapping
const eduMap = {
  ssc: 1,
  hsc: 2,
  diploma: 2,
  bachelor: 3,
  masters: 4,
  phd: 5
};

// Extract keywords from job description
function extractKeywords(text) {
  const tokenizer = new natural.WordTokenizer();
  let words = tokenizer.tokenize(text.toLowerCase());
  words = sw.removeStopwords(words);
  return [...new Set(words.filter(w => w.length > 2))];
}

// Calculate keyword match percentage
function calculateKeywordMatch(cvText, jobKeywords) {
  const cvLower = cvText.toLowerCase();
  let matched = 0;
  
  jobKeywords.forEach(keyword => {
    if (cvLower.includes(keyword)) matched++;
  });
  
  return (matched / jobKeywords.length) * 100;
}

// Extract experience from CV
function extractExperience(cvText) {
  const expRegex = /(\d+)\s*(?:years|yrs|year).{0,20}(?:experience|exp)/gi;
  const matches = [...cvText.matchAll(expRegex)];
  if (matches.length === 0) return 0;
  return Math.max(...matches.map(m => parseInt(m[1])));
}

// Calculate experience match
function calculateExperienceMatch(cvExperience, jobMinExperience) {
  if (cvExperience >= jobMinExperience) return 100;
  return (cvExperience / jobMinExperience) * 100;
}

// Calculate education match
function calculateEducationMatch(cvText, jobEducationLevel) {
  const cvEduKey = Object.keys(eduMap).find(l => cvText.toLowerCase().includes(l)) || "ssc";
  const cvEduLevel = eduMap[cvEduKey];
  const jobLevel = eduMap[jobEducationLevel?.toLowerCase()] || 1;
  
  if (cvEduLevel >= jobLevel) return 100;
  return (cvEduLevel / jobLevel) * 100;
}

// Calculate skills match
function calculateSkillsMatch(cvText, jobSkills = []) {
  if (jobSkills.length === 0) return 0;
  
  const cvLower = cvText.toLowerCase();
  let matchedSkills = 0;
  
  jobSkills.forEach(skill => {
    if (cvLower.includes(skill.toLowerCase())) matchedSkills++;
  });
  
  return (matchedSkills / jobSkills.length) * 100;
}

// Main API Route
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const jobData = JSON.parse(formData.get("job"));

    if (!file || !jobData) {
      return NextResponse.json({ error: "Missing file or job data" }, { status: 400 });
    }

    // Parse CV PDF
    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    const cvText = pdfData.text;

    // Extract job keywords
    const jobKeywords = extractKeywords(jobData.jobDescription);
    
    // Extract job skills if provided
    const jobSkills = jobData.skills || [];
    
    // Calculate individual match percentages
    const keywordMatch = calculateKeywordMatch(cvText, jobKeywords);
    const cvExperience = extractExperience(cvText);
    const experienceMatch = calculateExperienceMatch(cvExperience, jobData.minExperience || 1);
    const educationMatch = calculateEducationMatch(cvText, jobData.educationLevel);
    const skillsMatch = calculateSkillsMatch(cvText, jobSkills);

    // Calculate weighted final score
    const finalScore = Math.round(
      (keywordMatch * 0.3) +
      (skillsMatch * 0.3) +
      (experienceMatch * 0.25) +
      (educationMatch * 0.15)
    );

    return NextResponse.json({ 
      score: finalScore,
      breakdown: {
        keywordMatch: Math.round(keywordMatch),
        skillsMatch: Math.round(skillsMatch),
        experienceMatch: Math.round(experienceMatch),
        educationMatch: Math.round(educationMatch)
      },
      details: {
        cvExperience,
        jobKeywords,
        matchedKeywords: jobKeywords.filter(keyword => cvText.toLowerCase().includes(keyword))
      }
    });

  } catch (error) {
    console.error('CV Matching error:', error);
    return NextResponse.json({ 
      error: 'Failed to process CV matching',
      details: error.message 
    }, { status: 500 });
  }
}