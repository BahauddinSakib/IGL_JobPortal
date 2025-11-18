"use client";

import React, { useState } from "react";
import Link from "next/link";

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <div className="ec-left-sidebar h-100 ec-bg-sidebar">
      <div id="sidebar" className="sidebar ec-sidebar-footer">
        <div className="ec-navigation">
          <ul className="nav sidebar-inner" id="sidebar-menu">

            {/* Dashboard */}
            <li className="active">
              <Link className="sidenav-item-link" href="/admin">
                <i className="mdi mdi-view-dashboard-outline"></i>
                <span style={{ color: "black" }} className="nav-text">
                  Dashboard
                </span>
              </Link>
              <hr />
            </li>

            {/* Accounts */}
            <li>
              <Link className="sidenav-item-link" href="/admin/accounts/all-accounts">
                <i className="mdi mdi-account-multiple"></i>
                <span className="nav-text">Accounts</span>
              </Link>
              <hr />
            </li>

{/* Job Attributes */}
<li className="has-sub">
  <a 
    className="sidenav-item-link" 
    href="#" 
    onClick={(e) => {
      e.preventDefault();
      toggleMenu('jobAttributes');
    }}
    style={{ cursor: 'pointer' }}
  >
    <i className="mdi mdi-briefcase-outline"></i>
    <span className="nav-text">Job Attributes</span>{" "}
    <b className="caret"></b>
  </a>
  <div className={`collapse ${activeMenu === 'jobAttributes' ? 'show' : ''}`}>
    <ul className="sub-menu" id="jobAttributes" data-parent="#sidebar-menu">
      <li className="">
        <Link 
          className="sidenav-item-link" 
          href="/admin/job-attributes/job-type"
          style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
        >
          <i className="mdi mdi-checkbox-blank-circle-outline" style={{ color: '#000000', marginRight: '8px', fontSize: '16px' }}></i>
          <span className="nav-text">Job Type</span>
        </Link>
      </li>
      <li className="">
        <Link 
          className="sidenav-item-link" 
          href="/admin/job-attributes/job-skills"
          style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
        >
          <i className="mdi mdi-checkbox-blank-circle-outline" style={{ color: '#000000', marginRight: '8px', fontSize: '16px' }}></i>
          <span className="nav-text">Job Skills</span>
        </Link>
      </li>
      <li className="">
        <Link 
          className="sidenav-item-link" 
          href="/admin/job-attributes/job-categories"
          style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
        >
          <i className="mdi mdi-checkbox-blank-circle-outline" style={{ color: '#000000', marginRight: '8px', fontSize: '16px' }}></i>
          <span className="nav-text">Job Categories</span>
        </Link>
      </li>
      <li className="">
        <Link 
          className="sidenav-item-link" 
          href="/admin/job-attributes/job-experience"
          style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
        >
          <i className="mdi mdi-checkbox-blank-circle-outline" style={{ color: '#000000', marginRight: '8px', fontSize: '16px' }}></i>
          <span className="nav-text">Job Experience</span>
        </Link>
      </li>
      <li className="">
        <Link 
          className="sidenav-item-link" 
          href="/admin/job-attributes/degree-type"
          style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
        >
          <i className="mdi mdi-checkbox-blank-circle-outline" style={{ color: '#000000', marginRight: '8px', fontSize: '16px' }}></i>
          <span className="nav-text">Degree Type</span>
        </Link>
      </li>
      <li className="">
        <Link 
          className="sidenav-item-link" 
          href="/admin/job-attributes/degree-level"
          style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
        >
          <i className="mdi mdi-checkbox-blank-circle-outline" style={{ color: '#000000', marginRight: '8px', fontSize: '16px' }}></i>
          <span className="nav-text">Degree Level</span>
        </Link>
      </li>
    </ul>
  </div>
  <hr />
</li>
            {/* Users */}
            <li className="has-sub">
              <a 
                className="sidenav-item-link" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu('users');
                }}
                style={{ cursor: 'pointer' }}
              >
                <i className="mdi mdi-account-group"></i>
                <span className="nav-text">Users</span>{" "}
                <b className="caret"></b>
              </a>
              <div className={`collapse ${activeMenu === 'users' ? 'show' : ''}`}>
                <ul className="sub-menu" id="users" data-parent="#sidebar-menu">
                  <li>
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/users/clients"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Registered Clients</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/users/guest-clients"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Guest Clients</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr />
            </li>

           

            {/* Category */}
            <li className="has-sub">
              <a 
                className="sidenav-item-link" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu('categories');
                }}
                style={{ cursor: 'pointer' }}
              >
                <i className="mdi mdi-dns-outline"></i>
                <span className="nav-text">Categories</span>{" "}
                <b className="caret"></b>
              </a>
              <div className={`collapse ${activeMenu === 'categories' ? 'show' : ''}`}>
                <ul className="sub-menu" id="categorys" data-parent="#sidebar-menu">
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/category/add-main-category"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Add Main Category</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/category/add-sub-category"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Add Sub Category</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/category/add-sub-sub-category"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Add Sub Sub Category</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/category/view-main-categories"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">View Main Categories</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Products */}
            <li className="has-sub">
              <a 
                className="sidenav-item-link" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu('products');
                }}
                style={{ cursor: 'pointer' }}
              >
                <i className="mdi mdi-palette-advanced"></i>
                <span className="nav-text">Products</span>{" "}
                <b className="caret"></b>
              </a>
              <div className={`collapse ${activeMenu === 'products' ? 'show' : ''}`}>
                <ul className="sub-menu" id="products" data-parent="#sidebar-menu">
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/products/add-product"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Add Product</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/products/product-list"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">List Product</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/products/product-details"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Product Detail</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Reviews */}
            <li>
              <Link className="sidenav-item-link" href="/review-list.html">
                <i className="mdi mdi-star-half"></i>
                <span className="nav-text">Reviews</span>
              </Link>
            </li>

            {/* Site Settings */}
            <li>
              <Link className="sidenav-item-link" href="/admin/site-settings">
                <i className="mdi mdi-star-half"></i>
                <span className="nav-text">Site Settings</span>
              </Link>
            </li>

            {/* Brands */}
            <li className="has-sub">
              <a 
                className="sidenav-item-link" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu('brands');
                }}
                style={{ cursor: 'pointer' }}
              >
                <i className="mdi mdi-dns-outline"></i>
                <span className="nav-text">Brands</span>{" "}
                <b className="caret"></b>
              </a>
              <div className={`collapse ${activeMenu === 'brands' ? 'show' : ''}`}>
                <ul className="sub-menu" id="categorys" data-parent="#sidebar-menu">
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/brands/add-brand"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Add Brand</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link 
                      className="sidenav-item-link" 
                      href="/admin/brands/brand-list"
                      style={{ fontWeight: 'bold', padding: '8px 15px', margin: '5px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'block' }}
                    >
                      <span className="nav-text">Brands List</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;