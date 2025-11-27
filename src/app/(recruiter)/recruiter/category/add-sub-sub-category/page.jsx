"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    c_name: "",
    c_slug: "",
    c_description: "",
    content_description: "",
    cat_meta_keys: "",
    cate_img: null,
    parent_id: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cate_img") {
      const file = files[0];
      setFormData({ ...formData, cate_img: file });
      // Create image preview
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

  const clearForm = () => {
    setFormData({
      c_name: "",
      c_slug: "",
      c_description: "",
      content_description: "",
      cat_meta_keys: "",
      cate_img: null,
      parent_id: "",
    });
    setImagePreview(null);
    const fileInput = document.querySelector('input[name="cate_img"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append("c_name", formData.c_name);
    payload.append("c_slug", formData.c_slug);
    payload.append("c_description", formData.c_description);
    payload.append("content_description", formData.content_description);
    payload.append("cat_meta_keys", formData.cat_meta_keys);
    payload.append("parent_id", formData.parent_id);
    if (formData.cate_img) {
      payload.append("cate_img", formData.cate_img);
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/create-categories`,
        {
          method: "POST",
          body: payload,
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Category created successfully!");
        clearForm();
      } else {
        toast.error(data?.message || "Failed to create category.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/get-all-categories`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <div className="ec-content-wrapper">
        <div className="content">
          <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
            <h1>Add Sub Sub Category</h1>
            <p className="breadcrumbs">
              <span>
                <a href="index.html">Home</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Sub Category
            </p>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="ec-cat-list card card-default mb-24px">
                <div className="card-body">
                  <div className="ec-cat-form">
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
                            value={formData.parent_id}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Parent Category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.c_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="parent_id"
                          className="col-12 col-form-label"
                        >
                          Sub Category
                        </label>
                        <div className="col-12">
                          <select
                            id="parent_id"
                            name="parent_id"
                            className="form-control"
                            value={formData.parent_id}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Sub Category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.c_name}
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
                          Short Description
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
                          <input
                            type="file"
                            name="cate_img"
                            className="form-control"
                            onChange={handleChange}
                            accept="image/*"
                          />
                          {imagePreview && (
                            <div className="mt-3">
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
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={clearForm}
                            className="btn btn-secondary ml-2"
                          >
                            Clear
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