import Link from 'next/link';
import React from 'react';

const SuperDeals = () => {
    return (
           <section className="super-deals-product-area pt-30 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="product-wrap mb-30">
                <div className="row align-items-center mb-20">
                  <div className="col-xl-3 col-lg-4 col-md-3">
                    <div className="section-title">
                      <h2 className="title">Super <span>Deals</span></h2>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-7">
                    <div className="super-deals-countdown">
                      <p>Top products. Incredible prices</p>
                      <div className="coming-time" data-countdown="2023/4/30"></div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-2 col-md-2">
                    <div className="view-more text-end">
                     <Link href="shop.html">View more</Link>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                   <Link href={`/pro/hello-product`}>
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product01.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >Watch $29.08<span>-35%</span></Link
                          >
                        </h4>
                        <p>0 orders</p>
                      </div>
                    </div>
                   </Link>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product02.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >Backup $29.08<span>-25%</span></Link
                          >
                        </h4>
                        <p>05 orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product03.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >Fashion $15.08<span>-35%</span></Link
                          >
                        </h4>
                        <p>13 orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product04.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >Watch $29.08<span>-35%</span></Link
                          >
                        </h4>
                        <p>50 orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product05.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >Accessories<span>-15%</span></Link
                          >
                        </h4>
                        <p>02 orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product06.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >Jewellery $29.08<span>-20%</span></Link
                          >
                        </h4>
                        <p>20 orders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-9">
              <div className="product-wrap top-product mb-20">
                <div className="row mb-20">
                  <div className="col-md-6">
                    <div className="product-title">
                      <h4 className="title">Top Selection</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="view-more text-end">
                     <Link href="shop.html">View more</Link>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product07.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >launch $29.08<span>-30%</span></Link
                          >
                        </h4>
                        <p>40 orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product08.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >Watch $29.08<span>-40%</span></Link
                          >
                        </h4>
                        <p>20 orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product09.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >phone $29.08<span>-10%</span></Link
                          >
                        </h4>
                        <p>30 orders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-9">
              <div className="product-wrap top-product mb-20">
                <div className="row mb-20">
                  <div className="col-md-6">
                    <div className="product-title">
                      <h4 className="title">New arrivals</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="view-more text-end">
                     <Link href="shop.html">View more</Link>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product10.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >launch $29.08<span>-30%</span></Link
                          >
                        </h4>
                        <p>40 orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product11.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >Watch $29.08<span>-40%</span></Link
                          >
                        </h4>
                        <p>20 orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="product-item mb-30">
                      <div className="product-thumb">
                       <Link href="/pro/hello-product"
                          ><img
                            src="/assets/client_assests/img/product/super_product12.jpg"
                            alt=""
                        /></Link>
                      </div>
                      <div className="product-content">
                        <h4 className="title">
                         <Link href="/pro/hello-product"
                            >phone $29.08<span>-10%</span></Link
                          >
                        </h4>
                        <p>30 orders</p>
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

export default SuperDeals;