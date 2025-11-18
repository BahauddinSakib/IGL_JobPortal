import React from 'react';
import Link from 'next/link';

const page = () => {
    return (
     <section className="promotion-area pt-35 pb-115">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7">
                        <div className="promotion-top">
                            <div className="promotion-logo text-center mb-15">
                               <Link href="index-2.html"><img src="assets/img/logo/logo_02.png" alt=""/></Link>
                            </div>
                            <h2 className="main-title">Olle is here for you</h2>
                            <img src="assets/img/images/promotion_img01.jpg" alt="" className="img-one"/>
                            <h4 className="title-two">Hey Olle</h4>
                            <p className="info-one">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meanngful content. Lorem ipsum may be used as a placeholder before.</p>
                            <p className="info-two">Demonstrate the visual form of a document or a typeface without relying on meanngful content. Lorem ipsum may be used as a placeholder before.</p>
                            <h3 className="title-three">We’d like to introduce our product</h3>
                            <p className="info-three">Demonstrate the visual form of a document or a typeface</p>
                            <div className="introduce-product">
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <img src="assets/img/icon/ip_icon01.png" alt=""/>
                                        </div>
                                        <div className="content">
                                            <p><span>Demonstrate the visual</span> form of a document or a typace without relying on meanngful content. Lorem ipsum may be used as a placeholder before document.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <img src="assets/img/icon/ip_icon02.png" alt=""/>
                                        </div>
                                        <div className="content">
                                            <p><span>Mobile the visual</span> form of a document or a typace without relyi meanngful content. Lorem ipsum may be used as a placeholder or a typace before document.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="promotion-bottom">
                            <div className="view-watch text-center">
                                <span>View Watch Stories</span>
                            </div>
                            <div className="watch-img text-center mb-60">
                                <img src="assets/img/images/promotion_img02.png" alt=""/>
                            </div>
                            <div className="view-watch-wrap mb-60">
                                <div className="color-wrap">
                                    <span>Color :</span>
                                    <ul>
                                        <li className="active"></li>
                                        <li className="black"></li>
                                        <li className="green"></li>
                                        <li className="blue"></li>
                                    </ul>
                                </div>
                                <div className="view-watch-img">
                                    <ul>
                                        <li><img src="assets/img/images/promotion_img03.jpg" alt=""/></li>
                                        <li><img src="assets/img/images/promotion_img04.jpg" alt=""/></li>
                                    </ul>
                                </div>
                            </div>
                            <ul className="watch-item-wrap mb-100">
                                <li className="watch-item">
                                    <div className="thumb">
                                        <img src="assets/img/images/watch_img01.png" alt=""/>
                                    </div>
                                    <div className="content">
                                        <h3 className="title">Largest, most Advanced display yet.</h3>
                                        <p>document typace without relyi meanngful content. Lorem ipsum may be used as a placeholder or a typace</p>
                                       <Link href="shop-details.html" className="watch-btn">View Watch</Link>
                                    </div>
                                </li>
                                <li className="watch-item">
                                    <div className="content">
                                        <h3 className="title">Breakthrough health innovations.</h3>
                                        <p>document typace without relyi meanngful content. Lorem ipsum may be used as a placeholder or a typace</p>
                                       <Link href="shop-details.html" className="watch-btn">$199.50</Link>
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/images/watch_img02.png" alt=""/>
                                    </div>
                                </li>
                            </ul>
                            <div className="pricing-wrap text-center">
                                <h2 className="title">Our Pricing</h2>
                                <p>Document typace without relyi</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="pricing-box mb-40">
                                            <div className="pricing-head mb-35">
                                                <h2 className="title">Breakthrough</h2>
                                                <p>Gold Watch</p>
                                            </div>
                                            <div className="pricing-charging">
                                                <span>33% faster charging.</span>
                                            </div>
                                            <div className="pricing-list mb-45">
                                                <ul>
                                                    <li>Over 50% more screen</li>
                                                    <li>Always-On Retina display</li>
                                                    <li>Series 7 is the most durable</li>
                                                    <li>64 GB Storage</li>
                                                </ul>
                                            </div>
                                            <div className="pricing-btn">
                                               <Link href="#">Buy Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="pricing-box mb-40">
                                            <div className="pricing-head mb-35">
                                                <h2 className="title">Breakthrough</h2>
                                                <p>Gold Watch</p>
                                            </div>
                                            <div className="pricing-charging">
                                                <span>33% faster charging.</span>
                                            </div>
                                            <div className="pricing-list mb-45">
                                                <ul>
                                                    <li>Over 50% more screen</li>
                                                    <li>Always-On Retina display</li>
                                                    <li>Series 7 is the most durable</li>
                                                    <li>64 GB Storage</li>
                                                </ul>
                                            </div>
                                            <div className="pricing-btn">
                                               <Link href="#">Buy Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="promotion-newsletter text-center">
                                <h2 className="title">Newsletter Helpful?</h2>
                                <p>Document typace without relyi meanngful content. Lorem ipsum may be used as a placeholder or a typace</p>
                                <form action="#">
                                    <input type="text" placeholder="your@mail.com"/>
                                    <button type="submit">Newsletter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;