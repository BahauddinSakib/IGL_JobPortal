"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateDegreeLevelPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dl_name: "",
    dl_status: 1
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
    
    if (!formData.dl_name.trim()) {
      alert('Please enter a degree level');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/degree-level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        router.push('/admin/job-attributes/degree-level');
      } else {
        alert(result.error || 'Error creating degree level');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating degree level');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/degree-level');
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">CREATE DEGREE LEVEL</h1>
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
          <h5 className="mb-0 text-dark fw-bold">Add New Degree Level</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Degree Level Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="dl_name"
                    value={formData.dl_name}
                    onChange={handleInputChange}
                    placeholder="Enter degree level (e.g., Bachelor's, Master's, Doctorate)"
                    required
                    style={{ color: '#000000' }}
                  />
                  <div className="form-text">
                    Enter the name of the degree level
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
                      name="dl_status"
                      checked={formData.dl_status === 1}
                      onChange={handleInputChange}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <label className="form-check-label fw-semibold text-dark">
                      {formData.dl_status === 1 ? (
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
                    Published degree levels will be available in dropdowns
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
                        Create Degree Level
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

export default CreateDegreeLevelPage;