"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/brands/get-all-brands`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      if (json.success) {
        setBrands(json.data);
        setError(null);
      } else {
        throw new Error(json.message || "Failed to fetch brands");
      }
    } catch (err) {
      setError(err.message);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card card-default ec-cat-list">
        <div className="card-body" style={{ textAlign: "center", padding: "2rem" }}>
          Loading brands...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card card-default ec-cat-list">
        <div className="card-body" style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          Error: {error}
          <br />
          <button onClick={fetchBrands} style={{ marginTop: "10px" }}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-default ec-cat-list">
      <div className="card-body">
        <div className="table-responsive">
          <table id="responsive-data-table" className="table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? brands.map((brand) => (
                <tr key={brand.id}>
                  <td>
                    <img
                      src={`${process.env.imageBaseurl}/uploads/brand-data/${brand.b_logo}`}
                      alt={brand.b_name}
                      style={{ width: "50px", height: "50px", objectFit: "contain" }}
                      className="cat-thumb"
                    />
                  </td>
                  <td>{brand.b_name}</td>
                  <td>{brand.b_description}</td>
                  <td>
                    <div className="btn-group">
                      <button type="button" className="btn btn-outline-success">Info</button>
                      <button
                        type="button"
                        className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-display="static"
                      >
                        <span className="sr-only">Toggle</span>
                      </button>
                      <div className="dropdown-menu">
                        <Link href={`/admin/brand/edit-brand/${brand.id}`} className="dropdown-item">
                          Edit
                        </Link>
                        <a className="dropdown-item" href="#">Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "2rem" }}>
                    No brands found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
