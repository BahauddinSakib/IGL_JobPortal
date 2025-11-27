"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobDashboard = () => {
  const [activeTab, setActiveTab] = useState('1'); // 1: Published, 2: Processing, 3: Draft, 4: Rejected
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tabCounts, setTabCounts] = useState({
    '1': 0, // Published
    '2': 0, // Processing  
    '3': 0, // Draft
    '4': 0  // Rejected
  });

  // Status configuration
  const statusConfig = {
    1: { label: 'Published', badge: 'bg-success', tab: 'Published' },
    2: { label: 'Processing', badge: 'bg-warning text-dark', tab: 'Processing' },
    3: { label: 'Draft', badge: 'bg-secondary', tab: 'Draft' },
    4: { label: 'Rejected', badge: 'bg-danger', tab: 'Rejected' }
  };

  // Function to get dynamic status based on deadline and pause status
  const getDynamicStatus = (job) => {
    if (job.j_status === 1) { // Published job
      // Check if job is paused
      if (job.j_is_paused) {
        return { label: 'Paused', badge: 'bg-warning text-dark', icon: 'fa-pause' };
      }
      
      if (job.j_deadline && new Date(job.j_deadline) < new Date()) {
        // Only show expired if deadline has passed (not including today)
        const today = new Date();
        const deadline = new Date(job.j_deadline);
        
        // Set both dates to midnight for accurate day comparison
        today.setHours(0, 0, 0, 0);
        deadline.setHours(0, 0, 0, 0);
        
        // Only show expired if deadline is before today (not equal to today)
        if (deadline < today) {
          return { label: 'Expired', badge: 'bg-danger', icon: 'fa-clock' };
        } else {
          return { label: 'Live', badge: 'bg-success', icon: 'fa-clock' };
        }
      } else {
        return { label: 'Live', badge: 'bg-success', icon: 'fa-clock' };
      }
    }
    return { ...statusConfig[job.j_status], icon: 'fa-info-circle' };
  };

  // Get days remaining until deadline
  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    
    // Set both dates to midnight for accurate day calculation
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Get auth token (adjust based on your auth storage)
  const getAuthToken = () => {
    return localStorage.getItem('token'); // or from context/state
  };

  // Fetch jobs based on status
  const fetchJobs = async (status) => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch(`/api/recruiter/jobs?status=${status}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Fetch application counts for each job
        const jobsWithApplications = await Promise.all(
          (data.jobs || []).map(async (job) => {
            try {
              const applicationCount = await fetchApplicationCount(job.j_id);
              return {
                ...job,
                applicationCount: applicationCount
              };
            } catch (error) {
              console.error(`Error fetching application count for job ${job.j_id}:`, error);
              return {
                ...job,
                applicationCount: 0
              };
            }
          })
        );
        setJobs(jobsWithApplications);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch job counts for all statuses
  const fetchJobCounts = async () => {
    try {
      const token = getAuthToken();
      const counts = {};
      
      for (const status of [1, 2, 3, 4]) {
        const response = await fetch(`/api/recruiter/jobs?status=${status}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          counts[status] = data.jobs?.length || 0;
        } else {
          counts[status] = 0;
        }
      }
      
      setTabCounts(counts);
    } catch (error) {
      console.error('Error fetching job counts:', error);
    }
  };

  // Fetch application count for a specific job
  const fetchApplicationCount = async (jobId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/recruiter/applications/count?jobId=${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.count || 0;
      }
      return 0;
    } catch (error) {
      console.error('Error fetching application count:', error);
      return 0;
    }
  };

  // Toggle job pause status
// Toggle job pause status - UPDATED
const toggleJobPause = async (jobId, currentStatus) => {
  try {
    const token = getAuthToken();
    const newPausedStatus = !currentStatus;

    console.log('Updating job pause status:', { jobId, newPausedStatus });

    const response = await fetch(`/api/recruiter/jobs/${jobId}`, {  // Changed endpoint
      method: 'PUT',  // Using PUT method
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        isPaused: newPausedStatus
      })
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      // Update the local state immediately
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.j_id === parseInt(jobId) 
            ? { ...job, j_is_paused: newPausedStatus ? 1 : 0 }
            : job
        )
      );
      
      console.log(`Job ${newPausedStatus ? 'paused' : 'resumed'} successfully`);
    } else {
      console.error('Failed to update job status:', data.error);
      alert(data.error || 'Failed to update job status');
    }
  } catch (error) {
    console.error('Error updating job status:', error);
    alert('Error updating job status. Please try again.');
  }
};


// Update job deadline
const updateJobDeadline = async (jobId, newDeadline) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`/api/recruiter/jobs/${jobId}/deadline`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        deadline: newDeadline
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      // Close the modal first
      setShowEditModal(false);
      
      // Then refresh the jobs list
      fetchJobs(activeTab);
      
      // Optional: Show success message
      console.log('Deadline updated successfully');
      return true;
    } else {
      console.error('Failed to update job deadline:', data.error);
      alert(data.error || 'Failed to update deadline');
      return false;
    }
  } catch (error) {
    console.error('Error updating job deadline:', error);
    alert('Error updating deadline. Please try again.');
    return false;
  }
};


  useEffect(() => {
    fetchJobs(activeTab);
    fetchJobCounts();
  }, [activeTab]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEmploymentType = (status) => {
    const types = {
      1: "Full-time",
      2: "Part-time", 
      3: "Contractual",
      4: "Intern",
      5: "Freelance"
    };
    return types[status] || "Full-time";
  };

  const getGender = (gender) => {
    const genders = {
      1: "Male",
      2: "Female", 
      3: "Both"
    };
    return genders[gender] || "Both";
  };

  // Format skills with proper bullet points based on punctuation and spacing
  const formatSkills = (skills) => {
    if (!skills) return ['Not specified'];
    
    // Split by periods followed by space (proper sentence endings) or multiple spaces
    const skillList = skills.split(/(?<=\.)\s+|\s{2,}/)
      .map(skill => skill.trim())
      .filter(skill => {
        // Remove empty strings and very short fragments
        return skill.length > 0 && skill !== '.' && skill !== '..';
      })
      .map(skill => {
        // Clean up each skill - remove leading/trailing punctuation but keep internal punctuation
        return skill
          .replace(/^[.,;!?]\s*/, '') // Remove leading punctuation
          .replace(/\s*[.,;!?]$/, '') // Remove trailing punctuation
          .trim();
      })
      .filter(skill => skill.length > 0);
    
    return skillList.length > 0 ? skillList : ['Not specified'];
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowDetailsModal(true);
  };

  const handleViewComments = (job) => {
    setSelectedJob(job);
    setShowCommentsModal(true);
  };

  const handleEditDeadline = (job) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };

  // Render jobs as cards for published status (tab 1)
  const renderJobCards = () => {
    return (
      <div className="row">
        {jobs.map((job) => {
          const dynamicStatus = getDynamicStatus(job);
          const daysRemaining = getDaysRemaining(job.j_deadline);
          
          return (
            <div key={job.j_id} className="col-12 mb-3">
              <div className="card border-0 shadow-sm rounded-2">
                <div className="card-body p-3">
                  {/* Header Section */}
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h5 className="card-title fw-bold text-dark mb-0">{job.j_title}</h5>
                        <div className="d-flex align-items-center gap-1">
                          <div className="dropdown">
                            <button 
                              className={`btn badge rounded-pill ${dynamicStatus.badge} fs-7 py-1 px-2 dropdown-toggle d-flex align-items-center gap-1`}
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              <i className={`fas ${dynamicStatus.icon} fs-8`}></i>
                              {dynamicStatus.label}
                              {dynamicStatus.label === 'Live' && job.j_deadline && (
                                <span className="ms-1 fs-8 opacity-90">
                                  ({daysRemaining > 0 ? `${daysRemaining}d left` : 'Today'})
                                </span>
                              )}
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => toggleJobPause(job.j_id, job.j_is_paused)}
                                >
                                  <i className={`fas ${job.j_is_paused ? 'fa-play' : 'fa-pause'} me-2`}></i>
                                  {job.j_is_paused ? 'Resume Job' : 'Pause Job'}
                                </button>
                              </li>
                            </ul>
                          </div>
                          {/* Calendar Icon for Live jobs - UPDATED: Only calendar icon */}
                          {dynamicStatus.label === 'Live' && (
                            <button 
                              className="btn btn-outline-secondary btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center"
                              style={{ width: '28px', height: '28px' }}
                              onClick={() => handleEditDeadline(job)}
                              title="Edit Deadline"
                            >
                              <i className="fas fa-calendar-alt fs-8"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-3 align-items-center">
                        <span className="d-flex align-items-center text-muted fs-7">
                          <i className="fas fa-building me-1 text-primary"></i>
                          {job.j_company_name}
                        </span>
                        <span className="d-flex align-items-center text-muted fs-7">
                          <i className="fas fa-map-marker-alt me-1 text-success"></i>
                          {job.j_location}
                        </span>
                        <span className="d-flex align-items-center text-muted fs-7">
                          <i className="fas fa-briefcase me-1 text-warning"></i>
                          {getEmploymentType(job.j_employment_status)}
                        </span>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-light rounded-circle p-1" type="button" data-bs-toggle="dropdown">
                        <i className="fas fa-ellipsis-v fs-7"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button className="dropdown-item" onClick={() => handleViewJob(job)}>
                            <i className="fas fa-eye me-2 text-primary"></i>View Details
                          </button>
                        </li>
                        <li>
                          <Link href={`/recruiter/jobs/${job.j_id}/applications`} className="dropdown-item">
                            <i className="fas fa-users me-2 text-success"></i>View Applications
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Description & Stats Row */}
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <div className="mb-2">
                        <span className="badge bg-light text-dark border rounded-pill px-2 py-1 mb-1 fs-7">
                          <i className="fas fa-tag me-1 text-info"></i>
                          {job.j_category}
                        </span>
                        <p className="text-muted mb-0 fs-7">
                          {job.j_description ? 
                            (job.j_description.length > 120 ? 
                              `${job.j_description.substring(0, 120)}...` : 
                              job.j_description) 
                            : 'No description provided'}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Statistics Cards - UPDATED: Removed vacancies card */}
                      <div className="row g-1 mb-2">
                        <div className="col-12">
                          <div className="bg-success bg-opacity-90 text-white rounded-1 p-1 text-center shadow-sm">
                            <div className="fw-bold fs-6">{job.applicationCount || 0}</div>
                            <small className="fw-bold opacity-90 fs-8">Applications</small>
                          </div>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="bg-light rounded-1 p-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted fs-8">Posted:</small>
                          <small className="fw-semibold text-dark fs-8">{formatDate(job.j_created_at)}</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted fs-8">Deadline:</small>
                          <small className={`fw-semibold fs-8 ${new Date(job.j_deadline) < new Date() ? 'text-danger' : 'text-success'}`}>
                            {formatDate(job.j_deadline)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="row mt-2 pt-2 border-top">
                    <div className="col-6">
                      <button 
                        className="btn btn-primary w-100 fw-semibold py-1 rounded-1 fs-7"
                        onClick={() => handleViewJob(job)}
                      >
                        <i className="fas fa-eye me-1"></i>
                        View Details
                      </button>
                    </div>
                    <div className="col-6">
                      <Link href={`/recruiter/jobs/${job.j_id}/applications`} className="w-100">
                        <button className="btn btn-outline-success w-100 fw-semibold py-1 rounded-1 fs-7">
                          <i className="fas fa-users me-1"></i>
                          Applications
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render jobs as table for other statuses
  const renderJobTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="ps-4">Job Title</th>
              <th scope="col">Company</th>
              <th scope="col">Category</th>
              <th scope="col">Location</th>
              <th scope="col">Employment Type</th>
              <th scope="col">Status</th>
              <th scope="col">Posted Date</th>
              <th scope="col">Deadline</th>
              <th scope="col">Vacancy</th>
              <th scope="col" className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.j_id}>
                <td className="ps-4">
                  <div className="fw-semibold text-dark">{job.j_title}</div>
                </td>
                <td>
                  <span className="text-dark">{job.j_company_name}</span>
                </td>
                <td>
                  <span className="text-dark">{job.j_category}</span>
                </td>
                <td>
                  <span className="text-dark">{job.j_location}</span>
                </td>
                <td>
                  <span className="text-dark">{getEmploymentType(job.j_employment_status)}</span>
                </td>
                <td>
                  <span className={`badge ${statusConfig[job.j_status]?.badge || 'bg-secondary'} py-2 px-3`}>
                    {statusConfig[job.j_status]?.label || 'Unknown'}
                  </span>
                </td>
                <td>
                  <span className="text-dark">{formatDate(job.j_created_at)}</span>
                </td>
                <td>
                  <span className="text-dark">
                    {job.j_deadline ? formatDate(job.j_deadline) : 'N/A'}
                  </span>
                </td>
                <td>
                  <span className="text-dark">{job.j_vacancy}</span>
                </td>
                <td className="text-end pe-4">
                  <div className="d-flex gap-2 justify-content-end">
                    {job.j_status === 3 && (
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-edit me-1"></i>
                        Edit
                      </button>
                    )}
                    {job.j_status === 4 && job.ja_review_comments && (
                      <button 
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleViewComments(job)}
                      >
                        <i className="fas fa-comment me-1"></i>
                        View Comments
                      </button>
                    )}
                    <button 
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => handleViewJob(job)}
                    >
                      <i className="fas fa-eye me-1"></i>
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="mb-3 mb-md-0">
                <h1 className="h2 fw-bold text-dark mb-1">Job Dashboard</h1>
                <p className="text-dark mb-0">Manage your job postings</p>
              </div>
              
              <Link href="/recruiter/jobs/create-job">
                <button className="btn btn-success fw-semibold d-flex align-items-center gap-2 py-2 px-3">
                  <i className="fas fa-plus"></i>
                  Post New Job
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="card mb-4">
          <div className="card-body py-3">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
              
              {/* Tabs */}
              <div className="btn-group bg-light rounded p-1" role="group">
                {[1, 2, 3, 4].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`btn fw-semibold border-0 ${
                      activeTab === status.toString() 
                        ? 'btn-dark text-white' 
                        : 'btn-light text-dark'
                    }`}
                    onClick={() => setActiveTab(status.toString())}
                    style={{
                      backgroundColor: activeTab === status.toString() ? '#1f2937' : '',
                      color: activeTab === status.toString() ? 'white' : '#374151',
                      padding: '8px 16px',
                      fontSize: '14px'
                    }}
                  >
                    {statusConfig[status].tab} ({tabCounts[status] || 0})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Content */}
        <div className="card">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : jobs.length > 0 ? (
              <div className={activeTab === '1' ? 'p-4' : 'p-0'}>
                {activeTab === '1' ? renderJobCards() : renderJobTable()}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="mb-4">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" 
                       style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-briefcase fa-2x text-dark"></i>
                  </div>
                </div>
                <h3 className="h4 fw-bold text-dark mb-2">
                  No {statusConfig[parseInt(activeTab)]?.tab.toLowerCase() || ''} jobs found
                </h3>
                <p className="text-dark mb-4">
                  {activeTab === '1' && "You haven't published any jobs yet. Start by creating a new job posting."}
                  {activeTab === '2' && "There are no jobs currently being processed. All your submitted jobs have been reviewed."}
                  {activeTab === '3' && "You don't have any drafted jobs. Start creating a job to save as draft."}
                  {activeTab === '4' && "You don't have any rejected jobs. Great job!"}
                </p>
                <Link href="/recruiter/jobs/create-job">
                  <button className="btn btn-primary fw-semibold py-2 px-4">
                    Create New Job
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Job Details Modal */}
        {showDetailsModal && selectedJob && (
          <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Job Details</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Basic Information</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="text-dark" style={{width: '140px'}}><strong>Job Title:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_title}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Company:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_company_name}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Category:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_category}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Location:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_location}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Vacancy:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_vacancy}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Employment Type:</strong></td>
                            <td className="fw-medium text-dark">{getEmploymentType(selectedJob.j_employment_status)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Additional Information</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="text-dark"><strong>Company Type:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_company_type}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Salary:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_salary || 'Negotiable'}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Workplace:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_work_place === 1 ? "From Office" : "From Home"}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Posted Date:</strong></td>
                            <td className="fw-medium text-dark">{formatDate(selectedJob.j_created_at)}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Deadline:</strong></td>
                            <td className="fw-medium text-dark">{formatDate(selectedJob.j_deadline)}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Status:</strong></td>
                            <td>
                              <span className={`badge ${getDynamicStatus(selectedJob).badge}`}>
                                <i className={`fas ${getDynamicStatus(selectedJob).icon} me-1`}></i>
                                {getDynamicStatus(selectedJob).label}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Requirements Section */}
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Job Requirements</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="text-dark" style={{width: '140px'}}><strong>Gender:</strong></td>
                            <td className="fw-medium text-dark">{getGender(selectedJob.j_gender)}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Age Range:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_age || 'Not specified'}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Education:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_degree_name || 'Not specified'}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Institution:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_institution || 'Not specified'}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Experience:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_experience_id || 'Not specified'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Contact Information</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="text-dark" style={{width: '140px'}}><strong>Contact Email:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_contact_email || 'Not provided'}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Contact Phone:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_contact_phone || 'Not provided'}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Matching Strength:</strong></td>
                            <td className="fw-medium text-dark">{selectedJob.j_matching_strength || 'Not specified'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Skills Section with Bullet Points */}
                  <div className="row mt-4">
                    <div className="col-12">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Required Skills</h6>
                      <div className="bg-light rounded p-3">
                        {formatSkills(selectedJob.j_skills).map((skill, index) => (
                          <div key={index} className="d-flex align-items-start mb-1">
                            <span className="text-dark me-2">•</span>
                            <span className="text-dark">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="row mt-4">
                    <div className="col-12">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Job Description</h6>
                      <div className="bg-light rounded p-3">
                        <p className="mb-0 text-dark">{selectedJob.j_description || 'No description provided.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comments Modal */}
        {showCommentsModal && selectedJob && (
          <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Review Comments</h5>
                  <button type="button" className="btn-close" onClick={() => setShowCommentsModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <p className="fw-semibold text-dark">Job: {selectedJob.j_title}</p>
                    <p className="fw-semibold text-dark">Company: {selectedJob.j_company_name}</p>
                  </div>
                  <div className="border rounded p-3 bg-light">
                    <h6 className="fw-bold mb-3 text-dark">Review Comments:</h6>
                    <p className="mb-0 text-dark">{selectedJob.ja_review_comments}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCommentsModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

{/* Edit Deadline Modal */}
{showEditModal && selectedJob && (
  <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={() => setShowEditModal(false)}>
    <div className="modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header py-2">
          <h6 className="modal-title fw-bold mb-0">Select Deadline</h6>
          <button type="button" className="btn-close btn-close-sm" onClick={() => setShowEditModal(false)}></button>
        </div>
        <div className="modal-body p-0">
          <input 
            type="date" 
            className="form-control border-0" 
            id="deadline"
            min={new Date().toISOString().split('T')[0]}
            max={selectedJob.j_deadline ? selectedJob.j_deadline.split('T')[0] : ''}
            defaultValue={selectedJob.j_deadline ? selectedJob.j_deadline.split('T')[0] : ''}
            autoFocus
            onFocus={(e) => e.target.showPicker()}
            style={{ 
              cursor: 'pointer',
              fontSize: '16px',
              padding: '12px'
            }}
          />
        </div>
        <div className="modal-footer py-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowEditModal(false)}>
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-primary btn-sm"
            onClick={async () => {
              const newDeadline = document.getElementById('deadline').value;
              if (newDeadline) {
                const success = await updateJobDeadline(selectedJob.j_id, newDeadline);
              }
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default JobDashboard;