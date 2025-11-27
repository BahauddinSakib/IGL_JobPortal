"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateJobTypePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobTypeName, setJobTypeName] = useState("");
  const [jt_status, setJtStatus] = useState(1);
  const [error, setError] = useState("");
  const [existingJobTypes, setExistingJobTypes] = useState([]);

  // Fetch existing job types
  const fetchExistingJobTypes = async () => {
    try {
      const response = await fetch('/api/auth/job-types');
      const data = await response.json();
      if (Array.isArray(data)) {
        setExistingJobTypes(data);
      }
    } catch (error) {
      console.error('Error fetching job types:', error);
    }
  };

  useEffect(() => {
    fetchExistingJobTypes();
  }, []);

  // Check if job type name already exists
  const isDuplicate = (name) => {
    const inputName = name.toLowerCase().trim();
    
    return existingJobTypes.some(jobType => {
      const existingName = (jobType.jt_display_name || jobType.jt_name).toLowerCase();
      return existingName === inputName;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!jobTypeName.trim()) {
      setError('Please enter a job type name');
      return;
    }

    if (jobTypeName.trim().length < 2) {
      setError('Job type must be at least 2 characters long');
      return;
    }

    // Check for duplicates
    if (isDuplicate(jobTypeName)) {
      setError('This job type already exists');
      return;
    }

    setLoading(true);

    try {
      // Prepare data for API
      const submitData = {
        jobTypeName: jobTypeName.trim(),
        jt_status: jt_status
      };

      const response = await fetch('/api/auth/job-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (response.ok) {
        // alert('Job type created successfully!');
        router.push('/admin/job-attributes/job-type');
      } else {
        const errorMessage = result.error || 'Error creating job type';
        setError(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = 'Network error: Unable to create job type';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/job-type');
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">CREATE JOB TYPE</h1>
        <button
          className="btn btn-secondary"
          onClick={handleCancel}
          type="button"
          disabled={loading}
        >
          <i className="mdi mdi-arrow-left me-1"></i>
          Back to List
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0 text-dark fw-bold">Add New Job Type</h5>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="mdi mdi-alert-circle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Job Type Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter job type name"
                    value={jobTypeName}
                    onChange={(e) => {
                      setJobTypeName(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                  />
                  <div className="form-text">
                    Enter a job type name
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Status</label>
                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={jt_status === 1}
                      onChange={(e) => setJtStatus(e.target.checked ? 1 : 0)}
                      disabled={loading}
                    />
                    <label className="form-check-label fw-semibold">
                      {jt_status === 1 ? 'Published' : 'Not Published'}
                    </label>
                  </div>
                  <div className="form-text">
                    Published job types will be available in dropdowns
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading || !jobTypeName.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="mdi mdi-check me-1"></i>
                        Create Job Type
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <i className="mdi mdi-close me-1"></i>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobTypePage;