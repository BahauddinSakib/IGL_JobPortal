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
                      {/* Job Posts */}
               <li>
              <Link className="sidenav-item-link" href="/admin/job-review">
                <i className="mdi mdi-briefcase-outline"></i>
                <span className="nav-text">Job Posts</span>
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
    <i className="mdi mdi-briefcase-plus"></i>
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


          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;