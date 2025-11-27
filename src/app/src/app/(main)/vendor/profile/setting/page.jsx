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
                                            <li class="breadcrumb-item active" aria-current="page">Vendor setting</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="vendor-setting-area pt-80 pb-100">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-3">
                            <aside class="vs-sidebar">
                                <div class="vs-widget">
                                    <div class="widget-title">
                                        <h4 class="title">Account Details</h4>
                                    </div>
                                    <ul class="product-quantity">
                                        <li>
                                            <div class="content">
                                                <i class="flaticon-lion-head"></i>
                                                <p>Product Quantity</p>
                                            </div>
                                            <span>1500+</span>
                                        </li>
                                        <li>
                                            <div class="content">
                                                <i class="flaticon-shopping-bag-1"></i>
                                                <p>Total Transactions</p>
                                            </div>
                                            <span>50,0000+</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="vs-widget">
                                    <div class="vs-page-link">
                                        <ul>
                                            <li class="active">
                                                <a href="#"><i class="fa-solid fa-gear"></i> Settings</a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="flaticon-box-1"></i> Products</a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="flaticon-dollar-sign"></i> Withdraw</a>
                                            </li>
                                            <li>
                                                <a href="#"><i class="flaticon-sign-out"></i> Sign out</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="vs-widget">
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
                            </aside>
                        </div>
                        <div class="col-xl-9">
                            <div class="vendor-setting-wrap">
                                <h2 class="title">Settings</h2>
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                                            role="tab" aria-controls="profile" aria-selected="true"><i class="flaticon-store"></i> Store Profile</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="vendor-tab" data-bs-toggle="tab" data-bs-target="#vendor" type="button"
                                            role="tab" aria-controls="vendor" aria-selected="false"><i class="flaticon-user"></i> Vendor Profile</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="payments-tab" data-bs-toggle="tab" data-bs-target="#payments" type="button"
                                            role="tab" aria-controls="payments" aria-selected="false"><i class="flaticon-money-1"></i> Payments methods</button>
                                    </li>
                                </ul>
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="product-upload-wrap">
                                            <div class="product-upload-box text-center">
                                                <div class="product-upload-content">
                                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                                    <a href="#">Upload Product</a>
                                                    <p>Upload a product for your store. Product size is (600×800) pixels.</p>
                                                </div>
                                            </div>
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="title">Product Title</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Product Price</label>
                                                            <input type="text" placeholder="$ -"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Product Brand</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Weight</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-grp">
                                                    <label htmlFor="price">Product Discount %</label>
                                                    <input type="text" placeholder="% -"/>
                                                </div>
                                                <div class="form-grp">
                                                    <label htmlFor="price">Product Description</label>
                                                    <textarea name="text"></textarea>
                                                </div>
                                                <button type="submit">Upload Shop</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="vendor" role="tabpanel" aria-labelledby="vendor-tab">
                                        <div class="product-upload-wrap">
                                            <div class="product-upload-box text-center">
                                                <div class="product-upload-content">
                                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                                    <a href="#">Upload Product</a>
                                                    <p>Upload a product for your store. Product size is (600×800) pixels.</p>
                                                </div>
                                            </div>
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="title">Product Title</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Product Price</label>
                                                            <input type="text" placeholder="$ -"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Product Brand</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Weight</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-grp">
                                                    <label htmlFor="price">Product Discount %</label>
                                                    <input type="text" placeholder="% -"/>
                                                </div>
                                                <div class="form-grp">
                                                    <label htmlFor="price">Product Description</label>
                                                    <textarea name="text"></textarea>
                                                </div>
                                                <button type="submit">Upload Shop</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="payments" role="tabpanel" aria-labelledby="payments-tab">
                                        <div class="product-upload-wrap">
                                            <div class="product-upload-box text-center">
                                                <div class="product-upload-content">
                                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                                    <a href="#">Upload Product</a>
                                                    <p>Upload a product for your store. Product size is (600×800) pixels.</p>
                                                </div>
                                            </div>
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="title">Product Title</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Product Price</label>
                                                            <input type="text" placeholder="$ -"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Product Brand</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-grp">
                                                            <label htmlFor="price">Weight</label>
                                                            <input type="text"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-grp">
                                                    <label htmlFor="price">Product Discount %</label>
                                                    <input type="text" placeholder="% -"/>
                                                </div>
                                                <div class="form-grp">
                                                    <label htmlFor="price">Product Description</label>
                                                    <textarea name="text"></textarea>
                                                </div>
                                                <button type="submit">Upload Shop</button>
                                            </form>
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