// src/models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Job title is required'] 
  },
  company: { 
    type: String, 
    required: [true, 'Company name is required'] 
  },
  description: String,
  requirements: [String],
  responsibilities: [String],
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  },
  location: String,
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    default: 'full-time'
  },
  status: { 
    type: String, 
    enum: ['draft', 'processing', 'published', 'rejected'],
    default: 'draft'
  },
  postedDate: { type: Date, default: Date.now },
  deadline: Date,
  serviceType: {
    type: String,
    enum: ['premium', 'standard', 'basic'],
    default: 'standard'
  },
  recruiterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  adminReviewerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  reviewComments: String,
  reviewedAt: Date,
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Index for better query performance
jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ recruiterId: 1, status: 1 });

export default mongoose.models.Job || mongoose.model('Job', jobSchema);