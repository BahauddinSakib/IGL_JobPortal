import React from 'react';
import Link from 'next/link';

const ChoseProduct = () => {
    return (
            <section className="choose-product-area pt-90 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title text-center mb-40">
                <h2 className="title">Choose Category</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
              <div className="add-banner">
                <div className="add-banner-img mb-20">
                 <Link href="shop.html"
                    ><img
                      src="/assets/client_assests/img/images/add_banner_img01.jpg"
                      alt="img"
                  /></Link>
                </div>
                <div className="add-banner-content">
                  <span>On the weekend</span>
                  <h2 className="title">Top Clothing</h2>
                 <Link href="shop.html" className="btn btn-two">shop now</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="category-item-wrap mb-20">
                    <h4 className="title">Top Rankings</h4>
                    <ul className="category-item-list">
                      <li className="category-item">
                       <Link href="shop.html"
                          ><img
                            src="/assets/client_assests/img/product/category_product_img01.jpg"
                            alt=""
                        /></Link>
                      </li>
                      <li className="category-item">
                       <Link href="shop.html"
                          ><img
                            src="/assets/client_assests/img/product/category_product_img02.jpg"
                            alt=""
                        /></Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="category-item-wrap mb-20">
                    <h4 className="title">Home Appliances</h4>
                    <ul className="category-item-list">
                      <li className="category-item">
                       <Link href="shop.html"
                          ><img
                            src="/assets/client_assests/img/product/category_product_img03.jpg"
                            alt=""
                        /></Link>
                      </li>
                      <li className="category-item">
                       <Link href="shop.html"
                          ><img
                            src="/assets/client_assests/img/product/category_product_img04.jpg"
                            alt=""
                        /></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="category-item-wrap mb-20">
                    <h4 className="title">Smart phone</h4>
                    <ul className="category-item-list">
                      <li className="category-item">
                       <Link href="shop.html"
                          ><img
                            src="/assets/client_assests/img/product/category_product_img05.jpg"
                            alt=""
                        /></Link>
                      </li>
                      <li className="category-item">
                       <Link href="shop.html"
                          ><img
                            src="/assets/client_assests/img/product/category_product_img06.jpg"
                            alt=""
                        /></Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="category-item-wrap mb-20">
                    <h4 className="title">Sports</h4>
                    <ul className="category-item-list">
                      <li className="category-item">
                       <Link href="shop.html"
                          ><img
                            src="/assets/client_assests/img/product/category_product_img07.jpg"
                            alt=""
                        /></Link>
                      </li>
                      <li className="category-item">
                       <Link href="shop.html"
                          ><img
                            src="/assets/client_assests/img/product/category_product_img08.jpg"
                            alt=""
                        /></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-5 col-md-6 col-sm-8">
              <div className="join-olle-wrap">
                <div className="icon">
                 <Link href="#"><i className="fa-solid fa-user"></i></Link>
                </div>
                <h3 className="title">Welcome to Olle</h3>
                <div className="join-btn">
                 <Link href="#" className="btn">Join Us</Link>
                 <Link href="#" className="btn">Sign In</Link>
                </div>
               <Link href="shop.html"
                  ><img src="/assets/client_assests/img/images/jo_img.jpg" alt=""
                /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default ChoseProduct;