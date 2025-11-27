"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const DegreeLevelPage = () => {
  const [degreeLevels, setDegreeLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Fetch degree levels
  const fetchDegreeLevels = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/degree-level?page=${currentPage}&limit=${itemsPerPage}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch degree levels');
      }
      
      const data = await response.json();
      
      // Handle different API response structures
      if (Array.isArray(data)) {
        // If API returns direct array (no pagination)
        setDegreeLevels(data);
        setTotalItems(data.length);
      } else if (data && Array.isArray(data.degreeLevels)) {
        // If API returns paginated response
        setDegreeLevels(data.degreeLevels);
        setTotalItems(data.totalCount || data.totalItems || data.degreeLevels.length);
      } else if (data && Array.isArray(data.data)) {
        // If API returns data in 'data' property
        setDegreeLevels(data.data);
        setTotalItems(data.totalCount || data.totalItems || data.data.length);
      } else {
        // Fallback to original structure
        setDegreeLevels(data || []);
        setTotalItems(data?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching degree levels:', error);
      // Fallback to original API without pagination
      try {
        const fallbackResponse = await fetch('/api/auth/degree-level');
        const fallbackData = await fallbackResponse.json();
        if (Array.isArray(fallbackData)) {
          setDegreeLevels(fallbackData);
          setTotalItems(fallbackData.length);
        }
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
        setDegreeLevels([]);
        setTotalItems(0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDegreeLevels();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this degree level?')) {
      try {
        const response = await fetch(`/api/auth/degree-level/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Degree level deleted successfully!');
          // Reset to first page if we deleted the last item on current page
          if (degreeLevels.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          } else {
            fetchDegreeLevels();
          }
        } else {
          const result = await response.json();
          alert(result.error || 'Error deleting degree level');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting degree level');
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
    if (degreeLevels.length <= itemsPerPage) {
      return degreeLevels;
    }
    return degreeLevels.slice(startIndex, endIndex);
  };

  const currentPageData = getCurrentPageData();

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">DEGREE LEVELS</h1>
        <Link
          href="/admin/job-attributes/degree-level/create"
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <i className="mdi mdi-plus"></i>
          Create Degree Level
        </Link>
      </div>

      {/* Degree Levels Table */}
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
                      <th scope="col">DEGREE LEVEL</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">CREATED AT</th>
                      <th scope="col">OPERATIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.length > 0 ? (
                      currentPageData.map((level) => (
                        <tr key={level.dl_id}>
                          <td className="fw-semibold">{level.dl_id}</td>
                          <td className="fw-bold text-dark">{level.dl_name}</td>
                          <td>
                            <span 
                              className={`badge ${level.dl_status === 1 ? 'bg-success' : 'bg-warning text-dark'}`}
                            >
                              {level.dl_status === 1 ? 'Published' : 'Not Published'}
                            </span>
                          </td>
                          <td>
                            {new Date(level.dl_created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <Link
                                href={`/admin/job-attributes/degree-level/${level.dl_id}`}
                                className="btn btn-outline-primary"
                              >
                                <i className="mdi mdi-pencil me-1"></i>
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(level.dl_id)}
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
                            <p>No degree levels found</p>
                            <Link 
                              href="/admin/job-attributes/degree-level/create"
                              className="btn btn-sm btn-primary"
                            >
                              Create First Degree Level
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

export default DegreeLevelPage;