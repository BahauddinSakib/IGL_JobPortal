"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const JobSkillsPage = () => {
  const [jobSkills, setJobSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 items per page

  // Fetch job skills
  const fetchJobSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/job-skills');
      const data = await response.json();
      if (Array.isArray(data)) {
        setJobSkills(data);
      }
    } catch (error) {
      console.error('Error fetching job skills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobSkills();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job skill?')) {
      try {
        const response = await fetch(`/api/auth/job-skills/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Job skill deleted successfully!');
          fetchJobSkills();
        } else {
          alert('Error deleting job skill');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting job skill');
      }
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(jobSkills.length / itemsPerPage);
  
  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobSkills.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Show limited page numbers
  const getDisplayedPageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers;
    }
    
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">JOB SKILLS</h1>
        <Link
          href="/admin/job-attributes/job-skills/create"
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <i className="mdi mdi-plus"></i>
          Create Job Skill
        </Link>
      </div>

      {/* Job Skills Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <span className="text-muted">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, jobSkills.length)} of {jobSkills.length} skills
          </span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">SKILL NAME</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">CREATED AT</th>
                      <th scope="col">OPERATIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((skill) => (
                        <tr key={skill.js_id}>
                          <td className="fw-semibold">{skill.js_id}</td>
                          <td className="fw-bold text-dark">{skill.js_name}</td>
                          <td>
                            <span 
                              className={`badge ${skill.js_status === 1 ? 'bg-success' : 'bg-warning text-dark'}`}
                              style={{
                                backgroundColor: skill.js_status === 1 ? '' : '#ffc107',
                                color: skill.js_status === 1 ? '' : '#000000',
                                fontWeight: 'bold'
                              }}
                            >
                              {skill.js_status === 1 ? 'Published' : 'Not Published'}
                            </span>
                          </td>
                          <td>
                            {new Date(skill.js_createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <Link
                                href={`/admin/job-attributes/job-skills/${skill.js_id}`}
                                className="btn btn-outline-primary"
                              >
                                <i className="mdi mdi-pencil me-1"></i>
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(skill.js_id)}
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
                            <p>No job skills found</p>
                            <Link 
                              href="/admin/job-attributes/job-skills/create"
                              className="btn btn-sm btn-primary"
                            >
                              Create First Job Skill
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Aligned to Left */}
              {totalPages > 1 && (
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Pagination on Left */}
                    <nav aria-label="Job skills pagination">
                      <ul className="pagination mb-0">
                        {/* Previous Button */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <i className="mdi mdi-chevron-left"></i> Previous
                          </button>
                        </li>

                        {/* First Page */}
                        {currentPage > 3 && (
                          <>
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => paginate(1)}
                              >
                                1
                              </button>
                            </li>
                            {currentPage > 4 && (
                              <li className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            )}
                          </>
                        )}

                        {/* Page Numbers */}
                        {getDisplayedPageNumbers().map((number) => (
                          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => paginate(number)}
                            >
                              {number}
                            </button>
                          </li>
                        ))}

                        {/* Last Page */}
                        {currentPage < totalPages - 2 && (
                          <>
                            {currentPage < totalPages - 3 && (
                              <li className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            )}
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => paginate(totalPages)}
                              >
                                {totalPages}
                              </button>
                            </li>
                          </>
                        )}

                        {/* Next Button */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next <i className="mdi mdi-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>

                    {/* Page Info on Right */}
                    <div className="text-muted">
                      <small>
                        Page {currentPage} of {totalPages}
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSkillsPage;