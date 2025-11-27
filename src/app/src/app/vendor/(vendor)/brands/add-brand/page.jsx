"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { FiEdit2 } from 'react-icons/fi';

const BrandForm = () => {
  const [brandData, setBrandData] = useState({
    b_name: '',
    b_description: '',
    b_logo: null,
    logoPreview: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandData(prev => ({
          ...prev,
          b_logo: file,
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    
    try {
      const formData = new FormData();
      formData.append('b_name', brandData.b_name);
      formData.append('b_description', brandData.b_description);
      if (brandData.b_logo) {
        formData.append('b_logo', brandData.b_logo);
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/brands/add-brand`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage('Brand created successfully!');
      // Reset form
      // setBrandData({
      //   b_name: '',
      //   b_description: '',
      //   b_logo: null,
      //   logoPreview: null
      // });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to create brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ec-content-wrapper">
      <div className="content">
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Add Brand</h1>
            <p className="breadcrumbs">
              <span><a href="/admin">Home</a></span>
              <span><i className="mdi mdi-chevron-right"></i></span>
              <span>Brand</span>
            </p>
          </div>
          <div>
            <a href="/admin/brand-list" className="btn btn-primary">View All</a>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-header card-header-border-bottom">
                <h2>Add New Brand</h2>
              </div>

              <div className="card-body">
                <div className="row ec-vendor-uploads">
                  {/* Logo Upload Section */}
                  <div className="col-lg-4">
                    <div className="ec-vendor-img-upload">
                      <div className="ec-vendor-main-img">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <input 
                              type='file' 
                              id="logoUpload" 
                              className="ec-image-upload"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleImageUpload}
                            />
                            <label htmlFor="logoUpload" className="cursor-pointer">
                              <FiEdit2 className="text-white text-lg bg-primary p-1 rounded" />
                            </label>
                          </div>
                          <div className="avatar-preview ec-preview">
                            <div className="imagePreview ec-div-preview">
                              <img 
                                className="ec-image-preview"
                                src={brandData.logoPreview || "/assets/admin_assets/img/products/vender-upload-thumb-preview.jpg"}
                                alt="brand logo preview"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brand Form Section */}
                  <div className="col-lg-8">
                    <div className="ec-vendor-upload-detail">
                      {successMessage && (
                        <div className="alert alert-success" role="alert">
                          {successMessage}
                        </div>
                      )}
                      {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      )}
                      <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-12">
                          <label htmlFor="b_name" className="form-label">Brand Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            id="b_name"
                            name="b_name"
                            value={brandData.b_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-12">
                          <label htmlFor="b_description" className="form-label">Description</label>
                          <textarea 
                            className="form-control" 
                            rows="4"
                            id="b_description"
                            name="b_description"
                            value={brandData.b_description}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                        
                        <div className="col-md-12">
                          <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
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

export default BrandForm;