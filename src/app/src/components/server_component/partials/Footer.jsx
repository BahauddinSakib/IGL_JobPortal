import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/siteData/get-site-data`,
    {
      cache: "no-store",
    }
  );
  const siteData = await res.json();
  const { sd_logo } = siteData;


  return (
    <footer>
      <div className="footer-area">
        <div className="footer-top pt-60 pb-40">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                <div className="footer-widget mb-30">
                  <div className="f-logo mb-25">
                    <Link href="/">
                      <img
                     src={`${process.env.imageBaseurl}/uploads/site-data/${sd_logo}`}
                        alt="Logo"
                      />
                    </Link>
                  </div>
                  <div className="footer-content">
                    <span>Got Question? Call us 24/7</span>
                    <Link href="tel:03336666777" className="contact">
                      0-333-6666-7777
                    </Link>
                    <p>Register now to get updates on promotions & coupons.</p>
                  </div>
                  <div className="footer-social">
                    <ul>
                      <li>
                        <Link href="#">
                          <i className="fa-brands fa-facebook-f"></i>
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
                      <li>
                        <Link href="#">
                          <i className="fa-brands fa-instagram"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-4">
                <div className="footer-widget mb-30">
                  <div className="fw-title mb-20">
                    <h2 className="title">INFORMATION</h2>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li>
                        <Link href="/about">About Us</Link>
                      </li>
                      <li>
                        <Link href="/careers">Careers</Link>
                      </li>
                      <li>
                        <Link href="/shipping">Orders & Shipping</Link>
                      </li>
                      <li>
                        <Link href="/supplies">Office Supplies</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link href="/customer-service">Customer Service</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-2 col-md-6 col-sm-6">
                <div className="footer-widget mb-30">
                  <div className="fw-title mb-20">
                    <h2 className="title">MY ACCOUNT</h2>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li>
                        <Link href="/track-order">Track My Order</Link>
                      </li>
                      <li>
                        <Link href="/cart">View Cart</Link>
                      </li>
                      <li>
                        <Link href="/signin">Sign In</Link>
                      </li>
                      <li>
                        <Link href="/help">Help</Link>
                      </li>
                      <li>
                        <Link href="/wishlist">My Wishlist</Link>
                      </li>
                      <li>
                        <Link href="/privacy">Privacy Policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="footer-widget mb-30">
                  <div className="fw-title mb-20">
                    <h2 className="title">CUSTOMER SERVICE</h2>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li>
                        <Link href="/payment-methods">Payment Methods</Link>
                      </li>
                      <li>
                        <Link href="/money-back">Money-back guarantee!</Link>
                      </li>
                      <li>
                        <Link href="/returns">Products Returns</Link>
                      </li>
                      <li>
                        <Link href="/support">Support Center</Link>
                      </li>
                      <li>
                        <Link href="/shipping-info">Shipping</Link>
                      </li>
                      <li>
                        <Link href="/terms">Term and Conditions</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="copyright-text">
                  <p>Copyright ©2025 - IGL Web All Rights Reserved</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-5">
                <div className="cart-img text-end">
                  <img
                    src="//assets/client_assests/img/images/cart_img.jpg"
                    alt="Payment methods"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
