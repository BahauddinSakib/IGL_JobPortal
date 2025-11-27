import React from 'react';
import Link from 'next/link';

const page = () => {
    return (
        <main>
            <section className="breadcrumb-area breadcrumb-bg">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-8 order-2 order-md-0">
                            <div className="breadcrumb-product text-center">
                                <div className="thumb">
                                   <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/br_product_img.png" alt="img"/></Link>
                                    <span>35% OFF</span>
                                </div>
                                <div className="content">
                                    <div className="rating">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                    <h4 className="title"><Link href="/pro/hello-product">Blender Mixer Food</Link></h4>
                                    <h5 className="price">$37.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-7">
                            <div className="breadcrumb-content">
                                <h2 className="title">Discount shop</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href="index-2.html">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shop</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shop-area pt-90 pb-90">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-3 col-lg-4 col-md-8 col-sm-10 order-2 order-lg-0">
                           <aside className="shop-sidebar">
                                <div className="widget mb-35">
                                    <div className="widget-title mb-25">
                                        <h4 className="title">Category</h4>
                                    </div>
                                    <div className="shop-cat-list">
                                        <ul>
                                            <li>
                                               <Link href="#">Furniture <span>8</span></Link>
                                            </li>
                                            <li>
                                               <Link href="#">Coffee & Tables1 <span>3</span></Link>
                                            </li>
                                            <li>
                                               <Link href="#">Lighting3 <span>2</span></Link>
                                            </li>
                                            <li>
                                               <Link href="#">Decoration5 <span>5</span></Link>
                                            </li>
                                            <li>
                                               <Link href="#">Electronics1 <span>9</span></Link>
                                            </li>
                                            <li>
                                               <Link href="#">Beds2 <span>8</span></Link>
                                            </li>
                                            <li>
                                               <Link href="#">Armchairs & Chaises3 <span>7</span></Link>
                                            </li>
                                            <li>
                                               <Link href="#">Sofas & Sleeper Sofas <span>3</span></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="widget mb-40">
                                    <div className="widget-title mb-25">
                                        <h4 className="title">Best Seller</h4>
                                    </div>
                                    <div className="sidebar-product-list">
                                        <ul>
                                            <li>
                                                <div className="thumb">
                                                   <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/sidebar_product01.jpg" alt="img"/></Link>
                                                </div>
                                                <div className="content">
                                                    <h6 className="title"><Link href="/pro/hello-product">Appliance Aid Kitchen Stand</Link></h6>
                                                    <div className="rating">
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                    </div>
                                                    <h4 className="price"><del>$39.08</del> $19.00</h4>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="thumb">
                                                   <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/sidebar_product02.jpg" alt="img"/></Link>
                                                </div>
                                                <div className="content">
                                                    <h6 className="title"><Link href="/pro/hello-product">One Washer Dryer</Link></h6>
                                                    <div className="rating">
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                    </div>
                                                    <h4 className="price"><del>$39.08</del> $19.00</h4>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="thumb">
                                                   <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/sidebar_product03.jpg" alt="img"/></Link>
                                                </div>
                                                <div className="content">
                                                    <h6 className="title"><Link href="/pro/hello-product">Electric Blender Mixer</Link></h6>
                                                    <div className="rating">
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                    </div>
                                                    <h4 className="price"><del>$39.08</del> $19.00</h4>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="widget mb-40">
                                    <div className="widget-title price-title mb-15">
                                        <h4 className="title">Filter by price :</h4>
                                    </div>
                                    <div className="price_filter">
                                        <div id="slider-range"></div>
                                        <div className="price_slider_amount">
                                            <input type="submit" className="btn" value="Filter"/>
                                            <span>Price :</span>
                                            <input type="text" id="amount" name="price" placeholder="Add Your Price" />
                                        </div>
                                    </div>
                                </div>
                                <div className="widget">
                                    <div className="widget-title mb-15">
                                        <h4 className="title">Product Brand</h4>
                                    </div>
                                    <div className="shop-brand-list">
                                        <ul>
                                            <li><Link href="#">New Arrivals <i className="fa-solid fa-angles-right"></i></Link></li>
                                            <li><Link href="#">Clothing & Accessories <i className="fa-solid fa-angles-right"></i></Link></li>
                                            <li><Link href="#">Electronics <i className="fa-solid fa-angles-right"></i></Link></li>
                                            <li><Link href="#">Home Appliance <i className="fa-solid fa-angles-right"></i></Link></li>
                                            <li><Link href="#">Gaming Accessories <i className="fa-solid fa-angles-right"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <div className="col-xl-9 col-lg-8">
                            <div className="shop-top-wrap mb-35">
                                <div className="shop-top-left">
                                    <h5 className="title">Shop</h5>
                                </div>
                                <div className="shop-top-right">
                                    <form action="#">
                                        <label htmlForor="Sort by">sort By</label>
                                        <select id="shortBy" name="select" className="form-select" aria-label="Default select example">
                                            <option value="">Sorting</option>
                                            <option>Free Shipping</option>
                                            <option>Best Match</option>
                                            <option>Newest Item</option>
                                            <option>Size A - Z</option>
                                        </select>
                                    </form>
                                    <ul>
                                        <li>View</li>
                                        <li className="active"><Link href="#"><i className="fa-solid fa-table-cells"></i></Link></li>
                                        <li><Link href="#"><i className="fa-solid fa-bars"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img01.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <ul className="tag">
                                                <li>Sold by<Link href="vendor-profile.html">Market Store</Link></li>
                                            </ul>
                                            <h2 className="title"><Link href="/pro/hello-product">Electric Blender Mixer Food</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 75%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img02.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <ul className="tag">
                                                <li>Sold by<Link href="vendor-profile.html">olle Store</Link></li>
                                            </ul>
                                            <h2 className="title"><Link href="/pro/hello-product">Car Air Purifier With HEPA</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 50%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img03.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <ul className="tag">
                                                <li>Sold by<Link href="vendor-profile.html">alto</Link></li>
                                            </ul>
                                            <h2 className="title"><Link href="/pro/hello-product">One Washer Dryer Combo</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 75%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img04.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <span className="tag">Sold by<Link href="vendor-profile.html">Market Store</Link></span>
                                            <h2 className="title"><Link href="/pro/hello-product">Parts Multi-function Portable</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 25%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img05.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <ul className="tag">
                                                <li>Sold by<Link href="vendor-profile.html">olle Store</Link></li>
                                            </ul>
                                            <h2 className="title"><Link href="/pro/hello-product">Outdoor Travel 35L Sport</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 100%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img06.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <ul className="tag">
                                                <li>Sold by<Link href="vendor-profile.html">alto</Link></li>
                                            </ul>
                                            <h2 className="title"><Link href="/pro/hello-product">OnePlus 8 Pronyx Black</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 50%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img07.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <ul className="tag">
                                                <li>Sold by<Link href="vendor-profile.html">Market Store</Link></li>
                                            </ul>
                                            <h2 className="title"><Link href="/pro/hello-product">Electric Blender Mixer Food</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 75%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img08.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <ul className="tag">
                                                <li>Sold by<Link href="vendor-profile.html">Olle Store</Link></li>
                                            </ul>
                                            <h2 className="title"><Link href="/pro/hello-product">Car Air Purifier With HEPA</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 25%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-8">
                                    <div className="shop-product-item mb-30">
                                        <div className="shop-thumb">
                                           <Link href="/pro/hello-product"><img src="/assets/client_assests/img/product/shop_img09.png" alt="img"/></Link>
                                            <span>New</span>
                                        </div>
                                        <div className="shop-content">
                                            <ul className="tag">
                                                <li>Sold by<Link href="vendor-profile.html">alto</Link></li>
                                            </ul>
                                            <h2 className="title"><Link href="/pro/hello-product">One Washer Dryer Combo</Link></h2>
                                            <div className="rating">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span>Already Sold : 75%</span>
                                            <div className="progress">
                                                <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                            <div className="content-bottom">
                                                <h4 className="price">$39.08</h4>
                                                <p>0 orders <span>-35%</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-bottom-wrap">
                                <div className="shop-bottom-top">
                                    <h5 className="title">Shop</h5>
                                    <p>Showing 1-09 of 30 Item(S)</p>
                                </div>
                                <div className="shop-bottom-box">
                                    <div className="shop-bottom-left">
                                        <form action="#">
                                            <select id="shortBy" name="select" className="form-select" aria-label="Default select example">
                                                <option value="">Show 09</option>
                                                <option>Show 12</option>
                                                <option>Show 08</option>
                                                <option>Show 06</option>
                                                <option>Show 03</option>
                                            </select>
                                        </form>
                                    </div>
                                    <div className="shop-bottom-right">
                                        <form action="#">
                                            <select id="shortBy" name="select" className="form-select" aria-label="Default select example">
                                                <option value="">Default sorting</option>
                                                <option>Free Shipping</option>
                                                <option>Best Match</option>
                                                <option>Newest Item</option>
                                                <option>Size A - Z</option>
                                            </select>
                                        </form>
                                        <ul>
                                            <li className="active"><Link href="#"><i className="fa-solid fa-table-cells"></i></Link></li>
                                            <li><Link href="#"><i className="fa-solid fa-bars"></i></Link></li>
                                        </ul>
                                    </div>
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
                                <h2 className="title">Sign Up for get 10% Weekly <span>Newsletter</span></h2>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 col-md-10">
                            <div className="newsletter-form">
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