"use client";

import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';

const CreateJobPage = () => {

  
  const [currentStep, setCurrentStep] = useState(1);
  
  // Define steps array at the top
  const steps = [
    { id: 1, title: "Job Information" },
    { id: 2, title: "Candidate Requirements" },
    { id: 3, title: "Matching & Restrictions" },
    { id: 4, title: "Billing & Contact Info" }
  ];

  const [formData, setFormData] = useState({
    // Step 1: Job Information
    j_title: "",
    j_date: "",
    j_deadline: "",
    j_category: "",
    j_location: "",
    j_company_name: "",
    j_vacancy: "",
    j_work_place: "",
    j_description: "",
    j_salary_type: "range",
    j_salary_min: "",
    j_salary_max: "",
    j_image: "",

    // Step 2: Candidate Requirements
    j_gender: "",
    j_min_age: "",
    j_max_age: "",
    j_video_cv: false,
    j_degree_name: "",
    j_institution: "",
    j_certification: "",
    j_experience_required: "no",
    j_skills: "",

    // Step 3: Matching & Restrictions
    j_matching_strength: "3",
    j_service_type: "internship",
    j_publishing_platforms: ["bigjobs.com"],
    j_application_process: "online",
    j_company_type: "", // Changed from j_company_industry to j_company_type

    // Step 4: Billing & Contact Info
    j_contact_email: "",
    j_contact_phone: "",

    // Reference IDs
    j_type_id: "",
    j_skills_id: "",
    j_experience_id: "",
    j_degree_type_id: "",
    j_degree_level_id: "",
  });

  // New state for image preview
  const [imagePreview, setImagePreview] = useState("");

  // New state arrays for dropdown options
  const [categories, setCategories] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [jobExperiences, setJobExperiences] = useState([]);
  const [degreeLevels, setDegreeLevels] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  // New state arrays for multiple entries
  const [qualifications, setQualifications] = useState([""]);
  const [institutions, setInstitutions] = useState([""]);
  const [skills, setSkills] = useState([""]);

  // Mock data for pie chart (will be replaced with real CV data later)
  const [matchingData, setMatchingData] = useState({
    education: 75,
    experience: 60,
    skills: 85,
    location: 90,
    overall: 78
  });

  const [loading, setLoading] = useState(false);

  // Fetch all dropdown options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch job categories
        const categoriesResponse = await fetch('/api/auth/job-categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch degree types
        const degreeTypesResponse = await fetch('/api/auth/degree-type');
        const degreeTypesData = await degreeTypesResponse.json();
        setDegreeTypes(degreeTypesData);

        // Fetch job experiences
        const jobExperiencesResponse = await fetch('/api/auth/job-experience');
        const jobExperiencesData = await jobExperiencesResponse.json();
        setJobExperiences(jobExperiencesData);

        // Fetch degree levels
        const degreeLevelsResponse = await fetch('/api/auth/degree-level');
        const degreeLevelsData = await degreeLevelsResponse.json();
        setDegreeLevels(degreeLevelsData);

        // Fetch job types
        const jobTypesResponse = await fetch('/api/auth/job-types');
        const jobTypesData = await jobTypesResponse.json();
        setJobTypes(jobTypesData);

      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    
    fetchOptions();
  }, []);

  // Add new qualification field
  const addQualification = () => {
    setQualifications([...qualifications, ""]);
  };

  // Update qualification
  const updateQualification = (index, value) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = value;
    setQualifications(newQualifications);
    
    // Update form data with all qualifications
    setFormData(prev => ({
      ...prev,
      j_degree_name: newQualifications.filter(q => q.trim() !== "").join("|")
    }));
  };

  // Remove qualification
  const removeQualification = (index) => {
    if (qualifications.length > 1) {
      const newQualifications = qualifications.filter((_, i) => i !== index);
      setQualifications(newQualifications);
      setFormData(prev => ({
        ...prev,
        j_degree_name: newQualifications.filter(q => q.trim() !== "").join("|")
      }));
    }
  };

  // Add new institution field
  const addInstitution = () => {
    setInstitutions([...institutions, ""]);
  };

  // Update institution
  const updateInstitution = (index, value) => {
    const newInstitutions = [...institutions];
    newInstitutions[index] = value;
    setInstitutions(newInstitutions);
    
    setFormData(prev => ({
      ...prev,
      j_institution: newInstitutions.filter(i => i.trim() !== "").join("|")
    }));
  };

  // Remove institution
  const removeInstitution = (index) => {
    if (institutions.length > 1) {
      const newInstitutions = institutions.filter((_, i) => i !== index);
      setInstitutions(newInstitutions);
      setFormData(prev => ({
        ...prev,
        j_institution: newInstitutions.filter(i => i.trim() !== "").join("|")
      }));
    }
  };

  // Add new skill field
  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  // Update skill
  const updateSkill = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
    
    setFormData(prev => ({
      ...prev,
      j_skills: newSkills.filter(s => s.trim() !== "").join("|")
    }));
  };

  // Remove skill
  const removeSkill = (index) => {
    if (skills.length > 1) {
      const newSkills = skills.filter((_, i) => i !== index);
      setSkills(newSkills);
      setFormData(prev => ({
        ...prev,
        j_skills: newSkills.filter(s => s.trim() !== "").join("|")
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSalaryTypeChange = (type) => {
    setFormData(prev => ({ ...prev, j_salary_type: type }));
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => {
      const platforms = [...prev.j_publishing_platforms];
      if (platforms.includes(platform)) {
        return { ...prev, j_publishing_platforms: platforms.filter(p => p !== platform) };
      } else {
        return { ...prev, j_publishing_platforms: [...platforms, platform] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Pie Chart Component
  const PieChart = ({ data }) => {
    const chartData = [
      { label: "Education", value: data.education, color: "#4CAF50" },
      { label: "Experience", value: data.experience, color: "#2196F3" },
      { label: "Skills", value: data.skills, color: "#FF9800" },
      { label: "Location", value: data.location, color: "#9C27B0" }
    ];

    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    const circumference = 2 * Math.PI * 40;
    
    let currentOffset = 0;

    return (
      <div className="d-flex align-items-center">
        <div className="position-relative me-4">
          <svg width="100" height="100" viewBox="0 0 100 100">
            {chartData.map((item, index) => {
              const strokeDasharray = (item.value / 100) * circumference;
              const strokeDashoffset = circumference - (currentOffset / 100) * circumference;
              currentOffset += item.value;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={`${strokeDasharray} ${circumference - strokeDasharray}`}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 50 50)"
                />
              );
            })}
            <text x="50" y="50" textAnchor="middle" dy="7" fontSize="20" fontWeight="bold">
              {data.overall}%
            </text>
          </svg>
        </div>
        
        <div>
          {chartData.map((item, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <div 
                style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: item.color, 
                  borderRadius: '2px',
                  marginRight: '8px'
                }}
              ></div>
              <small>
                {item.label}: <strong>{item.value}%</strong>
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Prepare FormData for file upload
  const formDataToSend = new FormData();

  // Append the image file if exists
  if (formData.j_image && typeof formData.j_image !== 'string') {
    formDataToSend.append('j_image', formData.j_image);
  }

  // CRITICAL: Append salary type and values
  formDataToSend.append('j_salary_type', formData.j_salary_type);
  
  // Always append salary min/max, even if empty
  formDataToSend.append('j_salary_min', formData.j_salary_min || '');
  formDataToSend.append('j_salary_max', formData.j_salary_max || '');
    formDataToSend.append('j_deadline', formData.j_deadline || '');

  // Debug what we're sending
  console.log('Salary data being sent:', {
    type: formData.j_salary_type,
    min: formData.j_salary_min,
    max: formData.j_salary_max,
    deadline: formData.j_deadline
  });

  // Prepare age range
  const ageRange = formData.j_min_age && formData.j_max_age 
    ? `${formData.j_min_age}-${formData.j_max_age} Years` 
    : "";

  // Map job type ID to employment status
  const getEmploymentStatus = (jobTypeId) => {
    const employmentStatusMap = {
      1: 1, // Full-time
      2: 2, // Part-time
      3: 3, // Contractual
      4: 4, // Intern
      5: 5, // Freelance
      15: 1 // Graphics Designer -> Full-time
    };
    return employmentStatusMap[jobTypeId] || 1;
  };

  const j_employment_status = formData.j_type_id && formData.j_type_id !== "" 
    ? getEmploymentStatus(parseInt(formData.j_type_id))
    : 1;

  const j_gender = formData.j_gender && formData.j_gender !== "" 
    ? parseInt(formData.j_gender) 
    : 3;
    
  // Append all other form data
  formDataToSend.append('j_title', formData.j_title);
  formDataToSend.append('j_date', formData.j_date || new Date().toISOString().split('T')[0]);
  formDataToSend.append('j_category', formData.j_category);
  formDataToSend.append('j_location', formData.j_location);
  formDataToSend.append('j_company_name', formData.j_company_name);
  formDataToSend.append('j_company_type', formData.j_company_type);
  formDataToSend.append('j_vacancy', formData.j_vacancy || '1');
  formDataToSend.append('j_work_place', formData.j_work_place || '1');
  formDataToSend.append('j_description', formData.j_description);
  formDataToSend.append('j_gender', formData.j_gender || '3');
  formDataToSend.append('j_min_age', formData.j_min_age || '');
  formDataToSend.append('j_max_age', formData.j_max_age || '');
  formDataToSend.append('j_degree_name', formData.j_degree_name || '');
  formDataToSend.append('j_institution', formData.j_institution || '');
  formDataToSend.append('j_skills', formData.j_skills || '');
  formDataToSend.append('j_matching_strength', formData.j_matching_strength || '3');

  // For foreign keys
  formDataToSend.append('j_type_id', formData.j_type_id || '');
  formDataToSend.append('j_skills_id', formData.j_skills_id || '');
  formDataToSend.append('j_experience_id', formData.j_experience_id || '');
  formDataToSend.append('j_degree_type_id', formData.j_degree_type_id || '');
  formDataToSend.append('j_degree_level_id', formData.j_degree_level_id || '');
  formDataToSend.append('j_employment_status', j_employment_status.toString());
  formDataToSend.append('j_status', '2'); // Status 2 = Processing/Pending Approval

  try {
    // === ONLY CHANGE THIS PART ===
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login first');
      setLoading(false);
      return;
    }

    // USE THE NEW AUTHENTICATED ENDPOINT
    const response = await fetch('/api/auth/jobs/authenticated', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` // ADD THIS LINE
      },
      body: formDataToSend,
    });
    // === END OF CHANGES ===

    const result = await response.json();
    console.log('API Response:', result);

    if (response.ok) {
      toast.success('Job submitted for approval! It will be published after admin review.',  {
        duration: 4000,
        position: 'top-right',
      });

      // Reset form
      setFormData({
        j_title: "", j_date: "", j_category: "", j_location: "", j_company_name: "", j_vacancy: "",
        j_work_place: "", j_description: "", j_image: "",
        j_salary_type: "range", j_salary_min: "", j_salary_max: "",
        j_gender: "", j_min_age: "", j_max_age: "", j_video_cv: false,
        j_degree_name: "", j_institution: "", j_certification: "",
        j_experience_required: "no", j_skills: "",
        j_matching_strength: "3", j_service_type: "internship",
        j_publishing_platforms: ["bigjobs.com"], j_application_process: "online",
        j_company_type: "", j_contact_email: "", j_contact_phone: "",
        j_type_id: "", j_skills_id: "", j_experience_id: "", j_degree_type_id: "", j_degree_level_id: ""
      });
      setQualifications([""]);
      setInstitutions([""]);
      setSkills([""]);
      setCurrentStep(1);
    } else {
      toast.error(result.error || 'Error creating job', {
        duration: 4000,
        position: 'top-right',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error creating job', {
      duration: 4000,
      position: 'top-right',
    });
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="container-fluid p-4">
      {/* Add Toaster component for notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">CREATE JOB</h1>
      </div>

      {/* Progress Steps */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row text-center">
            {steps.map((step) => (
              <div key={step.id} className="col-3">
                <div
                  className={`d-flex flex-column align-items-center ${
                    currentStep >= step.id ? "text-primary" : "text-muted"
                  }`}
                >
                  <div
                    className={`rounded-circle ${
                      currentStep >= step.id ? "bg-primary" : "bg-secondary"
                    } text-white d-flex align-items-center justify-content-center mb-2`}
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {step.id}
                  </div>
                  <small className="fw-semibold">{step.title}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0 text-dark fw-bold">
            {steps.find((step) => step.id === currentStep)?.title}
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Job Information */}
            {currentStep === 1 && (
              <div id="step-1">
                {/* First Row - Job Title, Category, Location */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold text-dark">
                      Enter Job Title *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="j_title"
                      value={formData.j_title}
                      onChange={handleInputChange}
                      required
                      maxLength={50}
                    />
                  </div>

                  {/* Job Category */}
                  <div className="col-md-4">
                    <label className="form-label fw-bold text-dark">
                      Job Category *
                    </label>
                    <Select
                      options={categories
                        .filter(
                          (category, index, self) =>
                            index === self.findIndex((c) => c.jc_category === category.jc_category)
                        )
                        .map((category) => ({
                          value: category.jc_category,
                          label: category.jc_category
                        }))
                      }
                      value={
                        formData.j_category
                          ? { value: formData.j_category, label: formData.j_category }
                          : null
                      }
                      onChange={(selectedOption) =>
                        setFormData((prev) => ({
                          ...prev,
                          j_category: selectedOption ? selectedOption.value : ""
                        }))
                      }
                      isSearchable
                      placeholder="Select or search category..."
                      required
                      className="select2-box"
                      classNamePrefix="select2"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold text-dark">
                      Job Location *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="j_location"
                      value={formData.j_location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

{/* Second Row - Vacancy, Date, Deadline, Job Type & Workplace */}
<div className="row mb-3">
  {/* Vacancy No */}
  <div className="col-md-2">
    <label className="form-label fw-bold text-dark">
      Vacancy No. *
    </label>
    <input
      type="number"
      className="form-control"
      name="j_vacancy"
      value={formData.j_vacancy}
      onChange={handleInputChange}
      required
    />
  </div>

  {/* Date */}
  <div className="col-md-2">
    <label className="form-label fw-bold text-dark">Date</label>
    <div style={{ marginTop: "2px" }}>
      <DatePicker
        selected={formData.j_date ? new Date(formData.j_date) : new Date()}
        onChange={(date) =>
          setFormData(prev => ({
            ...prev,
            j_date: date.toISOString().split("T")[0]
          }))
        }
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        className="form-control"
        placeholderText="Select date"
        showIcon
        icon={<i className="mdi mdi-calendar text-muted"></i>}
        toggleCalendarOnIconClick
      />
    </div>
  </div>

{/* Deadline */}
<div className="col-md-2">
  <label className="form-label fw-bold text-dark">Deadline</label>
  <div style={{ marginTop: "2px" }}>
    <DatePicker
      selected={formData.j_deadline ? new Date(formData.j_deadline) : null}
      onChange={(date) => {
        console.log('DatePicker onChange:', date); // Debug log
        setFormData(prev => ({
          ...prev,
          j_deadline: date ? date.toISOString().split("T")[0] : null
        }));
      }}
      minDate={new Date()}
      dateFormat="yyyy-MM-dd"
      className="form-control"
      placeholderText="Select deadline"
      showIcon
      icon={<i className="mdi mdi-calendar text-muted"></i>}
      toggleCalendarOnIconClick
      isClearable
      onCalendarClose={() => {
        console.log('Current j_deadline value:', formData.j_deadline); // Debug log
      }}
    />
  </div>
</div>

  {/* Job Type */}
  <div className="col-md-3">
    <label className="form-label fw-bold text-dark">Job Type</label>
    <Select
      options={jobTypes.map(jobType => ({
        value: jobType.jt_id,
        label: jobType.display_name || jobType.jt_name
      }))}
      value={
        formData.j_type_id
          ? jobTypes
              .map(jobType => ({
                value: jobType.jt_id,
                label: jobType.display_name || jobType.jt_name
              }))
              .find(opt => opt.value === formData.j_type_id)
          : null
      }
      onChange={(selectedOption) =>
        setFormData(prev => ({
          ...prev,
          j_type_id: selectedOption ? selectedOption.value : ""
        }))
      }
      placeholder="Select Job Type"
      isSearchable={true}
      className="select2-box"
      classNamePrefix="select2"
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ? "#86b7fe" : "#dee2e6",
          boxShadow: state.isFocused
            ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
            : "none",
          minHeight: "38px",
          "&:hover": {
            borderColor: state.isFocused ? "#86b7fe" : "#dee2e6",
          },
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
    />
  </div>

  {/* Workplace */}
  <div className="col-md-3">
    <label className="form-label fw-bold text-dark">
      Workplace *
    </label>
    <div className="d-flex gap-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="j_work_place"
          value="1"
          checked={formData.j_work_place === "1"}
          onChange={handleInputChange}
          required
        />
        <label className="form-check-label text-dark">From Office</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="j_work_place"
          value="2"
          checked={formData.j_work_place === "2"}
          onChange={handleInputChange}
          required
        />
        <label className="form-check-label text-dark">From Home</label>
      </div>
    </div>



                  </div>
                </div>

                {/* Third Row - Job Description (Smaller) and Company Name */}
                <div className="row mb-3">
                  <div className="col-md-8">
                    <label className="form-label fw-bold text-dark">
                      Job Responsibilities & Context *
                    </label>
                    <textarea
                      className="form-control"
                      name="j_description"
                      value={formData.j_description}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold text-dark">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="j_company_name"
                      value={formData.j_company_name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                {/* Fourth Row - Salary */}
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="d-flex align-items-start gap-4">
                      <div>
                        <label className="form-label fw-bold text-dark">Salary *</label>
                        <div className="d-flex gap-3">
                          {["range", "negotiable", "nothing"].map((type) => (
                            <div key={type} className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                checked={formData.j_salary_type === type}
                                onChange={() => handleSalaryTypeChange(type)}
                              />
                              <label className="form-check-label">
                                {type === "range"
                                  ? "Show Salary Range"
                                  : type === "negotiable"
                                  ? "Negotiable"
                                  : "Show Nothing"}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {formData.j_salary_type === "range" && (
                        <div className="d-flex gap-4 align-items-end">
                          <div>
                            <label className="form-label fw-bold text-dark">Minimum</label>
                            <input
                              type="number"
                              className="form-control"
                              name="j_salary_min"
                              value={formData.j_salary_min}
                              onChange={handleInputChange}
                              style={{ width: "150px" }}
                            />
                          </div>
                          <div>
                            <label className="form-label fw-bold text-dark">Maximum</label>
                            <input
                              type="number"
                              className="form-control"
                              name="j_salary_max"
                              value={formData.j_salary_max}
                              onChange={handleInputChange}
                              style={{ width: "150px" }}
                            />
                          </div>

                          {/* Add Image Button */}
             <div>
               <label className="form-label fw-bold text-dark">Company Image</label>
             <div>
            <input
           type="file"
           id="imageUpload"
         className="d-none"
         accept="image/*"
         onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setFormData(prev => ({ 
            ...prev, 
            j_image: file
          }));
        }
      }}
    />
                              <label
                                htmlFor="imageUpload"
                                className="btn btn-dark border-0"
                                style={{ width: "150px", backgroundColor: "#000", color: "#fff" }}
                              >
                                <i className="mdi mdi-image me-1"></i>
                                Add Image
                              </label>
                              {formData.j_image && (
                                <div className="mt-2 d-flex align-items-center">
                                  <small className="text-muted me-2">Selected: {formData.j_image.name}</small>
                                  <button
                                    type="button"
                                    className="btn-close btn-close-sm"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, j_image: "" }));
                                      document.getElementById('imageUpload').value = '';
                                    }}
                                    aria-label="Remove image"
                                  ></button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Candidate Requirements */}
            {currentStep === 2 && (
              <div id="step-2">
                {/* First Row - Basic Demographics */}
                <div className="row mb-4">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Gender</label>
                    <select
                      className="form-select"
                      name="j_gender"
                      value={formData.j_gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Any Gender</option>
                      <option value="1">Only Male</option>
                      <option value="2">Only Female</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Minimum Age</label>
                    <input
                      type="number"
                      className="form-control"
                      name="j_min_age"
                      value={formData.j_min_age}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Maximum Age</label>
                    <input
                      type="number"
                      className="form-control"
                      name="j_max_age"
                      value={formData.j_max_age}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Second Row - Education & Experience */}
                <div className="row mb-4">
                  {/* Educational Qualification - REQUIRED */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Educational Qualification <span className="text-danger">*</span>
                    </label>
                    
                    <div className="d-flex align-items-center mb-2">
                      <Select
                        className="select2-box me-2 w-100"
                        classNamePrefix="select2"
                        value={
                          qualifications[qualifications.length - 1]
                            ? {
                                value: qualifications[qualifications.length - 1],
                                label: qualifications[qualifications.length - 1]
                              }
                            : null
                        }
                        onChange={(selectedOption) =>
                          updateQualification(
                            qualifications.length - 1,
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={degreeTypes.map((degree) => ({
                          value: degree.dt_name,
                          label: degree.dt_name,
                        }))}
                        placeholder="Select Degree Type"
                        isSearchable={true}
                      />
                    </div>
                    
                    {qualifications.filter(q => q.trim() !== "").length > 0 && (
                      <div className="mb-2">
                        {qualifications.filter(q => q.trim() !== "").map((qualification, index) => (
                          <span key={index} className="badge bg-primary me-1 mb-1 d-inline-flex align-items-center">
                            {qualification}
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-1"
                              style={{ fontSize: '10px' }}
                              onClick={() => removeQualification(index)}
                              aria-label="Remove"
                            ></button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {qualifications.filter(q => q.trim() !== "").length === 0 && (
                      <div className="text-danger small mb-2">
                        Please add at least one educational qualification
                      </div>
                    )}
                    
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={addQualification}
                    >
                      <i className="mdi mdi-plus me-1"></i>
                      Add More Degree
                    </button>

                    {/* Degree Level under Educational Qualification */}
                    <div className="mt-5">
                      <label className="form-label fw-semibold">Degree Level</label>
                      <select
                        className="form-select"
                        name="j_degree_level_id"
                        value={formData.j_degree_level_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Degree Level</option>
                        {degreeLevels.map((level) => (
                          <option key={level.dl_id} value={level.dl_id}>
                            {level.dl_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Educational Institution & Experience Required */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Preferred Educational Institution</label>
                    
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={institutions[institutions.length - 1] || ""}
                        onChange={(e) => updateInstitution(institutions.length - 1, e.target.value)}
                        placeholder="Enter institution name"
                      />
                    </div>
                    
                    {institutions.filter(i => i.trim() !== "").length > 0 && (
                      <div className="mb-2">
                        {institutions.filter(i => i.trim() !== "").map((institution, index) => (
                          <span key={index} className="badge bg-primary me-1 mb-1 d-inline-flex align-items-center">
                            {institution}
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-1"
                              style={{ fontSize: '10px' }}
                              onClick={() => removeInstitution(index)}
                              aria-label="Remove"
                            ></button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={addInstitution}
                    >
                      <i className="mdi mdi-plus me-1"></i>
                      Add More Institution
                    </button>

                    {/* Experience Required */}
                    <div className="mt-6">
                      <label className="form-label fw-semibold">Experience Required</label>
                      <Select
                        className="select2-box w-100"
                        classNamePrefix="select2"
                        value={
                          formData.j_experience_id
                            ? jobExperiences
                                .map((exp) => ({
                                  value: exp.je_id,
                                  label:
                                    exp.je_description
                                      ? `${exp.je_experience} - ${exp.je_description}`
                                      : exp.je_experience
                                }))
                                .find((opt) => opt.value === formData.j_experience_id)
                            : null
                        }
                        onChange={(selected) =>
                          handleInputChange({
                            target: {
                              name: "j_experience_id",
                              value: selected ? selected.value : ""
                            }
                          })
                        }
                        options={jobExperiences.map((exp) => ({
                          value: exp.je_id,
                          label: exp.je_description
                            ? `${exp.je_experience} - ${exp.je_description}`
                            : exp.je_experience
                        }))}
                        placeholder="Select Experience Level"
                        isSearchable={true}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 d-flex flex-column h-100">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Professional Certification/Training</label>
                      <input
                        type="text"
                        className="form-control"
                        name="j_certification"
                        value={formData.j_certification}
                        onChange={handleInputChange}
                        placeholder="Enter certifications or training"
                      />
                    </div>

                    <div className="mb-3 mt-8 flex-grow-1 d-flex flex-column">
                      <label className="form-label fw-semibold">Skills & Area of Expertise (Max 10)</label>

                      <div className="d-flex align-items-center mb-2">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={skills[skills.length - 1] || ""}
                          onChange={(e) => updateSkill(skills.length - 1, e.target.value)}
                          placeholder="Enter skill"
                        />
                      </div>

                      {skills.filter(s => s.trim() !== "").length > 0 && (
                        <div className="mb-2">
                          {skills.filter(s => s.trim() !== "").map((skill, index) => (
                            <span key={index} className="badge bg-primary me-1 mb-1 d-inline-flex align-items-center">
                              {skill}
                              <button
                                type="button"
                                className="btn-close btn-close-white ms-1"
                                style={{ fontSize: '10px' }}
                                onClick={() => removeSkill(index)}
                                aria-label="Remove"
                              ></button>
                            </span>
                          ))}
                        </div>
                      )}

                      {skills.filter(s => s.trim() !== "").length < 10 && (
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm mt-auto align-self-start"
                          onClick={addSkill}
                        >
                          <i className="mdi mdi-plus me-1"></i>
                          Add More Skill
                        </button>
                      )}

                      <div className="mt-2 text-muted">
                        <small>{skills.filter(s => s.trim() !== "").length}/10 skills added</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Enhanced Matching & Restrictions with Pie Chart */}
            {currentStep === 3 && (
              <div id="step-3">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Service Type
                    </label>
                    <select
                      className="form-select"
                      name="j_service_type"
                      value={formData.j_service_type}
                      onChange={handleInputChange}
                    >
                      <option value="internship">
                        Internship Announcement (Free)
                      </option>
                      <option value="premium">Premium Job Posting</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Publishing Platform
                    </label>
                    <div className="d-flex gap-3 flex-wrap">
                      {[
                        "bigjobs.com",
                        "LinkedIn",
                        "Facebook",
                        "Indeed",
                        "Glassdoor",
                      ].map((platform) => (
                        <div key={platform} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={formData.j_publishing_platforms.includes(
                              platform
                            )}
                            onChange={() => handlePlatformChange(platform)}
                          />
                          <label className="form-check-label">{platform}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Application Receiving Process
                    </label>
                    <select
                      className="form-select"
                      name="j_application_process"
                      value={formData.j_application_process}
                      onChange={handleInputChange}
                    >
                      <option value="online">Apply Online</option>
                      <option value="email">Apply via Email</option>
                      <option value="both">Both Online & Email</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Company Type *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="j_company_type" // Changed to j_company_type
                      value={formData.j_company_type}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., IT Company, Manufacturing, etc."
                    />
                  </div>
                </div>

                {/* Enhanced Matching Section with Pie Chart */}
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title fw-semibold mb-3">
                          Applicant Matching Analysis
                        </h6>
                        <div className="row">
                          <div className="col-md-6">
                            <PieChart data={matchingData} />
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">
                                Applicant Matching Strength
                              </label>
                              <select
                                className="form-select"
                                name="j_matching_strength"
                                value={formData.j_matching_strength}
                                onChange={handleInputChange}
                              >
                                <option value="1">
                                  1/5 - Low ({matchingData.overall}%)
                                </option>
                                <option value="2">
                                  2/5 ({matchingData.overall}%)
                                </option>
                                <option value="3">
                                  3/5 - Medium ({matchingData.overall}%)
                                </option>
                                <option value="4">
                                  4/5 ({matchingData.overall}%)
                                </option>
                                <option value="5">
                                  5/5 - High ({matchingData.overall}%)
                                </option>
                              </select>
                              <small className="text-muted">
                                Current matching score:{" "}
                                <strong>{matchingData.overall}%</strong> based
                                on job requirements vs applicant CV data
                              </small>
                            </div>

                            <div className="mb-3">
                              <label className="form-label fw-semibold">
                                Applicant Restriction Level
                              </label>
                              <select
                                className="form-select"
                                name="j_applicant_restriction"
                                value={formData.j_applicant_restriction}
                                onChange={handleInputChange}
                              >
                                <option value="low">
                                  Low - Accept most applicants
                                </option>
                                <option value="medium">
                                  Medium - Balanced approach
                                </option>
                                <option value="high">
                                  High - Strict matching only
                                </option>
                              </select>
                            </div>

                            {/* Future Integration Note */}
                            <div className="alert alert-info mt-3">
                              <small>
                                <i className="mdi mdi-information-outline me-1"></i>
                                <strong>Future Integration:</strong> This
                                matching data will be automatically calculated
                                by comparing job requirements with applicant CV
                                data using AI algorithms.
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Matching Criteria Summary */}
                <div className="row">
                  <div className="col-12">
                    <div className="card border-0">
                      <div className="card-body">
                        <h6 className="card-title fw-semibold">
                          Matching Criteria Summary
                        </h6>
                        <div className="row">
                          <div className="col-md-6">
                            <h6 className="text-success">Submitted Criteria</h6>
                            <ul className="list-unstyled">
                              <li>✓ Job Location</li>
                              <li>✓ Salary Range</li>
                              <li>✓ Skills/Expertise</li>
                              <li>✓ Educational Qualification</li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <h6 className="text-warning">Missing Criteria</h6>
                            <ul className="list-unstyled">
                              <li>• Industry Experience</li>
                              <li>• Certification Requirements</li>
                              <li>• Portfolio Samples</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-3">
                          <small className="text-muted">
                            The Matching Criteria feature is used to match
                            candidate's CV relevance to job requirements and
                            helps us find relevant candidates.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Billing & Contact Info */}
            {currentStep === 4 && (
              <div id="step-4">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Contact Email 
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="j_contact_email"
                      value={formData.j_contact_email}
                      onChange={handleInputChange}
                      // required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Contact Phone 
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="j_contact_phone"
                      value={formData.j_contact_phone}
                      onChange={handleInputChange}
                      // required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <div className="alert alert-info">
                      <h6>
                        Service Type:{" "}
                        {formData.j_service_type === "internship"
                          ? "Internship Announcement (Free)"
                          : "Premium Job Posting"}
                      </h6>
                      <p className="mb-0">
                        No payment required for internship announcements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "Publishing..." : "Publish Job"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;