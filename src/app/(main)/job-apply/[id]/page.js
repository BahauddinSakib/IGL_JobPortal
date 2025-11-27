"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../componants/navbarDark";
import { useParams, useRouter } from "next/navigation";

const JobApplicationForm = () => {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id;

  const [jobData, setJobData] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    expectedSalary: "",
    cvFile: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Show toast message
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 4000);
  };

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/auth/jobs/${jobId}`);

        if (!response.ok) {
          setFetchError(
            response.status === 404
              ? "Job not found"
              : "Failed to fetch job details"
          );
          setIsLoading(false);
          return;
        }

        const job = await response.json();
        setJobData(job);
        setFetchError("");
      } catch (error) {
        setFetchError("Error connecting to server");
        showToast("Error connecting to server", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) fetchJobDetails();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.expectedSalary.trim()) {
      newErrors.expectedSalary = "Expected salary is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.expectedSalary)) {
      newErrors.expectedSalary = "Please enter a valid salary (50000)";
    }

    if (!formData.cvFile) {
      newErrors.cvFile = "CV is required";
    } else if (formData.cvFile.type !== "application/pdf") {
      newErrors.cvFile = "Only PDF files allowed";
    }

    setErrors(newErrors);
    
    // Show toast for validation errors
    if (Object.keys(newErrors).length > 0) {
      showToast("Please fix the form errors before submitting", "error");
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("jobId", jobId);
      submitData.append("phoneNumber", formData.phoneNumber);
      submitData.append("expectedSalary", formData.expectedSalary);
      submitData.append("cvFile", formData.cvFile);

      const response = await fetch("/api/auth/job-applications", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      const result = await response.json();
      
      // Show success toast
      showToast("Application submitted successfully!", "success");
      
      // Reset form
      setFormData({
        phoneNumber: "",
        expectedSalary: "",
        cvFile: null,
      });
      
      // Redirect to job-details page after a short delay
      setTimeout(() => {
        router.push("/job-details");
      }, 1500);
      
    } catch (error) {
      console.error("Submission error:", error);
      // Show error toast
      showToast(error.message || "Error submitting application. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading UI
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div
          className="min-vh-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: "url('/images/applyJobBackground.jpg')",
            backgroundColor: '#b3e6ff', // Fallback color
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="spinner-border text-primary me-2"></div>
          <span className="text-dark">Loading job details...</span>
        </div>
      </>
    );
  }

  // Error UI
  if (fetchError || !jobData) {
    return (
      <>
        <Navbar />
        <div 
          className="min-vh-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: "url('/images/applyJobBackground.jpg')",
            backgroundColor: '#b3e6ff', // Fallback color
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container text-center">
            <div className="card shadow-lg border-0 p-4" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <h4 className="mb-2">Job not found</h4>
              <p className="text-muted">{fetchError}</p>
              <button
                className="btn btn-primary mt-3"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // MAIN UI
  return (
    <>
      <Navbar />
      <div 
        className="min-vh-100 py-5"
        style={{
          backgroundImage: "url('/images/applyJobBackground.jpg')",
          backgroundColor: '#b3e6ff', // Fallback color
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Toast Notification */}
        {toast.show && (
          <div 
            className={`toast show position-fixed top-0 end-0 m-4 ${toast.type === "success" ? "bg-success" : "bg-danger"} text-white`}
            style={{ zIndex: 1050, minWidth: "300px" }}
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body">
                {toast.message}
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => setToast({ show: false, message: "", type: "" })}
              ></button>
            </div>
          </div>
        )}

        <div className="container" style={{ paddingTop: "80px" }}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              
              {/* JOB INFO CARD - WHITE WITH TRANSPARENCY */}
              <div className="card shadow-lg mb-4 border-0">
                <div className="card-body text-center py-4" style={{
                  background: 'rgba(255, 255, 255, 0.91)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h3 className="card-title text-dark fw-bold mb-2">{jobData.title}</h3>
                  <h5 className="text-primary fw-semibold">{jobData.company_name}</h5>
                </div>
              </div>

              {/* APPLICATION FORM CARD - WHITE WITH TRANSPARENCY */}
              <div className="card shadow-lg mb-5 border-0">
                <div className="card-body p-4" style={{
                  background: 'rgba(255, 255, 255, 0.81)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h5 className="mb-4 text-dark fw-bold text-center">Apply for this Job</h5>

                  <form onSubmit={handleSubmit}>
                    {/* PHONE */}
                    <div className="mb-3">
                      <label className="form-label text-dark fw-semibold">Phone Number *</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        style={{
                          borderRadius: '8px',
                          border: '1px solid #dee2e6',
                          padding: '8px 12px',
                          fontSize: '14px',
                          background: 'white'
                        }}
                      />
                      {errors.phoneNumber && (
                        <small className="text-danger fw-semibold">{errors.phoneNumber}</small>
                      )}
                    </div>

                    {/* SALARY */}
                    <div className="mb-3">
                      <label className="form-label text-dark fw-semibold">Expected Salary *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="expectedSalary"
                        className="form-control"
                        value={formData.expectedSalary}
                        onChange={handleChange}
                        placeholder="50000"
                        style={{
                          borderRadius: '8px',
                          border: '1px solid #dee2e6',
                          padding: '8px 12px',
                          fontSize: '14px',
                          background: 'white'
                        }}
                      />
                      {errors.expectedSalary && (
                        <small className="text-danger fw-semibold">{errors.expectedSalary}</small>
                      )}
                    </div>

                    {/* CV UPLOAD */}
                    <div className="mb-4">
                      <label className="form-label text-dark fw-semibold">Upload CV (PDF Only) *</label>
                      <input
                        type="file"
                        name="cvFile"
                        accept=".pdf"
                        className="form-control"
                        onChange={handleChange}
                        style={{
                          borderRadius: '8px',
                          border: '1px solid #dee2e6',
                          padding: '8px 12px',
                          fontSize: '14px',
                          background: 'white'
                        }}
                      />

                      {formData.cvFile && (
                        <small className="text-muted d-block mt-2 fw-semibold">
                          📄 Selected: {formData.cvFile.name}
                        </small>
                      )}

                      {errors.cvFile && (
                        <small className="text-danger d-block fw-semibold">{errors.cvFile}</small>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      className="btn d-block mx-auto fw-bold py-2 px-4"
                      disabled={isSubmitting}
                      style={{ 
                        minWidth: '180px',
                        background: 'linear-gradient(135deg, #919bff 0%, #133a94 100%)',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '14px',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.target.style.background = 'linear-gradient(135deg, #133a94 0%, #919bff 100%)';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.target.style.background = 'linear-gradient(135deg, #919bff 0%, #133a94 100%)';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;