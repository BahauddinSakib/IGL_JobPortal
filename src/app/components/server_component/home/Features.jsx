import React from 'react';
import Link from 'next/link';

const Features = () => {
    return (
  <section className="features-area pt-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10">
              <div className="features-item mb-30">
                <div className="features-thumb">
                  <img src="/assets/client_assests/img/features/features_img01.jpg" alt="" />
                </div>
                <div className="features-content">
                  <span>35% discount</span>
                  <h2 className="title">
                   <Link href="shop.html">Smart home mixer</Link>
                  </h2>
                  <p>Giving information on origins random Lipsum generator.</p>
                 <Link href="shop.html" className="btn">shop now</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-10">
              <div className="features-item mb-30">
                <div className="features-thumb">
                  <img src="/assets/client_assests/img/features/features_img02.jpg" alt="" />
                </div>
                <div className="features-content white-content">
                  <span>35% discount</span>
                  <h2 className="title">
                   <Link href="shop.html">Smart home mixer</Link>
                  </h2>
                  <p>Giving information on origins random Lipsum generator.</p>
                 <Link href="shop.html" className="btn">shop now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Features;