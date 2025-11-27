"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditJobSkillPage = () => {
  const router = useRouter();
  const params = useParams();
  const skillId = params.id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    js_name: "",
    js_status: 1
  });

  // Fetch job skill data
  useEffect(() => {
    const fetchJobSkill = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/auth/job-skills/${skillId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch job skill');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setFormData({
            js_name: result.data.js_name,
            js_status: result.data.js_status
          });
        } else {
          throw new Error(result.error || 'Error fetching job skill');
        }
      } catch (error) {
        console.error('Error fetching job skill:', error);
        alert('Error loading job skill data');
        router.push('/admin/job-attributes/job-skills');
      } finally {
        setFetching(false);
      }
    };

    if (skillId) {
      fetchJobSkill();
    }
  }, [skillId, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.js_name.trim()) {
      alert('Please enter a skill name');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/auth/job-skills/${skillId}`, {
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
        // alert('Job skill updated successfully!');
        router.push('/admin/job-attributes/job-skills');
      } else {
        alert(result.error || 'Error updating job skill');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error updating job skill: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/job-skills');
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
        <h1 className="h3 mb-0 text-dark fw-bold">EDIT JOB SKILL</h1>
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
          <h5 className="mb-0 text-dark fw-bold">Edit Job Skill</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="js_name"
                    value={formData.js_name}
                    onChange={handleInputChange}
                    placeholder="Enter skill name"
                    required
                    style={{ color: '#000000' }}
                  />
                  <div className="form-text">
                    Enter the name of the job skill
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
                      name="js_status"
                      checked={formData.js_status === 1}
                      onChange={handleInputChange}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <label className="form-check-label fw-semibold text-dark">
                      {formData.js_status === 1 ? (
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
                    Published skills will be available in dropdowns
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
                        Update Job Skill
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

export default EditJobSkillPage;