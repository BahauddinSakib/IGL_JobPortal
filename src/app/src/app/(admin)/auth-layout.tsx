import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SmartDsm - Admin Auth",
  description: "Admin authentication pages",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Keep your existing head content */}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>SmartDsm - Admin Authentication</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/x-icon" href="../assets/admin_assets/img/favicon.png" />
        {/* ... other head elements ... */}
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
        {/* Clean auth layout with no sidebar/header */}
        <div style={{ 
          minHeight: "100vh", 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {children}
        </div>
        
        {/* Your existing scripts */}
        <script src="/assets/admin_assets/plugins/jquery/jquery-3.5.1.min.js"></script>
        {/* ... other scripts ... */}
      </body>
    </html>
  );
}