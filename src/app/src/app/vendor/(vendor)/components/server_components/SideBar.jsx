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
              <Link className="sidenav-item-link" href="/vendor">
                <i className="mdi mdi-view-dashboard-outline"></i>
                <span style={{ color: "black" }} className="nav-text">
                  Dashboard
                </span>
              </Link>
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
                      href="/vendor/category/add-main-category"
                    >
                      <span className="nav-text">Add Main Category</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/vendor/category/add-sub-category"
                    >
                      <span className="nav-text">Add Sub Category</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/vendor/category/add-sub-sub-category"
                    >
                      <span className="nav-text">Add Sub Sub Category </span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/vendor/category/view-main-categories"
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
                      href="/vendor/products/add-product"
                    >
                      <span className="nav-text">Add Product</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/vendor/products/product-list"
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
                      href="/vendor/products/product-details"
                    >
                      <span className="nav-text">Product Detail</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Orders */}
            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)">
                <i className="mdi mdi-cart"></i>
                <span className="nav-text">Orders</span>{" "}
                <b className="caret"></b>
              </a>
              <div className="collapse">
                <ul
                  className="sub-menu"
                  id="orders"
                  data-parent="#sidebar-menu"
                >
                  <li className="">
                    <Link className="sidenav-item-link" href="/vendor/orders/new-orders">
                      <span className="nav-text">New Order</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/vendor/orders/order-details"
                    >
                      <span className="nav-text">Order Detail</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/vendor/orders/pending-orders"
                    >
                      <span className="nav-text">Pending Orders</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link className="sidenav-item-link" href="/vendor/orders/rejected-orders">
                      <span className="nav-text">Rejected Orders</span>
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
                      href="/vendor/brands/add-brand"
                    >
                      <span className="nav-text">Add Brand</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="sidenav-item-link"
                      href="/vendor/brands/brand-list"
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
