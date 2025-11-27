"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateJobCategoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchingDegrees, setFetchingDegrees] = useState(false);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [formData, setFormData] = useState({
    jc_title: "",
    jc_date: new Date().toISOString().split('T')[0],
    jc_category: "",
    jc_location: "",
    jc_vacancy: 1,
    jc_employmentStatus: 1,
    jc_workPlace: 1,
    jc_description: "",
    jc_salary: "",
    jc_image: "",
    jc_gender: 3,
    jc_age: "",
    jc_degreeName: "",
    jc_institution: "",
    jc_skills: "",
    jc_matchingStrength: 0.00,
    jc_status: 1
  });

  // State for image upload
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Predefined options
  const employmentStatusOptions = [
    { value: 1, label: "Full-time" },
    { value: 2, label: "Part-time" },
    { value: 3, label: "Contractual" },
    { value: 4, label: "Intern" },
    { value: 5, label: "Freelance" }
  ];

  const workPlaceOptions = [
    { value: 1, label: "Onsite" },
    { value: 2, label: "Remote" }
  ];

  const genderOptions = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
     { value: 3, label: "all" },
  ];

  // Category suggestions
  const categorySuggestions = [
    "Information Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Engineering",
    "Design",
    "Customer Service",
    "Human Resources",
    "Operations",
    "Management",
    "Administrative",
    "Legal",
    "Consulting"
  ];

  const locationSuggestions = [
    "Dhaka",
    "Chattogram", 
    "Khulna",
    "Rajshahi",
    "Sylhet",
    "Barishal",
    "Rangpur",
    "Mymensingh",
    "Remote",
    "Hybrid"
  ];

  // Fetch degree types from API - FIXED
  useEffect(() => {
    const fetchDegreeTypes = async () => {
      try {
        setFetchingDegrees(true);
        const response = await fetch('/api/auth/degree-type');
        
        if (!response.ok) {
          throw new Error('Failed to fetch degree types');
        }
        
        // Your API returns array directly, not wrapped in {success, data}
        const data = await response.json();
        
        // Filter only active degree types (dt_status === 1)
        const activeDegrees = data.filter(degree => degree.dt_status === 1);
        setDegreeOptions(activeDegrees);
        
      } catch (error) {
        console.error('Error fetching degree types:', error);
        alert('Error loading degree types');
      } finally {
        setFetchingDegrees(false);
      }
    };

    fetchDegreeTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : 
              type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSuggestionClick = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

// Upload image to server - UPDATED
const uploadImageToServer = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    setUploadingImage(true);
    const response = await fetch('/api/auth/upload', {
      method: 'POST',
      // Remove Content-Type header for FormData - browser will set it automatically
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    return result.url; // Return the uploaded image URL
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  } finally {
    setUploadingImage(false);
  }
};

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData(prev => ({
      ...prev,
      jc_image: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.jc_title.trim()) {
      alert('Please enter a job title');
      return;
    }

    if (!formData.jc_category.trim()) {
      alert('Please enter a category');
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = "";

      // Upload image file if selected
      if (imageFile) {
        finalImageUrl = await uploadImageToServer(imageFile);
      }

      const submitData = {
        ...formData,
        jc_image: finalImageUrl
      };

      const response = await fetch('/api/auth/job-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (response.ok) {
        router.push('/admin/job-attributes/job-categories');
      } else {
        alert(result.error || 'Error creating job category');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating job category');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/job-attributes/job-categories');
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">CREATE JOB CATEGORY</h1>
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
          <h5 className="mb-0 text-dark fw-bold">Add New Job Category</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="row mb-4">
              <div className="col-12">
                <h6 className="text-dark fw-bold border-bottom pb-2">Basic Information</h6>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="jc_title"
                    value={formData.jc_title}
                    onChange={handleInputChange}
                    placeholder="Enter job title"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Date *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="jc_date"
                    value={formData.jc_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Category *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="jc_category"
                    value={formData.jc_category}
                    onChange={handleInputChange}
                    placeholder="Enter category"
                    required
                  />
                  
                  {/* Category Suggestions */}
                  <div className="mt-2">
                    <small className="text-muted">Suggestions:</small>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {categorySuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          className={`btn btn-xs ${
                            formData.jc_category === suggestion 
                              ? 'btn-primary' 
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => handleSuggestionClick('jc_category', suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Location *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="jc_location"
                    value={formData.jc_location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    required
                  />
                  
                  {/* Location Suggestions */}
                  <div className="mt-2">
                    <small className="text-muted">Suggestions:</small>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {locationSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          className={`btn btn-xs ${
                            formData.jc_location === suggestion 
                              ? 'btn-primary' 
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => handleSuggestionClick('jc_location', suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Vacancy *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="jc_vacancy"
                    value={formData.jc_vacancy}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Salary
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="jc_salary"
                    value={formData.jc_salary}
                    onChange={handleInputChange}
                    placeholder="e.g., 30000-50000 BDT"
                  />
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div className="row mb-4">
              <div className="col-12">
                <h6 className="text-dark fw-bold border-bottom pb-2">Employment Details</h6>
              </div>

              <div className="col-md-6">
               <div className="col-md-8">
               <label className="form-label fw-semibold">Employment Status *</label>
            <select 
             className="form-select" 
             name="j_employment_status" 
             value={formData.j_employment_status} 
            onChange={handleInputChange} 
            required
            >
           <option value="">Select Employment Status</option>
           <option value="1">Full Time</option>
          <option value="2">Part Time</option>
          <option value="3">Contractual</option>
         <option value="4">Intern</option>
         <option value="5">Freelance</option>
      </select>
      </div>

              </div>


              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Work Place *
                  </label>
                  <select
                    className="form-select"
                    name="jc_workPlace"
                    value={formData.jc_workPlace}
                    onChange={handleInputChange}
                    required
                  >
                    {workPlaceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Gender *
                  </label>
                  <select
                    className="form-select"
                    name="jc_gender"
                    value={formData.jc_gender}
                    onChange={handleInputChange}
                    required
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Age Requirement
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="jc_age"
                    value={formData.jc_age}
                    onChange={handleInputChange}
                    placeholder="e.g., 25-35 years"
                  />
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="row mb-4">
              <div className="col-12">
                <h6 className="text-dark fw-bold border-bottom pb-2">Requirements</h6>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Degree Name
                  </label>
                  <select
                    className="form-select"
                    name="jc_degreeName"
                    value={formData.jc_degreeName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Degree Type</option>
                    {fetchingDegrees ? (
                      <option value="" disabled>Loading degrees...</option>
                    ) : (
                      degreeOptions.map((degree) => (
                        <option key={degree.dt_id} value={degree.dt_name}>
                          {degree.dt_name}
                        </option>
                      ))
                    )}
                  </select>
                  {degreeOptions.length === 0 && !fetchingDegrees && (
                    <small className="text-muted">No degree types available</small>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Institution
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="jc_institution"
                    value={formData.jc_institution}
                    onChange={handleInputChange}
                    placeholder="e.g., University of Dhaka"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Skills Required
                  </label>
                  <textarea
                    className="form-control"
                    name="jc_skills"
                    value={formData.jc_skills}
                    onChange={handleInputChange}
                    placeholder="Enter required skills (comma separated)"
                    rows="3"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Job Description *
                  </label>
                  <textarea
                    className="form-control"
                    name="jc_description"
                    value={formData.jc_description}
                    onChange={handleInputChange}
                    placeholder="Enter detailed job description"
                    rows="5"
                    required
                  />
                </div>
              </div>
            </div>

                               {/* Additional Information */}
            <div className="row mb-4">
              <div className="col-12">
                <h6 className="text-dark fw-bold border-bottom pb-2">Additional Information</h6>
              </div>

              {/* Image Upload Section - Only File Upload */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Image
                  </label>
                  
                  {/* File Upload Input */}
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <small className="text-muted">Select an image file (JPEG, PNG, GIF - Max 5MB)</small>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3">
                      <label className="form-label fw-semibold text-dark">Image Preview:</label>
                      <div className="border rounded p-2 bg-white">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="img-fluid rounded"
                          style={{ maxHeight: '200px' }}
                        />
                        <div className="mt-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={handleRemoveImage}
                          >
                            <i className="mdi mdi-delete me-1"></i>
                            Remove Image
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {uploadingImage && (
                    <div className="mt-2">
                      <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                      <small className="text-muted">Uploading image...</small>
                    </div>
                  )}
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
                      name="jc_status"
                      checked={formData.jc_status === 1}
                      onChange={handleInputChange}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <label className="form-check-label fw-semibold text-dark">
                      {formData.jc_status === 1 ? (
                        'Published'
                      ) : (
                        <span className="text-warning fw-bold px-2 py-1 rounded" 
                              style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                          Not Published
                        </span>
                      )}
                    </label>
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
                    disabled={loading || uploadingImage}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="mdi mdi-check me-1"></i>
                        Create Job Category
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

export default CreateJobCategoryPage;