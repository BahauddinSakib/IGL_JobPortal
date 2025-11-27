"use client";
import axios from "axios";
import React, { useState } from "react";

const SiteDataUpdate = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [slogan, setSlogan] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("../assets/admin_assets/img/upload-preview.png");
  const [bannerPreview, setBannerPreview] = useState("../assets/admin_assets/img/upload-preview.png");

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
      alert("Mobile number and slogan are required");
      return;
    }

    const formData = new FormData();
    formData.append("mobileNumber", mobileNumber);
    formData.append("slogan", slogan);
    if (logoFile) formData.append("logo", logoFile);
    if (bannerFile) formData.append("banner", bannerFile);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/siteData/create-site-data`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.message);
      // Reset form
      setMobileNumber("");
      setSlogan("");
      setLogoFile(null);
      setBannerFile(null);
      setLogoPreview("../assets/admin_assets/img/products/upload-preview.jpg");
      setBannerPreview("../assets/admin_assets/img/products/upload-preview.jpg");
    } catch (error) {
      alert("Error uploading site data");
      console.error(error);
    }
  };

  return (
    <div className="ec-content-wrapper">
      <div className="content">
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Upload Site Data</h1>
            <p className="breadcrumbs">
              <span><a href="/admin">Dashboard</a></span>
              <span><i className="mdi mdi-chevron-right"></i></span>
              <span>Site Data</span>
            </p>
          </div>
          <div>
            <a href="/admin/site-list" className="btn btn-primary">View All</a>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-header card-header-border-bottom">
                <h2>Add Site Data</h2>
              </div>

              <div className="card-body">
                <div className="row ec-vendor-uploads">
                  {/* Image Upload Section - Left Column */}
                  <div className="col-lg-4">
                    <div className="ec-vendor-img-upload">
                      {/* Logo Upload */}
                      <div className="ec-vendor-main-img">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <input 
                              type='file' 
                              id="logoUpload" 
                              className="ec-image-upload"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleLogoChange}
                            />
                            <label htmlFor="logoUpload">
                              <img src="../assets/admin_assets/img/icons/edit.svg" className="svg_img header_svg" alt="edit" />
                            </label>
                          </div>
                          <div className="avatar-preview ec-preview">
                            <div className="imagePreview ec-div-preview">
                              <img 
                                className="ec-image-preview"
                                src={logoPreview}
                                alt="logo preview"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Banner Upload */}
                      <div className="ec-vendor-main-img mt-4">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <input 
                              type='file' 
                              id="bannerUpload"
                              className="ec-image-upload"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleBannerChange}
                            />
                            <label htmlFor="bannerUpload">
                              <img src="../assets/admin_assets/img/icons/edit.svg" className="svg_img header_svg" alt="edit" />
                            </label>
                          </div>
                          <div className="avatar-preview ec-preview">
                            <div className="imagePreview ec-div-preview">
                              <img 
                                className="ec-image-preview"
                                src={bannerPreview}
                                alt="banner preview"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Section - Right Column */}
                  <div className="col-lg-8">
                    <div className="ec-vendor-upload-detail">
                      <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="mobileNumber" className="form-label">
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

                        {/* Additional fields can be added here if needed */}
                        
                        <div className="col-12 mt-4">
                          <button type="submit" className="btn btn-primary">
                            Upload Site Data
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
      </div>
    </div>
  );
};

export default SiteDataUpdate;