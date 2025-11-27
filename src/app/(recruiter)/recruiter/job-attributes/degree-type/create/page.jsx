"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateDegreeTypePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dt_name: "",
    dt_level: "",
    dt_status: 1
  });

  // Predefined degree levels
  const degreeLevels = [
    "Certificate",
    "Diploma", 
    "Associate",
    "Bachelor's",
    "Master's",
    "Doctorate",
    "Post-Doctorate"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.dt_name.trim()) {
      alert('Please enter a degree name');
      return;
    }

    if (!formData.dt_level.trim()) {
      alert('Please select a degree level');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/degree-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // alert('Degree type created successfully!');
        router.push('/admin/job-attributes/degree-type');
      } else {
        alert(result.error || 'Error creating degree type');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating degree type');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/degree-type');
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">CREATE DEGREE TYPE</h1>
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
          <h5 className="mb-0 text-dark fw-bold">Add New Degree Type</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Degree Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="dt_name"
                    value={formData.dt_name}
                    onChange={handleInputChange}
                    placeholder="Enter degree name (e.g., Computer Science, Business Administration)"
                    required
                    style={{ color: '#000000' }}
                  />
                  <div className="form-text">
                    Enter the name of the degree
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Degree Level *
                  </label>
                  <select
                    className="form-select"
                    name="dt_level"
                    value={formData.dt_level}
                    onChange={handleInputChange}
                    required
                    style={{ color: '#000000' }}
                  >
                    <option value="">Select Degree Level</option>
                    {degreeLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    Select the level of this degree
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Status
                  </label>
                  <div className="form-check form-switch mt-2 d-flex align-items-center">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="dt_status"
                      checked={formData.dt_status === 1}
                      onChange={handleInputChange}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <label className="form-check-label fw-semibold text-dark">
                      {formData.dt_status === 1 ? (
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
                    Published degree types will be available in dropdowns
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
                        Create Degree Type
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

export default CreateDegreeTypePage;