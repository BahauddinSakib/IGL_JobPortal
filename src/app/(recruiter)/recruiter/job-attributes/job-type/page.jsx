"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const JobTypePage = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch job types
  const fetchJobTypes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch('/api/auth/job-types');
      
      if (!response.ok) {
        throw new Error('Failed to fetch job types');
      }
      
      const data = await response.json();
      console.log("Fetched job types:", data);
      
      if (Array.isArray(data)) {
        setJobTypes(data);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching job types:', error);
      setError('Failed to load job types: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobTypes();
  }, []);

  // Function to get display name from numeric jt_name
  const getDisplayName = (jobType) => {
    const jt_name = jobType.jt_name.toString();
    
    // Predefined types mapping
    const predefinedMapping = {
      '1': 'Full-time',
      '2': 'Part-time', 
      '3': 'Contractual',
      '4': 'Intern',
      '5': 'Freelance'
    };
    
    // If it's a predefined type (1-5), return the mapped name
    if (predefinedMapping[jt_name]) {
      return predefinedMapping[jt_name];
    }
    
    // For custom types (6+), we need to maintain a separate mapping
    // For now, we'll use a simple approach - you can enhance this
    const customMapping = {
      '6': 'Remote Job',
      '7': 'Temporary Job', 
      '8': 'Call Job',
      '9': 'Shift Job'
      // Add more mappings as you create new job types
    };
    
    return customMapping[jt_name] || `Job Type ${jt_name}`;
  };

  // Function to check if it's a custom type (for delete button)
  const isCustomType = (jobType) => {
    const jt_name = jobType.jt_name.toString();
    const numericId = parseInt(jt_name);
    return !isNaN(numericId) && numericId > 5;
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job type?')) {
      try {
        const response = await fetch(`/api/auth/job-types/${id}`, {
          method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
          alert('Job type deleted successfully!');
          fetchJobTypes();
        } else {
          alert(result.error || 'Error deleting job type');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting job type');
      }
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">JOB TYPES</h1>
        <Link
          href="/admin/job-attributes/job-type/create"
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <i className="mdi mdi-plus"></i>
          Create Job Type
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger mb-4">
          <i className="mdi mdi-alert-circle me-2"></i>
          {error}
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <span className="text-muted">Total: {jobTypes.length} types</span>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={fetchJobTypes}
            disabled={loading}
          >
            <i className="mdi mdi-refresh me-1"></i>
            Refresh
          </button>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading job types...</p>
            </div>
          ) : jobTypes.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">JOB TYPE</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">CREATED AT</th>
                    <th scope="col">OPERATIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {jobTypes.map((jobType) => {
                    const displayName = getDisplayName(jobType);
                    const customType = isCustomType(jobType);
                    
                    return (
                      <tr key={jobType.jt_id}>
                        <td className="fw-semibold">{jobType.jt_id}</td>
                        <td className="fw-bold text-dark">
                          {displayName}
                        </td>
                        <td>
                          <span 
                            className={`badge ${jobType.jt_status === 1 ? 'bg-success' : 'bg-warning text-dark'}`}
                          >
                            {jobType.jt_status === 1 ? 'Published' : 'Not Published'}
                          </span>
                        </td>
                        <td>
                          {jobType.jt_createdAt ? new Date(jobType.jt_createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link
                              href={`/admin/job-attributes/job-type/${jobType.jt_id}`}
                              className="btn btn-outline-primary"
                            >
                              <i className="mdi mdi-pencil me-1"></i>
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(jobType.jt_id)}
                              className="btn btn-outline-danger"
                              disabled={!customType}
                            >
                              <i className="mdi mdi-delete me-1"></i>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-4">
              <div className="text-muted">
                <i className="mdi mdi-inbox-outline fa-2x mb-2"></i>
                <p>No job types found</p>
                <Link 
                  href="/admin/job-attributes/job-type/create"
                  className="btn btn-sm btn-primary"
                >
                  Create First Job Type
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobTypePage;