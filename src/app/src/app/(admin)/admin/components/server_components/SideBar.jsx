import React from "react";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="ec-left-sidebar h-100 ec-bg-sidebar">
      <div id="sidebar" className="sidebar ec-sidebar-footer">
        {/* begin sidebar scrollbar */}
        <div className="ec-navigation">
          {/* sidebar menu */}
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

            {/* requests */}
            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)">
                <i className="mdi mdi-account-group-outline"></i>
                <span className="nav-text">Requests</span>{" "}
                <b className="caret"></b>
              </a>
              <div className="collapse">
                <ul
                  className="sub-menu"
                  id="vendors"
                  data-parent="#sidebar-menu"
                >
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/requests/product-pending-request"
                    >
                      <span className="nav-text">product-pending-request</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/requests/vendor-account-requests"
                    >
                      <span className="nav-text">vendor-account-requests</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Users */}
            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)">
                <i className="mdi mdi-account-group"></i>
                <span className="nav-text">Users</span>{" "}
                <b className="caret"></b>
              </a>
              <div className="collapse">
                <ul className="sub-menu" id="users" data-parent="#sidebar-menu">
                  <li>
                    <Link
                      className="sidenav-item-link"
                      href="/admin/users/clients"
                    >
                      <span className="nav-text">Registered Clients</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/users/guest-clients"
                    >
                      <span className="nav-text">Guest Clients</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr />
            </li>

            {/* Vendors */}
            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)">
                <i className="mdi mdi-account-group"></i>
                <span className="nav-text">Vendors</span>{" "}
                <b className="caret"></b>
              </a>
              <div className="collapse">
                <ul className="sub-menu" id="users" data-parent="#sidebar-menu">
                  <li>
                    <Link
                      className="sidenav-item-link"
                      href="/admin/vendors/our-vendors"
                    >
                      <span className="nav-text">Our Vendors</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link className="sidenav-item-link" href="">
                      <span className="nav-text">Others</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr />
            </li>

            {/* Category */}
            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)">
                <i className="mdi mdi-dns-outline"></i>
                <span className="nav-text">Categories</span>{" "}
                <b className="caret"></b>
              </a>
              <div className="collapse">
                <ul
                  className="sub-menu"
                  id="categorys"
                  data-parent="#sidebar-menu"
                >
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/category/add-main-category"
                    >
                      <span className="nav-text">Add Main Category</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/category/add-sub-category"
                    >
                      <span className="nav-text">Add Sub Category</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/category/add-sub-sub-category"
                    >
                      <span className="nav-text">Add Sub Sub Category </span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/category/view-main-categories"
                    >
                      <span className="nav-text">View Main Categories</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* Products */}
            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)">
                <i className="mdi mdi-palette-advanced"></i>
                <span className="nav-text">Products</span>{" "}
                <b className="caret"></b>
              </a>
              <div className="collapse">
                <ul
                  className="sub-menu"
                  id="products"
                  data-parent="#sidebar-menu"
                >
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/products/add-product"
                    >
                      <span className="nav-text">Add Product</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/products/product-list"
                    >
                      <span className="nav-text">List Product</span>
                    </Link>
                  </li>
                  {/* <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/product-grid.html"
                    >
                      <span className="nav-text">Grid Product</span>
                    </Link>
                  </li> */}
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/products/product-details"
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

            {/* site Settings */}
            <li>
              <Link className="sidenav-item-link" href="/admin/site-settings">
                <i className="mdi mdi-star-half"></i>
                <span className="nav-text">Site Settings</span>
              </Link>
            </li>

            {/* Brands */}
            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)">
                <i className="mdi mdi-dns-outline"></i>
                <span className="nav-text">Brands</span>{" "}
                <b className="caret"></b>
              </a>
              <div className="collapse">
                <ul
                  className="sub-menu"
                  id="categorys"
                  data-parent="#sidebar-menu"
                >
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/brands/add-brand"
                    >
                      <span className="nav-text">Add Brand</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/admin/brands/brand-list"
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
