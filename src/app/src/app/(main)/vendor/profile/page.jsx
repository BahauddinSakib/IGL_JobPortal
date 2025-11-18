import React from 'react';

const page = () => {
    return (
       <main>
            <section class="breadcrumb-area-four breadcrumb-bg vendor-profile-breadcrumb">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div class="store-product">
                                <div class="store-thumb">
                                    <img src="assets/img/images/store_img.png" alt="img"/>
                                </div>
                                <div class="store-content">
                                    <span class="verified">Verified <i class="fa-solid fa-crown"></i></span>
                                    <h2 class="title">Olle Store</h2>
                                    <ul>
                                        <li class="rating">
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </li>
                                        <li class="customer">40k Customer</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="breadcrumb-img text-end">
                                <img src="assets/img/images/breadcrumb_img.png" alt="img"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="breadcrumb-list">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="breadcrumb-content">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="index-2.html">Home</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Vendor Profile</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="vp-product-area pt-80 pb-100">
                <div class="container">
                    <div class="row">
                        <div class="col-3">
                            <aside class="vp-sidebar">
                                <div class="vp-widget">
                                    <div class="widget-title">
                                        <h4 class="title">Vendor Details</h4>
                                    </div>
                                    <ul class="product-quantity">
                                        <li>
                                            <div class="content">
                                                <i class="flaticon-product"></i>
                                                <p>Product Quantity</p>
                                            </div>
                                            <span>1500+</span>
                                        </li>
                                        <li>
                                            <div class="content">
                                                <i class="flaticon-money-bag-1"></i>
                                                <p>Total Transactions</p>
                                            </div>
                                            <span>50,0000+</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="vp-widget">
                                    <div class="widget-title">
                                        <h4 class="title">Contacts</h4>
                                    </div>
                                    <ul class="contact-info">
                                        <li><i class="fa-solid fa-location-dot"></i>71W Center New York, NY, USA</li>
                                        <li><i class="fa-solid fa-phone-volume"></i> <a href="tel:0123456789">+0 546 25653 235</a></li>
                                    </ul>
                                    <div class="contact-bottom">
                                        <div class="wishlist">
                                            <ul>
                                                <li><a href="#"><i class="fa-regular fa-heart"></i>35k+</a></li>
                                                <li><a href="#">...</a></li>
                                            </ul>
                                        </div>
                                        <div class="social">
                                            <ul>
                                                <li><a href="#"><i class="fa-brands fa-facebook-square"></i></a></li>
                                                <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                                <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="vp-widget">
                                    <div class="widget-title">
                                        <h4 class="title">Category</h4>
                                    </div>
                                    <div class="shop-cat-list">
                                        <ul>
                                            <li>
                                                <a href="#">Furniture <span>8</span></a>
                                            </li>
                                            <li>
                                                <a href="#">Coffee & Tables1 <span>3</span></a>
                                            </li>
                                            <li>
                                                <a href="#">Lighting3 <span>2</span></a>
                                            </li>
                                            <li>
                                                <a href="#">Decoration5 <span>5</span></a>
                                            </li>
                                            <li>
                                                <a href="#">Electronics1 <span>9</span></a>
                                            </li>
                                            <li>
                                                <a href="#">Beds2 <span>8</span></a>
                                            </li>
                                            <li>
                                                <a href="#">Armchairs & Chaises3 <span>7</span></a>
                                            </li>
                                            <li>
                                                <a href="#">Sofas & Sleeper Sofas <span>3</span></a>
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
      <input type="text" name="name" placeholder="Your Name" />
      <input type="email" name="email" placeholder="Your Email" />
      <textarea name="message" placeholder="Type your message..." />
      <button className="btn btn-three" type="submit">Send Message</button>
    </form>
  </div>
</div>

                                <div class="vp-widget">
                                    <div class="sidebar-add">
                                        <a href="shop.html"><img src="assets/img/images/vp_sidebar_add.jpg" alt="img"/></a>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <div class="col-9">
                            <div class="vp-product-top-wrap">
                                <div class="search-product">
                                    <form action="#">
                                        <input type="text" placeholder="Enter Product Name"/>
                                        <button type="submit">Search</button>
                                    </form>
                                </div>
                                <div class="vp-product-top-right">
                                    <form action="#">
                                        <label for="Sort by">sort By</label>
                                        <select id="shortBy" name="select" class="form-select" aria-label="Default select example">
                                            <option value="">Sorting</option>
                                            <option>Free Shipping</option>
                                            <option>Best Match</option>
                                            <option>Newest Item</option>
                                            <option>Size A - Z</option>
                                        </select>
                                    </form>
                                    <ul>
                                        <li>View</li>
                                        <li class="active"><a href="#"><i class="fa-solid fa-table-cells"></i></a></li>
                                        <li><a href="#"><i class="fa-solid fa-bars"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product01.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">Large Capacity Bamboo</a></h4>
                                            <ul>
                                                <li class="price">$19.35 - $45.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product02.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">Laptop Tablet 13.3 Inch</a></h4>
                                            <ul>
                                                <li class="price">$69.35 - $45.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product03.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">OnePlus 8 Pronyx Black</a></h4>
                                            <ul>
                                                <li class="price">$39.35 - $45.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product04.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">OnePlus 8 Pronyx Black</a></h4>
                                            <ul>
                                                <li class="price">$39.35 - $45.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product05.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">Stretching Device Back</a></h4>
                                            <ul>
                                                <li class="price">$29.35 - $45.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product06.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">One Washer Dryer Combo</a></h4>
                                            <ul>
                                                <li class="price">$19.35 - $50.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product07.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">OnePlus 8 Pronyx Black</a></h4>
                                            <ul>
                                                <li class="price">$24.35 - $45.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product08.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">Appliance Aid Kitchen Stand</a></h4>
                                            <ul>
                                                <li class="price">$19.35 - $45.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="vp-product-item mb-20">
                                        <div class="vp-product-thumb text-center">
                                            <span class="tag">Sold</span>
                                            <a href="shop-details.html"><img src="assets/img/product/vp_product09.png" alt="img"/></a>
                                            <div class="product-overlay-action">
                                                <ul>
                                                    <li class="wishlist"><a href="#"><i class="fa-regular fa-heart"></i></a></li>
                                                    <li class="color-option">
                                                        <span class="orange"></span>
                                                        <span class="cyan"></span>
                                                        <span class="gray"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="vp-product-content">
                                            <ul class="sold-by">
                                                <li>Sold by <a href="vendor-profile.html">Olle Store</a></li>
                                            </ul>
                                            <h4 class="title"><a href="shop-details.html">Parts Multi-function Portable</a></h4>
                                            <ul>
                                                <li class="price">$39.35 - $45.35</li>
                                                <li class="rating">
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="vp-product-content-bottom text-center">
                                            <a href="#" class="compare"><i class="fa-solid fa-code-compare"></i>Compare Options</a>
                                            <a href="#" class="quick-view"><i class="fa-regular fa-eye"></i>Quick View</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 
            <section class="newsletter-area-two">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-7">
                            <div class="newsletter-content">
                                <i class="fa-regular fa-paper-plane"></i>
                                <h2 class="title">Sign Up for get 10% Weekly <span>Newsletter</span></h2>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="newsletter-form">
                                <input type="text" placeholder="Your email here..."/>
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