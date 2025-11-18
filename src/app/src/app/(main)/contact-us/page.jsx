import React from 'react';

const page = () => {
    return (
        <main>

            <section class="breadcrumb-area-two">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="breadcrumb-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">contact</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="contact-area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="contact-box-wrap">
                                <div class="row">
                                    <div class="col-7">
                                        <div class="contact-form">
                                            <span>Contact Us Now</span>
                                            <h3 class="title">Write a Message</h3>
                                            <form action="#">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input type="text" placeholder="Your Name *"/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="email" placeholder="Your Email *"/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="number" placeholder="Your Phone"/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" placeholder="Subject"/>
                                                    </div>
                                                </div>
                                                <textarea name="message" placeholder="Your Message"></textarea>
                                                <button type="submit">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-5">
                                        <div class="contact-info-wrap">
                                            <img src="assets/img/images/contact_img01.jpg" alt="img"/>
                                            <div class="contact-info-list" data-background="assets/img/images/contact_img02.jpg">
                                                <ul>
                                                    <li>
                                                        <div class="icon">
                                                            <i class="fa-solid fa-phone-volume"></i>
                                                        </div>
                                                        <div class="content">
                                                            <h6 class="title">Phone</h6>
                                                            <a href="tel:12345678">+9 444 652 0000</a>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="icon">
                                                            <i class="fa-regular fa-envelope"></i>
                                                        </div>
                                                        <div class="content">
                                                            <h6 class="title">Email</h6>
                                                            <a href="#"><span class="__cf_email__" data-cfemail="432c2f2f26032a2d252c263b262e332f266d202c2e">[email&#160;protected]</span></a>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="icon">
                                                            <i class="fa-solid fa-location-dot"></i>
                                                        </div>
                                                        <div class="content">
                                                            <h6 class="title">addresss</h6>
                                                            <p>71W Park lan Broklyn Street,
                                                            New York. United States</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <div id="contact-map"></div>
     

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