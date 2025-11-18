import React from 'react';

const NewsLetter = () => {
    return (
         <section className="newsletter-area pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="newsletter-wrap">
                <div className="newsletter-content">
                  <h2 className="title">
                    Sign Up for Weekly <span>Newsletter</span>
                  </h2>
                  <p>
                    Get 10% off new collection special Investigationes
                    demonstraverunt
                  </p>
                </div>
                <div className="newsletter-form">
                  <form action="#">
                    <input type="text" placeholder="Your email here..." />
                    <button type="submit">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default NewsLetter;