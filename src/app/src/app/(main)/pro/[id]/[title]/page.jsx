import React from "react";
import Link from "next/link";
import AddToCartButton from "@/app/(main)/cart/components/AddToCartButton";

const page = async ({ params }) => {
  const { id, title } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/products/product-details/${id}`,
    {
      cache: "no-store",
    }
  );
  const response = await res.json();
  const product = response[0];


  return (
    <main>
      <section className="breadcrumb-area-two">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumb-wrap">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="#">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      shop single
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-details-area pt-80 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="shop-details-img-wrap">
                <div className="tab-content" id="nav-tabContent">
                  {product.images?.map((image, index) => (
                    <div
                      className={`tab-pane ${index === 0 ? "show active" : ""}`}
                      id={`nav-item-${index}`}
                      role="tabpanel"
                      aria-labelledby={`nav-item-${index}-tab`}
                      key={index}
                    >
                      <div className="shop-details-img">
                        <img
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/products/${image.pro_img_name}`}
                          alt={`Product image ${index + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shop-details-nav-wrap">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {product.images?.map((image, index) => (
                      <button
                        className={`nav-link ${index === 0 ? "active" : ""}`}
                        id={`nav-item-${index}-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#nav-item-${index}`}
                        type="button"
                        role="tab"
                        aria-controls={`nav-item-${index}`}
                        aria-selected={index === 0 ? "true" : "false"}
                        key={index}
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/products/${image.pro_img_name}`}
                          alt={`Thumbnail image ${index + 1}`}
                        />
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="shop-details-content">
                <span>
                  <i className="fa-solid fa-check"></i>
                  {product?.pro_status === 2 ? "In Stock" : "Out of Stock"}
                </span>
                <h2 className="title">{product?.pro_title}</h2>
                <ul>
                  {product?.pro_has_discount === 1 && (
                    <li data-background="/assets/client_assests/img/images/coupon_bg01.png">
                      ${product.pro_discount} Coupons For You
                    </li>
                  )}
                  {product?.pro_has_discount === 1 &&
                    product.pro_discount_percentage && (
                      <li data-background="/assets/client_assests/img/images/coupon_bg02.png">
                        $
                        {product.pro_price *
                          (product.pro_discount_percentage / 100)}{" "}
                        off.OLLESHOP7
                      </li>
                    )}
                  <li>
                    <Link href="#">Get Coupons</Link>
                  </li>
                </ul>
                <div className="shop-details-price">
                  <h2 className="title">
                    $
                    {product?.pro_has_discount === 1
                      ? product.pro_buy_price
                      : product?.pro_price}
                  </h2>
                  {product?.pro_has_discount === 1 && (
                    <del>${product?.pro_price}</del>
                  )}
                  <h4 className="stock-status">
                    - {product?.pro_status === 2 ? "IN Stock" : "OUT OF Stock"}
                  </h4>
                </div>
                <p>{product?.pro_description}</p>

                <div className="shop-details-color">
                  <span>Color :</span>
                  <ul>
                    {/* These would ideally come from product data if available */}
                    <li className="active"></li>
                    <li className="black"></li>
                    <li className="green"></li>
                    <li className="blue"></li>
                  </ul>
                </div>

                <div className="shop-details-quantity">
                  <span>Quantity :</span>
                  <div className="cart-plus-minus">
                    <input type="text" defaultValue="1" />
                  </div>
<AddToCartButton></AddToCartButton>
                  <Link href={`/pro/${product?.pro_slug}`} className="cart-btn">
                    Buy now
                  </Link>
                </div>
                <div className="shop-details-Wishlist">
                  <ul>
                    <li>
                      <Link href="#">
                        <i className="fa-regular fa-heart"></i>Add to Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fa-solid fa-chart-column"></i>Compare
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="shop-details-bottom">
                  <ul>
                    <li className="sd-category">
                      <span className="title">Categories :</span>
                      {/* Assuming product object might have category information, otherwise keep static or fetch */}
                      <Link href="shop.html">Hand Watch,</Link>
                      <Link href="shop.html">Smartwatch,</Link>
                      <Link href="shop.html">Phone</Link>
                    </li>
                    <li className="sd-sku">
                      <span className="title">SKU :</span>
                      <Link href="shop.html">{product?.pro_code}</Link>
                    </li>
                    <li className="sd-share">
                      <span className="title">Share Now :</span>
                      <Link href="#">
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                      <Link href="#">
                        <i className="fab fa-twitter"></i>
                      </Link>
                      <Link href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4">
              <div className="recommended-item-wrap">
                <div className="recommended scroll">
                  <span>Recommended For You :</span>
                  <div className="recommended-item mb-25">
                    <div className="thumb">
                      <Link href="/pro/hello-product">
                        <img
                          src="/assets/client_assests/img/product/recommended_img01.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <h5 className="price">$39.08</h5>
                      <ul>
                        <li>
                          by<Link href="vendor-profile.html">Market Store</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="recommended-item mb-25">
                    <div className="thumb">
                      <Link href="/pro/hello-product">
                        <img
                          src="/assets/client_assests/img/product/recommended_img02.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <h5 className="price">$29.08</h5>
                      <ul>
                        <li>
                          by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="recommended-item mb-25">
                    <div className="thumb">
                      <Link href="/pro/hello-product">
                        <img
                          src="/assets/client_assests/img/product/recommended_img03.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <h5 className="price">$25.08</h5>
                      <ul>
                        <li>
                          by<Link href="vendor-profile.html">max shop</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="recommended-item mb-25">
                    <div className="thumb">
                      <Link href="/pro/hello-product">
                        <img
                          src="/assets/client_assests/img/product/recommended_img01.jpg"
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <h5 className="price">$39.08</h5>
                      <ul>
                        <li>
                          by<Link href="vendor-profile.html">Market Store</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="best-sell-product-area pt-90 pb-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title text-center mb-60">
                <h2 className="title">Welcome to Vendor Profile</h2>
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
                        <i className="flaticon-shipping"></i>
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
                        <i className="flaticon-smartwatch"></i>
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
                        <i className="flaticon-lamp"></i>
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
                        <i className="flaticon-kitchen-utensils"></i>
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
                        <i className="flaticon-high-heels-1"></i>
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
                        <i className="flaticon-sport-equipment"></i>
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
                                    <Link href="#">
                                      Theme Beyond Technology.Ltd
                                    </Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                      <Link href="#">
                                        Verified{" "}
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                        />
                                      </Link>
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
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Gloves $9.08
                                      </Link>
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        watch $8.08
                                      </Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Shoes $9.08
                                      </Link>
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Cap $5.08
                                      </Link>
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
                                    <Link href="#">
                                      Theme Beyond Technology.Ltd
                                    </Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                      <Link href="#">
                                        Verified{" "}
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                        />
                                      </Link>
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
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Gloves $9.08
                                      </Link>
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        watch $8.08
                                      </Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Shoes $9.08
                                      </Link>
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Cap $5.08
                                      </Link>
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
                                    <Link href="#">
                                      Theme Beyond Technology.Ltd
                                    </Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                      <Link href="#">
                                        Verified{" "}
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                        />
                                      </Link>
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
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Gloves $9.08
                                      </Link>
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        watch $8.08
                                      </Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Shoes $9.08
                                      </Link>
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Cap $5.08
                                      </Link>
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
                                    <Link href="#">
                                      Theme Beyond Technology.Ltd
                                    </Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                      <Link href="#">
                                        Verified{" "}
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                        />
                                      </Link>
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
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Gloves $9.08
                                      </Link>
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        watch $8.08
                                      </Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Shoes $9.08
                                      </Link>
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Cap $5.08
                                      </Link>
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
                                    <Link href="#">
                                      Theme Beyond Technology.Ltd
                                    </Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                      <Link href="#">
                                        Verified{" "}
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                        />
                                      </Link>
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
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Gloves $9.08
                                      </Link>
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        watch $8.08
                                      </Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Shoes $9.08
                                      </Link>
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Cap $5.08
                                      </Link>
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
                                    <Link href="#">
                                      Theme Beyond Technology.Ltd
                                    </Link>
                                  </h2>
                                  <ul>
                                    <li>2 year</li>
                                    <li>
                                      <Link href="#">
                                        Verified{" "}
                                        <img
                                          src="/assets/client_assests/img/icon/verified_icon.png"
                                          alt=""
                                        />
                                      </Link>
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
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product01.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Gloves $9.08
                                      </Link>
                                    </h2>
                                    <span>15 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product02.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        watch $8.08
                                      </Link>
                                    </h2>
                                    <span>15k+ (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product03.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Shoes $9.08
                                      </Link>
                                    </h2>
                                    <span>03 (Sale)</span>
                                  </div>
                                </li>
                                <li className="vendor-product">
                                  <div className="thumb">
                                    <Link href="/pro/hello-product">
                                      <img
                                        src="/assets/client_assests/img/product/vendor_product04.png"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <h2 className="title">
                                      <Link href="/pro/hello-product">
                                        Cap $5.08
                                      </Link>
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
      <section className="product-details-area pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="product-desc-wrap">
                <div className="product-desc-top">
                  <div className="product-desc-nav">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="overview-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#overview"
                          type="button"
                          role="tab"
                          aria-controls="overview"
                          aria-selected="true"
                        >
                          Overview
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="reviews-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#reviews"
                          type="button"
                          role="tab"
                          aria-controls="reviews"
                          aria-selected="false"
                        >
                          costumer reviews (10)
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="specifications-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#specifications"
                          type="button"
                          role="tab"
                          aria-controls="specifications"
                          aria-selected="false"
                        >
                          Specifications
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="product-report">
                    <Link href="/contact-us">Report Item</Link>
                  </div>
                </div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="overview"
                    role="tabpanel"
                    aria-labelledby="overview-tab"
                  >
                    <div className="product-desc-content">
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form,by injected humour, or rando wmised words
                        which don't look even the slightly believable. If you
                        are going to use a passage of Lorem Ipsum, you need to
                        be sure there isn't anything embarrassing hidden in the
                        middle of text. All the Lorem Ipsum genereators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet. It
                        uses a dictionary of over 200 Latdin words, combined
                        with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable suffered alteration
                        in some form.
                      </p>
                      <div className="product-quick-details mb-25">
                        <h4 className="title">Quick Details</h4>
                        <div className="product-details-list-wrap">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Private Mold:</li>
                                  <li>Model Number:</li>
                                  <li>Display Type:</li>
                                  <li>Screen:</li>
                                  <li>Feature:</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Yes</li>
                                  <li>uxt</li>
                                  <li>Max</li>
                                  <li>5"</li>
                                  <li>MP3 Playback</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Brand Name:</li>
                                  <li>Place of Origin:</li>
                                  <li>Screen Resolution:</li>
                                  <li>Display Color:</li>
                                  <li>Operation System:</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>SOVOGUE</li>
                                  <li>Guangdong, China</li>
                                  <li>240*320</li>
                                  <li>Color</li>
                                  <li>ANDROID, IOS</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        Need to be sure there isn't anything embarrassing hidden
                        in the middle of text. All the Lorem Ipsum genereators
                        on the Internet tend to repeat predefined chunks as
                        necessary, making this the first true generator on the
                        Internet. It uses a dictionary of over 200 Latdin words,
                        combined with a handful of model sentence structures, to
                        generate Lorem Ipsum which looks reasonable tend
                        suffered alteration in some form reators on the Internet
                        tend to repeat .
                      </p>
                      <div className="product-feature-wrap mb-30">
                        <div className="row">
                          <div className="col-xl-7 col-lg-6">
                            <div className="product-details-img">
                              <img
                                src="/assets/client_assests/img/images/product_details_img.jpg"
                                alt="img"
                              />
                            </div>
                          </div>
                          <div className="col-xl-5 col-lg-6">
                            <div className="product-feature">
                              <h4 className="title">Features :</h4>
                              <p>
                                Need to be sure there isn't anything
                                embarrassing hidden in the middle of text. All
                                the Lorem Ipsum genereators on the Internet tend
                                to repeat predefined chunks assing hidden
                              </p>
                              <ul className="product-feature-list">
                                <li>
                                  Windows Mobile® 6.1 Professional Edition
                                </li>
                                <li>The device features a LED display.</li>
                                <li>
                                  Pros:really great keyboard, good trackpad,
                                  alcantara
                                </li>
                                <li>
                                  802.11b/g with WPA, WPA2, and 801.1x
                                  authentication
                                </li>
                                <li>
                                  320x320 transflective colour TFT touchscreen
                                </li>
                                <li>HSDPA/UMTS/EDGE/GPRS/GSM radio</li>
                                <li>
                                  Tri-band UMTS — 850MHz, 1900MHz, 2100MHz
                                </li>
                                <li>
                                  2.0 megapixel camera, up to 8x digital zoom
                                  and video capture
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or rando wmised words
                        which don't look even the slightly believable. If you
                        are going to use a passage of Lorem Ipsum, you need to
                        be sure there isn't anything embarrassing hidden in the
                        middle of text. All the Lorem Ipsum genereators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet. It
                        uses a dictionary of over 200 Latdin words, combined
                        with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable suffered alteration
                        in some form.
                      </p>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="reviews"
                    role="tabpanel"
                    aria-labelledby="reviews-tab"
                  >
                    <div className="product-desc-content">
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form,by injected humour, or rando wmised words
                        which don't look even the slightly believable. If you
                        are going to use a passage of Lorem Ipsum, you need to
                        be sure there isn't anything embarrassing hidden in the
                        middle of text. All the Lorem Ipsum genereators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet. It
                        uses a dictionary of over 200 Latdin words, combined
                        with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable suffered alteration
                        in some form.
                      </p>
                      <div className="product-quick-details mb-25">
                        <h4 className="title">Quick Details</h4>
                        <div className="product-details-list-wrap">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Private Mold:</li>
                                  <li>Model Number:</li>
                                  <li>Display Type:</li>
                                  <li>Screen:</li>
                                  <li>Feature:</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Yes</li>
                                  <li>uxt</li>
                                  <li>Max</li>
                                  <li>5"</li>
                                  <li>MP3 Playback</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Brand Name:</li>
                                  <li>Place of Origin:</li>
                                  <li>Screen Resolution:</li>
                                  <li>Display Color:</li>
                                  <li>Operation System:</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>SOVOGUE</li>
                                  <li>Guangdong, China</li>
                                  <li>240*320</li>
                                  <li>Color</li>
                                  <li>ANDROID, IOS</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        Need to be sure there isn't anything embarrassing hidden
                        in the middle of text. All the Lorem Ipsum genereators
                        on the Internet tend to repeat predefined chunks as
                        necessary, making this the first true generator on the
                        Internet. It uses a dictionary of over 200 Latdin words,
                        combined with a handful of model sentence structures, to
                        generate Lorem Ipsum which looks reasonable tend
                        suffered alteration in some form reators on the Internet
                        tend to repeat .
                      </p>
                      <div className="product-feature-wrap mb-30">
                        <div className="row">
                          <div className="col-xl-7 col-lg-6">
                            <div className="product-details-img">
                              <img
                                src="/assets/client_assests/img/images/product_details_img.jpg"
                                alt="img"
                              />
                            </div>
                          </div>
                          <div className="col-xl-5 col-lg-6">
                            <div className="product-feature">
                              <h4 className="title">Features :</h4>
                              <p>
                                Need to be sure there isn't anything
                                embarrassing hidden in the middle of text. All
                                the Lorem Ipsum genereators on the Internet tend
                                to repeat predefined chunks assing hidden
                              </p>
                              <ul className="product-feature-list">
                                <li>
                                  Windows Mobile® 6.1 Professional Edition
                                </li>
                                <li>The device features a LED display.</li>
                                <li>
                                  Pros:really great keyboard, good trackpad,
                                  alcantara
                                </li>
                                <li>
                                  802.11b/g with WPA, WPA2, and 801.1x
                                  authentication
                                </li>
                                <li>
                                  320x320 transflective colour TFT touchscreen
                                </li>
                                <li>HSDPA/UMTS/EDGE/GPRS/GSM radio</li>
                                <li>
                                  Tri-band UMTS — 850MHz, 1900MHz, 2100MHz
                                </li>
                                <li>
                                  2.0 megapixel camera, up to 8x digital zoom
                                  and video capture
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or rando wmised words
                        which don't look even the slightly believable. If you
                        are going to use a passage of Lorem Ipsum, you need to
                        be sure there isn't anything embarrassing hidden in the
                        middle of text. All the Lorem Ipsum genereators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet. It
                        uses a dictionary of over 200 Latdin words, combined
                        with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable suffered alteration
                        in some form.
                      </p>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="specifications"
                    role="tabpanel"
                    aria-labelledby="specifications-tab"
                  >
                    <div className="product-desc-content">
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form,by injected humour, or rando wmised words
                        which don't look even the slightly believable. If you
                        are going to use a passage of Lorem Ipsum, you need to
                        be sure there isn't anything embarrassing hidden in the
                        middle of text. All the Lorem Ipsum genereators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet. It
                        uses a dictionary of over 200 Latdin words, combined
                        with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable suffered alteration
                        in some form.
                      </p>
                      <div className="product-quick-details mb-25">
                        <h4 className="title">Quick Details</h4>
                        <div className="product-details-list-wrap">
                          <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Private Mold:</li>
                                  <li>Model Number:</li>
                                  <li>Display Type:</li>
                                  <li>Screen:</li>
                                  <li>Feature:</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Yes</li>
                                  <li>uxt</li>
                                  <li>Max</li>
                                  <li>5"</li>
                                  <li>MP3 Playback</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>Brand Name:</li>
                                  <li>Place of Origin:</li>
                                  <li>Screen Resolution:</li>
                                  <li>Display Color:</li>
                                  <li>Operation System:</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                              <div className="product-details-list">
                                <ul>
                                  <li>SOVOGUE</li>
                                  <li>Guangdong, China</li>
                                  <li>240*320</li>
                                  <li>Color</li>
                                  <li>ANDROID, IOS</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        Need to be sure there isn't anything embarrassing hidden
                        in the middle of text. All the Lorem Ipsum genereators
                        on the Internet tend to repeat predefined chunks as
                        necessary, making this the first true generator on the
                        Internet. It uses a dictionary of over 200 Latdin words,
                        combined with a handful of model sentence structures, to
                        generate Lorem Ipsum which looks reasonable tend
                        suffered alteration in some form reators on the Internet
                        tend to repeat .
                      </p>
                      <div className="product-feature-wrap mb-30">
                        <div className="row">
                          <div className="col-xl-7 col-lg-6">
                            <div className="product-details-img">
                              <img
                                src="/assets/client_assests/img/images/product_details_img.jpg"
                                alt="img"
                              />
                            </div>
                          </div>
                          <div className="col-xl-5 col-lg-6">
                            <div className="product-feature">
                              <h4 className="title">Features :</h4>
                              <p>
                                Need to be sure there isn't anything
                                embarrassing hidden in the middle of text. All
                                the Lorem Ipsum genereators on the Internet tend
                                to repeat predefined chunks assing hidden
                              </p>
                              <ul className="product-feature-list">
                                <li>
                                  Windows Mobile® 6.1 Professional Edition
                                </li>
                                <li>The device features a LED display.</li>
                                <li>
                                  Pros:really great keyboard, good trackpad,
                                  alcantara
                                </li>
                                <li>
                                  802.11b/g with WPA, WPA2, and 801.1x
                                  authentication
                                </li>
                                <li>
                                  320x320 transflective colour TFT touchscreen
                                </li>
                                <li>HSDPA/UMTS/EDGE/GPRS/GSM radio</li>
                                <li>
                                  Tri-band UMTS — 850MHz, 1900MHz, 2100MHz
                                </li>
                                <li>
                                  2.0 megapixel camera, up to 8x digital zoom
                                  and video capture
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or rando wmised words
                        which don't look even the slightly believable. If you
                        are going to use a passage of Lorem Ipsum, you need to
                        be sure there isn't anything embarrassing hidden in the
                        middle of text. All the Lorem Ipsum genereators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet. It
                        uses a dictionary of over 200 Latdin words, combined
                        with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable suffered alteration
                        in some form.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-product-area pb-90">
        <div className="container">
          <div className="row align-items-center mb-35">
            <div className="col-md-8">
              <div className="section-title">
                <h2 className="title">Supplier's popular products</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="vendor-profile text-end">
                <Link href="vendor-profile.html">
                  Go Vendor Profile
                  <i className="fa-regular fa-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="row popular-product-active">
            <div className="col-xl-2">
              <div className="product-item-three">
                <div className="product-thumb">
                  <Link href="/pro/hello-product">
                    <img
                      src="/assets/client_assests/img/product/popular_product01.jpg"
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="product-content text-center">
                  <h4 className="title">
                    <Link href="/pro/hello-product">
                      OnePlus 8 Pro Onyx Black
                    </Link>
                  </h4>
                  <p>
                    0 orders <span>-35%</span>
                  </p>
                  <h4 className="price">$29.08</h4>
                </div>
              </div>
            </div>
            <div className="col-xl-2">
              <div className="product-item-three">
                <div className="product-thumb">
                  <Link href="/pro/hello-product">
                    <img
                      src="/assets/client_assests/img/product/popular_product02.jpg"
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="product-content text-center">
                  <h4 className="title">
                    <Link href="/pro/hello-product">
                      Stretching Device Back
                    </Link>
                  </h4>
                  <p>
                    03 orders <span>-25%</span>
                  </p>
                  <h4 className="price">$19.08</h4>
                </div>
              </div>
            </div>
            <div className="col-xl-2">
              <div className="product-item-three">
                <div className="product-thumb">
                  <Link href="/pro/hello-product">
                    <img
                      src="/assets/client_assests/img/product/popular_product03.jpg"
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="product-content text-center">
                  <h4 className="title">
                    <Link href="/pro/hello-product">Electric Kick Scooter</Link>
                  </h4>
                  <p>
                    05 orders <span>-40%</span>
                  </p>
                  <h4 className="price">$45.08</h4>
                </div>
              </div>
            </div>
            <div className="col-xl-2">
              <div className="product-item-three">
                <div className="product-thumb">
                  <Link href="/pro/hello-product">
                    <img
                      src="/assets/client_assests/img/product/popular_product04.jpg"
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="product-content text-center">
                  <h4 className="title">
                    <Link href="/pro/hello-product">
                      Stretching Device Back
                    </Link>
                  </h4>
                  <p>
                    08 orders <span>-30%</span>
                  </p>
                  <h4 className="price">$35.08</h4>
                </div>
              </div>
            </div>
            <div className="col-xl-2">
              <div className="product-item-three">
                <div className="product-thumb">
                  <Link href="/pro/hello-product">
                    <img
                      src="/assets/client_assests/img/product/popular_product05.jpg"
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="product-content text-center">
                  <h4 className="title">
                    <Link href="/pro/hello-product">
                      Outdoor Travel 35L Sport
                    </Link>
                  </h4>
                  <p>
                    10 orders <span>-20%</span>
                  </p>
                  <h4 className="price">$19.08</h4>
                </div>
              </div>
            </div>
            <div className="col-xl-2">
              <div className="product-item-three">
                <div className="product-thumb">
                  <Link href="/pro/hello-product">
                    <img
                      src="/assets/client_assests/img/product/popular_product06.jpg"
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="product-content text-center">
                  <h4 className="title">
                    <Link href="/pro/hello-product">Electric Kick Scooter</Link>
                  </h4>
                  <p>
                    02 orders <span>-35%</span>
                  </p>
                  <h4 className="price">$29.08</h4>
                </div>
              </div>
            </div>
            <div className="col-xl-2">
              <div className="product-item-three">
                <div className="product-thumb">
                  <Link href="/pro/hello-product">
                    <img
                      src="/assets/client_assests/img/product/popular_product03.jpg"
                      alt="img"
                    />
                  </Link>
                </div>
                <div className="product-content text-center">
                  <h4 className="title">
                    <Link href="/pro/hello-product">Electric Kick Scooter</Link>
                  </h4>
                  <p>
                    05 orders <span>-40%</span>
                  </p>
                  <h4 className="price">$45.08</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-area-two">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-7 col-lg-6 col-md-12">
              <div className="newsletter-content">
                <i className="fa-regular fa-paper-plane"></i>
                <h2 className="title">
                  Sign Up for get 10% Weekly <span>Newsletter</span>
                </h2>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-10">
              <div className="newsletter-form">
                <input type="text" placeholder="Your email here..." />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
