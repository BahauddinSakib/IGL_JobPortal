// app/(admin)/layout.jsx
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "../../globals.css";
import NextTopLoader from "nextjs-toploader";
import Header from "./components/server_components/Header";
import SideBar from "./components/server_components/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const isAuthPage = pathname.includes('/admin-login') || 
                    pathname.includes('/admin-signup') || 
                    pathname.includes('/reset-password') ||
                    pathname.includes('/verify-otp') || 
                    pathname.includes('/new-password')||
                    pathname.includes('/verify-admin-signup-otp');

  // Check admin access for ALL admin pages
  useEffect(() => {
    if (!isAuthPage) {
      checkAdminAccess();
    } else {
      setAuthChecked(true);
      setIsAdmin(false); // Auth pages don't need admin check
    }
  }, [pathname, isAuthPage]);

  const checkAdminAccess = async () => {
    try {
      const response = await fetch('/api/auth/check-admin', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      // Set admin status based on API response
      setIsAdmin(data.isAdmin === true);
    } catch (error) {
      console.error('Admin check failed:', error);
      setIsAdmin(false);
    } finally {
      setAuthChecked(true);
    }
  };

  // Show loading while checking authentication
  if (!authChecked && !isAuthPage) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Checking permissions...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // BLOCK RECRUITERS: Show access denied for non-admin users on admin pages
  if (!isAuthPage && !isAdmin) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ backgroundColor: '#f8f9fa' }}>
          <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: '450px' }}>
              <div className="card-body text-center p-5">
                {/* Icon */}
                <div className="mb-4">
                  <div className="bg-danger rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-lock text-white fa-2x"></i>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="card-title text-danger mb-3 fw-bold">Access Restricted</h3>
                
                {/* Message */}
                <p className="card-text text-dark mb-4 fs-6">
                  <strong>Admin privileges required.</strong><br/>
                  You are currently logged in as a recruiter and cannot access the admin dashboard.
                </p>
                
                {/* Action */}
                <div className="border-top pt-3">
                  <small className="text-muted">
                    Return to <a href="/recruiter/dashboard" className="text-primary text-decoration-none">Recruiter Dashboard</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // Render normal layout for admin users or auth pages
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>IGL Web - Admin</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/x-icon" href="../assets/admin_assets/img/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://cdn.materialdesignicons.com/4.4.95/css/materialdesignicons.min.css" rel="stylesheet" />
        
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        
        <link href="/assets/admin_assets/plugins/daterangepicker/daterangepicker.css" rel="stylesheet" />
        <link href="/assets/admin_assets/plugins/simplebar/simplebar.css" rel="stylesheet" />
        <link id="ekka-css" href="/assets/admin_assets/css/ekka.css" rel="stylesheet" />
        <link href="/assets/admin_assets/img/favicon.png" rel="shortcut icon" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextTopLoader
          color="#FFFFFF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
        />
        
        {/* ALWAYS SHOW HEADER */}
        <Header />
        
        <div className="d-flex" style={{ marginTop: "50px", maxHeight: "calc(100vh - 75px)" }}>
          {/* CONDITIONALLY SHOW SIDEBAR - Hide for auth pages */}
          {!isAuthPage && (
            <div style={{ overflowY: "auto", overflowX: "hidden", width: "250px" }}>
              <SideBar />
            </div>
          )}
          
          <div
            style={{
              backgroundColor: "rgb(138 144 157 / 5%)",
              maxHeight: "calc(100vh - 50px)",
              overflowY: "auto",
              width: isAuthPage ? '100%' : 'calc(100% - 250px)' // Adjust width based on sidebar
            }}
          >
            <div style={{ minHeight: "100vh" }}>
              {children}
            </div>
          </div>
        </div>
        
        {/* Replace script tags with Next.js Script components */}
        <Script src="/assets/admin_assets/plugins/jquery/jquery-3.5.1.min.js" strategy="beforeInteractive" />
        <Script src="/assets/admin_assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/assets/admin_assets/plugins/simplebar/simplebar.min.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/plugins/jquery-zoom/jquery.zoom.min.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/plugins/slick/slick.min.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/plugins/charts/Chart.min.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/js/chart.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/plugins/charts/google-map-loader.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/plugins/charts/google-map.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/plugins/daterangepicker/moment.min.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/plugins/daterangepicker/daterangepicker.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/plugins/options-sidebar/optionswitcher.js" strategy="lazyOnload" />
        <Script src="/assets/admin_assets/js/ekka.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}