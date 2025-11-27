import React from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../componants/navbar";
import FormSelect from "../componants/formSelect";
import Blog from "../componants/blog";
import Companies from "../componants/companies";
import AboutUs from "../componants/aboutUs";
import ServicesTwo from "../componants/sercicesTwo";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import PopularJobs from "../componants/PopularJobs";

export default function IndexTwo(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>

        <section className="bg-half-260 d-table w-100" style={{backgroundImage:'url("/images/hero/bg.jpg")'}}>
            <div className="bg-overlay bg-primary-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-10">
                        <div className="title-heading text-center">
                            <h1 className="heading text-white fw-bold">Find & Hire Experts <br/> for any Job</h1>
                            <p className="para-desc text-white-50 mx-auto mb-0">Find Jobs, Employment & Career Opportunities. Some of the companies weve helped recruit excellent applicants over the years.</p>
                        
                            <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-2 mt-4">
                                <FormSelect/>
                            </div>

                            <div className="mt-2">
                                <span className="text-white-50"><span className="text-white">Popular Searches :</span> Designer, Developer, Web, IOS, PHP Senior Engineer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>

        <section className="section">
            <div className="container">
                <div className="row justify-content-center mb-4 pb-2">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h4 className="title mb-3">Trending Services</h4>
                            <p className="text-muted para-desc mx-auto mb-0">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                        </div>
                    </div>
                </div>

                <ServicesTwo/>
            </div>
            
            <AboutUs containerClass="container mt-100 mt-60"/>

            {/* 👇 POPULAR JOBS SECTION - REPLACES THE OLD HARDCODED ONE */}
            <PopularJobs />

            <div className="container mt-100 mt-60">
                <Companies/>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-3">Latest Blog or News</h4>
                            <p className="text-muted para-desc mb-0 mx-auto">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                        </div>
                    </div>
                </div>

               <Blog/>
            </div>
        </section>

        <Footer/>
        <ScrollTop/>
        </>
    )
}