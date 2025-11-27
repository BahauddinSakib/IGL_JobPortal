'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiClock, FiMapPin, FiBookmark } from "../assets/icons/vander";

export default function PopularJobs() {
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Fetch jobs from your existing API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                console.log('Fetching jobs from API...');
                const response = await fetch('/api/auth/jobs');
                console.log('API Response status:', response.status);
                
                const data = await response.json();
                console.log('API Response data:', data);
                
                if (data.success) {
                    setJobData(data.jobs || []);
                    console.log('Jobs loaded:', data.jobs?.length || 0);
                } else {
                    setError(data.error || 'Failed to fetch jobs');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Function to calculate days ago
    const getDaysAgo = (dateString) => {
        if (!dateString) return 'Recently';
        
        const jobDate = new Date(dateString);
        const currentDate = new Date();
        const timeDiff = currentDate - jobDate;
        const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysAgo === 0) return 'Today';
        if (daysAgo === 1) return '1 day ago';
        return `${daysAgo} days ago`;
    };

    // Function to get company logo
    const getCompanyLogo = (job) => {
        if (job.j_image) {
            return `/uploads/jobs/${job.j_image}`;
        }
        return '/images/company/default-logo.png';
    };

    // Handle bookmark click to prevent card click
    const handleBookmarkClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Add your bookmark logic here
        console.log('Bookmark clicked');
    };

    // Handle apply now click - check user authentication like job-details page
    const handleApplyNow = async (e, jobId) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            const response = await fetch('/api/auth/me');
            
            if (response.ok) {
                const userData = await response.json();
                
                if (userData.user && userData.user.au_type === '2') {
                    // User is job seeker, go to apply page
                    router.push(`/job-apply/${jobId}`);
                } else {
                    // User is not job seeker, redirect to login
                    router.push(`/login?message=Please login as Job seeker&redirect=/job-apply/${jobId}`);
                }
            } else {
                // Not logged in, redirect to login
                router.push(`/login?message=Please login as Job seeker&redirect=/job-apply/${jobId}`);
            }
        } catch (error) {
            // Error fetching user data, redirect to login
            router.push(`/login?message=Please login as Job seeker&redirect=/job-apply/${jobId}`);
        }
    };

    if (loading) {
        return (
            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading jobs...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="alert alert-danger">
                            Error loading jobs: {error}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-100 mt-60">
            <div className="row justify-content-center mb-4 pb-2">
                <div className="col-12">
                    <div className="section-title text-center">
                        <h4 className="title mb-3">Popular Job Listing</h4>
                        <p className="text-muted para-desc mx-auto mb-0">
                            Search all the open positions on the web. Get your own personalized salary estimate. 
                            Read reviews on over 30000+ companies worldwide.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row g-4 mt-0">
                {jobData.length > 0 ? (
                    jobData.slice(0, 8).map((job) => {
                        return (
                            <div className="col-12" key={job.j_id}>
                                <Link href={`/job-detail-one/${job.j_id}`} className="text-decoration-none">
                                    <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative cursor-pointer hover-shadow">
                                        <div className="d-flex align-items-center w-310px">
                                            <Image 
                                                src={getCompanyLogo(job)} 
                                                width={65} 
                                                height={65} 
                                                className="avatar avatar-small rounded shadow p-3 bg-white" 
                                                alt={job.j_company_name}
                                                onError={(e) => {
                                                    e.target.src = '/images/company/default-logo.png';
                                                }}
                                            />
            
                                            <div className="ms-3">
                                                <div className="h5 title text-dark">{job.j_title}</div>
                                                <p className="text-muted mb-0 small">{job.j_company_name}</p>
                                                <span className="badge bg-soft-info rounded-pill small">
                                                    {job.j_company_type}
                                                </span>
                                            </div>
                                        </div>
            
                                        <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px">
                                            <span className="badge bg-soft-primary rounded-pill">
                                                {job.j_employment_status === '1' ? 'Full-time' : 
                                                 job.j_employment_status === '2' ? 'Part-time' : 
                                                 job.j_employment_status === '3' ? 'Contract' : 'Remote'}
                                            </span>
                                            <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
                                                <FiClock className="fea icon-sm me-1 align-middle"/>
                                                {getDaysAgo(job.j_created_at)}
                                            </span>
                                        </div>
            
                                        <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
                                            <span className="text-muted d-flex align-items-center">
                                                <FiMapPin className="fea icon-sm me-1 align-middle"/>
                                                {job.j_location}
                                            </span>
                                            <span className="d-flex fw-medium mt-md-2">
                                                {job.j_salary || 'Negotiable'}
                                            </span>
                                        </div>
            
                                        <div className="mt-3 mt-md-0">
                                            <button 
                                                onClick={handleBookmarkClick}
                                                className="btn btn-sm btn-icon btn-pills btn-soft-primary bookmark"
                                            >
                                                <FiBookmark className="icons"/>
                                            </button>
                                            <button 
                                                onClick={(e) => handleApplyNow(e, job.j_id)}
                                                className="btn btn-sm btn-primary w-full ms-md-1"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                ) : (
                    <div className="col-12 text-center">
                        <div className="alert alert-info">
                            No jobs available at the moment. Please check back later.
                            <br />
                            <small>Check browser console for API response details.</small>
                        </div>
                    </div>
                )}

                {jobData.length > 0 && (
                    <div className="col-12">
                        <div className="text-center">
                            <Link href="/job-details" className="btn btn-link primary text-muted">
                                See More Jobs <i className="mdi mdi-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}