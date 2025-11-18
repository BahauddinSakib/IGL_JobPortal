import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <section className="breadcrumb-area-four breadcrumb-bg vendor-profile-breadcrumb">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="store-product">
                <div className="store-thumb">
                  <img src="assets/img/images/store_img.png" alt="img" />
                </div>
                <div className="store-content">
                  <span className="verified">
                    Verified <i className="fa-solid fa-crown"></i>
                  </span>
                  <h2 className="title">Olle Store</h2>
                  <ul>
                    <li className="rating">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </li>
                    <li className="customer">40k Customer</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="breadcrumb-img text-end">
                <img src="assets/img/images/breadcrumb_img.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
        <div className="breadcrumb-list">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-content">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                       <Link href="index-2.html">Home</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Vendor Profile
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-product-area pt-80 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-3">
             <aside className="vp-sidebar">
                <div className="vp-widget">
                  <div className="widget-title">
                    <h4 className="title">Vendor Details</h4>
                  </div>
                  <ul className="product-quantity">
                    <li>
                      <div className="content">
                        <i className="flaticon-product"></i>
                        <p>Product Quantity</p>
                      </div>
                      <span>1500+</span>
                    </li>
                    <li>
                      <div className="content">
                        <i className="flaticon-money-bag-1"></i>
                        <p>Total Transactions</p>
                      </div>
                      <span>50,0000+</span>
                    </li>
                  </ul>
                </div>
                <div className="vp-widget">
                  <div className="widget-title">
                    <h4 className="title">Contacts</h4>
                  </div>
                  <ul className="contact-info">
                    <li>
                      <i className="fa-solid fa-location-dot"></i>71W Center New
                      York, NY, USA
                    </li>
                    <li>
                      <i className="fa-solid fa-phone-volume"></i>{" "}
                     <Link href="tel:0123456789">+0 546 25653 235</Link>
                    </li>
                  </ul>
                  <div className="contact-bottom">
                    <div className="wishlist">
                      <ul>
                        <li>
                         <Link href="#">
                            <i className="fa-regular fa-heart"></i>35k+
                          </Link>
                        </li>
                        <li>
                         <Link href="#">...</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="social">
                      <ul>
                        <li>
                         <Link href="#">
                            <i className="fa-brands fa-facebook-square"></i>
                          </Link>
                        </li>
                        <li>
                         <Link href="#">
                            <i className="fa-brands fa-twitter"></i>
                          </Link>
                        </li>
                        <li>
                         <Link href="#">
                            <i className="fa-brands fa-youtube"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="vp-widget">
                  <div className="widget-title">
                    <h4 className="title">Category</h4>
                  </div>
                  <div className="shop-cat-list">
                    <ul>
                      <li>
                       <Link href="#">
                          Furniture <span>8</span>
                        </Link>
                      </li>
                      <li>
                       <Link href="#">
                          Coffee & Tables1 <span>3</span>
                        </Link>
                      </li>
                      <li>
                       <Link href="#">
                          Lighting3 <span>2</span>
                        </Link>
                      </li>
                      <li>
                       <Link href="#">
                          Decoration5 <span>5</span>
                        </Link>
                      </li>
                      <li>
                       <Link href="#">
                          Electronics1 <span>9</span>
                        </Link>
                      </li>
                      <li>
                       <Link href="#">
                          Beds2 <span>8</span>
                        </Link>
                      </li>
                      <li>
                       <Link href="#">
                          Armchairs & Chaises3 <span>7</span>
                        </Link>
                      </li>
                      <li>
                       <Link href="#">
                          Sofas & Sleeper Sofas <span>3</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="vp-widget">
                  <div className="widget-title">
                    <h4 className="title">Contact Vendor</h4>
                  </div>
                  <div className="sidebar-contact-form">
                    <form action="#">
                      <input type="text" placeholder="Your Name" name="name" />
                      <input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                      />
                      <textarea
                        name="message"
                        placeholder="Type your message..."
                      />
                      <button className="btn btn-three" type="submit">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>

                <div className="vp-widget">
                  <div className="sidebar-add">
                   <Link href="shop.html">
                      <img
                        src="assets/img/images/vp_sidebar_add.jpg"
                        alt="img"
                      />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
            <div className="col-9">
              <div className="vp-product-top-wrap">
                <div className="search-product">
                  <form action="#">
                    <input type="text" placeholder="Enter Product Name" />
                    <button type="submit">Search</button>
                  </form>
                </div>
                <div className="vp-product-top-right">
                  <form action="#">
                    <label for="Sort by">sort By</label>
                    <select
                      id="shortBy"
                      name="select"
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Sorting</option>
                      <option>Free Shipping</option>
                      <option>Best Match</option>
                      <option>Newest Item</option>
                      <option>Size A - Z</option>
                    </select>
                  </form>
                  <ul>
                    <li>View</li>
                    <li className="active">
                     <Link href="#">
                        <i className="fa-solid fa-table-cells"></i>
                      </Link>
                    </li>
                    <li>
                     <Link href="#">
                        <i className="fa-solid fa-bars"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product01.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">Large Capacity Bamboo</Link>
                      </h4>
                      <ul>
                        <li className="price">$19.35 - $45.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product02.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">Laptop Tablet 13.3 Inch</Link>
                      </h4>
                      <ul>
                        <li className="price">$69.35 - $45.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product03.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">OnePlus 8 Pronyx Black</Link>
                      </h4>
                      <ul>
                        <li className="price">$39.35 - $45.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product04.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">OnePlus 8 Pronyx Black</Link>
                      </h4>
                      <ul>
                        <li className="price">$39.35 - $45.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product05.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">Stretching Device Back</Link>
                      </h4>
                      <ul>
                        <li className="price">$29.35 - $45.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product06.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">One Washer Dryer Combo</Link>
                      </h4>
                      <ul>
                        <li className="price">$19.35 - $50.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product07.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">OnePlus 8 Pronyx Black</Link>
                      </h4>
                      <ul>
                        <li className="price">$24.35 - $45.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product08.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">
                          Appliance Aid Kitchen Stand
                        </Link>
                      </h4>
                      <ul>
                        <li className="price">$19.35 - $45.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="vp-product-item mb-20">
                    <div className="vp-product-thumb text-center">
                      <span className="tag">Sold</span>
                     <Link href="shop-details.html">
                        <img
                          src="assets/img/product/vp_product09.png"
                          alt="img"
                        />
                      </Link>
                      <div className="product-overlay-action">
                        <ul>
                          <li className="wishlist">
                           <Link href="#">
                              <i className="fa-regular fa-heart"></i>
                            </Link>
                          </li>
                          <li className="color-option">
                            <span className="orange"></span>
                            <span className="cyan"></span>
                            <span className="gray"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="vp-product-content">
                      <ul className="sold-by">
                        <li>
                          Sold by<Link href="vendor-profile.html">Olle Store</Link>
                        </li>
                      </ul>
                      <h4 className="title">
                       <Link href="shop-details.html">
                          Parts Multi-function Portable
                        </Link>
                      </h4>
                      <ul>
                        <li className="price">$39.35 - $45.35</li>
                        <li className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="vp-product-content-bottom text-center">
                     <Link href="#" className="compare">
                        <i className="fa-solid fa-code-compare"></i>Compare Options
                      </Link>
                     <Link href="#" className="quick-view">
                        <i className="fa-regular fa-eye"></i>Quick View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-area-two">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="newsletter-content">
                <i className="fa-regular fa-paper-plane"></i>
                <h2 className="title">
                  Sign Up for get 10% Weekly <span>Newsletter</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-5">
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
