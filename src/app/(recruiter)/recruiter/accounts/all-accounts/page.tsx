"use client";

import React, { useState, useEffect } from "react";

interface AdminUser {
  au_id: number;
  au_first_name: string;
  au_last_name: string;
  au_email: string;
  au_phone: string | null;
  au_type: string;
  au_companyName: string | null;
  au_createdAt: string;
}

const AllAccountsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [accountsData, setAccountsData] = useState<AdminUser[]>([]);
  const [filteredData, setFilteredData] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedField, setSelectedField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const recordsPerPage = 10;

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/accounts');
      const data = await response.json();
      if (Array.isArray(data)) {
        setAccountsData(data);
        setFilteredData(data);
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Apply filters whenever filter criteria changes
  useEffect(() => {
    applyFilters();
  }, [selectedField, filterValue, accountsData]);

  const applyFilters = () => {
    if (!selectedField || !filterValue.trim()) {
      setFilteredData(accountsData);
      return;
    }

    const filtered = accountsData.filter(user => {
      const searchValue = filterValue.toLowerCase().trim();
      
      switch (selectedField) {
        case "name":
          const fullName = `${user.au_first_name} ${user.au_last_name}`.toLowerCase();
          return fullName.includes(searchValue);
        
        case "email":
          return user.au_email.toLowerCase().includes(searchValue);
        
        case "phone":
          return user.au_phone?.toLowerCase().includes(searchValue) || false;
        
        case "type":
          const userType = getUserType(user.au_type).toLowerCase();
          return userType.includes(searchValue);
        
        case "company":
          return user.au_companyName?.toLowerCase().includes(searchValue) || false;
        
        default:
          return true;
      }
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setSelectedField("");
    setFilterValue("");
    setFilteredData(accountsData);
  };

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getUserType = (type: string) => {
    switch (type) {
      case '1': return 'Admin';
      case '2': return 'Job Seeker';
      case '3': return 'Employer';
      default: return 'Unknown';
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case '1': return 'bg-primary'; // Primary color for Admin
      case '2': return 'bg-success'; // Green color for Job Seeker
      case '3': return 'bg-warning text-dark'; // Orange color for Employer
      default: return 'bg-secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '1': return 'fa-crown'; // Admin
      case '2': return 'fa-user-graduate'; // Job Seeker
      case '3': return 'fa-briefcase'; // Employer
      default: return 'fa-user';
    }
  };

  const handleCreate = () => {
    // Implement create user functionality
    console.log('Create new user');
    // You can redirect to a create form or open a modal
    alert('Create user functionality to be implemented');
  };

  const handleUpdate = (userId: number) => {
    console.log('Update user:', userId);
    // Implement update functionality
  };

  const handleDelete = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setAccountsData(prev => prev.filter(user => user.au_id !== userId));
      setFilteredData(prev => prev.filter(user => user.au_id !== userId));
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === currentData.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentData.map(user => user.au_id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
      setAccountsData(prev => prev.filter(user => !selectedUsers.includes(user.au_id)));
      setFilteredData(prev => prev.filter(user => !selectedUsers.includes(user.au_id)));
      setSelectedUsers([]);
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Export data:', filteredData);
    alert('Export functionality to be implemented');
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header - Improved styling with icons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-dark fw-bold">ACCOUNTS</h1>
        <div className="d-flex gap-3 align-items-center">
   <button
  onClick={handleCreate}
  className="btn btn-success d-flex align-items-center gap-2 fw-semibold px-3 py-2"
  style={{ borderRadius: '8px' }}
>
  <i className="fas fa-user-plus fs-6"></i>
  Create User
</button>
<button
  onClick={() => setShowFilters(!showFilters)}
  className={`btn d-flex align-items-center gap-2 fw-semibold px-3 py-2 ${
    showFilters ? 'btn-outline-primary' : 'btn-primary'
  }`}
  style={{ borderRadius: '8px' }}
>
  <i className={`fas ${showFilters ? 'fa-eye-slash' : 'fa-search'} fs-6`}></i>
  {showFilters ? 'Hide Filters' : 'Show Filters'}
</button>
<button
  onClick={fetchAccounts}
  className="btn btn-outline-secondary d-flex align-items-center gap-2 fw-semibold px-3 py-2"
  style={{ borderRadius: '8px' }}
>
  <i className="fas fa-redo fs-6"></i>
  Refresh
</button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3 text-dark fw-semibold">
              <i className="fas fa-sliders-h me-2"></i>
              Filters
            </h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label fw-medium">
                  <i className="fas fa-list me-1"></i>
                  Select field
                </label>
                <select 
                  className="form-select border-secondary"
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                >
                  <option value="">Choose field</option>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="type">Type</option>
                  <option value="company">Company</option>
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label fw-medium">
                  <i className="fas fa-cog me-1"></i>
                  Condition
                </label>
                <div className="form-control bg-light border-secondary">
                  <i className="fas fa-search me-1"></i>
                  Contains
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-medium">
                  <i className="fas fa-tag me-1"></i>
                  Value
                </label>
                <input
                  type="text"
                  className="form-control border-secondary"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Enter search value"
                />
              </div>

              <div className="col-md-2">
                <button 
                  className="btn btn-primary w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={applyFilters}
                  style={{ borderRadius: '8px' }}
                >
                  <i className="fas fa-check-circle"></i>
                  Apply
                </button>
              </div>
              
              <div className="col-md-2">
                <button 
                  className="btn btn-outline-secondary w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={clearFilters}
                  style={{ borderRadius: '8px' }}
                >
                  <i className="fas fa-broom"></i>
                  Clear
                </button>
              </div>
            </div>
            
            {/* Filter Results Info */}
            {selectedField && filterValue && (
              <div className="mt-3">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Showing {filteredData.length} of {accountsData.length} users matching your filter
                </small>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2">
            <i className="fas fa-info-circle fs-5"></i>
            {selectedUsers.length} user(s) selected
          </span>
          <div>
            <button 
              className="btn btn-outline-primary btn-sm me-2 d-flex align-items-center gap-1"
              onClick={handleExport}
            >
              <i className="fas fa-file-export"></i>
              Export Selected
            </button>
            <button 
              className="btn btn-outline-danger btn-sm me-2 d-flex align-items-center gap-1" 
              onClick={handleBulkDelete}
            >
              <i className="fas fa-trash-alt"></i>
              Delete Selected
            </button>
            <button 
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" 
              onClick={() => setSelectedUsers([])}
            >
              <i className="fas fa-times"></i>
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center bg-light">
          <h5 className="mb-0 text-dark fw-bold d-flex align-items-center gap-2">
            <i className="fas fa-users"></i>
            User Accounts
          </h5>
          <div className="text-muted d-flex align-items-center gap-1">
            <i className="fas fa-chart-bar"></i>
            Total: {filteredData.length} users
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">

           <thead className="table-light">
  <tr>
    <th scope="col" style={{ width: '40px' }}>
      <div className="form-check">
        <input 
          className="form-check-input" 
          type="checkbox"
          checked={selectedUsers.length === currentData.length && currentData.length > 0}
          onChange={handleSelectAll}
        />
      </div>
    </th>
    <th scope="col">ID</th>
    <th scope="col">NAME</th>
    <th scope="col">EMAIL</th>
    <th scope="col">PHONE</th>
    <th scope="col">TYPE</th>
    <th scope="col">COMPANY</th>
    <th scope="col">CREATED AT</th>
    <th scope="col">OPERATIONS</th>
  </tr>
</thead>
<tbody>
  {currentData.length > 0 ? (
    currentData.map((user) => (
      <tr key={user.au_id}>
        <td>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox"
              checked={selectedUsers.includes(user.au_id)}
              onChange={() => handleSelectUser(user.au_id)}
            />
          </div>
        </td>
        <td className="fw-semibold">{user.au_id}</td>
        <td>
          {user.au_first_name} {user.au_last_name}
        </td>
        <td>
          {user.au_email}
        </td>
        <td>
          {user.au_phone || '—'}
        </td>
        <td>
          <span className={`badge ${getTypeBadgeClass(user.au_type)}`}>
            {getUserType(user.au_type)}
          </span>
        </td>
        <td>
          {user.au_companyName || '—'}
        </td>
        <td>
          {new Date(user.au_createdAt).toLocaleDateString()}
        </td>
        <td>
          <div className="btn-group btn-group-sm">
            <button
              onClick={() => handleUpdate(user.au_id)}
              className="btn btn-outline-primary d-flex align-items-center gap-1"
            >
              <i className="fas fa-edit"></i>
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.au_id)}
              className="btn btn-outline-danger d-flex align-items-center gap-1"
            >
              <i className="fas fa-trash"></i>
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={9} className="text-center py-4">
        <div className="text-muted">
          No users found
          {selectedField && filterValue && (
            <button 
              className="btn btn-outline-primary mx-auto mt-2"
              onClick={clearFilters}
            >
              Clear filters to see all users
            </button>
          )}
        </div>
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="card-footer bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted d-flex align-items-center gap-1">
                <i className="fas fa-eye"></i>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} accounts
              </div>
              
              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link d-flex align-items-center gap-1"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <i className="fas fa-chevron-left"></i>
                      Previous
                    </button>
                  </li>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link d-flex align-items-center gap-1"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAccountsPage;