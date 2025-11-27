"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const DegreeTypePage = () => {
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Fetch degree types
  const fetchDegreeTypes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/degree-type?page=${currentPage}&limit=${itemsPerPage}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      
      // Handle different possible response structures
      if (Array.isArray(data)) {
        // If API returns direct array (no pagination)
        setDegreeTypes(data);
        setTotalItems(data.length);
      } else if (data && Array.isArray(data.degreeTypes)) {
        // If API returns paginated response
        setDegreeTypes(data.degreeTypes);
        setTotalItems(data.totalCount || data.totalItems || data.degreeTypes.length);
      } else if (data && Array.isArray(data.data)) {
        // If API returns data in 'data' property
        setDegreeTypes(data.data);
        setTotalItems(data.totalCount || data.totalItems || data.data.length);
      } else {
        console.error('Unexpected API response structure:', data);
        setDegreeTypes([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Error fetching degree types:', error);
      // Fallback to original API without pagination
      try {
        const fallbackResponse = await fetch('/api/auth/degree-type');
        const fallbackData = await fallbackResponse.json();
        if (Array.isArray(fallbackData)) {
          setDegreeTypes(fallbackData);
          setTotalItems(fallbackData.length);
        }
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
        setDegreeTypes([]);
        setTotalItems(0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDegreeTypes();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this degree type?')) {
      try {
        const response = await fetch(`/api/auth/degree-type/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Degree type deleted successfully!');
          // Reset to first page after deletion to maintain consistent view
          if (degreeTypes.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else {
            fetchDegreeTypes();
          }
        } else {
          alert('Error deleting degree type');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting degree type');
      }
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  // Get current page data for display
  const getCurrentPageData = () => {
    if (degreeTypes.length <= itemsPerPage) {
      return degreeTypes;
    }
    return degreeTypes.slice(startIndex, endIndex);
  };

  const currentPageData = getCurrentPageData();

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">DEGREE TYPES</h1>
        <Link
          href="/admin/job-attributes/degree-type/create"
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <i className="mdi mdi-plus"></i>
          Create Degree Type
        </Link>
      </div>

      {/* Degree Types Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <span className="text-muted">
            Showing {currentPageData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, startIndex + currentPageData.length)} of {totalItems} entries
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
                      <th scope="col">DEGREE NAME</th>
                      <th scope="col">LEVEL</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">CREATED AT</th>
                      <th scope="col">OPERATIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.length > 0 ? (
                      currentPageData.map((degree) => (
                        <tr key={degree.dt_id}>
                          <td className="fw-semibold">{degree.dt_id}</td>
                          <td className="fw-bold text-dark">{degree.dt_name}</td>
                          <td className="text-dark">{degree.dt_level}</td>
                          <td>
                            <span 
                              className={`badge ${degree.dt_status === 1 ? 'bg-success' : 'bg-warning text-dark'}`}
                            >
                              {degree.dt_status === 1 ? 'Published' : 'Not Published'}
                            </span>
                          </td>
                          <td>
                            {new Date(degree.dt_createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <Link
                                href={`/admin/job-attributes/degree-type/${degree.dt_id}`}
                                className="btn btn-outline-primary"
                              >
                                <i className="mdi mdi-pencil me-1"></i>
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(degree.dt_id)}
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
                        <td colSpan={6} className="text-center py-4">
                          <div className="text-muted">
                            <i className="mdi mdi-inbox-outline fa-2x mb-2"></i>
                            <p>No degree types found</p>
                            <Link 
                              href="/admin/job-attributes/degree-type/create"
                              className="btn btn-sm btn-primary"
                            >
                              Create First Degree Type
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
                <div className="card-footer bg-light">
                  <div className="d-flex justify-content-start align-items-center">
                    <span className="text-muted small me-3">
                      Page {currentPage} of {totalPages}
                    </span>
                    <ul className="pagination pagination-sm mb-0">
                      {/* Previous Page */}
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>

                      {/* Page Numbers */}
                      {getPageNumbers().map(page => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}

                      {/* Next Page */}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                    <span className="text-muted small ms-3">
                      {itemsPerPage} per page
                    </span>
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

export default DegreeTypePage;