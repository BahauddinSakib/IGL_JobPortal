import React from "react";
import Link from "next/link";
import CartBtn from "@/components/buttons/CartBtn";
import BrowserCatBtn from "@/components/buttons/BrowserCatBtn";
import HeaderFunctions from "@/components/client_component/partials/HeaderFunctions";

const Header = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/siteData/get-site-data`,
    {
      cache: "no-store",
    }
  );
  const siteData = await res.json();
  const cateRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories/get-all-categories`,
    {
      cache: "no-store",
    }
  );
  const categoryData = await cateRes.json();
  const { sd_logo } = siteData;

  return (
    <header>
      <div className="header-top-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="header-top-left">
                <Link href="#">
                  Welcome! Free Shipping on orders over US$29.99
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="header-top-right">
                <ul>
                  <li>
                    <Link href="/became-vendor">Become a Vendor</Link>
                  </li>
                  <li>
                    <Link href="/blogs">Blog</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-search-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-3">
              <div className="logo">
                <Link href="/">
                  <img
                    src={`${process.env.imageBaseurl}/uploads/site-data/${sd_logo}`}
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-10 col-lg-9">
              <div className="d-block d-sm-flex align-items-center justify-content-end">
                <div className="header-search-wrap">
                  <form action="#">
                    <input type="text" placeholder="Search for product..." />
                    <select className="custom-select">
                      <option va="">All Categories</option>
                      <option>Women's Clothing</option>
                      <option>Men's Clothing</option>
                      <option>Luggage & Bags</option>
                    </select>
                    <button>
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
                <div className="header-action">
                  <HeaderFunctions></HeaderFunctions>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="sticky-header" className="menu-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mobile-nav-toggler">
                <i className="fas fa-bars"></i>
              </div>
              <div className="menu-wrap">
                <nav className="menu-nav">
                  <div className="logo d-none">
                    <Link href="/">
                      <img
                        src={`${process.env.imageBaseurl}/uploads/site-data/${sd_logo}`}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="header-category">
                    <BrowserCatBtn></BrowserCatBtn>
                    <ul className="category-menu">
                      {/* <li className="add-megamenu">
                        <Link href="#">
                          <i className="fa-solid fa-gear"></i>How to add
                          MegaMenu
                        </Link>
                      </li> */}
                      {categoryData.length > 0 && categoryData?.map((category, index) => {
                        return category?.subcategories?.length === 0 ? (
                          <li key={index}>
                            <Link href="/shop">
                            
                            <img
                                src={`${process.env.imageBaseurl}/uploads/category-data/${category?.pro_cat_img}`}
                                alt={category?.pro_cat_name}
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  objectFit: "contain",
                                  borderRadius: "4px",
                                  marginRight:"4px"
                                }}
                              />{" "}
                            {category?.pro_cat_name}</Link>
                          </li>
                        ) : (
                          <li key={index} className="menu-item-has-children">
                            <Link href="/shop">
                              <img
                                src={`${process.env.imageBaseurl}/uploads/category-data/${category?.pro_cat_img}`}
                                alt={category?.pro_cat_name}
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  objectFit: "contain",
                                  borderRadius: "4px",
                                  marginRight:"4px"
                                }}
                              />{" "}
                              {category?.pro_cat_name}
                            </Link>
                            <ul className="megamenu">
                              <li className="sub-column-item">
                                {/* <Link href="/shop">Accessories & Parts</Link> */}
                                <ul>
                                  {category?.subcategories?.map(
                                    (subcategory, index) => (
                                      <li key={index}>
                                        <Link href="/shop">
                                        <img
                                src={`${process.env.imageBaseurl}/uploads/category-data/${category?.pro_cat_img}`}
                                alt={category?.pro_cat_name}
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  objectFit: "contain",
                                  borderRadius: "4px",
                                  marginRight:"4px"
                                }}
                              />{" "}
                                          {subcategory.pro_cat_name}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="navbar-wrap main-menu d-none d-lg-flex">
                    <ul className="navigation">
                      <li className="active menu-item">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="/shop">SHOP</Link>
                      </li>
                      <li>
                        <Link href="/promotion">PROMOTION</Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link href="#">BLOG</Link>
                        <ul className="submenu">
                          <li>
                            <Link href="/blogs">Our blog</Link>
                          </li>
                          <li>
                            <Link href="/blog/hello-blog">blog Details</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="#">SPECIAL</Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link href="#">PAGES</Link>
                        <ul className="submenu">
                          <li>
                            <Link href="/became-vendor">become a vendor</Link>
                          </li>
                          <li>
                            <Link href="/vendor/profile">vendor Profile</Link>
                          </li>
                          <li>
                            <Link href="/vendor/profile/setting">
                              vendor setting
                            </Link>
                          </li>
                          <li>
                            <Link href="coupon.html">coupon list</Link>
                          </li>
                          <li>
                            <Link href="/contact-us">contact</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="vendor-list.html">vendor Store List</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="header-action d-none d-md-block">
                    <ul>
                      <li className="header-btn">
                        <Link href="#">
                          SUPER DISCOUNT
                          <img
                            src="/assets/client_assests/img/images/discount_shape.png"
                            alt=""
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="mobile-menu">
                <nav className="menu-box">
                  <div className="close-btn">
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                  <div className="nav-logo">
                    <Link href="/">
                      <img
                        src={`${process.env.imageBaseurl}/uploads/site-data/${sd_logo}`}
                        alt=""
                        title=""
                      />
                    </Link>
                  </div>
                  <div className="menu-outer"></div>
                  <div className="social-links">
                    <ul className="clearfix">
                      <li>
                        <Link href="#">
                          <span className="fab fa-twitter"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="fab fa-facebook-f"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="fab fa-pinterest-p"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="fab fa-instagram"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="fab fa-youtube"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="menu-backdrop"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
