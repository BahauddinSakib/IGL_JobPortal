"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React from "react";

const Page = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <div className="ec-content-wrapper">
        <div className="content">
          <div className="breadcrumb-wrapper breadcrumb-wrapper-2">
            <h1>Order Detail</h1>
            <p className="breadcrumbs">
              <span>
                <Link href="/">Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Orders
            </p>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="ec-odr-dtl card card-default">
                <div className="card-header card-header-border-bottom d-flex justify-content-between">
                  <h2 className="ec-odr">
                    Order Detail
                    <br />
                    <span className="small">Order ID: #{id || "1082"}</span>
                  </h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-3 col-lg-6">
                      <address className="info-grid">
                        <div className="info-title">
                          <strong>Customer:</strong>
                        </div>
                        <br />
                        <div className="info-content">
                          Twitter, Inc.
                          <br />
                          795 Folsom Ave, Suite 600
                          <br />
                          San Francisco, CA 94107
                          <br />
                          <abbr title="Phone">P:</abbr> (123) 456-7890
                        </div>
                      </address>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <address className="info-grid">
                        <div className="info-title">
                          <strong>Shipped To:</strong>
                        </div>
                        <br />
                        <div className="info-content">
                          Elaine Hernandez
                          <br />
                          P. Sherman 42,
                          <br />
                          Wallaby Way, Sidney
                          <br />
                          <abbr title="Phone">P:</abbr> (123) 345-6789
                        </div>
                      </address>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <address className="info-grid">
                        <div className="info-title">
                          <strong>Payment Method:</strong>
                        </div>
                        <br />
                        <div className="info-content">
                          Visa ending **** 1234
                          <br />
                          h.elaine@gmail.com
                          <br />
                        </div>
                      </address>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <address className="info-grid">
                        <div className="info-title">
                          <strong>Order Date:</strong>
                        </div>
                        <br />
                        <div className="info-content">
                          4:34PM,
                          <br />
                          Wed, Aug 13, 2020
                        </div>
                      </address>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="tbl-title">PRODUCT SUMMARY</h3>
                      <div className="table-responsive">
                        <table className="table table-striped o-tbl">
                          <thead>
                            <tr className="line">
                              <td>
                                <strong>#</strong>
                              </td>
                              <td className="text-center">
                                <strong>IMAGE</strong>
                              </td>
                              <td className="text-center">
                                <strong>PRODUCT</strong>
                              </td>
                              <td className="text-center">
                                <strong>PRICE/UNIT</strong>
                              </td>
                              <td className="text-right">
                                <strong>QUANTITY</strong>
                              </td>
                              <td className="text-right">
                                <strong>SUBTOTAL</strong>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <img
                                  className="product-img"
                                  src="/assets/img/products/p1.jpg"
                                  alt=""
                                />
                              </td>
                              <td>
                                <strong>Baby Pink Shoes</strong>
                                <br />a vary smooth and comfert Shoes ever for
                                baby.
                              </td>
                          
                              <td className="text-center">$75</td>
                                  <td className="text-center">15</td>
                              <td className="text-right">$1,125.00</td>
                            </tr>
                    
                            <tr>
                              <td colSpan="4"></td>
                              <td className="text-right">
                                <strong>Taxes</strong>
                              </td>
                              <td className="text-right">
                                <strong>N/A</strong>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4"></td>
                              <td className="text-right">
                                <strong>Total</strong>
                              </td>
                              <td className="text-right">
                                <strong>$2,400.00</strong>
                              </td>
                            </tr>

                            <tr>
                              <td colSpan="4"></td>
                              <td className="text-right">
                                <strong>Payment Status</strong>
                              </td>
                              <td className="text-right">
                                <strong>PAID</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tracking Detail */}
              <div className="card mt-4 trk-order">
                <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
                  <span className="text-uppercase">Tracking Order No - </span>
                  <span className="text-medium">34VB5540K83</span>
                </div>
                <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                  <div className="w-100 text-center py-1 px-2">
                    <span className="text-medium">Shipped Via:</span> UPS Ground
                  </div>
                  <div className="w-100 text-center py-1 px-2">
                    <span className="text-medium">Status:</span>
                    Checking Quality
                  </div>
                  <div className="w-100 text-center py-1 px-2">
                    <span className="text-medium">Expected Date:</span> DEC 09,
                    2021
                  </div>
                </div>
                <div className="card-body">
                  <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                    <div className="step completed">
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <i className="mdi mdi-cart"></i>
                        </div>
                      </div>
                      <h4 className="step-title">Confirmed Order</h4>
                    </div>
                    <div className="step completed">
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <i className="mdi mdi-tumblr-reblog"></i>
                        </div>
                      </div>
                      <h4 className="step-title">Processing Order</h4>
                    </div>
                    <div className="step completed">
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <i className="mdi mdi-gift"></i>
                        </div>
                      </div>
                      <h4 className="step-title">Product Dispatched</h4>
                    </div>
                    <div className="step">
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <i className="mdi mdi-truck-delivery"></i>
                        </div>
                      </div>
                      <h4 className="step-title">On Delivery</h4>
                    </div>
                    <div className="step">
                      <div className="step-icon-wrap">
                        <div className="step-icon">
                          <i className="mdi mdi-hail"></i>
                        </div>
                      </div>
                      <h4 className="step-title">Product Delivered</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
       
      </div>
    </div>
  );
};

export default Page;
