"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditDegreeTypePage = () => {
  const router = useRouter();
  const params = useParams();
  const degreeId = params.id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  // Fetch degree type data
  useEffect(() => {
    const fetchDegreeType = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/auth/degree-type/${degreeId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch degree type');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setFormData({
            dt_name: result.data.dt_name,
            dt_level: result.data.dt_level,
            dt_status: result.data.dt_status
          });
        } else {
          throw new Error(result.error || 'Error fetching degree type');
        }
      } catch (error) {
        console.error('Error fetching degree type:', error);
        alert('Error loading degree type data');
        router.push('/admin/job-attributes/degree-type');
      } finally {
        setFetching(false);
      }
    };

    if (degreeId) {
      fetchDegreeType();
    }
  }, [degreeId, router]);

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
      const response = await fetch(`/api/auth/degree-type/${degreeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // alert('Degree type updated successfully!');
        router.push('/admin/job-attributes/degree-type');
      } else {
        alert(result.error || 'Error updating degree type');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error updating degree type: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/degree-type');
  };

  if (fetching) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">EDIT DEGREE TYPE</h1>
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
          <h5 className="mb-0 text-dark fw-bold">Edit Degree Type</h5>
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
                    placeholder="Enter degree name"
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
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="mdi mdi-check me-1"></i>
                        Update Degree Type
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

export default EditDegreeTypePage;