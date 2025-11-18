import React from 'react';
import { BsSmartwatch } from "react-icons/bs";
import { LuUtensilsCrossed } from "react-icons/lu";
import { GiHighHeel } from "react-icons/gi";
import { MdElectricalServices } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { MdSportsVolleyball } from "react-icons/md";
import Link from 'next/link';

const BestSeller = () => {
    return (
        <section className="best-sell-product-area pt-90 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title text-center mb-60">
                <h2 className="title">Find Best Seller Vendor</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="best-sell-nav">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="all-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#all"
                      type="button"
                      role="tab"
                      aria-controls="all"
                      aria-selected="true"
                    >
                      <div className="icon">
                        <TbCategory />
                      </div>
                      <div className="content">
                        <p>All Categories</p>
                      </div>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="watch-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#watch"
                      type="button"
                      role="tab"
                      aria-controls="watch"
                      aria-selected="false"
                    >
                      <div className="icon">
                        <BsSmartwatch />
                      </div>
                      <div className="content">
                        <p>smart watch</p>
                      </div>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="electronics-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#electronics"
                      type="button"
                      role="tab"
                      aria-controls="electronics"
                      aria-selected="false"
                    >
                      <div className="icon">
                        <MdElectricalServices />
                      </div>
                      <div className="content">
                        <p>Consumer Electronics</p>
                      </div>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="appliance-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#appliance"
                      type="button"
                      role="tab"
                      aria-controls="appliance"
                      aria-selected="false"
                    >
                      <div className="icon">
                        <LuUtensilsCrossed />
                      </div>
                      <div className="content">
                        <p>home appliance</p>
                      </div>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="shoes-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#shoes"
                      type="button"
                      role="tab"
                      aria-controls="shoes"
                      aria-selected="false"
                    >
                      <div className="icon">
                        <GiHighHeel />
                      </div>
                      <div className="content">
                        <p>Shoes & Accessories</p>
                      </div>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="sports-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#sports"
                      type="button"
                      role="tab"
                      aria-controls="sports"
                      aria-selected="false"
                    >
                      <div className="icon">
                        <MdSportsVolleyball />
                      </div>
                      <div className="content">
                        <p>Sports & Entertainment</p>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="all"
                  role="tabpanel"
                  aria-labelledby="all-tab"
                >
                  <div className="row mb-20">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-sliders"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Theme Beyond Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>40k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $45,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">5,000,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-shield"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Olle Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>1 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>13k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $5,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">200,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product05.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product06.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product07.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product08.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="watch"
                  role="tabpanel"
                  aria-labelledby="watch-tab"
                >
                  <div className="row mb-20">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-sliders"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Theme Beyond Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>40k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $45,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">5,000,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-shield"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Olle Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>1 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>13k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $5,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">200,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product05.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product06.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product07.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product08.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="electronics"
                  role="tabpanel"
                  aria-labelledby="electronics-tab"
                >
                  <div className="row mb-20">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-sliders"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Theme Beyond Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>40k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $45,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">5,000,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-shield"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Olle Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>1 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>13k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $5,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">200,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product05.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product06.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product07.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product08.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="appliance"
                  role="tabpanel"
                  aria-labelledby="appliance-tab"
                >
                  <div className="row mb-20">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-sliders"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Theme Beyond Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>40k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $45,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">5,000,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-shield"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Olle Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>1 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>13k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $5,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">200,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product05.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product06.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product07.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product08.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="shoes"
                  role="tabpanel"
                  aria-labelledby="shoes-tab"
                >
                  <div className="row mb-20">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-sliders"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Theme Beyond Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>40k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $45,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">5,000,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-shield"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Olle Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>1 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>13k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $5,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">200,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product05.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product06.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product07.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product08.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="sports"
                  role="tabpanel"
                  aria-labelledby="sports-tab"
                >
                  <div className="row mb-20">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-sliders"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Theme Beyond Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>40k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $45,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">5,000,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="vendor-wrap">
                        <div className="row">
                          <div className="col-xl-5 col-lg-8">
                            <div className="vendor-content">
                              <div className="content-top mb-20">
                                <div className="icon">
                                  <i className="fa-solid fa-shield"></i>
                                </div>
                                <div className="content">
                                  <h2 className="title">
                                   <Link href="#">Olle Technology.Ltd</Link>
                                  </h2>
                                  <ul>
                                    <li>1 year</li>
                                    <li>
                                     <Link href="#"
                                        >Verified
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                      /></Link>
                                    </li>
                                    <li>13k Customer</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="ranking mb-30">
                                <ul>
                                  <li>No.1 Vendor Rankings</li>
                                  <li>Annual Sales $5,000,00</li>
                                </ul>
                              </div>
                              <div className="vendor-services">
                                <ul>
                                  <li>
                                    <h2 className="title">+/- 5 hr</h2>
                                    <p>Response Time</p>
                                  </li>
                                  <li>
                                    <h2 className="title">200,00+</h2>
                                    <p>Transtctions</p>
                                  </li>
                                  <li>
                                    <h2 className="title">100%</h2>
                                    <p>On-time delivery</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-12">
                            <div className="vendor-product-wrap">
                              <ul>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product05.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Gloves $9.08</Link
                                      >
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product06.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >watch $8.08</Link
                                      >
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product07.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product"
                                        >Shoes $9.08</Link
                                      >
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                   <Link href="/pro/hello-product"
                                      ><img
                                        src="/assets/client_assests/img/product/vendor_product08.png"
                                        alt=""
                                    /></Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                     <Link href="/pro/hello-product">Cap $5.08</Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default BestSeller;