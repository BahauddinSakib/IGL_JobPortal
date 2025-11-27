"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SiteDataManager = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [slogan, setSlogan] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerImageName, setBannerImageName] = useState(null);
  const [logoImageName, setLogoImageName] = useState(null);
  const [logoPreview, setLogoPreview] = useState(
    "../assets/admin_assets/img/upload-preview.png"
  );
  const [bannerPreview, setBannerPreview] = useState(
    "../assets/admin_assets/img/upload-preview.png"
  );

  // New state for managing existing data
  const [existingSiteData, setExistingSiteData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch existing site data on component mount
  useEffect(() => {
    fetchSiteData();
  }, []);


 

  const fetchSiteData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/siteData/get-site-data`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      
      if (data && Object.keys(data).length > 0) {
        setExistingSiteData(data);
        setBannerImageName(data.sd_banner)
        setLogoImageName(data.sd_logo)
        // If editing, populate form with existing data
        if (isEditing) {
          setMobileNumber(data.sd_mobile_number || "");
          setSlogan(data.sd_slogan || "");
          setLogoPreview(
            data.sd_logo || "../assets/admin_assets/img/upload-preview.png"
          );
          setBannerPreview(
            data.sd_banner || "../assets/admin_assets/img/upload-preview.png"
          );
        }
      }
    } catch (error) {
      console.error("Error fetching site data:", error);
      toast.error("Error fetching site data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setBannerPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobileNumber || !slogan) {
      toast.error("Mobile number and slogan are required");
      return;
    }

    const formData = new FormData();
    formData.append("sd_mobile_number", mobileNumber);
    formData.append("sd_slogan", slogan);

    if (logoFile) {
      formData.append("sd_logo", logoFile);
      formData.append("oldLogo", logoImageName)
    }
    if (bannerFile) {
      formData.append("sd_banner", bannerFile);
      formData.append("oldBanner", bannerImageName)
    }


    try {
      let res;
      if (isEditing && existingSiteData) {
        res = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/siteData/update-site-data/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Site Data Updated Successfully");
      } else {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/siteData/create-site-data`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Site Data Created Successfully");
      }
      resetForm();
      setShowForm(false);
      setIsEditing(false);
      fetchSiteData();
    } catch (error) {
      toast.error(
        isEditing ? "Error updating site data" : "Error creating site data"
      );
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowForm(true);
    setMobileNumber(existingSiteData.sd_mobile_number || "");
    setSlogan(existingSiteData.sd_slogan || "");
    setLogoPreview(
      `${process.env.imageBaseurl}/uploads/site-data/${existingSiteData.sd_logo}` ||
        "../assets/admin_assets/img/upload-preview.png"
    );
    setBannerPreview(
      `${process.env.imageBaseurl}/uploads/site-data/${existingSiteData.sd_banner}` ||
        "../assets/admin_assets/img/upload-preview.png"
    );
  };

  const handleDelete = async () => {
    if (!existingSiteData) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this site data. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/siteData/delete-site-data`
      );
      toast.success("Site Data Deleted Successfully");
      setExistingSiteData(null);
      resetForm();
    } catch (error) {
      toast.error("Error deleting site data");
      console.error(error);
    }
  };

  const resetForm = () => {
    setMobileNumber("");
    setSlogan("");
    setLogoFile(null);
    setBannerFile(null);
    setLogoPreview("../assets/admin_assets/img/upload-preview.png");
    setBannerPreview("../assets/admin_assets/img/upload-preview.png");
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    resetForm();
  };

  if (loading) {
    return (
      <div className="ec-content-wrapper">
        <div className="content">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
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
    <div className="ec-content-wrapper">
      <div className="content">
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Site Data Management</h1>
            <p className="breadcrumbs">
              <span>
                <a href="/admin">Dashboard</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              <span>Site Data</span>
            </p>
          </div>
          <div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary me-2"
              >
                {existingSiteData ? "Add New" : "Add Site Data"}
              </button>
            )}
          </div>
        </div>
        {/* Existing Site Data Display */}
        {existingSiteData && !showForm && (
          <div className="row mb-4">
            <div className="col-12">
              {existingSiteData ? (
                <div className="card card-default">
                  <div className="card-header card-header-border-bottom d-flex justify-content-between align-items-center">
                    <h2>Current Site Data</h2>
                    <div>
                      <button
                        onClick={handleEdit}
                        className="btn btn-warning me-2"
                      >
                        <i className="mdi mdi-pencil"></i> Edit
                      </button>
                      <button onClick={handleDelete} className="btn btn-danger">
                        <i className="mdi mdi-delete"></i> Delete
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="text-center">
                          <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                            <div>
                              <h6 className="mb-2">Logo</h6>
                              <img
                                src={
                                  existingSiteData.sd_logo
                                    ? `${process.env.imageBaseurl}/uploads/site-data/${existingSiteData.sd_logo}`
                                    : "../assets/admin_assets/img/upload-preview.png"
                                }
                                alt="Current Logo"
                                className="img-fluid"
                                style={{
                                  maxHeight: "100px",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                            <div>
                              <h6 className="mb-2">Banner</h6>
                              <img
                                src={
                                  existingSiteData.sd_banner
                                    ? `${process.env.imageBaseurl}/uploads/site-data/${existingSiteData.sd_banner}`
                                    : "../assets/admin_assets/img/upload-preview.png"
                                }
                                alt="Current Banner"
                                className="img-fluid"
                                style={{
                                  maxHeight: "100px",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-md-6">
                            <h5>Mobile Number</h5>
                            <p className="h6 text-muted">
                              {existingSiteData.sd_mobile_number ||
                                "Not provided"}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <h5>Slogan</h5>
                            <p className="h6 text-muted">
                              {existingSiteData.sd_slogan || "Not provided"}
                            </p>
                          </div>
                          <div className="col-12 mt-3">
                            <small className="text-muted">
                              Created:{" "}
                              {existingSiteData.createdAt
                                ? new Date(
                                    existingSiteData.createdAt
                                  ).toLocaleString()
                                : "Unknown"}
                            </small>
                            {existingSiteData.updatedAt && (
                              <small className="text-muted d-block">
                                Last Updated:{" "}
                                {new Date(
                                  existingSiteData.updatedAt
                                ).toLocaleString()}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning text-center">
                  No Site Data Available
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form for Create/Update */}
        {showForm && (
          <div className="row">
            <div className="col-12">
              <div className="card card-default">
                <div className="card-header card-header-border-bottom d-flex justify-content-between align-items-center">
                  <h2>{isEditing ? "Update Site Data" : "Add Site Data"}</h2>
                  <button onClick={handleCancel} className="btn btn-secondary">
                    <i className="mdi mdi-close"></i> Cancel
                  </button>
                </div>
                <div className="card-body">
                  <div className="row ec-vendor-uploads">
                    <div className="col-lg-4">
                      <div className="ec-vendor-img-upload">
                        <div className="ec-vendor-main-img">
                          <div className="avatar-upload">
                            <div className="avatar-edit">
                              <input
                                type="file"
                                id="logoUpload"
                                className="ec-image-upload"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleLogoChange}
                              />
                              <label htmlFor="logoUpload">
                                <img
                                  src="../assets/admin_assets/img/icons/edit.svg"
                                  className="svg_img header_svg"
                                  alt="edit"
                                />
                              </label>
                            </div>
                            <div className="avatar-preview ec-preview">
                              <div className="imagePreview ec-div-preview">
                                <img
                                  className="ec-image-preview"
                                  src={existingSiteData?.logoPreview? `${process.env.imageBaseurl}/uploads/site-data/${existingSiteData.logoPreview}` : `${process.env.imageBaseurl}/uploads/site-data/${logoImageName}`}
                                  alt="logo preview"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ec-vendor-main-img mt-4">
                          <div className="avatar-upload">
                            <div className="avatar-edit">
                              <input
                                type="file"
                                id="bannerUpload"
                                className="ec-image-upload"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleBannerChange}
                              />
                              <label htmlFor="bannerUpload">
                                <img
                                  src="../assets/admin_assets/img/icons/edit.svg"
                                  className="svg_img header_svg"
                                  alt="edit"
                                />
                              </label>
                            </div>
                            <div className="avatar-preview ec-preview">
                              <div className="imagePreview ec-div-preview">
                                <img
                                  className="ec-image-preview"
                                  src={existingSiteData.bannerPreview? `${process.env.imageBaseurl}/uploads/site-data/${existingSiteData.bannerPreview}` : `${process.env.imageBaseurl}/uploads/site-data/${bannerImageName}`}
                                  alt="banner preview"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-8">
                      <div className="ec-vendor-upload-detail">
                        <form onSubmit={handleSubmit} className="row g-3">
                          <div className="col-md-6">
                            <label
                              htmlFor="mobileNumber"
                              className="form-label"
                            >
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              id="mobileNumber"
                              name="mobileNumber"
                              className="form-control"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="slogan" className="form-label">
                              Slogan
                            </label>
                            <input
                              type="text"
                              id="slogan"
                              name="slogan"
                              className="form-control"
                              value={slogan}
                              onChange={(e) => setSlogan(e.target.value)}
                              required
                            />
                          </div>

                          <div className="col-12 mt-4">
                            <button
                              type="submit"
                              className="btn btn-primary me-2"
                            >
                              {isEditing
                                ? "Update Site Data"
                                : "Create Site Data"}
                            </button>
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="btn btn-secondary"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Empty State */}
        {!existingSiteData && !showForm && (
          <div className="row">
            <div className="col-12">
              <div className="card card-default">
                <div className="card-body text-center py-5">
                  <i className="mdi mdi-database-outline display-1 text-muted"></i>
                  <h3 className="mt-3">No Site Data Found</h3>
                  <p className="text-muted">
                    Get started by adding your first site data.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn btn-primary"
                  >
                    Add Site Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SiteDataManager;
