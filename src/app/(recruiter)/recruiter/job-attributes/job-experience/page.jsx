"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const JobExperiencePage = () => {
  const [jobExperiences, setJobExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch job experiences
  const fetchJobExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/job-experience');
      const data = await response.json();
      if (Array.isArray(data)) {
        setJobExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching job experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobExperiences();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job experience?')) {
      try {
        const response = await fetch(`/api/auth/job-experience/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Job experience deleted successfully!');
          fetchJobExperiences();
        } else {
          alert('Error deleting job experience');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting job experience');
      }
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">JOB EXPERIENCE</h1>
        <Link
          href="/admin/job-attributes/job-experience/create"
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <i className="mdi mdi-plus"></i>
          Create Job Experience
        </Link>
      </div>

      {/* Job Experiences Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          {/* <h5 className="mb-0 text-dark fw-bold">All Job Experiences</h5> */}
          <span className="text-muted">Total: {jobExperiences.length} experiences</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">EXPERIENCE LEVEL</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">CREATED AT</th>
                    <th scope="col">OPERATIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {jobExperiences.length > 0 ? (
                    jobExperiences.map((experience) => (
                      <tr key={experience.je_id}>
                        <td className="fw-semibold">{experience.je_id}</td>
                        <td className="fw-bold text-dark">{experience.je_experience}</td>
                        <td>
                          <span 
                            className={`badge ${experience.je_status === 1 ? 'bg-success' : 'bg-warning text-dark'}`}
                            style={{
                              backgroundColor: experience.je_status === 1 ? '' : '#ffc107',
                              color: experience.je_status === 1 ? '' : '#000000',
                              fontWeight: 'bold'
                            }}
                          >
                            {experience.je_status === 1 ? 'Published' : 'Not Published'}
                          </span>
                        </td>
                        <td>
                          {new Date(experience.je_createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link
                              href={`/admin/job-attributes/job-experience/${experience.je_id}`}
                              className="btn btn-outline-primary"
                            >
                              <i className="mdi mdi-pencil me-1"></i>
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(experience.je_id)}
                              className="btn btn-outline-danger"
                            >
                              <i className="mdi mdi-delete me-1"></i>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <div className="text-muted">
                          <i className="mdi mdi-inbox-outline fa-2x mb-2"></i>
                          <p>No job experiences found</p>
                          <Link 
                            href="/admin/job-attributes/job-experience/create"
                            className="btn btn-sm btn-primary"
                          >
                            Create First Job Experience
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobExperiencePage;