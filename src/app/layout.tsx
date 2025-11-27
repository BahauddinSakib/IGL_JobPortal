import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}