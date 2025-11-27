"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const params = useParams();
  const { id } = params;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    c_name: "",
    c_slug: "",
    c_description: "",
    content_description: "",
    cat_meta_keys: "",
    parent_id: "",
    cate_img: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // Fetch category data for editing
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/categories/${id}`
        );
        const data = await res.json();

        if (res.ok) {
          setFormData({
            c_name: data.pro_cat_name || "",
            c_slug: data.pro_cat_slug || "",
            c_description: data.pro_cat_description || "",
            content_description: data.pro_cat_content_description || "",
            cat_meta_keys: data.pro_cat_meta_keys || "",
            parent_id: data.pro_cat_parent_id || "",
            cate_img: null,
          });

          if (data.pro_cat_img) {
            setExistingImage(data.pro_cat_img);
          }
        } else {
          toast.error("Failed to fetch category data");
        }
      } catch (err) {
        toast.error("Error loading category data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/get-all-categories`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cate_img") {
      const file = files[0];
      setFormData({ ...formData, cate_img: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, cate_img: null });
    setImagePreview(null);
    const fileInput = document.querySelector('input[name="cate_img"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const removeExistingImage = () => {
    setExistingImage(null);
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.c_name?.trim()) {
    toast.error("Category name is required");
    return;
  }
  if (!formData.c_slug?.trim()) {
    toast.error("Category slug is required");
    return;
  }
  const payload = new FormData();
  payload.append("c_name", formData.c_name.trim());
  payload.append("c_slug", formData.c_slug.trim());
  payload.append("c_description", formData.c_description || "");
  payload.append("content_description", formData.content_description || "");
  payload.append("cat_meta_keys", formData.cat_meta_keys || "");
  payload.append("parent_id", formData.parent_id || "");
  if (formData.cate_img) {
    payload.append("cate_img", formData.cate_img);
  }
  if (!existingImage && !formData.cate_img) {
    payload.append("remove_image", "true");
  }

  try {
    const loadingToast = toast.loading("Updating category...");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/categories/${id}`,
      {
        method: "PUT",
        body: payload,
      }
    );
    toast.dismiss(loadingToast);
    const data = await res.json();
    if (res.ok) {
      toast.success("Category updated successfully!");
    } else {
      if (res.status === 404) {
        toast.error("Category not found");
      } else if (res.status === 400) {
        toast.error(data?.message || "Invalid data provided");
      } else if (res.status === 409) {
        toast.error("Category slug already exists");
      } else {
        toast.error(data?.message || "Failed to update category");
      }
    }
  } catch (err) {
    console.error("Update category error:", err);
        if (err.name === 'NetworkError' || !navigator.onLine) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};

  if (loading) {
    return (
      <div className="ec-content-wrapper">
        <div className="content">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div>
      <div className="ec-content-wrapper">
        <div className="content">
          <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
            <h1>Edit Category</h1>
            <p className="breadcrumbs">
              <span>
                <a href="index.html">Home</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              <span>
                <a href="/categories">Categories</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Edit Category
            </p>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="ec-cat-list card card-default mb-24px">
                <div className="card-body">
                  <div className="ec-cat-form">
                    <h4>Edit Category - ID: {id}</h4>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <label
                          htmlFor="parent_id"
                          className="col-12 col-form-label"
                        >
                          Parent Category
                        </label>
                        <div className="col-12">
                          <select
                            id="parent_id"
                            name="parent_id"
                            className="form-control"
                            value={formData.parent_id || ""}
                            onChange={handleChange}
                          >
                            <option value="">Select Parent Category</option>
                            {categories
                              .filter((cat) => cat.id != id)
                              .map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.pro_cat_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="c_name"
                          className="col-12 col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-12">
                          <input
                            id="c_name"
                            name="c_name"
                            className="form-control"
                            type="text"
                            value={formData.c_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="c_slug"
                          className="col-12 col-form-label"
                        >
                          Slug
                        </label>
                        <div className="col-12">
                          <input
                            id="c_slug"
                            name="c_slug"
                            className="form-control"
                            type="text"
                            value={formData.c_slug}
                            onChange={handleChange}
                          />
                          <small>
                            The "slug" is the URL-friendly version of the name.
                            Usually all lowercase and uses hyphens.
                          </small>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-12 col-form-label">
                          Sort Description
                        </label>
                        <div className="col-12">
                          <textarea
                            name="c_description"
                            className="form-control"
                            rows="2"
                            value={formData.c_description}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-12 col-form-label">
                          Full Description
                        </label>
                        <div className="col-12">
                          <textarea
                            name="content_description"
                            className="form-control"
                            rows="4"
                            value={formData.content_description}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-12 col-form-label">
                          Product Tags <span>(comma separated)</span>
                        </label>
                        <div className="col-12">
                          <input
                            type="text"
                            name="cat_meta_keys"
                            className="form-control"
                            value={formData.cat_meta_keys}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-12 col-form-label">
                          Category Image
                        </label>
                        <div className="col-12">
                          {/* Existing Image Display */}
                          {existingImage && !imagePreview && (
                            <div className="mb-3">
                              <p className="mb-2">
                                <strong>Current Image:</strong>
                              </p>
                              <div className="d-flex align-items-start">
                                <div className="position-relative">
                                  <img
                                    src={`${process.env.imageBaseurl}/uploads/category-data/${existingImage}`}
                                    alt="Current category"
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "cover",
                                      border: "1px solid #ddd",
                                      borderRadius: "8px",
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={removeExistingImage}
                                    className="btn btn-sm btn-danger"
                                    style={{
                                      position: "absolute",
                                      top: "5px",
                                      right: "5px",
                                      padding: "2px 6px",
                                      fontSize: "12px",
                                      lineHeight: "1",
                                    }}
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          <input
                            type="file"
                            name="cate_img"
                            className="form-control"
                            onChange={handleChange}
                            accept="image/*"
                          />

                          {/* New Image Preview Section */}
                          {imagePreview && (
                            <div className="mt-3">
                              <p className="mb-2">
                                <strong>New Image Preview:</strong>
                              </p>
                              <div className="d-flex align-items-start">
                                <div className="position-relative">
                                  <img
                                    src={imagePreview}
                                    alt="Category preview"
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "cover",
                                      border: "1px solid #ddd",
                                      borderRadius: "8px",
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={removeImage}
                                    className="btn btn-sm btn-danger"
                                    style={{
                                      position: "absolute",
                                      top: "5px",
                                      right: "5px",
                                      padding: "2px 6px",
                                      fontSize: "12px",
                                      lineHeight: "1",
                                    }}
                                  >
                                    ×
                                  </button>
                                </div>
                                <div className="ml-3">
                                  <small className="text-muted">
                                    <strong>File:</strong>{" "}
                                    {formData.cate_img?.name}
                                    <br />
                                    <strong>Size:</strong>{" "}
                                    {formData.cate_img?.size
                                      ? (formData.cate_img.size / 1024).toFixed(
                                          1
                                        ) + " KB"
                                      : "Unknown"}
                                  </small>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary mr-2"
                          >
                            Update Category
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => window.history.back()}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
