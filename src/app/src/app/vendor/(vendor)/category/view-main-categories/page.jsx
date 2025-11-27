"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/get-all-categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatSubcategories = (metaKeys) => {
    if (!metaKeys) return [];
    return metaKeys.split(",").map((key) => key.trim());
  };

  const getImageUrl = (imageName) => {
    return `${process.env.imageBaseurl}/uploads/category-data/${
      imageName || "default.jpg"
    }`;
  };

  const getStatusDisplay = (status) => {
    return status ? "ACTIVE" : "INACTIVE";
  };

  const getTrendingBadge = (status, subcatCount) => {
    if (status && subcatCount > 5) {
      return <span className="badge badge-success">Top</span>;
    } else if (status && subcatCount > 2) {
      return <span className="badge bg-primary">Medium</span>;
    } else {
      return <span className="badge bg-danger">Low</span>;
    }
  };

  const handleDeleteCategory = async (id) => {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: "Delete Category?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      backdrop: `
      rgba(0,0,0,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `,
      allowOutsideClick: false,
    });

    // If user cancels, exit the function
    if (!result.isConfirmed) return;

    const toastId = toast.loading("Deleting category...");

    // Optimistic UI update - remove immediately
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/categories/${id}`
      );

      toast.success("Category deleted successfully", { id: toastId });

      // Optional success alert
      await Swal.fire("Deleted!", "Your category has been deleted.", "success");
    } catch (err) {
      // Revert UI if error occurs
      fetchCategories();

      if (err.response) {
        if (err.response.status === 404) {
          toast.error("Category not found", { id: toastId });
          await Swal.fire("Error", "Category not found", "error");
        } else {
          toast.error(err.response.data?.message || "Delete failed", {
            id: toastId,
          });
          await Swal.fire(
            "Error",
            err.response.data?.message || "Delete failed",
            "error"
          );
        }
      } else {
        toast.error("Network error", { id: toastId });
        await Swal.fire("Error", "Network error", "error");
      }
    }
  };

  if (loading) {
    return (
      <div>
        <div className="ec-cat-list card card-default">
          <div className="card-body">
            <div style={{ textAlign: "center", padding: "2rem" }}>
              Loading categories...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="ec-cat-list card card-default">
          <div className="card-body">
            <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
              Error loading categories: {error}
              <br />
              <button onClick={fetchCategories} style={{ marginTop: "10px" }}>
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="ec-cat-list card card-default">
        <div className="card-body">
          <div className="table-responsive">
            <table id="responsive-data-table" className="table">
              <thead>
                <tr>
                  <th>Thumb</th>
                  <th>Name</th>
                  {/* <th>Sub Categories</th> */}
                  <th>Product</th>
                  <th>Total Sell</th>
                  <th>Status</th>
                  <th>Trending</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => {
                    const subcategories = formatSubcategories(
                      category.pro_cat_meta_keys
                    );
                    return (
                      <tr key={category.id}>
                        <td>
                          <img
                            className="cat-thumb"
                            src={getImageUrl(category.pro_cat_img)}
                            alt="Product Image"
                          />
                        </td>
                        <td>{category.pro_cat_name || ""}</td>
                        {/* <td>
                          <span className="ec-sub-cat-list">
                            <span
                              className="ec-sub-cat-count"
                              title="Total Sub Categories"
                            >
                              {subcategories.length}
                            </span>
                            {subcategories.map((subcat, index) => (
                              <span key={index} className="ec-sub-cat-tag">
                                {subcat}
                              </span>
                            ))}
                          </span>
                        </td> */}
                        <td>{category.subcategories?.length || 0}</td>
                        <td>{/* Total Sell - empty since not in API */}</td>
                        <td>
                          {category.pro_cat_status === false ? (
                            <span className="inactive">Inactive</span>
                          ) : (
                            getStatusDisplay(category.pro_cat_status)
                          )}
                        </td>
                        <td>
                          {getTrendingBadge(
                            category.pro_cat_status,
                            subcategories.length
                          )}
                        </td>
                        <td>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-outline-success"
                            >
                              <Link
                                href={`/vendor/category/view-category/${category?.id}`}
                              >
                                {" "}
                                View
                              </Link>
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              data-display="static"
                            >
                              <span className="sr-only">View</span>
                            </button>
                            <div className="dropdown-menu">
                              <Link
                                href={`/vendor/category/edit-category/${category?.id}`}
                                className="dropdown-item"
                              >
                                Edit
                              </Link>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  handleDeleteCategory(category?.id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoriesPage;
