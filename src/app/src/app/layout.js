import {Toaster } from "react-hot-toast";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solidrgb(47, 0, 255)",
            padding: "16px",
            color: "#713200",
          },
        }}
      />
      {children}
    </>
  );
}
