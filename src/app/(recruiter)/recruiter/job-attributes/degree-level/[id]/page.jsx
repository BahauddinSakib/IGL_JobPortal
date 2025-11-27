"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditDegreeLevelPage = () => {
  const router = useRouter();
  const params = useParams();
  const levelId = params.id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    dl_name: "",
    dl_status: 1
  });

  // Predefined degree level suggestions
  const degreeLevelSuggestions = [
    "High School",
    "Certificate",
    "Diploma", 
    "Associate",
    "Bachelor's ",
    "Master's ",
    "Doctorate",
    "PhD",
    "Post-Doctorate",
    "Vocational",
    "Professional Certification",
    "Undergraduate",
    "Graduate",
    "Postgraduate"
  ];

  // Fetch degree level data
  useEffect(() => {
    const fetchDegreeLevel = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/auth/degree-level/${levelId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch degree level');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setFormData({
            dl_name: result.data.dl_name,
            dl_status: result.data.dl_status
          });
        } else {
          throw new Error(result.error || 'Error fetching degree level');
        }
      } catch (error) {
        console.error('Error fetching degree level:', error);
        alert('Error loading degree level data');
        router.push('/admin/job-attributes/degree-level');
      } finally {
        setFetching(false);
      }
    };

    if (levelId) {
      fetchDegreeLevel();
    }
  }, [levelId, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      dl_name: suggestion
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
      const response = await fetch(`/api/auth/degree-level/${levelId}`, {
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
        router.push('/admin/job-attributes/degree-level');
      } else {
        alert(result.error || 'Error updating degree level');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error updating degree level: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/degree-level');
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
        <h1 className="h3 mb-0 text-dark fw-bold">EDIT DEGREE LEVEL</h1>
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
          <h5 className="mb-0 text-dark fw-bold">Edit Degree Level</h5>
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
                    placeholder="Enter degree level"
                    required
                    style={{ color: '#000000' }}
                  />
                  <div className="form-text">
                    Enter the name of the degree level
                  </div>
                </div>

                {/* Degree Level Suggestions */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Quick Suggestions
                  </label>
                  <div className="d-flex flex-wrap gap-2">
                    {degreeLevelSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        className={`btn btn-sm ${
                          formData.dl_name === suggestion 
                            ? 'btn-primary' 
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <div className="form-text">
                    Click on a suggestion to quickly fill the field
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
                        Update Degree Level
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

export default EditDegreeLevelPage;