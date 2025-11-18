import React from 'react';
import Link from 'next/link';

const Blogs = () => {
    return (
            <section className="blog-area pt-60 pb-60">
        <div className="container">
          <div className="row mb-40">
            <div className="col-lg-6 col-md-6">
              <div className="section-title">
                <h2 className="title">Most Popular Blog</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="view-btn text-end">
               <Link href="/blogs"
                  >View All Post<i className="fa-solid fa-angle-right"></i
                ></Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-10 col-sm-9">
              <div className="blog-item mb-30">
                <div className="blog-thumb">
                 <Link href="/blog/hello-blog"
                    ><img src="/assets/client_assests/img/blog/blog_img01.jpg" alt=""
                  /></Link>
                </div>
                <div className="blog-content">
                  <div className="comment">
                   <Link href="#">
                      <i className="fa-regular fa-comment"></i>
                      <span>18</span>
                    </Link>
                  </div>
                 <Link href="#" className="tag">ecommerce</Link>
                  <h4 className="title">
                   <Link href="/blog/hello-blog"
                      >The New Sony Solo the Cinematic Dream Brings</Link
                    >
                  </h4>
                  <p>
                    Lorem Ipsum is simply dumy text the printing and industry
                    orem Ipsum been industry's standard dummy.
                  </p>
                  <div className="blog-meta">
                    <ul>
                      <li>JOHN SMITH .</li>
                      <li><Link href="/blog/hello-blog">read more</Link></li>
                      <li>. february 10,2022</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-10 col-sm-9">
              <div className="blog-item mb-30">
                <div className="blog-thumb">
                 <Link href="/blog/hello-blog"
                    ><img src="/assets/client_assests/img/blog/blog_img02.jpg" alt=""
                  /></Link>
                </div>
                <div className="blog-content">
                  <div className="comment">
                   <Link href="#">
                      <i className="fa-regular fa-comment"></i>
                      <span>09</span>
                    </Link>
                  </div>
                 <Link href="#" className="tag">together</Link>
                  <h4 className="title">
                   <Link href="/blog/hello-blog"
                      >Closeup of woman hands buying online with credit card</Link
                    >
                  </h4>
                  <p>
                    Lorem Ipsum is simply dumy text the printing and industry
                    orem Ipsum been industry's standard dummy.
                  </p>
                  <div className="blog-meta">
                    <ul>
                      <li>JOHN SMITH .</li>
                      <li><Link href="/blog/hello-blog">read more</Link></li>
                      <li>. february 10,2022</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-10 col-sm-9">
              <div className="blog-item mb-30">
                <div className="blog-thumb">
                 <Link href="/blog/hello-blog"
                    ><img src="/assets/client_assests/img/blog/blog_img03.jpg" alt=""
                  /></Link>
                </div>
                <div className="blog-content">
                  <div className="comment">
                   <Link href="#">
                      <i className="fa-regular fa-comment"></i>
                      <span>03</span>
                    </Link>
                  </div>
                 <Link href="#" className="tag">spending</Link>
                  <h4 className="title">
                   <Link href="/blog/hello-blog"
                      >Joyful father and son having fun spending tim</Link
                    >
                  </h4>
                  <p>
                    Lorem Ipsum is simply dumy text the printing and industry
                    orem Ipsum been industry's standard dummy.
                  </p>
                  <div className="blog-meta">
                    <ul>
                      <li>JOHN SMITH .</li>
                      <li><Link href="/blog/hello-blog">read more</Link></li>
                      <li>. february 10,2022</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Blogs;