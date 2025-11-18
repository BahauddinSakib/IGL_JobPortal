"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../../componants/navbar";
import Footer from "../../componants/footer";
import ScrollTop from "../../componants/scrollTop";

export default function JobApply({ params }){
    const [job, setJob] = useState(null);
    const [jobTypes, setJobTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: "",
        jobTitle: "",
        jobType: ""
    });

    useEffect(() => {
        if (params.id) {
            fetchJobDetails();
            fetchJobTypes();
        }
    }, [params.id]);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/auth/jobs?id=${params.id}`);
            const data = await response.json();
            
            if (response.ok && data.job) {
                setJob(data.job);
                // Pre-fill job title
                setFormData(prev => ({
                    ...prev,
                    jobTitle: data.job.j_title
                }));
            } else {
                console.error('Error fetching job:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchJobTypes = async () => {
        try {
            const response = await fetch('/api/auth/job-types');
            const data = await response.json();
            
            if (response.ok) {
                setJobTypes(data);
            } else {
                console.error('Error fetching job types:', data.error);
            }
        } catch (error) {
            console.error('Error fetching job types:', error);
        }
    };

    const getJobTypeDisplayName = (jobTypeId) => {
        if (!jobTypeId || !jobTypes.length) return "";
        
        const jobType = jobTypes.find(type => type.jt_id === parseInt(jobTypeId));
        return jobType ? jobType.display_name : "";
    };

    const getImageSrc = (job) => {
        if (job?.j_image && job.j_image !== '' && job.j_image !== null) {
            return `/api/auth/images/${job.j_image}`;
        }
        return '/images/company/lenovo-logo.png';
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form data:', formData);
        console.log('Applying for job ID:', params.id);
        // Add your form submission logic
    };

    if (loading) {
        return (
            <>
            <Navbar navClass="defaultscroll sticky" navLight={true}/>
            <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/hero/bg.jpg')", backgroundPosition:'top'}}>
                <div className="bg-overlay bg-gradient-overlay"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <div className="spinner-border text-light mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-3">Loading Job Application...</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading job details...</p>
            </div>
            </>
        );
    }

    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/hero/bg.jpg')", backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <Image 
                                src={getImageSrc(job)} 
                                width={65} 
                                height={65} 
                                className="avatar avatar-small rounded-pill p-2 bg-white" 
                                alt={job?.j_company_name}
                                onError={(e) => {
                                    e.target.src = '/images/company/lenovo-logo.png';
                                }}
                            />
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-3">
                                {job?.j_title || 'Job Application'}
                            </h5>
                            <p className="text-white-50 mb-0 mt-2">{job?.j_company_name}</p>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link href="/">Jobnova</Link></li>
                            <li className="breadcrumb-item"><Link href="/job-details">Jobs</Link></li>
                            <li className="breadcrumb-item"><Link href={`/job-detail-one/${params.id}`}>Job Details</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Job Apply</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>

        <section className="section bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-7">
                        <div className="card border-0">
                            <form className="rounded shadow p-4" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Your Name :<span className="text-danger">*</span></label>
                                            <input 
                                                name="fullName" 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Your full name"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Your Email :<span className="text-danger">*</span></label>
                                            <input 
                                                name="email" 
                                                type="email" 
                                                className="form-control" 
                                                placeholder="Your email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div> 
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Your Phone no. :<span className="text-danger">*</span></label>
                                            <input 
                                                name="phone" 
                                                type="tel" 
                                                className="form-control" 
                                                placeholder="Your phone number"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div> 
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Job Title :</label>
                                            <input 
                                                name="jobTitle" 
                                                className="form-control" 
                                                value={formData.jobTitle}
                                                readOnly
                                            />
                                        </div>                                                                               
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Job Type :</label>
                                            <select 
                                                className="form-control form-select" 
                                                name="jobType"
                                                value={formData.jobType || getJobTypeDisplayName(job?.j_type_id)}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Job Type</option>
                                                {jobTypes.map((jobType) => (
                                                    <option key={jobType.jt_id} value={jobType.display_name}>
                                                        {jobType.display_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Cover Letter :</label>
                                            <textarea 
                                                name="coverLetter" 
                                                rows="4" 
                                                className="form-control" 
                                                placeholder="Why are you interested in this position?"
                                                value={formData.coverLetter}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                    </div>                                    
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label fw-semibold">Upload Your CV / Resume :<span className="text-danger">*</span></label>
                                            <input 
                                                className="form-control" 
                                                type="file" 
                                                name="resume"
                                                onChange={handleInputChange}
                                                accept=".pdf,.doc,.docx"
                                                required
                                            />
                                        </div>                                                                               
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    required
                                                />
                                                <label className="form-check-label"><span className="text-danger">*</span>I Accept <Link href="#" className="text-primary">Terms And Condition</Link></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary w-100">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>  
                </div>
            </div>
        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}