import React from 'react';
import Link from 'next/link';

const FlashSell = () => {
    return (
        <>
        
      <section className="flash-product-area pt-90 pb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-8 col-sm-10">
              <div className="slider-add-banner banner-active mb-45">
               
                <div className="add-banner">
                  <div className="add-banner-img">
                   <Link href="shop.html"
                      ><img
                        src="/assets/client_assests/img/images/add_banner_slider01.jpg"
                        alt=""
                    /></Link>
                  </div>
                  <div className="add-banner-content">
                    <span>35% discount</span>
                    <h2 className="title">Smart Phone</h2>
                    <p>Reference site about</p>
                   <Link href="shop.html" className="btn">shop now</Link>
                  </div>
                </div>
                </div>
              <div className="trending-product">
                <h3 className="title">Trending Products</h3>
                <ul>
                  <li className="trending-product-item mb-30">
                    <div className="thumb">
                     <Link href="/pro/hello-product"
                        ><img
                          src="/assets/client_assests/img/product/trending_product01.png"
                          alt=""
                      /></Link>
                    </div>
                    <div className="content">
                      <h6 className="title">
                       <Link href="/pro/hello-product">Morales Ultimate Launch</Link>
                      </h6>
                      <h4 className="price">$09.08 <del>$29.08</del></h4>
                      <div className="content-bottom">
                        <ul>
                          <li>1k+ Orders ~</li>
                          <li><i className="fa-solid fa-star"></i>4.7</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="trending-product-item mb-30">
                    <div className="thumb">
                     <Link href="/pro/hello-product"
                        ><img
                          src="/assets/client_assests/img/product/trending_product02.png"
                          alt=""
                      /></Link>
                    </div>
                    <div className="content">
                      <h6 className="title">
                       <Link href="/pro/hello-product"
                          >Lixada Fishing Breathable</Link
                        >
                      </h6>
                      <h4 className="price">$14.08 <span>-35%</span></h4>
                      <div className="content-bottom">
                        <ul>
                          <li>1.5k+ Orders ~</li>
                          <li><i className="fa-solid fa-star"></i>4.8</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="trending-product-item mb-30">
                    <div className="thumb">
                     <Link href="/pro/hello-product"
                        ><img
                          src="/assets/client_assests/img/product/trending_product03.png"
                          alt=""
                      /></Link>
                    </div>
                    <div className="content">
                      <h6 className="title">
                       <Link href="/pro/hello-product">Morales Ultimate Launch</Link>
                      </h6>
                      <h4 className="price">$18.08 <span>-25%</span></h4>
                      <div className="content-bottom">
                        <ul>
                          <li>2k+ Orders ~</li>
                          <li><i className="fa-solid fa-star"></i>4.5</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="trending-product-item mb-30">
                    <div className="thumb">
                     <Link href="/pro/hello-product"
                        ><img
                          src="/assets/client_assests/img/product/trending_product04.png"
                          alt=""
                      /></Link>
                    </div>
                    <div className="content">
                      <h6 className="title">
                       <Link href="/pro/hello-product">Winter Gloves Mens</Link>
                      </h6>
                      <h4 className="price">$19.08 <span>-20%</span></h4>
                      <div className="content-bottom">
                        <ul>
                          <li>3k+ Orders ~</li>
                          <li><i className="fa-solid fa-star"></i>4.9</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12">
              <div className="add-banner-thumb mb-55">
               <Link href="#"
                  ><img src="/assets/client_assests/img/images/add_banner_img02.jpg" alt=""
                /></Link>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="section-title title-style-two mb-30">
                    <h4 className="title">Flash Sale Today!</h4>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="product-menu-nav">
                    <button className="active" data-filter="*">Flash</button>
                    <button className="" data-filter=".cat-one">Popular</button>
                    <button className="" data-filter=".cat-two">Top Rate</button>
                  </div>
                </div>
              </div>
              <div className="flash-product-item-wrap">
                <div className="row flash-isotope-active">
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two"
                  >
                    <div className="product-item-two mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/flash_product01.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                         <Link href="/pro/hello-product"
                            >Morales Ultimate Launch</Link
                          >
                        </h6>
                        <h4 className="price">$29.08 <span>-35%</span></h4>
                        <div className="content-bottom">
                          <ul>
                            <li>1k+ Orders ~</li>
                            <li><i className="fa-solid fa-star"></i>4.9</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two cat-one"
                  >
                    <div className="product-item-two mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/flash_product02.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                         <Link href="/pro/hello-product"
                            >Lixada Fishing Breathable</Link
                          >
                        </h6>
                        <h4 className="price">$25.08 <span>-34%</span></h4>
                        <div className="content-bottom">
                          <ul>
                            <li>1.5k+ Orders ~</li>
                            <li><i className="fa-solid fa-star"></i>4.2</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-one"
                  >
                    <div className="product-item-two mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/flash_product03.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                         <Link href="/pro/hello-product">Winter Gloves Mens</Link>
                        </h6>
                        <h4 className="price">$29.08 <span>-20%</span></h4>
                        <div className="content-bottom">
                          <ul>
                            <li>2k+ Orders ~</li>
                            <li><i className="fa-solid fa-star"></i>4.8</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-one cat-two"
                  >
                    <div className="product-item-two mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/flash_product04.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                         <Link href="/pro/hello-product">Fashion High scalding</Link>
                        </h6>
                        <h4 className="price">$28.08 <span>-40%</span></h4>
                        <div className="content-bottom">
                          <ul>
                            <li>2.5k+ Orders ~</li>
                            <li><i className="fa-solid fa-star"></i>4.7</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two cat-one"
                  >
                    <div className="product-item-two mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/flash_product05.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                         <Link href="/pro/hello-product"
                            >Morales Ultimate Launch</Link
                          >
                        </h6>
                        <h4 className="price">$29.08 <span>-35%</span></h4>
                        <div className="content-bottom">
                          <ul>
                            <li>1.5k+ Orders ~</li>
                            <li><i className="fa-solid fa-star"></i>4.4</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two"
                  >
                    <div className="product-item-two mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/flash_product06.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                         <Link href="/pro/hello-product"
                            >Lixada Fishing Breathable</Link
                          >
                        </h6>
                        <h4 className="price">$27.08 <span>-50%</span></h4>
                        <div className="content-bottom">
                          <ul>
                            <li>1.5k+ Orders ~</li>
                            <li><i className="fa-solid fa-star"></i>4.3</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-one"
                  >
                    <div className="product-item-two mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/flash_product07.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                         <Link href="/pro/hello-product">Elastic Summer Newborn</Link>
                        </h6>
                        <h4 className="price">$9.08 <span>-30%</span></h4>
                        <div className="content-bottom">
                          <ul>
                            <li>5.5k+ Orders ~</li>
                            <li><i className="fa-solid fa-star"></i>4.5</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item grid-sizer cat-two"
                  >
                    <div className="product-item-two mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/flash_product08.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h6 className="title">
                         <Link href="/pro/hello-product">Fashion High scalding</Link>
                        </h6>
                        <h4 className="price">$29.08 <span>-30%</span></h4>
                        <div className="content-bottom">
                          <ul>
                            <li>3.3k+ Orders ~</li>
                            <li><i className="fa-solid fa-star"></i>4.5</li>
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
      </section>


        
        </>
    );
};

export default FlashSell;