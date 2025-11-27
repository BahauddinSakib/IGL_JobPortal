"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../../componants/navbar";
import Footer from "../../componants/footer";
import ScrollTop from "../../componants/scrollTop";

import {FiLayout, FiMapPin,FiUserCheck, FiClock, FiMonitor, FiBriefcase, FiBook, FiDollarSign, FiArrowRight} from "../../assets/icons/vander"

export default function JobDetailOne(props){
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedJobs, setRelatedJobs] = useState([]);

    useEffect(() => {
        if (props.params?.id) {
            fetchJobDetails();
            fetchRelatedJobs();
        }
    }, [props.params?.id]);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/auth/jobs?id=${props.params.id}`);
            const data = await response.json();
            
            if (response.ok && data.job) {
                setJob(data.job);
            } else {
                console.error('Error fetching job:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedJobs = async () => {
        try {
            const response = await fetch('/api/auth/jobs');
            const data = await response.json();
            
            if (response.ok && data.jobs) {
                // Filter related jobs (exclude current job)
                const related = data.jobs
                    .filter(j => j.j_id != props.params.id)
                    .slice(0, 3);
                setRelatedJobs(related);
            }
        } catch (error) {
            console.error('Error fetching related jobs:', error);
        }
    };

    // Helper functions
    const getEmploymentType = (status) => {
        const types = {
            1: "Full-time",
            2: "Part-time", 
            3: "Contractual",
            4: "Intern",
            5: "Freelance"
        };
        return types[status] || "Full-time";
    };

    const getWorkplace = (workplace) => {
        return workplace === 1 ? "From Office" : "From Home";
    };

    const getImageSrc = (job) => {
        if (job?.j_image && job.j_image !== '' && job.j_image !== null) {
            return `/api/auth/images/${job.j_image}`;
        }
        return '/images/company/lenovo-logo.png';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const getDaysAgo = (dateString) => {
        if (!dateString) return 0;
        const jobDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - jobDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    if (loading) {
        return (
            <>
            <Navbar navClass="defaultscroll sticky" navLight={true}/>
            <section className="bg-half-170 d-table w-100" style={{backgroundImage:'url("/images/hero/bg.jpg")', backgroundPosition:'top'}}>
                <div className="bg-overlay bg-gradient-overlay"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <div className="spinner-border text-light mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-3">Loading Job Details...</h5>
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

    if (!job) {
        return (
            <>
            <Navbar navClass="defaultscroll sticky" navLight={true}/>
            <section className="bg-half-170 d-table w-100" style={{backgroundImage:'url("/images/hero/bg.jpg")', backgroundPosition:'top'}}>
                <div className="bg-overlay bg-gradient-overlay"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-3">Job Not Found</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container text-center py-5">
                <p>Sorry, the job you're looking for doesn't exist.</p>
                <Link href="/job-details" className="btn btn-primary">Back to Jobs</Link>
            </div>
            </>
        );
    }

    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-170 d-table w-100" style={{backgroundImage:'url("/images/hero/bg.jpg")', backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <Image 
                                src={getImageSrc(job)} 
                                height={65} 
                                width={65} 
                                className="avatar avatar-small rounded-pill p-2 bg-white" 
                                alt={job.j_company_name}
                                onError={(e) => {
                                    e.target.src = '/images/company/lenovo-logo.png';
                                }}
                            />
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-3">{job.j_title}</h5>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link href="/">Jobnova</Link></li>
                            <li className="breadcrumb-item"><Link href="/job-details">Jobs</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Job Detail</li>
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

        <section className="section">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="card bg-white rounded shadow sticky-bar">
                            <div className="p-4">
                                <h5 className="mb-0">Job Information</h5>
                            </div>

                            <div className="card-body p-4 border-top">
                                <div className="d-flex widget align-items-center">
                                    <FiLayout className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Company Name:</h6>
                                        <small className="text-primary mb-0">{job.j_company_name}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiUserCheck className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Employee Type:</h6>
                                        <small className="text-primary mb-0">{getEmploymentType(job.j_employment_status)}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiMapPin className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Location:</h6>
                                        <small className="text-primary mb-0">{job.j_location}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiMonitor className="fea icon-ex-md me-3" />
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Job Category:</h6>
                                        <small className="text-primary mb-0">{job.j_category}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiBriefcase className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Workplace:</h6>
                                        <small className="text-primary mb-0">{getWorkplace(job.j_work_place)}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiBook className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Qualifications:</h6>
                                        <small className="text-primary mb-0">
                                            {job.j_degree_name ? job.j_degree_name.split('|')[0] : 'Not Specified'}
                                        </small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiDollarSign className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Salary:</h6>
                                        <small className="text-primary mb-0">{job.j_salary || 'Negotiable'}</small>
                                    </div>
                                </div>

                                <div className="d-flex widget align-items-center mt-3">
                                    <FiClock className="fea icon-ex-md me-3"/>
                                    <div className="flex-1">
                                        <h6 className="widget-title mb-0">Date posted:</h6>
                                        <small className="text-primary mb-0">{formatDate(job.j_created_at || job.j_date)}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-6 col-12">
                        <h5>Job Description: </h5>
                        <p className="text-muted">{job.j_description || 'No description provided.'}</p>
                        
                        <h5 className="mt-4">Candidate Requirements: </h5>
                        
                        {/* Gender Requirement */}
                        {job.j_gender && job.j_gender !== 3 && (
                            <div className="mb-3">
                                <strong>Gender: </strong>
                                <span className="text-muted">
                                    {job.j_gender === 1 ? 'Only Male' : job.j_gender === 2 ? 'Only Female' : 'Any Gender'}
                                </span>
                            </div>
                        )}

                        {/* Age Requirement */}
                        {job.j_age && (
                            <div className="mb-3">
                                <strong>Age Range: </strong>
                                <span className="text-muted">{job.j_age}</span>
                            </div>
                        )}

                        {/* Educational Qualifications */}
                        {job.j_degree_name && (
                            <div className="mb-3">
                                <strong>Educational Qualifications: </strong>
                                <ul className="list-unstyled mt-2">
                                    {job.j_degree_name.split('|').map((degree, index) => (
                                        <li key={index} className="text-muted">
                                            <FiArrowRight className="fea icon-sm text-primary me-2"/>
                                            {degree}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Skills Required */}
{job.j_skills && (
    <div className="mb-4">
        <strong>Skills Required: </strong>
        <ul className="list-unstyled mt-2">
            {job.j_skills.split(/\.(?=\s+[A-Z])/).map((skill, index) => {
                const trimmedSkill = skill.trim();
                return trimmedSkill && (
                    <li key={index} className="text-muted mb-2">
                        <FiArrowRight className="fea icon-sm text-primary me-2"/>
                        {trimmedSkill}
                    </li>
                );
            })}
        </ul>
    </div>
)}
                        <div className="mt-4">
                              <Link href={`/job-apply/${job.j_id}`} className="btn btn-sm btn-primary w-full ms-md-1">
                                                            Apply Now
                              </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Jobs Section */}
            {relatedJobs.length > 0 && (
                <div className="container mt-100 mt-60">
                    <div className="row justify-content-center mb-4 pb-2">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h4 className="title mb-3">Related Vacancies</h4>
                                <p className="text-muted para-desc mx-auto mb-0">Other job opportunities you might be interested in.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {relatedJobs.map((relatedJob) => (
                            <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={relatedJob.j_id}>
                                <div className="job-post rounded shadow p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Image 
                                                src={getImageSrc(relatedJob)} 
                                                width={65} 
                                                height={65} 
                                                className="avatar avatar-small rounded shadow p-3 bg-white" 
                                                alt={relatedJob.j_company_name}
                                                onError={(e) => {
                                                    e.target.src = '/images/company/lenovo-logo.png';
                                                }}
                                            />
                
                                            <div className="ms-3">
                                                <Link href={`/job-detail-one/${relatedJob.j_id}`} className="h5 company text-dark">
                                                    {relatedJob.j_company_name}
                                                </Link>
                                                <span className="text-muted d-flex align-items-center small mt-2">
                                                    <FiClock className="fea icon-sm me-1"/> 
                                                    {getDaysAgo(relatedJob.j_created_at || relatedJob.j_date)} days ago
                                                </span>
                                            </div>
                                        </div>

                                        <span className="badge bg-soft-primary">
                                            {getEmploymentType(relatedJob.j_employment_status)}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <Link href={`/job-detail-one/${relatedJob.j_id}`} className="text-dark title h5">
                                            {relatedJob.j_title}
                                        </Link>

                                        <span className="text-muted d-flex align-items-center mt-2">
                                            <FiMapPin className="fea icon-sm me-1"/>
                                            {relatedJob.j_location}
                                        </span>

                                        <div className="mt-3">
                                            <span className="text-dark fw-medium">{relatedJob.j_salary || 'Negotiable'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}