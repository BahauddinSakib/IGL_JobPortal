'use client'
import React,{useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation'

import { LuSearch,FiUser,FiSettings,FiLock,FiLogOut } from "../assets/icons/vander";

export default function Navbar({navClass, navLight}){
    let [isOpen, setMenu] = useState(true);
    let [scroll, setScroll] = useState(false);
    let [search, setSearch] = useState(false);
    let [cartitem, setCartitem] = useState(false);
    let [manu , setManu] = useState('');
    
    // 👇 ADD THIS STATE FOR POPUP
    const [showAuthModal, setShowAuthModal] = useState(false);
    
    let pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setManu(pathname)
        function scrollHandler() {
            setScroll(window.scrollY > 50)
          }
          if (typeof window !== "undefined") {
            window.addEventListener('scroll', scrollHandler);
            window.scrollTo(0, 0);
          }

        let searchModal = (e) => {
            if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown-menu')) {
                setSearch(false);
            }
        }
        document.addEventListener('mousedown', searchModal);

        let cartModal = (e) => {
            if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown-menu')) {
                setCartitem(false);
            }
        }
        document.addEventListener('mousedown', cartModal);

        // 👇 ADD THIS FOR AUTH POPUP
        let authPopup = (e) => {
            if (!e.target.closest('.btn-primary') && !e.target.closest('.position-absolute')) {
                setShowAuthModal(false);
            }
        }
        document.addEventListener('mousedown', authPopup);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('mousedown', searchModal);
            document.removeEventListener('mousedown', cartModal);
            document.removeEventListener('mousedown', authPopup); // 👈 ADD THIS
        };

    }, [pathname]);

    const toggleMenu = () => {
        setMenu(!isOpen)
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    }

    const handleProfileClick = (path) => {
        setCartitem(false);
        router.push(path);
    }

    const handleLogout = () => {
        setCartitem(false);
        console.log('Logging out...');
        router.push('/login');
    }

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    }

    return(
    <>
        <header id="topnav" className={ `${scroll ? 'nav-sticky' :''} ${navClass}`}>
            <div className="container">
                {navLight === true ? 
                    <Link className="logo" href="/">
                        <span className="logo-light-mode">
                            <div 
                              className="logo d-flex" 
                              href="/" 
                              style={{ marginTop: '15px', display: 'flex', alignItems: 'end' }}
                            >
                              <Image 
                                src='/images/IGL_Group_logo.png' 
                                width={36} 
                                height={40} 
                                alt="IGL Logo" 
                                style={{ display: 'block' }}
                              />
                              <span className="ms-2 fw-bold" style={{ fontSize: '20px', lineHeight: '1' }}>
                                <span style={{color:'red'}}>IGL</span> 
                                <span style={{color:'green'}}>Web</span>
                              </span>
                            </div>
                        </span>
                    </Link> : 
                    <Link href="/" className="logo flex items-end">
                        <span className="logo-light-mode">
                            <Image src='/images/IGL_Group_logo.png' width={160} height={25} alt="IGL Logo" />
                        </span>
                    </Link>
                }
                
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link href='#' className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>

                <ul className="buy-button list-inline mb-0">
                    <li className="list-inline-item ps-1 mb-0">
                        <div className="dropdown">
                            <button type="button" onClick={() => setSearch(!search)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                                <LuSearch className="icons"/>
                            </button>
                            <div style={{display: search === true ? 'block' : 'none'}}>
                                <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded border-0 mt-3 p-0 show`} style={{width:'240px', position:'absolute',right:'0'}} onClick={handleDropdownClick}>
                                    <div className="search-bar">
                                        <div id="itemSearch" className="menu-search mb-0">
                                            <form role="search" method="get" id="searchItemform" className="searchform">
                                                <input type="text" className="form-control rounded border" name="s" id="searchItem" placeholder="Search..."/>
                                                <input type="submit" id="searchItemsubmit" value="Search"/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className="list-inline-item ps-1 mb-0">
                        <div className="dropdown dropdown-primary">
                            <button type="button" onClick={() => setCartitem(!cartitem)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                                <Image src="/images/team/01.jpg" height={32} width={32} className="img-fluid rounded-pill" alt=""/>
                            </button>
                            <div style={{display: cartitem === true ? 'block' : 'none'}}>
                                <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`} onClick={handleDropdownClick}>
                                    <button 
                                        onClick={() => handleProfileClick('/candidate-profile')} 
                                        className="dropdown-item fw-medium fs-6"
                                    >
                                        <FiUser className="fea icon-sm me-2 align-middle" />Profile
                                    </button>
                                    <button 
                                        onClick={() => handleProfileClick('/candidate-profile-setting')} 
                                        className="dropdown-item fw-medium fs-6"
                                    >
                                        <FiSettings className="fea icon-sm me-2 align-middle"/>Settings
                                    </button>
                                    <div className="dropdown-divider border-top"></div>
                                    <button 
                                        onClick={() => handleProfileClick('/lock-screen')} 
                                        className="dropdown-item fw-medium fs-6"
                                    >
                                        <FiLock className="fea icon-sm me-2 align-middle"/>Lockscreen
                                    </button>
                                    <button 
                                        onClick={handleLogout} 
                                        className="dropdown-item fw-medium fs-6"
                                    >
                                        <FiLogOut className="fea icon-sm me-2 align-middle"/>Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>

                    {/* SIGNUP/LOGIN BUTTON WITH ATTACHED POPUP */}
                    <li className="list-inline-item ps-1 mb-0 position-relative">
                        <button 
                            className="btn btn-primary"
                            onClick={() => setShowAuthModal(!showAuthModal)}
                        >
                            Signup/Login
                        </button>
                        
                        {/* Popup attached to button */}
                        {showAuthModal && (
                            <div className="position-absolute" style={{top: '100%', right: '0', width: '700px', zIndex: 9999, marginTop: '8px'}}>
                                <div className="bg-white rounded shadow border-0 p-0">
                                    <div className="row g-0">
                                        {/* Left Side - Job Seekers */}
                                        <div className="col-md-6 border-end">
                                            <div className="p-4">
                                                {/* Header */}
                                                <div className="mb-3">
                                                    <h6 className="fw-bold text-dark mb-1">My Jobs</h6>
                                                    <p className="text-muted small mb-0">
                                                        Sign in or create your My jobs account to manage your profile
                                                    </p>
                                                </div>
                                                
                                                {/* Stats */}
                                                {/* <div className="row text-center mb-3">
                                                    <div className="col-6">
                                                        <div className="border-end">
                                                            <h6 className="fw-bold text-dark mb-1">270</h6>
                                                            <small className="text-muted">Myjobs</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6 className="fw-bold text-dark mb-1">360</h6>
                                                        <small className="text-muted">NEW JOBS</small>
                                                    </div>
                                                </div> */}
                                                
                                                {/* Buttons */}
                                                <div className="d-grid gap-2 mb-3">
                                                    <Link 
                                                        href="/login" 
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => setShowAuthModal(false)}
                                                    >
                                                        Sign in
                                                    </Link>
                                                    <Link 
                                                        href="/signup" 
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => setShowAuthModal(false)}
                                                    >
                                                        Create Account
                                                    </Link>
                                                </div>
                                                
                                                {/* Additional Links */}
                                                {/* <div className="text-center">
                                                    <Link href="/video-cv" className="text-decoration-none text-muted small me-3">
                                                        Video CV
                                                    </Link>
                                                    <Link href="/career-resources" className="text-decoration-none text-muted small">
                                                        Career Resources
                                                    </Link>
                                                </div> */}
                                            </div>
                                        </div>
                                        
                                        {/* Right Side - Employers */}
                                        <div className="col-md-6">
                                            <div className="p-4">
                                                {/* Header */}
                                                <div className="mb-3">
                                                    <h6 className="fw-bold text-dark mb-1">Employers</h6>
                                                    <p className="text-muted small mb-0">
                                                        Sign in or create account to find the best candidates in the fastest way
                                                    </p>
                                                </div>
                                                
                                                {/* Organization Type Filter */}
                                                {/* <div className="mb-3">
                                                    <h6 className="fw-bold text-dark small mb-2">Organization Type</h6>
                                                    <div className="text-start">
                                                        <div className="mb-1">
                                                            <small className="text-muted">Rajshahi (156)</small>
                                                        </div>
                                                        <div className="mb-1">
                                                            <small className="text-muted">Rangpur</small>
                                                        </div>
                                                        <div className="mb-1">
                                                            <small className="text-muted">Aoro (Plant/Animal/Fisheries) (87)</small>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                
                                                {/* Buttons */}
                                                <div className="d-grid gap-2">
                                                    <Link 
                                                        href="/login" 
                                                        className="btn btn-dark btn-sm"
                                                        onClick={() => setShowAuthModal(false)}
                                                    >
                                                        Sign in
                                                    </Link>
                                                    <Link 
                                                        href="/recruiter-signup" 
                                                        className="btn btn-outline-dark btn-sm"
                                                        onClick={() => setShowAuthModal(false)}
                                                    >
                                                        Create Account
                                                    </Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
        
                <div id="navigation">  
                    <ul className="navigation-menu nav-right nav-light">
                       <li className={manu === "/"  ? "active" : ""}><Link href="/" className="sub-menu-item">Home</Link></li>

                        <li className={`${["/job-categories", "/job-vacancies","/job-details", "/job-detail-one", "/job-detail-two","/job-detail-three","/job-apply","/job-post","/career" ].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#"> Jobs </Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "/job-categories"  ? "active" : ""}><Link href="/job-categories" className="sub-menu-item">Job Categories</Link></li>
                                <li className={manu === "/job-vacancies"  ? "active" : ""}><Link href="/job-vacancies" className="sub-menu-item">Job Vacancies</Link></li>
                                <li className={manu === "/job-details"  ? "active" : ""}><Link href="/job-details" className="sub-menu-item">Job Details</Link></li>
                                <li className={manu === "/job-apply"  ? "active" : ""}><Link href="/job-apply" className="sub-menu-item">Job Apply</Link></li>
                                <li className={manu === "/job-post"  ? "active" : ""}><Link href="/job-post" className="sub-menu-item">Job Post </Link></li>
                                <li className={manu === "/career"  ? "active" : ""}><Link href="/career" className="sub-menu-item">Career </Link></li>
                            </ul>  
                        </li>
                
                        <li className={`${["/employers", "/employer-profile"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                            <Link href="#">Employers</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "/employers"  ? "active" : ""}><Link href="/employers" className="sub-menu-item">Employers</Link></li>
                                <li className={manu === "/employer-profile"  ? "active" : ""}><Link href="/employer-profile" className="sub-menu-item">Employer Profile</Link></li>
                            </ul>
                        </li>
                
                        <li className={`${["/candidates", "/candidate-profile","/candidate-profile-setting"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                            <Link href="#">Candidates</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "/candidates"  ? "active" : ""}><Link href="/candidates" className="sub-menu-item">Candidates</Link></li>
                                <li className={manu === "/candidate-profile"  ? "active" : ""}><Link href="/candidate-profile" className="sub-menu-item">Candidate Profile</Link></li>
                                <li className={manu === "/candidate-profile-setting"  ? "active" : ""}><Link href="/candidate-profile-setting" className="sub-menu-item">Profile Setting</Link></li>
                            </ul>
                        </li>
                
                        <li className={`${["/aboutus", "/services","/pricing","/helpcenter-overview", "/helpcenter-faqs","/helpcenter-guides",'/helpcenter-support',"/blogs", "/blog-sidebar","/blog-detail","/login", "/signup","/reset-password","/lock-screen","/terms", "/privacy"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                            <Link href="#">Pages</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className={manu === "/aboutus"  ? "active" : ""}><Link href="/aboutus" className="sub-menu-item">About Us</Link></li>
                                <li className={manu === "/services"  ? "active" : ""}><Link href="/services" className="sub-menu-item">Services</Link></li>
                                <li className={manu === "/pricing"  ? "active" : ""}><Link href="/pricing" className="sub-menu-item">Pricing </Link></li>

                                <li className={`${["/helpcenter-overview", "/helpcenter-faqs","/helpcenter-guides",'/helpcenter-support'].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                                    <Link href="#"> Helpcenter </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "/helpcenter-overview"  ? "active" : ""}><Link href="/helpcenter-overview" className="sub-menu-item">Overview</Link></li>
                                        <li className={manu === "/helpcenter-faqs"  ? "active" : ""}><Link href="/helpcenter-faqs" className="sub-menu-item">FAQs</Link></li>
                                        <li className={manu === "/helpcenter-guides"  ? "active" : ""}><Link href="/helpcenter-guides" className="sub-menu-item">Guides</Link></li>
                                        <li className={manu === "/helpcenter-support"  ? "active" : ""}><Link href="/helpcenter-support" className="sub-menu-item">Support</Link></li>
                                    </ul>  
                                </li>

                                <li className={`${["/blogs", "/blog-sidebar","/blog-detail"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#"> Blog </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "/blogs"  ? "active" : ""}><Link href="/blogs" className="sub-menu-item"> Blogs</Link></li>
                                        <li className={manu === "/blog-sidebar"  ? "active" : ""}><Link href="/blog-sidebar" className="sub-menu-item"> Blog Sidebar</Link></li>
                                        <li className={manu === "/blog-detail"  ? "active" : ""}><Link href="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                                    </ul> 
                                </li>

                                <li className={`${["/login", "/signup","/reset-password","/lock-screen"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "/login"  ? "active" : ""}><Link href="/login" className="sub-menu-item"> Login</Link></li>
                                        <li className={manu === "/signup"  ? "active" : ""}><Link href="/signup" className="sub-menu-item"> Signup</Link></li>
                                        <li className={manu === "/reset-password"  ? "active" : ""}><Link href="/reset-password" className="sub-menu-item"> Forgot Password</Link></li>
                                        <li className={manu === "/lock-screen"  ? "active" : ""}><Link href="/lock-screen" className="sub-menu-item"> Lock Screen</Link></li>
                                    </ul> 
                                </li>

                                <li className={`${["/terms", "/privacy"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#"> Utility </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "/terms"  ? "active" : ""}><Link href="/terms" className="sub-menu-item">Terms of Services</Link></li>
                                        <li className={manu === "/privacy"  ? "active" : ""}><Link href="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                    </ul>  
                                </li>

                                <li className={`${["/comingsoon", "/maintenance","/error"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link href="#"> Special </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li className={manu === "/comingsoon"  ? "active" : ""}><Link href="/comingsoon" className="sub-menu-item"> Coming Soon</Link></li>
                                        <li className={manu === "/maintenance"  ? "active" : ""}><Link href="/maintenance" className="sub-menu-item"> Maintenance</Link></li>
                                        <li className={manu === "/error"  ? "active" : ""}><Link href="/error" className="sub-menu-item"> 404! Error</Link></li>
                                    </ul> 
                                </li>
                            </ul>
                        </li>
                
                        <li className={manu === "/contactus"  ? "active" : ""}><Link href="/contactus" className="sub-menu-item">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    </>
    )
}