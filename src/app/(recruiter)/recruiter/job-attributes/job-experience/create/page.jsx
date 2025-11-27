"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateJobExperiencePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    je_experience: "",
    je_status: 1
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.je_experience.trim()) {
      alert('Please enter an experience level');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/job-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // alert('Job experience created successfully!');
        router.push('/admin/job-attributes/job-experience');
      } else {
        alert(result.error || 'Error creating job experience');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating job experience');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/job-experience');
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">CREATE JOB EXPERIENCE</h1>
        <button
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          <i className="mdi mdi-arrow-left me-1"></i>
          Back to List
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0 text-dark fw-bold">Add New Job Experience</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Experience Level *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="je_experience"
                    value={formData.je_experience}
                    onChange={handleInputChange}
                    placeholder="Enter experience level (e.g., 0-1 years, 1-3 years, 3-5 years)"
                    required
                    style={{ color: '#000000' }}
                  />
                  <div className="form-text">
                    Enter the experience level range
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Status
                  </label>
                  <div className="form-check form-switch mt-2 d-flex align-items-center">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="je_status"
                      checked={formData.je_status === 1}
                      onChange={handleInputChange}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <label className="form-check-label fw-semibold text-dark">
                      {formData.je_status === 1 ? (
                        'Published'
                      ) : (
                        <span className="text-warning fw-bold px-2 py-1 rounded" 
                              style={{ 
                                backgroundColor: '#FEF3C7', 
                                color: '#92400E',
                                fontSize: '0.875rem'
                              }}>
                          Not Published
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="form-text">
                    Published experiences will be available in dropdowns
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
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="mdi mdi-check me-1"></i>
                        Create Job Experience
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
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

export default CreateJobExperiencePage;