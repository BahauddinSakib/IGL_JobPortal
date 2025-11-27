"use client"
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
   const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/products/product-details/${id}`
        );
        if (res.status === 200) {
          setProduct(res.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (!mounted || loading) {
    return <div className="content">Loading...</div>;
  }

  if (!product) {
    return <div className="content">Product not found</div>;
  }

  
  return (
    <div className="content">
      <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>Product Detail</h1>
          <p className="breadcrumbs">
            <span>
              <a href="index.html">Home</a>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            Product
          </p>
        </div>
        <div>
          <Link href={`/admin/products/edit-product/${id}`} className="btn btn-primary">
            
            Edit
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-body product-detail">
              <div className="row">
                <div className="col-xl-4 col-lg-6">
                  <div className="row">
                    <div className="single-pro-img">
                      <div className="single-product-scroll">
                        {
                          <img className="tbl-thumb" src={`${process.env.imageBaseurl}/uploads/products/${product[0]?.pro_thumbnail}`} alt="Product Image" />
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-6">
                  <div className="row product-overview">
                    <div className="col-12">
                      <h5 className="product-title">
                        Pure Leather Purse for Woman
                      </h5>
                      <p className="product-rate">
                        <i className="mdi mdi-star is-rated"></i>
                        <i className="mdi mdi-star is-rated"></i>
                        <i className="mdi mdi-star is-rated"></i>
                        <i className="mdi mdi-star is-rated"></i>
                        <i className="mdi mdi-star"></i>
                      </p>
                      <p className="product-desc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1990.
                      </p>
                      <p className="product-desc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1990.
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                      <div className="ec-ofr">
                        <h6>Available offers</h6>
                        <ul>
                          <li>
                            <b>Special Price :</b> Get extra 16% off (price
                            inclusive of discount) <a href="#">T&C</a>{" "}
                          </li>
                          <li>
                            <b>Bank Offer :</b> 10% off on XYZ Bank Cards, up to
                            $12. On orders of $200 and above <a href="#">T&C</a>
                          </li>
                          <li>
                            <b>Bank Offer :</b> 5% Unlimited Cashback on Ekka
                            XYZ Bank Credit Card <a href="#">T&C</a>
                          </li>
                          <li>
                            <b>Bank Offer :</b> Flat $50 off on first Ekka Pay
                            Later order of $200 and above <a href="#">T&C</a>
                          </li>
                        </ul>
                      </div>
                      <p className="product-price">Price: $120</p>
                      <p className="product-sku">SKU#: WH12</p>
                      <ul className="product-size">
                        <li className="size">
                          <span>S</span>
                        </li>
                        <li className="size">
                          <span>M</span>
                        </li>
                        <li className="size">
                          <span>L</span>
                        </li>
                        <li className="size">
                          <span>XL</span>
                        </li>
                      </ul>
                      <ul className="product-color">
                        <li className="color">
                          <span style={{ backgroundColor: "#90cdf7" }}></span>
                        </li>
                        <li className="color">
                          <span style={{ backgroundColor: "#ff3b66" }}></span>
                        </li>
                        <li className="color">
                          <span style={{ backgroundColor: "#ffc476" }}></span>
                        </li>
                        <li className="color">
                          <span style={{ backgroundColor: "#1af0ba" }}></span>
                        </li>
                        <li className="color">
                          <span style={{ backgroundColor: "#f887d6" }}></span>
                        </li>
                      </ul>

                      <div className="product-stock">
                        <div className="stock">
                          <p className="title">Available</p>
                          <p className="text">180</p>
                        </div>
                        <div className="stock">
                          <p className="title">Pending</p>
                          <p className="text">50</p>
                        </div>
                        <div className="stock">
                          <p className="title">InOrder</p>
                          <p className="text">20</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-12 u-card">
                  <div className="card card-default seller-card">
                    <div className="card-body text-center">
                      <a
                        href="javascript:0"
                        className="text-secondary d-inline-block"
                      >
                        <div className="image mb-3">
                          <img
                            src="assets/img/user/u-xl-4.jpg"
                            className="img-fluid rounded-circle"
                            alt="Avatar Image"
                          />
                        </div>

                        <h5 className="text-dark">John Karter</h5>
                        <p className="product-rate">
                          <i className="mdi mdi-star is-rated"></i>
                          <i className="mdi mdi-star is-rated"></i>
                          <i className="mdi mdi-star is-rated"></i>
                          <i className="mdi mdi-star is-rated"></i>
                          <i className="mdi mdi-star"></i>
                        </p>

                        <ul className="list-unstyled">
                          <li className="d-flex mb-1">
                            <i className="mdi mdi-map mr-1"></i>
                            <span>321/2, rio street, usa.</span>
                          </li>
                          <li className="d-flex mb-1">
                            <i className="mdi mdi-email mr-1"></i>
                            <span>example@email.com</span>
                          </li>
                          <li className="d-flex">
                            <i className="mdi mdi-whatsapp mr-1"></i>
                            <span>+00 987-654-3210</span>
                          </li>
                        </ul>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row review-rating mt-4">
                <div className="col-12">
                  <ul className="nav nav-tabs" id="myRatingTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="product-detail-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#productdetail"
                        href="#productdetail"
                        role="tab"
                        aria-selected="true"
                      >
                        <i className="mdi mdi-library-books mr-1"></i> Detail
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="product-information-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#productinformation"
                        href="#productinformation"
                        role="tab"
                        aria-selected="false"
                      >
                        <i className="mdi mdi-information mr-1"></i>Info
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="product-reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#productreviews"
                        href="#productreviews"
                        role="tab"
                        aria-selected="false"
                      >
                        <i className="mdi mdi-star-half mr-1"></i> Reviews
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent2">
                    <div
                      className="tab-pane pt-3 fade show active"
                      id="productdetail"
                      role="tabpanel"
                    >
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </p>
                      <ul className="features">
                        <li>
                          Any Product types that You want - Simple, Configurable
                        </li>
                        <li>Downloadable/Digital Products, Virtual Products</li>
                        <li>Inventory Management with Backordered items</li>
                        <li>Flatlock seams throughout.</li>
                      </ul>
                    </div>

                    <div
                      className="tab-pane pt-3 fade"
                      id="productinformation"
                      role="tabpanel"
                    >
                      <ul>
                        <li>
                          <span>Weight</span> 1000 g
                        </li>
                        <li>
                          <span>Dimensions</span> 35 × 30 × 7 cm
                        </li>
                        <li>
                          <span>Color</span> Black, Pink, Red, White
                        </li>
                      </ul>
                    </div>

                    <div
                      className="tab-pane pt-3 fade"
                      id="productreviews"
                      role="tabpanel"
                    >
                      <div className="ec-t-review-wrapper">
                        <div className="ec-t-review-item">
                          <div className="ec-t-review-avtar">
                            <img src="assets/img/review-image/1.jpg" alt="" />
                          </div>
                          <div className="ec-t-review-content">
                            <div className="ec-t-review-top">
                              <p className="ec-t-review-name">Jeny Doe</p>
                              <div className="ec-t-rate">
                                <i className="mdi mdi-star is-rated"></i>
                                <i className="mdi mdi-star is-rated"></i>
                                <i className="mdi mdi-star is-rated"></i>
                                <i className="mdi mdi-star is-rated"></i>
                                <i className="mdi mdi-star"></i>
                              </div>
                            </div>
                            <div className="ec-t-review-bottom">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="ec-t-review-item">
                          <div className="ec-t-review-avtar">
                            <img src="assets/img/review-image/2.jpg" alt="" />
                          </div>
                          <div className="ec-t-review-content">
                            <div className="ec-t-review-top">
                              <p className="ec-t-review-name">Linda Morgus</p>
                              <div className="ec-t-rate">
                                <i className="mdi mdi-star is-rated"></i>
                                <i className="mdi mdi-star is-rated"></i>
                                <i className="mdi mdi-star is-rated"></i>
                                <i className="mdi mdi-star is-rated"></i>
                                <i className="mdi mdi-star"></i>
                              </div>
                            </div>
                            <div className="ec-t-review-bottom">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </p>
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
      </div>
    </div>
  );
};

export default page;
