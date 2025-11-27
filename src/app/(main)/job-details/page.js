"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Select from 'react-select';
import { useRouter } from "next/navigation";

import Navbar from "../componants/navbar";
import FormSelect from "../componants/formSelect";
import ScrollTop from "../componants/scrollTop";
import Footer from "../componants/footer";
import AboutTwo from "../componants/aboutTwo";

import {FiClock, FiMapPin, FiBookmark, FiAward, FiChevronDown, FiChevronUp, FiCalendar} from "../assets/icons/vander"

export default function JobDetails(){
    const router = useRouter();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(5);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [areasOpen, setAreasOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const [keywordsOpen, setKeywordsOpen] = useState(false);
    const [dateOpen, setDateOpen] = useState(false);
    const [salaryRange, setSalaryRange] = useState([0, 50000]);
    const [ageRange, setAgeRange] = useState([0, 45]);
    const [experienceRange, setExperienceRange] = useState([0, 20]);
    const [publishedDate, setPublishedDate] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

const handleApplyNow = async (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
        const response = await fetch('/api/auth/me');
        
        if (response.ok) {
            const userData = await response.json();
            
            if (userData.user && userData.user.au_type === '2') {
                router.push(`/job-apply/${jobId}`);
            } else {
                // ONLY ADD THIS LINE - pass redirect as URL parameter
                router.push(`/login?message=Please login as Job seeker&redirect=/job-apply/${jobId}`);
            }
        } else {
            // ONLY ADD THIS LINE - pass redirect as URL parameter
            router.push(`/login?message=Please login as Job seeker&redirect=/job-apply/${jobId}`);
        }
    } catch (error) {
        // ONLY ADD THIS LINE - pass redirect as URL parameter
        router.push(`/login?message=Please login as Job seeker&redirect=/job-apply/${jobId}`);
    }
};

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/auth/jobs');
            const data = await response.json();
            
            if (response.ok) {
                setJobs(data.jobs || []);
                console.log('Total jobs fetched:', data.jobs?.length || 0);
            } else {
                console.error('Error fetching jobs:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

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

    const getDaysAgo = (dateString) => {
        if (!dateString) return 0;
        const jobDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - jobDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Function to get image source
    const getImageSrc = (job) => {
        if (job.j_image && job.j_image !== '' && job.j_image !== null) {
            return `/api/auth/images/${job.j_image}`;
        }
        return '';
    };

    // Function to extract first degree type
    const getDegreeType = (job) => {
        if (job.j_degree_name && job.j_degree_name !== '') {
            const degrees = job.j_degree_name.split('|').filter(deg => deg.trim() !== '');
            return degrees[0] || 'Any Degree';
        }
        return 'Any Degree';
    };

    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    // Generate page numbers
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pageNumbers.push(i);
                }
            }
        }
        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle slider changes
    const handleSalaryChange = (e, index) => {
        const newValue = parseInt(e.target.value);
        const newRange = [...salaryRange];
        newRange[index] = newValue;
        setSalaryRange(newRange);
    };

    const handleAgeChange = (e, index) => {
        const newValue = parseInt(e.target.value);
        const newRange = [...ageRange];
        newRange[index] = newValue;
        setAgeRange(newRange);
    };

    const handleExperienceChange = (e, index) => {
        const newValue = parseInt(e.target.value);
        const newRange = [...experienceRange];
        newRange[index] = newValue;
        setExperienceRange(newRange);
    };

    // Handle input changes
    const handleSalaryInputChange = (e, index) => {
        const newValue = parseInt(e.target.value) || 0;
        const newRange = [...salaryRange];
        newRange[index] = newValue;
        setSalaryRange(newRange);
    };

    const handleAgeInputChange = (e, index) => {
        const newValue = parseInt(e.target.value) || 0;
        const newRange = [...ageRange];
        newRange[index] = newValue;
        setAgeRange(newRange);
    };

    const handleExperienceInputChange = (e, index) => {
        const newValue = parseInt(e.target.value) || 0;
        const newRange = [...experienceRange];
        newRange[index] = newValue;
        setExperienceRange(newRange);
    };

    // Handle date input click to open date picker
    const handleDateInputClick = () => {
        document.getElementById('publishedDate').showPicker();
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
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Job Details</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading jobs...</p>
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
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                                Job Details - {jobs.length} Jobs Available
                            </h5>
                        </div>
                    </div>
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
                <div className="row justify-content-center">
                    <div className="col-12 mt-4">
                        <div className="features-absolute">
                            <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-4">
                                <FormSelect/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    {/* Sidebar - Aligned with cards */}
                    <div className="col-lg-3 col-md-4 mt-4">
                        <div className="bg-white shadow rounded p-4">
                            {/* Filters Header */}
                            <h5 className="fw-bold mb-3 text-primary">Filters</h5>
                            
                            {/* Quick Filters Section - Collapsible */}
                            <div className="border-bottom pb-3 mb-3">
                                <div 
                                    className="d-flex justify-content-between align-items-center cursor-pointer"
                                    onClick={() => setFiltersOpen(!filtersOpen)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <h6 className="fw-semibold text-primary mb-2">Quick Filters</h6>
                                    {filtersOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                </div>
                                
                                {/* Quick Filters Content */}
                                {filtersOpen && (
                                    <div className="mt-3">
                                        {/* Expected Salary Range */}
                                        <div className="mb-4">
                                            <label className="form-label fw-medium">Expected salary range</label>
                                            <div className="mb-2">
                                                <input 
                                                    type="range" 
                                                    className="form-range" 
                                                    min="0" 
                                                    max="100000" 
                                                    step="1000"
                                                    value={salaryRange[1]}
                                                    onChange={(e) => handleSalaryChange(e, 1)}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-2">
                                                <input 
                                                    type="number" 
                                                    className="form-control form-control-sm" 
                                                    value={salaryRange[0]}
                                                    onChange={(e) => handleSalaryInputChange(e, 0)}
                                                    style={{width: '80px'}}
                                                />
                                                <span className="text-muted">to</span>
                                                <input 
                                                    type="number" 
                                                    className="form-control form-control-sm" 
                                                    value={salaryRange[1]}
                                                    onChange={(e) => handleSalaryInputChange(e, 1)}
                                                    style={{width: '80px'}}
                                                />
                                                <span className="text-muted small">৳</span>
                                            </div>
                                        </div>

                                        {/* Age Range */}
                                        <div className="mb-4">
                                            <label className="form-label fw-medium">Age range</label>
                                            <div className="mb-2">
                                                <input 
                                                    type="range" 
                                                    className="form-range" 
                                                    min="0" 
                                                    max="100" 
                                                    step="1"
                                                    value={ageRange[1]}
                                                    onChange={(e) => handleAgeChange(e, 1)}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-2">
                                                <input 
                                                    type="number" 
                                                    className="form-control form-control-sm" 
                                                    value={ageRange[0]}
                                                    onChange={(e) => handleAgeInputChange(e, 0)}
                                                    style={{width: '80px'}}
                                                />
                                                <span className="text-muted">to</span>
                                                <input 
                                                    type="number" 
                                                    className="form-control form-control-sm" 
                                                    value={ageRange[1]}
                                                    onChange={(e) => handleAgeInputChange(e, 1)}
                                                    style={{width: '80px'}}
                                                />
                                                <span className="text-muted small">years</span>
                                            </div>
                                        </div>

                                        {/* Experience Range */}
                                        <div className="mb-3">
                                            <label className="form-label fw-medium">Total year of experience</label>
                                            <div className="mb-2">
                                                <input 
                                                    type="range" 
                                                    className="form-range" 
                                                    min="0" 
                                                    max="50" 
                                                    step="1"
                                                    value={experienceRange[1]}
                                                    onChange={(e) => handleExperienceChange(e, 1)}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between gap-2">
                                                <input 
                                                    type="number" 
                                                    className="form-control form-control-sm" 
                                                    value={experienceRange[0]}
                                                    onChange={(e) => handleExperienceInputChange(e, 0)}
                                                    style={{width: '80px'}}
                                                />
                                                <span className="text-muted">to</span>
                                                <input 
                                                    type="number" 
                                                    className="form-control form-control-sm" 
                                                    value={experienceRange[1]}
                                                    onChange={(e) => handleExperienceInputChange(e, 1)}
                                                    style={{width: '80px'}}
                                                />
                                                <span className="text-muted small">years</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Areas of Experience Section - Collapsible */}
                            <div className="border-bottom pb-3 mb-3">
                                <div 
                                    className="d-flex justify-content-between align-items-center cursor-pointer"
                                    onClick={() => setAreasOpen(!areasOpen)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <h6 className="fw-semibold text-primary mb-2">Areas of Experience</h6>
                                    {areasOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                </div>
                                
                                {areasOpen && (
                                    <div className="mt-3">
                                        <Select
                                            options={[
                                                { value: 'academic', label: 'Academic' },
                                                { value: 'industry', label: 'Industry' },
                                                { value: 'research', label: 'Research' },
                                                { value: 'teaching', label: 'Teaching' },
                                                { value: 'administration', label: 'Administration' },
                                                { value: 'technical', label: 'Technical' },
                                                { value: 'management', label: 'Management' },
                                                { value: 'creative', label: 'Creative' }
                                            ]}
                                            isMulti
                                            onChange={(selectedOptions) => {
                                                const selectedValues = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
                                                console.log('Selected areas:', selectedValues);
                                            }}
                                            placeholder="Select Areas of Experience"
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
                                                multiValue: (base) => ({
                                                    ...base,
                                                    backgroundColor: '#e7f1ff',
                                                    borderRadius: '4px',
                                                }),
                                                multiValueLabel: (base) => ({
                                                    ...base,
                                                    color: '#0d6efd',
                                                    fontWeight: '500',
                                                }),
                                                multiValueRemove: (base) => ({
                                                    ...base,
                                                    color: '#0d6efd',
                                                    ':hover': {
                                                        backgroundColor: '#0d6efd',
                                                        color: 'white',
                                                    },
                                                }),
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Location Section - Collapsible */}
                            <div className="border-bottom pb-3 mb-3">
                                <div 
                                    className="d-flex justify-content-between align-items-center cursor-pointer"
                                    onClick={() => setLocationOpen(!locationOpen)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <h6 className="fw-semibold text-primary mb-2">Location</h6>
                                    {locationOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                </div>
                                
                                {locationOpen && (
                                    <div className="mt-3">
                                        <input type="text" className="form-control form-control-sm" placeholder="Enter location" />
                                    </div>
                                )}
                            </div>

                            {/* Keywords Section - Collapsible */}
                            <div className="border-bottom pb-3 mb-3">
                                <div 
                                    className="d-flex justify-content-between align-items-center cursor-pointer"
                                    onClick={() => setKeywordsOpen(!keywordsOpen)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <h6 className="fw-semibold text-primary mb-2">Keywords</h6>
                                    {keywordsOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                </div>
                                
                                {keywordsOpen && (
                                    <div className="mt-3">
                                        <input type="text" className="form-control form-control-sm" placeholder="Enter keywords" />
                                    </div>
                                )}
                            </div>

                            {/* Published Date Section - Collapsible */}
                            <div className="border-bottom pb-3 mb-3">
                                <div 
                                    className="d-flex justify-content-between align-items-center cursor-pointer"
                                    onClick={() => setDateOpen(!dateOpen)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <h6 className="fw-semibold text-primary mb-2">Published Date</h6>
                                    {dateOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                </div>
                                
                                {dateOpen && (
                                    <div className="mt-3">
                                        <div className="position-relative">
                                            <input 
                                                type="date" 
                                                id="publishedDate"
                                                className="form-control form-control-sm ps-5" 
                                                value={publishedDate}
                                                onChange={(e) => setPublishedDate(e.target.value)}
                                                style={{cursor: 'pointer'}}
                                            />
                                            <FiCalendar 
                                                className="fea icon-sm position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" 
                                                style={{pointerEvents: 'none'}}
                                            />
                                            <div 
                                                className="position-absolute top-0 start-0 w-100 h-100"
                                                style={{cursor: 'pointer', zIndex: 1}}
                                                onClick={handleDateInputClick}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="btn btn-primary btn-sm w-100">Apply Filters</button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-9 col-md-8">
                        {/* Jobs Count - Now properly separated from sidebar */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="text-muted mb-0">
                                        Showing {currentJobs.length} of {jobs.length} jobs
                                    </h6>
                                    <div className="text-muted">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row g-4">
                            {currentJobs.length > 0 ? (
                                currentJobs.map((job) => {
                                    const imageSrc = getImageSrc(job);
                                    const degreeType = getDegreeType(job);
                                    
                                    return(
                                        <div className="col-12" key={job.j_id}>
                                            <Link href={`/job-detail-one/${job.j_id}`} className="text-decoration-none">
                                                <div className="job-post job-post-list rounded shadow p-3 d-md-flex align-items-center justify-content-between position-relative" style={{maxWidth: '100%', cursor: 'pointer'}}>
                                                    <div className="d-flex align-items-center w-250px">
                                                        {imageSrc ? (
                                                            <div className="position-relative">
                                                                <Image 
                                                                    src={imageSrc} 
                                                                    width={80} 
                                                                    height={80} 
                                                                    className="avatar avatar-small rounded shadow p-2 bg-white" 
                                                                    style={{ objectFit: 'contain' }}  
                                                                    alt={job.j_title || 'Job Image'}
                                                                    onError={(e) => {
                                                                        console.log('Image failed to load:', imageSrc);
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div 
                                                                className="avatar avatar-small rounded shadow p-2 bg-white d-flex align-items-center justify-content-center"
                                                                style={{ width: '70px', height: '70px' }}
                                                            >
                                                                <i className="mdi mdi-briefcase-outline text-muted" style={{ fontSize: '20px' }}></i>
                                                            </div>
                                                        )}

                                                        <div className="ms-3">
                                                            <div className="h5 title text-dark">{job.j_title}</div>
                                                            <span className="text-dark d-block fw-semibold ">{job.j_company_name || job.j_category}</span>
                                                            
                                                            {/* Location and Degree Type below company name */}
                                                            <div className="mt-2">
                                                                <div className="d-flex align-items-center text-muted small mb-1 fw-bold">
                                                                    <FiMapPin className="fea icon-sm me-1 align-middle"/>
                                                                    <span>{job.j_location}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center text-muted small fw-bold">
                                                                    <FiAward className="fea icon-sm me-1 align-middle"/>
                                                                    <span>{degreeType}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px">
                                                        <span className="badge bg-soft-primary rounded-pill">{getEmploymentType(job.j_employment_status)}</span>
                                                        <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
                                                            <FiClock className="fea icon-sm me-1 align-middle"/>
                                                            {getDaysAgo(job.j_created_at || job.j_date)} days ago
                                                        </span>
                                                    </div>

                                                    <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
                                                        {/* Salary */}
                                                        <span className="d-flex fw-medium text-primary">{job.j_salary || 'Negotiable'}</span>
                                                        <span className="text-muted d-flex align-items-center mt-md-2">
                                                            <FiBookmark className="fea icon-sm me-1 align-middle"/>
                                                            {getWorkplace(job.j_work_place)}
                                                        </span>
                                                    </div>

                                                    <div className="mt-4 mt-md-0">
                                                        <button className="btn btn-sm btn-icon btn-pills btn-soft-primary bookmark">
                                                            <FiBookmark className="icons"/>
                                                        </button>
                                                        <button 
                                                            onClick={(e) => handleApplyNow(e, job.j_id)}
                                                            className="btn btn-sm btn-primary w-full ms-md-1"
                                                        >
                                                            Apply Now
                                                        </button>

    {/* Deadline Display */}
    {job.j_deadline && (
        <div className="mt-3 text-center">
            <small className="text-muted d-flex align-items-center justify-content-center">
                <FiCalendar className="fea icon-sm me-1 align-middle"/>
                Deadline: {new Date(job.j_deadline).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}
            </small>
        </div>
    )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <div className="text-muted">
                                        <i className="mdi mdi-briefcase-off-outline display-4"></i>
                                        <h5 className="mt-3">No jobs found</h5>
                                        <p>There are currently no job listings available.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="row">
                                <div className="col-12 mt-4 pt-2">
                                    <ul className="pagination justify-content-center mb-0">
                                        {/* Previous Button */}
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                aria-label="Previous"
                                            >
                                                <i className="mdi mdi-chevron-left fs-6"></i>
                                            </button>
                                        </li>

                                        {/* Page Numbers */}
                                        {pageNumbers.map(number => (
                                            <li 
                                                key={number} 
                                                className={`page-item ${currentPage === number ? 'active' : ''}`}
                                            >
                                                <button 
                                                    className="page-link" 
                                                    onClick={() => handlePageChange(number)}
                                                >
                                                    {number}
                                                </button>
                                            </li>
                                        ))}

                                        {/* Next Button */}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                aria-label="Next"
                                            >
                                                <i className="mdi mdi-chevron-right fs-6"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AboutTwo/>
        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}