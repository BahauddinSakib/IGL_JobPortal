import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Banner = async() => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/siteData/get-site-data`, {
    cache: 'no-store' 
  })
  const siteData = await res.json()
  const {sd_banner} = siteData


    return (
         <section className="banner-area pt-20">
        <div className="banner-shape"></div>
        <div className="container">
          <div className="row justify-content-end">
            {/* <div className="col-xl-9">
              <div className="row align-items-center">
                <div className="col-lg-6 order-0 order-lg-2">
                  <div className="banner-img">
                   <img src={`${process.env.imageBaseurl}/uploads/site-data/${banner}`} height={100} width={100} alt="" />
                    <div className="product-tooltip">
                      <div className="tooltip-btn"></div>
                      <div
                        className="tooltip-product-item product-tooltip-item left"
                      >
                        <div className="close-btn">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className="tooltip-product-thumb">
                         <Link href="/pro/hello-product">
                            <img
                              src="/assets/client_assests/img/product/tooltip_img.jpg"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="tooltip-product-content">
                          <h5 className="title">
                           <Link href="/pro/hello-product"
                              >Watch $29.08 <span>-35%</span></Link
                            >
                          </h5>
                          <p className="order">0 orders</p>
                        </div>
                      </div>
                    </div>
                    <div className="product-tooltip">
                      <div className="tooltip-btn"></div>
                      <div
                        className="tooltip-product-item product-tooltip-item bottom left"
                      >
                        <div className="close-btn">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className="tooltip-product-thumb">
                         <Link href="/pro/hello-product">
                            <img
                              src="/assets/client_assests/img/product/tooltip_img.jpg"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="tooltip-product-content">
                          <h5 className="title">
                           <Link href="/pro/hello-product"
                              >Watch $29.08 <span>-35%</span></Link
                            >
                          </h5>
                          <p className="order">0 orders</p>
                        </div>
                      </div>
                    </div>
                    <div className="product-tooltip">
                      <div className="tooltip-btn"></div>
                      <div className="tooltip-product-item product-tooltip-item">
                        <div className="close-btn">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className="tooltip-product-thumb">
                         <Link href="/pro/hello-product">
                            <img
                              src="/assets/client_assests/img/product/tooltip_img.jpg"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="tooltip-product-content">
                          <h5 className="title">
                           <Link href="/pro/hello-product"
                              >Watch $29.08 <span>-35%</span></Link
                            >
                          </h5>
                          <p className="order">0 orders</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="banner-content">
                    <h2 className="title">
                      Always <br />
                      Be Your <span>MULTIVENDOR</span>
                    </h2>
                    <h4 className="small-title">Women <span>Fashion</span></h4>
                    <h5 className="price">Total order : <span>$35.00 By Reza</span></h5>
                   <Link href="shop.html" className="btn">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div> */}
<div className="col-xl-9">
  <img 
    src={`${process.env.imageBaseurl}/uploads/site-data/${sd_banner}`} 
    className="w-100 h-auto" 
    alt="Dynamic Banner" 
  />
</div>
          </div>
        </div>
      </section>
    );
};

export default Banner;