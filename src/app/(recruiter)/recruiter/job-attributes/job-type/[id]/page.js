"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditJobTypePage = () => {
  const router = useRouter();
  const params = useParams();
  const jobTypeId = params.id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    jt_name: "",
    jt_status: 1
  });

  // Predefined job types with numeric values
  const predefinedJobTypes = [
    { value: "1", label: "Full-time" },
    { value: "2", label: "Part-time" },
    { value: "3", label: "Contractual" },
    { value: "4", label: "Intern" },
    { value: "5", label: "Freelance" }
  ];

  // Fetch job type data
  useEffect(() => {
    const fetchJobType = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/auth/job-types/${jobTypeId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch job type');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setFormData({
            jt_name: result.data.jt_name.toString(),
            jt_status: result.data.jt_status
          });
        } else {
          throw new Error(result.error || 'Error fetching job type');
        }
      } catch (error) {
        console.error('Error fetching job type:', error);
        alert('Error loading job type data');
        router.push('/admin/job-attributes/job-type');
      } finally {
        setFetching(false);
      }
    };

    if (jobTypeId) {
      fetchJobType();
    }
  }, [jobTypeId, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.jt_name) {
      alert('Please select a job type');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/auth/job-types/${jobTypeId}`, {
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
        // alert('Job type updated successfully!');
        router.push('/admin/job-attributes/job-type');
      } else {
        alert(result.error || 'Error updating job type');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error updating job type: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/job-type');
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
        <h1 className="h3 mb-0 text-dark fw-bold">EDIT JOB TYPE</h1>
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
          <h5 className="mb-0 text-dark fw-bold">Edit Job Type</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Job Type *</label>
                  <select
                    className="form-select"
                    name="jt_name"
                    value={formData.jt_name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Job Type</option>
                    {predefinedJobTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    Select from predefined job types
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
                      name="jt_status"
                      checked={formData.jt_status === 1}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label fw-semibold">
                      {formData.jt_status === 1 ? 'Published' : 'Not Published'}
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
                        Update Job Type
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

export default EditJobTypePage;