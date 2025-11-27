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
              <Link className="sidenav-item-link" href="recruiter">
                <i className="mdi mdi-view-dashboard-outline"></i>
                <span style={{ color: "black" }} className="nav-text">
                  Dashboard
                </span>
              </Link>
              <hr />
            </li>

                      {/* Job Posts */}
               <li>
              <Link className="sidenav-item-link" href="/recruiter/job-dashboard">
                <i className="mdi mdi-briefcase-outline"></i>
                <span className="nav-text">Job Dashboard</span>
              </Link>
              <hr />
            </li>


          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;