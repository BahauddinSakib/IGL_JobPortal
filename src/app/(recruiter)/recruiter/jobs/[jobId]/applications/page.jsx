"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import MatchDonutChart from '../../../../../../components/MatchDonutChart';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const JobApplications = ({ params }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5);
  const [savingCV, setSavingCV] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [selectedApplications, setSelectedApplications] = useState(new Set());
  const [bulkDownloading, setBulkDownloading] = useState(false);
  const [showMatchAnalysis, setShowMatchAnalysis] = useState(false);
  
  // NEW STATES FOR AUTO MATCHING
  const [matchScores, setMatchScores] = useState({});
  const [calculatingMatches, setCalculatingMatches] = useState({});

  //const params = useParams();
  const jobId = params.jobId; // Add this line

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };



// Fixed CV Matching Function
const calculateCVMatch = async (application) => {
  if (!application.ja_cv || !jobDetails || application.matchScore !== undefined) {
    return;
  }

  setCalculatingMatches(prev => ({ ...prev, [application.ja_id]: true }));

  try {
    console.log(`🔍 Calculating CV match for ${application.au_first_name}`);

    // Prepare job data
    const jobData = {
      jobDescription: jobDetails.j_description || '',
      minExperience: jobDetails.j_experience || 1,
      educationLevel: jobDetails.j_education_level || 'bachelor',
      jobTitle: jobDetails.j_title || ''
    };

    // Get CV file from public folder
    const cvPath = `/applicantsCV/${application.ja_cv}`;
    console.log(`📁 Fetching CV from: ${cvPath}`);
    
    const cvResponse = await fetch(cvPath);
    
    if (!cvResponse.ok) {
      throw new Error(`CV not found: ${application.ja_cv}`);
    }
    
    const cvBlob = await cvResponse.blob();
    const file = new File([cvBlob], application.ja_cv, { type: 'application/pdf' });

    // Send to AI API
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job', JSON.stringify(jobData));

    const matchResponse = await fetch('/api/ai/scoring', {
      method: 'POST',
      body: formData,
    });

    if (matchResponse.ok) {
      const result = await matchResponse.json();
      console.log(`✅ AI match result for ${application.au_first_name}: ${result.score}%`);
      
      // Update BOTH states correctly
      setMatchScores(prev => ({
        ...prev,
        [application.ja_id]: result.score
      }));

      // Update applications array with the score
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.ja_id === application.ja_id 
            ? { 
                ...app, 
                matchScore: result.score,
                matchDetails: result.breakdown || {}
              }
            : app
        )
      );

    } else {
      throw new Error(`API returned ${matchResponse.status}`);
    }
  } catch (error) {
    console.error('❌ Error in calculateCVMatch:', error);
    // Set fallback score on error
    const fallbackScore = 50;
    setMatchScores(prev => ({
      ...prev,
      [application.ja_id]: fallbackScore
    }));
    setApplications(prevApplications => 
      prevApplications.map(app => 
        app.ja_id === application.ja_id 
          ? { ...app, matchScore: fallbackScore }
          : app
      )
    );
  } finally {
    setCalculatingMatches(prev => ({ ...prev, [application.ja_id]: false }));
  }
};



// Helper function to update match score
const updateMatchScore = (application, score) => {
  setMatchScores(prev => ({ ...prev, [application.ja_id]: score }));
  setApplications(prev => prev.map(app => 
    app.ja_id === application.ja_id 
      ? { ...app, matchScore: score }
      : app
  ));
  console.log(`✅ Updated ${application.au_first_name} score to: ${score}%`);
};

// Fallback calculation when AI API fails
const calculateFallbackScore = (application, jobData) => {
  // Simple fallback based on application data
  let score = 50; // Base score
  
  // Add points for having CV
  if (application.ja_cv) score += 10;
  
  // Add points for expected salary (lower is better)
  if (application.ja_expected_salary < 30000) score += 10;
  else if (application.ja_expected_salary < 50000) score += 5;
  
  // Random variation
  score += Math.floor(Math.random() * 20);
  
  return Math.min(score, 95); // Cap at 95%
};

  // Fetch job details
  const fetchJobDetails = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/recruiter/jobs/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setJobDetails(data.job);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch(`/api/recruiter/jobs/${jobId}/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched applications:', data.applications);
        setApplications(data.applications || []);
      } else {
        console.error('Failed to fetch applications:', response.status);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // NEW: Auto-calculate matches when page loads
  useEffect(() => {
    if (jobDetails && applications.length > 0) {
      console.log('Starting auto-calculation of CV matches...');
      
      applications.forEach((app, index) => {
        if (app.ja_cv && app.matchScore === undefined) {
          // Start calculations with 2 second delay between each
          setTimeout(() => calculateCVMatch(app), index * 2000);
        }
      });
    }
  }, [jobDetails, applications]);

  useEffect(() => {
    fetchJobDetails();
    fetchApplications();
  }, [jobId]);

  // CORRECTED: Status filtering logic
  const filteredApplications = applications.filter(app => {
    switch (activeTab) {
      case 'not-viewed':
        return app.ja_status === 1; // Not viewed
      case 'viewed':
        return app.ja_status === 2; // Viewed
      case 'rejected':
        return app.ja_status === 3; // Rejected
      default:
        return true; // All
    }
  });

  // CORRECTED: Status badge configuration
  const getStatusBadge = (status) => {
    const statusConfig = {
      1: { label: 'Not Viewed', badge: 'bg-warning text-dark' },
      2: { label: 'Viewed', badge: 'bg-info text-white' },
      3: { label: 'Rejected', badge: 'bg-danger text-white' }
    };
    return statusConfig[status] || { label: 'Unknown', badge: 'bg-secondary' };
  };

  // CORRECTED: Handle view application - mark as viewed when opened
  const handleViewApplication = async (application) => {
    // If application is not viewed (status 1), update to viewed (status 2)
    if (application.ja_status === 1) {
      await handleStatusUpdate(application.ja_id, 2);
    }
    
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  // CORRECTED: Status update function
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/recruiter/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update local state immediately for better UX
        setApplications(prevApplications => 
          prevApplications.map(app => 
            app.ja_id === applicationId 
              ? { ...app, ja_status: newStatus }
              : app
          )
        );
        showToast(`Application status updated successfully`, 'success');
      } else {
        const errorData = await response.json();
        showToast(`Failed to update status: ${errorData.error}`, 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Error updating application status', 'error');
    }
  };

  // Save CV to server folder
  const saveCVToServer = async (application, e) => {
    if (e) e.stopPropagation();
    
    setSavingCV(prev => ({
      ...prev,
      [application.ja_id]: true
    }));
    
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/recruiter/applications/${application.ja_id}/save-cv`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalFilename: application.ja_cv
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        showToast(`CV downloaded successfully! File: ${result.filename}`, 'success');
      } else {
        showToast('Failed to download CV: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Error saving CV:', error);
      showToast('Error downloading CV. Please try again.', 'error');
    } finally {
      setSavingCV(prev => ({
        ...prev,
        [application.ja_id]: false
      }));
    }
  };

  // Bulk download CVs
  const bulkDownloadCVs = async () => {
    if (selectedApplications.size === 0) {
      showToast('Please select at least one application to download', 'warning');
      return;
    }

    setBulkDownloading(true);
    try {
      const token = getAuthToken();
      let successCount = 0;
      let errorCount = 0;

      for (const applicationId of selectedApplications) {
        const application = applications.find(app => app.ja_id == applicationId);
        if (application && application.ja_cv) {
          try {
            const response = await fetch(`/api/recruiter/applications/${application.ja_id}/save-cv`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                originalFilename: application.ja_cv
              })
            });

            const result = await response.json();
            
            if (response.ok) {
              successCount++;
            } else {
              errorCount++;
            }
          } catch (error) {
            errorCount++;
          }
        }
      }

      if (errorCount === 0) {
        showToast(`Successfully downloaded ${successCount} CV(s)`, 'success');
      } else {
        showToast(`Downloaded ${successCount} CV(s), ${errorCount} failed`, 'warning');
      }

      setSelectedApplications(new Set());
      
    } catch (error) {
      console.error('Error in bulk download:', error);
      showToast('Error during bulk download', 'error');
    } finally {
      setBulkDownloading(false);
    }
  };

  // Toggle application selection
  const toggleApplicationSelection = (applicationId) => {
    setSelectedApplications(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(applicationId)) {
        newSelection.delete(applicationId);
      } else {
        newSelection.add(applicationId);
      }
      return newSelection;
    });
  };

  // Select all applications on current page
  const selectAllOnPage = () => {
    const currentPageApplicationIds = currentApplications.map(app => app.ja_id);
    setSelectedApplications(new Set(currentPageApplicationIds));
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedApplications(new Set());
  };

  // Check if a specific application is saving
  const isSavingCV = (applicationId) => {
    return savingCV[applicationId] || false;
  };

  // Pagination logic
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle match analysis view
  const handleViewMatchAnalysis = (application, e) => {
    if (e) e.stopPropagation();
    setSelectedApplication(application);
    setShowMatchAnalysis(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get color based on match score
  const getMatchColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 50) return '#f59e0b';
    if (score >= 30) return '#f97316';
    return '#ef4444';
  };

  // Individual pie chart data
  const getIndividualPieData = (matchScore) => {
    const remaining = 100 - matchScore;
    
    return {
      labels: ['Match', 'Gap'],
      datasets: [
        {
          data: [matchScore, remaining],
          backgroundColor: [
            getMatchColor(matchScore),
            '#e5e7eb'
          ],
          borderWidth: 0,
          cutout: '70%'
        }
      ]
    };
  };

  // Individual pie chart options
  const individualPieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    cutout: '70%'
  };

  if (loading) {
    return (
      <div className="container-fluid bg-light min-vh-100 py-4">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        
        {/* Toast Notification */}
        {toast.show && (
          <div 
            className={`toast show position-fixed top-0 end-0 m-3 ${toast.type === 'success' ? 'bg-success' : toast.type === 'error' ? 'bg-danger' : 'bg-warning'}`}
            style={{ zIndex: 1050 }}
          >
            <div className="toast-header">
              <strong className="me-auto text-dark">
                {toast.type === 'success' ? '✅ Success' : toast.type === 'error' ? '❌ Error' : '⚠️ Warning'}
              </strong>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setToast({ show: false, message: '', type: '' })}
              ></button>
            </div>
            <div className="toast-body text-white">
              {toast.message}
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="mb-3 mb-md-0">
                <div>
                  <h1 className="h2 fw-bold text-dark mb-1">Job Applications</h1>
                  {jobDetails && (
                    <p className="text-dark mb-0">
                      {jobDetails.j_title} • {jobDetails.j_company_name}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-muted">
                Total: {applications.length} applications
              </div>
            </div>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0">{applications.length}</h4>
                    <small>Total Applications</small>
                  </div>
                  <div className="align-self-center">
                    <i className="fas fa-users fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-dark">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0">{applications.filter(app => app.ja_status === 1).length}</h4>
                    <small>Not Viewed</small>
                  </div>
                  <div className="align-self-center">
                    <i className="fas fa-eye-slash fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0">{applications.filter(app => app.ja_status === 2).length}</h4>
                    <small>Viewed</small>
                  </div>
                  <div className="align-self-center">
                    <i className="fas fa-eye fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="mb-0">{applications.filter(app => app.ja_status === 3).length}</h4>
                    <small>Rejected</small>
                  </div>
                  <div className="align-self-center">
                    <i className="fas fa-times-circle fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Download Section */}
        {filteredApplications.length > 0 && (
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="fw-bold text-dark mb-2">Bulk Download CVs</h6>
                  <p className="text-muted mb-0">
                    Select applications to download multiple CVs at once
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-2 justify-content-md-end flex-wrap">
                    <div className="d-flex gap-2 align-items-center">
                      <span className="text-muted small">
                        Selected: {selectedApplications.size}
                      </span>
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={selectAllOnPage}
                        disabled={currentApplications.length === 0}
                      >
                        Select All (Page)
                      </button>
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={clearAllSelections}
                        disabled={selectedApplications.size === 0}
                      >
                        Clear All
                      </button>
                    </div>
                    <button 
                      className="btn btn-success"
                      onClick={bulkDownloadCVs}
                      disabled={selectedApplications.size === 0 || bulkDownloading}
                    >
                      {bulkDownloading ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Downloading {selectedApplications.size} CV(s)...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-download me-2"></i>
                          Download Selected ({selectedApplications.size})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs Section */}
        <div className="card mb-4">
          <div className="card-body py-3">
            <div className="btn-group bg-light rounded p-1" role="group">
              {[
                { id: 'all', label: 'All', count: applications.length },
                { id: 'not-viewed', label: 'Not Viewed', count: applications.filter(app => app.ja_status === 1).length },
                { id: 'viewed', label: 'Viewed', count: applications.filter(app => app.ja_status === 2).length },
                { id: 'rejected', label: 'Rejected', count: applications.filter(app => app.ja_status === 3).length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`btn fw-semibold border-0 ${
                    activeTab === tab.id 
                      ? 'btn-dark text-white' 
                      : 'btn-light text-dark'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                    setSelectedApplications(new Set());
                  }}
                  style={{
                    backgroundColor: activeTab === tab.id ? '#1f2937' : '',
                    color: activeTab === tab.id ? 'white' : '#374151',
                    padding: '8px 16px',
                    fontSize: '14px'
                  }}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Applications Content */}
        <div className="card">
          <div className="card-body p-0">
            {filteredApplications.length > 0 ? (
              <div className="p-4">
                {/* Applications Count */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="text-muted mb-0">
                        Showing {currentApplications.length} of {filteredApplications.length} applications
                      </h6>
                      <div className="text-muted">
                        Page {currentPage} of {totalPages}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applications Cards */}
                <div className="row">
                  {currentApplications.map((application) => {
                    const statusInfo = getStatusBadge(application.ja_status);
                    const isThisApplicationSaving = isSavingCV(application.ja_id);
                    const isSelected = selectedApplications.has(application.ja_id);
                    
                    return (
                      <div key={application.ja_id} className="col-12 mb-3">
                        <div 
                          className={`card border-0 shadow-sm rounded-2 cursor-pointer ${isSelected ? 'border-primary border-2' : ''}`}
                          style={{ 
                            cursor: 'pointer', 
                            transition: 'all 0.2s ease',
                            backgroundColor: isSelected ? '#f8f9ff' : '' 
                          }}
                          onClick={() => handleViewApplication(application)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                          }}
                        >
                          <div className="card-body p-3">
                            <div className="row align-items-center">
                              {/* Selection Checkbox */}
                              <div className="col-md-1">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      toggleApplicationSelection(application.ja_id);
                                    }}
                                    style={{ transform: 'scale(1.2)' }}
                                  />
                                </div>
                              </div>

                              {/* Applicant Info */}
                              <div className="col-md-5">
                                <div className="d-flex align-items-start gap-3">
                                  <div className="flex-shrink-0">
                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                         style={{width: '50px', height: '50px', fontSize: '16px'}}>
                                      {application.au_first_name?.charAt(0)}{application.au_last_name?.charAt(0)}
                                    </div>
                                  </div>
                                  <div className="flex-grow-1">
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                      <h6 className="fw-bold text-dark mb-0">
                                        {application.au_first_name} {application.au_last_name}
                                      </h6>
                                      <span className={`badge ${statusInfo.badge} rounded-pill fs-7 py-1 px-2`}>
                                        {statusInfo.label}
                                      </span>
                                    </div>
                                    <div className="d-flex flex-wrap gap-3 align-items-center mb-2">
                                      <span className="d-flex align-items-center text-muted fs-7">
                                        <i className="fas fa-envelope me-1 text-primary"></i>
                                        {application.au_email}
                                      </span>
                                      <span className="d-flex align-items-center text-muted fs-7">
                                        <i className="fas fa-phone me-1 text-success"></i>
                                        {application.ja_phone}
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                      <span className="text-dark fw-semibold fs-7">
                                        Expected Salary: {application.ja_expected_salary} ৳
                                      </span>
                                      <span className="text-muted fs-7">
                                        Applied: {formatDate(application.ja_applyDate)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* NEW: Auto CV Match Donut Chart */}
                              <div className="col-md-2">
                                <div className="text-center">
                                  <MatchDonutChart 
                                    score={application.matchScore || matchScores[application.ja_id] || 0} 
                                    size={70}
                                  />
                                  {calculatingMatches[application.ja_id] && (
                                    <small className="text-primary mt-1">Calculating...</small>
                                  )}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="col-md-4">
                                <div className="d-flex flex-column gap-2">
                                  {/* Match Analysis Button */}
                                  {application.matchScore !== undefined && (
                                    <div className="d-flex gap-2 flex-wrap justify-content-end">
                                      <button 
                                        className="btn btn-outline-info btn-sm"
                                        onClick={(e) => handleViewMatchAnalysis(application, e)}
                                      >
                                        <i className="fas fa-chart-bar me-1"></i>
                                        Match Analysis
                                      </button>
                                    </div>
                                  )}

                                  {/* CV Save to Server */}
                                  {application.ja_cv && (
                                    <div className="d-flex gap-2 flex-wrap justify-content-end">
                                      <button 
                                        className="btn btn-outline-success btn-sm"
                                        onClick={(e) => saveCVToServer(application, e)}
                                        disabled={isThisApplicationSaving}
                                      >
                                        {isThisApplicationSaving ? (
                                          <>
                                            <div className="spinner-border spinner-border-sm me-1" role="status">
                                              <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Downloading...
                                          </>
                                        ) : (
                                          <>
                                            <i className="fas fa-download me-1"></i>
                                            Download CV
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  )}

                                  {/* Status Actions */}
                                  <div className="d-flex gap-1 flex-wrap justify-content-end">
                                    {application.ja_status !== 3 && (
                                      <button 
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleStatusUpdate(application.ja_id, 3);
                                        }}
                                        disabled={isThisApplicationSaving}
                                      >
                                        Reject
                                      </button>
                                    )}

                                    {application.ja_status === 3 && (
                                      <button 
                                        className="btn btn-outline-warning btn-sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleStatusUpdate(application.ja_id, 1);
                                        }}
                                        disabled={isThisApplicationSaving}
                                      >
                                        Mark as Not Viewed
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="row mt-4">
                    <div className="col-12">
                      <nav>
                        <ul className="pagination justify-content-center mb-0">
                          {/* Previous Button */}
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              aria-label="Previous"
                            >
                              <i className="fas fa-chevron-left"></i>
                            </button>
                          </li>

                          {/* Page Numbers */}
                          {pageNumbers.map(number => (
                            <li 
                              key={number} 
                              className={`page-item ${currentPage === number ? 'active' : ''}`}
                            >
                              <button 
                                className="page-link" 
                                onClick={() => handlePageChange(number)}
                              >
                                {number}
                              </button>
                            </li>
                          ))}

                          {/* Next Button */}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              aria-label="Next"
                            >
                              <i className="fas fa-chevron-right"></i>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}

                {/* Back to Jobs Button */}
                <div className="row mt-4">
                  <div className="col-12">
                    <Link href="/recruiter/job-dashboard" className="btn btn-outline-secondary">
                      <i className="fas fa-arrow-left me-2"></i>
                      Back to Jobs
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="mb-4">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" 
                       style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-users fa-2x text-dark"></i>
                  </div>
                </div>
                <h3 className="h4 fw-bold text-dark mb-2">No applications found</h3>
                <p className="text-dark mb-4">
                  {activeTab === 'all' && "No one has applied to this job yet."}
                  {activeTab === 'not-viewed' && "All applications have been viewed."}
                  {activeTab === 'viewed' && "No viewed applications found."}
                  {activeTab === 'rejected' && "No rejected applications found."}
                </p>
                <div className="text-start">
                  <Link href="/recruiter/job-dashboard" className="btn btn-outline-secondary">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Jobs
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Application Details Modal */}
        {showDetailsModal && selectedApplication && (
          <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040}}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Application Details</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Applicant Information</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="text-dark" style={{width: '140px'}}><strong>Name:</strong></td>
                            <td className="fw-medium text-dark">{selectedApplication.au_first_name} {selectedApplication.au_last_name}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Email:</strong></td>
                            <td className="fw-medium text-dark">{selectedApplication.au_email}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Phone:</strong></td>
                            <td className="fw-medium text-dark">{selectedApplication.ja_phone}</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Expected Salary:</strong></td>
                            <td className="fw-medium text-dark">{selectedApplication.ja_expected_salary} ৳</td>
                          </tr>
                          <tr>
                            <td className="text-dark"><strong>Applied Date:</strong></td>
                            <td className="fw-medium text-dark">{formatDate(selectedApplication.ja_applyDate)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold border-bottom pb-2 mb-3">Application Status</h6>
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <span className={`badge ${getStatusBadge(selectedApplication.ja_status).badge} py-2 px-3`}>
                          {getStatusBadge(selectedApplication.ja_status).label}
                        </span>
                        {selectedApplication.matchScore !== undefined && (
                          <span className={`badge bg-${getMatchColor(selectedApplication.matchScore)} py-2 px-3 text-white`}>
                            {selectedApplication.matchScore}% Match
                          </span>
                        )}
                      </div>
                      {selectedApplication.ja_cv && (
                        <div className="mt-3">
                          <button 
                            className="btn btn-success w-100"
                            onClick={(e) => saveCVToServer(selectedApplication, e)}
                            disabled={isSavingCV(selectedApplication.ja_id)}
                          >
                            {isSavingCV(selectedApplication.ja_id) ? (
                              <>
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                Downloading CV...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-download me-2"></i>
                                Download CV 
                              </>
                            )}
                          </button>
                        </div>
                      )}
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

        {/* Match Analysis Modal */}
        {showMatchAnalysis && selectedApplication && selectedApplication.matchDetails && (
          <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    <i className="fas fa-chart-line me-2 text-primary"></i>
                    Match Analysis: {selectedApplication.au_first_name} {selectedApplication.au_last_name}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowMatchAnalysis(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="text-center p-3 bg-light rounded">
                        <div className={`h2 fw-bold ${
                          selectedApplication.matchScore >= 85 ? 'text-success' :
                          selectedApplication.matchScore >= 70 ? 'text-primary' :
                          selectedApplication.matchScore >= 50 ? 'text-warning' : 'text-danger'
                        }`}>
                          {selectedApplication.matchScore}%
                        </div>
                        <div className="text-muted">Overall Match Score</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between">
                          <span>Keyword Match:</span>
                          <span className="fw-bold">{selectedApplication.matchDetails?.keywordMatch || 0}%</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Skills Match:</span>
                          <span className="fw-bold">{selectedApplication.matchDetails?.skillsMatch || 0}%</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Experience Match:</span>
                          <span className="fw-bold">{selectedApplication.matchDetails?.experienceMatch || 0}%</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Education Match:</span>
                          <span className="fw-bold">{selectedApplication.matchDetails?.educationMatch || 0}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedApplication.matchDetails?.matchedKeywords && (
                    <div className="row">
                      <div className="col-md-12">
                        <h6 className="fw-bold">Matched Keywords</h6>
                        <div className="bg-light p-3 rounded">
                          {selectedApplication.matchDetails.matchedKeywords.map((keyword, index) => (
                            <span key={index} className="badge bg-success me-1 mb-1">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowMatchAnalysis(false)}>
                    Close
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

export default JobApplications;