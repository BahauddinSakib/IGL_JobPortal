// src/app/(admin)/admin/job-review/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminJobReview = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // ADD THIS
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is admin
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check-admin');
      const data = await response.json();
      
      if (!data.isAdmin) {
        // showToast('Access Denied: Admin privileges required', 'error');
        setIsAdmin(false);
        setAuthChecked(true);
        return;
      }
      
      setIsAdmin(true); // SET THIS
      setAuthChecked(true);
      fetchJobs();
      fetchStats();
    } catch (error) {
      console.error('Auth check failed:', error);
      showToast('Authentication failed', 'error');
      setIsAdmin(false);
      setAuthChecked(true);
    }
  };

  // Toast function
  const showToast = (message, type = 'info') => {
    // Remove any existing toast
    const existingToast = document.getElementById('custom-toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.className = `position-fixed top-0 end-0 p-3 ${getToastClass(type)}`;
    toast.style.zIndex = '9999';
    toast.innerHTML = `
      <div class="toast show" role="alert">
        <div class="toast-header">
          <strong class="me-auto">${getToastTitle(type)}</strong>
          <button type="button" class="btn-close" onclick="this.closest('#custom-toast').remove()"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 3000);
  };

  const getToastClass = (type) => {
    switch (type) {
      case 'error': return 'text-bg-danger';
      case 'success': return 'text-bg-success';
      case 'warning': return 'text-bg-warning';
      default: return 'text-bg-info';
    }
  };

  const getToastTitle = (type) => {
    switch (type) {
      case 'error': return 'Error';
      case 'success': return 'Success';
      case 'warning': return 'Warning';
      default: return 'Info';
    }
  };

  // Only fetch data after auth check and if admin
  useEffect(() => {
    if (authChecked && isAdmin) {
      fetchJobs();
      fetchStats();
    }
  }, [activeTab, authChecked, isAdmin]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/job-approvals?status=${activeTab}`);
      
      if (response.status === 403) {
        showToast('Access Denied: Admin privileges required', 'error');
        return;
      }
      
      const data = await response.json();
      setJobs(data.jobs || []);
      setFilteredJobs(data.jobs || []);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      showToast('Failed to load jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/auth/job-approvals/summary');
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      showToast('Failed to load statistics', 'error');
    }
  };

  // Filter jobs based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job => 
        job.j_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.j_company_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
    setCurrentPage(1);
  }, [jobs, searchTerm]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleJobAction = async (jobId, action, comments = '') => {
    try {
      const response = await fetch(`/api/auth/job-approvals/${jobId}/decision`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          comments
        })
      });
      
      if (response.ok) {
        showToast(`Job ${action}d successfully`, 'success');
        fetchJobs();
        fetchStats();
      } else if (response.status === 403) {
        showToast('Access Denied: Admin privileges required', 'error');
      } else {
        showToast('Failed to update job status', 'error');
      }
    } catch (error) {
      console.error('Error reviewing job:', error);
      showToast('Error processing request', 'error');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (!isAdmin) {
    return (
      <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="text-danger mb-3">
            <i className="fas fa-ban fa-3x"></i>
          </div>
          <h3 className="text-danger mb-2">Access Denied</h3>
          <p className="text-muted">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  // Only show the dashboard if user is admin
  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 fw-bold text-dark mb-1">Job Review Management</h1>
                <p className="text-muted mb-0">Manage and review job postings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body py-3">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
              
              {/* Tabs */}
              <div className="btn-group bg-light rounded p-1" role="group">
                <button
                  type="button"
                  className={`btn fw-semibold border-0 ${
                    activeTab === 'pending' ? 'btn-primary text-white' : 'btn-light text-dark'
                  }`}
                  onClick={() => setActiveTab('pending')}
                >
                  Pending ({stats.pending})
                </button>
                <button
                  type="button"
                  className={`btn fw-semibold border-0 ${
                    activeTab === 'approved' ? 'btn-success text-white' : 'btn-light text-dark'
                  }`}
                  onClick={() => setActiveTab('approved')}
                >
                  Approved ({stats.approved})
                </button>
                <button
                  type="button"
                  className={`btn fw-semibold border-0 ${
                    activeTab === 'rejected' ? 'btn-danger text-white' : 'btn-light text-dark'
                  }`}
                  onClick={() => setActiveTab('rejected')}
                >
                  Rejected ({stats.rejected})
                </button>
              </div>

              {/* Filters */}
              <div className="d-flex flex-column flex-sm-row gap-2 align-items-center">
                <select 
                  className="form-select border-0 shadow-sm"
                  style={{ minWidth: '160px', height: '42px', fontSize: '14px' }}
                >
                  <option value="">All Recruiters</option>
                </select>

                <div className="input-group mt-3" style={{ minWidth: '250px' }}>
                  <span className="input-group-text bg-white border-0">
                    <i className=" text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 shadow-sm"
                    placeholder="Search by Job Title or Company..."
                    style={{ height: '42px', fontSize: '14px' }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-2">Loading jobs...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="ps-4 fw-semibold text-dark">Job Title</th>
                        <th scope="col" className="fw-semibold text-dark">Company</th>
                        <th scope="col" className="fw-semibold text-dark">Category</th>
                        <th scope="col" className="fw-semibold text-dark">Location</th>
                        <th scope="col" className="fw-semibold text-dark">Vacancy</th>
                        <th scope="col" className="fw-semibold text-dark">Type</th>
                        <th scope="col" className="fw-semibold text-dark">Salary</th>
                        <th scope="col" className="fw-semibold text-dark">Deadline</th>
                        <th scope="col" className="fw-semibold text-dark">Submitted</th>
                        <th scope="col" className="fw-semibold text-dark">Status</th>
                        <th scope="col" className="text-end pe-4 fw-semibold text-dark">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentJobs.map((job) => (
                        <JobTableRow 
                          key={job.j_id} 
                          job={job} 
                          onJobAction={handleJobAction}
                          showActions={activeTab === 'pending'}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-between align-items-center p-3 border-top">
                    <div className="text-muted">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredJobs.length)} of {filteredJobs.length} entries
                    </div>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`btn btn-sm ${
                            currentPage === page ? 'btn-primary' : 'btn-outline-primary'
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="fas fa-clipboard-list fa-4x text-muted opacity-50"></i>
                </div>
                <h3 className="h4 fw-bold text-dark mb-2">
                  {searchTerm ? 'No matching jobs found' : `No ${activeTab} jobs found`}
                </h3>
                <p className="text-muted mb-4">
                  {searchTerm 
                    ? `No jobs found matching "${searchTerm}" in Job Title or Company Name`
                    : activeTab === 'pending' && "All jobs have been reviewed. Great work!"}
                  {activeTab === 'approved' && "No approved jobs yet."}
                  {activeTab === 'rejected' && "No rejected jobs found."}
                </p>
                {searchTerm && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Job Table Row Component
const JobTableRow = ({ job, onJobAction, showActions }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const handleApprove = () => {
    if (confirm(`Approve job: ${job.j_title}?`)) {
      onJobAction(job.j_id, 'approve');
    }
  };

  const handleReject = () => {
    if (rejectReason.trim()) {
      onJobAction(job.j_id, 'reject', rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if deadline has passed
  const isDeadlinePassed = (deadlineString) => {
    if (!deadlineString) return false;
    const deadline = new Date(deadlineString);
    const today = new Date();
    // Set both dates to midnight for accurate comparison
    deadline.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return deadline < today;
  };

  // Get deadline display text
  const getDeadlineDisplay = (deadlineString) => {
    if (!deadlineString) return 'N/A';
    
    if (isDeadlinePassed(deadlineString)) {
      return (
        <span className="text-danger fw-semibold">Deadline passed</span>
      );
    }
    
    return formatDate(deadlineString);
  };

  // Get status badge configuration
  const getStatusBadge = (status) => {
    const statusConfig = {
      1: { label: 'Approved', class: 'bg-success' },
      2: { label: 'Pending', class: 'bg-warning text-dark' },
      3: { label: 'Draft', class: 'bg-secondary' },
      4: { label: 'Rejected', class: 'bg-danger' }
    };
    return statusConfig[status] || { label: 'Unknown', class: 'bg-dark' };
  };

  const statusInfo = getStatusBadge(job.j_status || job.ja_current_status);

  // Get employment type
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

  // Get reviewer name
  const getReviewerName = () => {
    if (job.admin_first_name && job.admin_last_name) {
      return `${job.admin_first_name} ${job.admin_last_name}`;
    } else if (job.ja_admin_reviewer_id) {
      return `Admin #${job.ja_admin_reviewer_id}`;
    }
    return 'N/A';
  };

  return (
    <>
      <tr className="border-bottom">
        <td className="ps-4">
          <div className="fw-semibold text-dark">{job.j_title}</div>
        </td>
        <td>
          <div className="text-dark">{job.j_company_name}</div>
        </td>
        <td>
          <span className="text-dark">{job.j_category}</span>
        </td>
        <td>
          <span className="text-dark">{job.j_location}</span>
        </td>
        <td>
          <span className="text-dark">{job.j_vacancy}</span>
        </td>
        <td>
          <span className="text-dark">{getEmploymentType(job.j_employment_status)}</span>
        </td>
        <td>
          <span className="text-dark">{job.j_salary || 'Negotiable'}</span>
        </td>
        <td>
          <span className="text-dark">{getDeadlineDisplay(job.j_deadline)}</span>
        </td>
        <td>
          <span className="text-muted">{formatDate(job.ja_submitted_at)}</span>
        </td>
        <td>
          <span className={`badge ${statusInfo.class} py-2 px-3`}>
            {statusInfo.label}
          </span>
        </td>
        <td className="text-end pe-4">
          <div className="d-flex gap-2 justify-content-end">
            {/* View Details Button */}
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowDetailsModal(true)}
              title="View Details"
            >
              <i className="fas fa-eye"></i>
            </button>
            
            {/* Action Buttons - Only show for pending jobs */}
            {showActions && (
              <>
                <button 
                  className="btn btn-success btn-sm"
                  onClick={handleApprove}
                  title="Approve Job"
                >
                  <i className="fas fa-check"></i>
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => setShowRejectModal(true)}
                  title="Reject Job"
                >
                  <i className="fas fa-times"></i>
                </button>
              </>
            )}
            
            {/* View Comments for reviewed jobs */}
            {(job.ja_current_status === 1 || job.ja_current_status === 4) && job.ja_review_comments && (
              <button 
                className="btn btn-outline-info btn-sm"
                onClick={() => setShowCommentsModal(true)}
                title="View Review Comments"
              >
                <i className="fas fa-comment"></i>
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Job Details Modal */}
      {showDetailsModal && (
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
                          <td className="text-muted" style={{width: '140px'}}>Job Title:</td>
                          <td className="fw-medium">{job.j_title}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Company:</td>
                          <td className="fw-medium">{job.j_company_name}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Category:</td>
                          <td className="fw-medium">{job.j_category}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Location:</td>
                          <td className="fw-medium">{job.j_location}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Vacancy:</td>
                          <td className="fw-medium">{job.j_vacancy}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Employment Type:</td>
                          <td className="fw-medium">{getEmploymentType(job.j_employment_status)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold border-bottom pb-2 mb-3">Additional Information</h6>
                    <table className="table table-sm table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-muted">Company Type:</td>
                          <td className="fw-medium">{job.j_company_type}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Salary:</td>
                          <td className="fw-medium">{job.j_salary || 'Negotiable'}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Workplace:</td>
                          <td className="fw-medium">{job.j_work_place === 1 ? "From Office" : "From Home"}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Submitted:</td>
                          <td className="fw-medium">{formatDate(job.ja_submitted_at)}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Deadline:</td>
                          <td className="fw-medium">{getDeadlineDisplay(job.j_deadline)}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Status:</td>
                          <td>
                            <span className={`badge ${statusInfo.class}`}>
                              {statusInfo.label}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="row mt-4">
                  <div className="col-12">
                    <h6 className="fw-bold border-bottom pb-2 mb-3">Job Description</h6>
                    <div className="bg-light rounded p-3">
                      <p className="mb-0">{job.j_description || 'No description provided.'}</p>
                    </div>
                  </div>
                </div>

                {/* Review History */}
                {(job.ja_current_status === 1 || job.ja_current_status === 4) && job.ja_reviewed_at && (
                  <div className="row mt-4">
                    <div className="col-12">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Review History</h6>
                      <div className="bg-light rounded p-3">
                        <table className="table table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td className="text-muted" style={{width: '120px'}}>Reviewed by:</td>
                              <td className="fw-medium">
                                {getReviewerName()}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-muted">Reviewed on:</td>
                              <td className="fw-medium">{formatDate(job.ja_reviewed_at)}</td>
                            </tr>
                            {job.ja_review_comments && (
                              <tr>
                                <td className="text-muted align-top">Comments:</td>
                                <td className="fw-medium">{job.ja_review_comments}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
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
      {showCommentsModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Review Comments</h5>
                <button type="button" className="btn-close" onClick={() => setShowCommentsModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <p className="fw-semibold">Job: {job.j_title}</p>
                  <p className="fw-semibold">Company: {job.j_company_name}</p>
                  <p className="fw-semibold">Reviewed by: {getReviewerName()}</p>
                  <p className="fw-semibold">Reviewed on: {formatDate(job.ja_reviewed_at)}</p>
                </div>
                <div className="border rounded p-3 bg-light">
                  <h6 className="fw-bold mb-3">Review Comments:</h6>
                  <p className="mb-0">{job.ja_review_comments}</p>
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

      {/* Reject Reason Modal */}
      {showRejectModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reject Job Posting</h5>
                <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Please provide a reason for rejecting <strong>"{job.j_title}"</strong>:</p>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowRejectModal(false)}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminJobReview;