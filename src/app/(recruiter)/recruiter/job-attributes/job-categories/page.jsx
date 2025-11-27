"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const JobCategoriesPage = () => {
  const [jobCategories, setJobCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 items per page

  // Fetch job categories
  const fetchJobCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/job-categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch job categories');
      }
      
      const data = await response.json();
      setJobCategories(data);
    } catch (error) {
      console.error('Error fetching job categories:', error);
      alert('Error loading job categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobCategories();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job category?')) {
      try {
        const response = await fetch(`/api/auth/job-categories/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Job category deleted successfully!');
          fetchJobCategories();
        } else {
          const result = await response.json();
          alert(result.error || 'Error deleting job category');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting job category');
      }
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(jobCategories.length / itemsPerPage);
  
  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobCategories.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Show limited page numbers (e.g., 1,2,3... or current-1, current, current+1)
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
        <h1 className="h3 mb-0 text-dark fw-bold">JOB CATEGORIES</h1>
        <Link
          href="/admin/job-attributes/job-categories/create"
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <i className="mdi mdi-plus"></i>
          Create Job Category
        </Link>
      </div>

      {/* Job Categories Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-dark fw-bold">All Job Categories</h5>
          <span className="text-muted">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, jobCategories.length)} of {jobCategories.length} categories
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
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Description</th>
                      <th>Skills</th>
                      <th>Vacancy</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((category) => (
                      <tr key={category.jc_id}>
                        <td>{category.jc_id}</td>
                        <td>{category.jc_title}</td>
                        <td>{category.jc_category}</td>
                        <td>{category.jc_location}</td>
                        <td>
                          {category.jc_description ? (
                            <span title={category.jc_description}>
                              {category.jc_description.length > 50 
                                ? `${category.jc_description.substring(0, 50)}...` 
                                : category.jc_description
                              }
                            </span>
                          ) : (
                            <span className="text-muted">No description</span>
                          )}
                        </td>
                        <td>
                          {category.jc_skills ? (
                            <span title={category.jc_skills}>
                              {category.jc_skills.length > 30 
                                ? `${category.jc_skills.substring(0, 30)}...` 
                                : category.jc_skills
                              }
                            </span>
                          ) : (
                            <span className="text-muted">No skills</span>
                          )}
                        </td>
                        <td>{category.jc_vacancy}</td>
                        <td>
                          <span className={`badge ${category.jc_status === 1 ? 'bg-success' : 'bg-warning'}`}>
                            {category.jc_status === 1 ? 'Published' : 'Not Published'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <Link
                              href={`/admin/job-attributes/job-categories/edit/${category.jc_id}`}
                              className="btn btn-sm btn-primary"
                            >
                              Edit
                            </Link>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(category.jc_id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="card-footer">
                  <nav aria-label="Job categories pagination">
                    <ul className="pagination justify-content-center mb-0">
                      {/* Previous Button */}
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>

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

                      {/* Next Button */}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                  
                  {/* Page Info */}
                  <div className="text-center mt-2">
                    <small className="text-muted">
                      Page {currentPage} of {totalPages}
                    </small>
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

export default JobCategoriesPage;