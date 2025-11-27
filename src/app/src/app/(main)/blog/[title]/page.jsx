import React from 'react';
import Link from 'next/link';

const page = () => {
    return (
       <main>
            <section className="breadcrumb-area-three breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-content text-center">
                                <h2 className="title">latest news update</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href="index-2.html">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">blog single</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-details-area pt-90 pb-90">
                <div className="container">
                    <div className="blog-inner-wrap">
                        <div className="row">
                            <div className="col-8">
                                <div className="inner-blog-item mb-50">
                                    <div className="inner-blog-thumb">
                                        <img src="assets/img/blog/inner-blog_img01.jpg" alt="img"/>
                                    </div>
                                    <div className="inner-blog-content">
                                       <Link href="#" className="tag">FEATURED</Link>
                                        <h2 className="title">Top 10 luxury phones ideas for your choice</h2>
                                        <ul className="blog-meta">
                                            <li>By<Link href="#">alexander</Link></li>
                                            <li>September 20, 2022</li>
                                        </ul>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a typ specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form  by injected humour, or rando wmised words which don't look even the slightly believ majority have suffered alteration in some form, by injected humour</p>
                                        <h3 className="small-title">Activity in which customer browses</h3>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour, or rando wmised words which don't look even the slightly believ majority have suffered alteration in some form, by injected humour</p>
                                        <blockquote>
                                            <p>“Placeholder text used in publishing majority form have this suffered alteration in some form, by injected humour, or this rando wised words whichslightly believable”</p>
                                        </blockquote>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour, or rando wmised words which don't look even the slightly believ majority have suffered alteration in some form, by injected humour</p>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="blog-details-img">
                                                    <img src="assets/img/blog/bolg_details_img01.jpg" alt="img"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="blog-details-img">
                                                    <img src="assets/img/blog/bolg_details_img02.jpg" alt="img"/>
                                                </div>
                                            </div>
                                        </div>
                                        <p>Lorem Ipsum is simply dummy text of the prinng and typeg industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1, when an unknown printer took a galley of type and scrbled it to make a typ specimen book. It has
                                        survived not only five centuries, but also the leap into electronic typesetting, remaining the essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.</p>
                                        <div className="blog-details-tag-wrap">
                                            <div className="blog-details-tag-list">
                                                <ul>
                                                    <li className="title">Tag post :</li>
                                                    <li><Link href="#">Lifestyle,</Link></li>
                                                    <li><Link href="#">Fashion,</Link></li>
                                                    <li><Link href="#">who,</Link></li>
                                                    <li><Link href="#">arts</Link></li>
                                                </ul>
                                            </div>
                                            <div className="blog-details-comment">
                                                <ul>
                                                    <li><Link href="#"><i className="fa-regular fa-message"></i>05</Link></li>
                                                    <li><Link href="#"><i className="fa-regular fa-heart"></i>13</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="blog-content-bottom">
                                            <ul>
                                                <li>by<Link href="#">alexander</Link></li>
                                            </ul>
                                            <div className="keep-reading">
                                               <Link href="#">keep reading...</Link>
                                            </div>
                                            <ul className="social">
                                                <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                                <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                                <li><Link href="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                                                <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="avatar-post">
                                    <div className="avatar-post-img">
                                        <img src="assets/img/blog/avater_post_img.png" alt="img"/>
                                    </div>
                                    <div className="avatar-post-content">
                                        <h4 className="title">Hazal Kaya</h4>
                                        <p>Lorem Ipsum is simply dummy text of the prinng and typeg industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                                        <ul className="social">
                                            <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                            <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                            <li><Link href="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                                            <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog-comment-box">
                                    <h3 className="title">LEAVE A COMMENT</h3>
                                    <p>Your email address will not be published. Required fields are marked *</p>
                                    <form action="#">
                                        <textarea name="comment" placeholder="Your Comment"></textarea>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input type="text" placeholder="Your Name *"/>
                                            </div>
                                            <div className="col-lg-6">
                                                <input type="email" placeholder="Your Email *"/>
                                            </div>
                                        </div>
                                        <button type="submit">submit</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-4">
                               <aside className="blog-sidebar">
                                    <div className="widget text-center mb-40">
                                        <div className="sidebar-about-us">
                                            <img src="assets/img/images/blog_sidebar_img.png" alt="img"/>
                                            <div className="blog-widget-title mb-15">
                                                <h4 className="title">About Us
                                                    <span className="left-border"></span>
                                                    <span className="right-border"></span>
                                                </h4>
                                            </div>
                                            <p>There are many variations of passages of Lorem that available majority.</p>
                                            <ul className="social">
                                                <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                                <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                                <li><Link href="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
                                                <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="widget mb-45">
                                        <div className="blog-widget-title text-center mb-20">
                                            <h4 className="title">INSTAGRAM
                                                <span className="left-border"></span>
                                                <span className="right-border"></span>
                                            </h4>
                                        </div>
                                        <ul className="sidebar-instagram">
                                            <li><Link href="#"><img src="assets/img/instagram/insta_img01.jpg" alt="img"/></Link></li>
                                            <li><Link href="#"><img src="assets/img/instagram/insta_img02.jpg" alt="img"/></Link></li>
                                            <li><Link href="#"><img src="assets/img/instagram/insta_img03.jpg" alt="img"/></Link></li>
                                            <li><Link href="#"><img src="assets/img/instagram/insta_img04.jpg" alt="img"/></Link></li>
                                        </ul>
                                    </div>
                                    <div className="widget mb-45">
                                        <div className="blog-widget-title text-center mb-20">
                                            <h4 className="title">recent post
                                                <span className="left-border"></span>
                                                <span className="right-border"></span>
                                            </h4>
                                        </div>
                                        <div className="rc-post-list">
                                            <ul>
                                                <li>
                                                    <div className="thumb">
                                                       <Link href="/blog/hello-blog"><img src="assets/img/blog/rc_post_img01.jpg" alt="img"/></Link>
                                                    </div>
                                                    <div className="content">
                                                        <h4 className="title"><Link href="/blog/hello-blog">Top 10 luxury phone ideas for your choice</Link></h4>
                                                        <span><i className="fa-regular fa-calendar"></i>September 20, 2022</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="thumb">
                                                       <Link href="/blog/hello-blog"><img src="assets/img/blog/rc_post_img02.jpg" alt="img"/></Link>
                                                    </div>
                                                    <div className="content">
                                                        <h4 className="title"><Link href="/blog/hello-blog">The Greatest Thing World Belong Excepteur</Link></h4>
                                                        <span><i className="fa-regular fa-calendar"></i>September 20, 2022</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="thumb">
                                                       <Link href="/blog/hello-blog"><img src="assets/img/blog/rc_post_img03.jpg" alt="img"/></Link>
                                                    </div>
                                                    <div className="content">
                                                        <h4 className="title"><Link href="/blog/hello-blog">Find Quality Product from Verified Suppliers</Link></h4>
                                                        <span><i className="fa-regular fa-calendar"></i>September 20, 2022</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="widget mb-50">
                                        <div className="blog-widget-title text-center mb-20">
                                            <h4 className="title">category's
                                                <span className="left-border"></span>
                                                <span className="right-border"></span>
                                            </h4>
                                        </div>
                                        <div className="blog-cat-list">
                                            <ul>
                                                <li><Link href="#">FASHION <span>2</span></Link></li>
                                                <li><Link href="#">multi vendor <span>9</span></Link></li>
                                                <li><Link href="#">creative <span>3</span></Link></li>
                                                <li><Link href="#">lifestyle <span>5</span></Link></li>
                                                <li><Link href="#">FASHION <span>2</span></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="widget mb-45">
                                        <div className="sidebar-add">
                                           <Link href="#"><img src="assets/img/blog/sidebar_add.jpg" alt="img"/></Link>
                                        </div>
                                    </div>
                                    <div className="widget mb-45">
                                        <div className="blog-widget-title text-center mb-20">
                                            <h4 className="title">Tag post
                                                <span className="left-border"></span>
                                                <span className="right-border"></span>
                                            </h4>
                                        </div>
                                        <div className="sidebar-tag-list">
                                            <ul>
                                                <li><Link href="#">lifestyle</Link></li>
                                                <li><Link href="#">fashion</Link></li>
                                                <li><Link href="#">SHOPPING</Link></li>
                                                <li><Link href="#">who</Link></li>
                                                <li><Link href="#">Business</Link></li>
                                                <li><Link href="#">Marketing</Link></li>
                                                <li><Link href="#">Branding</Link></li>
                                                <li><Link href="#">arts</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="newsletter-area-two">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="newsletter-content">
                                <i className="fa-regular fa-paper-plane"></i>
                                <h2 className="title">Sign Up for get 10% Weekly <span>Newsletter</span></h2>
                            </div>
                        </div>
                        <div className="col-lg-5">
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