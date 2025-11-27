'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
//import Navbar from "../../componants/navbarDark";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { adminLogin } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/admin");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await adminLogin(formData.email, formData.password);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Admin login failed");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <>
        {/* <Navbar navLight={true} /> */}
        <section
          className="bg-home d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: "url('/images/hero/bg3.jpg')",
            backgroundPosition: "center",
            paddingTop: '80px',
          }}
        >
          <div className="bg-overlay bg-linear-gradient-2"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-12">
                <div
                  className="p-4 bg-white rounded shadow-md mx-auto w-100 text-center"
                  style={{ maxWidth: "450px" }}
                >
                  <Link href="/">
                    <Image
                      src="/images/IGL_Group_logo.png"
                      width={58}
                      height={58}
                      className="mb-4 d-block mx-auto"
                      alt=""
                    />
                  </Link>
                  <div className="alert alert-success mb-0" role="alert">
                    <strong>Success!</strong> Admin login successful.
                   
                    <div className="mt-3">
                      <div
                        className="spinner-border spinner-border-sm text-primary me-2"
                        role="status"
                      ></div>
                      <span className="small">Redirecting to admin dashboard...</span>
                    </div>
                    <div className="mt-3">
                      <Link href="/admin" className="btn btn-sm btn-outline-primary">
                        Go to Dashboard Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* <Navbar navLight={true} /> */}
      <section
        className="bg-home d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/images/hero/bg3.jpg')",
          backgroundPosition: "center",
          paddingTop: '80px',
          minHeight: '100vh',
        }}
      >
        <div className="bg-overlay bg-linear-gradient-2"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-5 col-12">
              <div
                className="p-4 bg-white rounded shadow-md mx-auto w-100"
                style={{ maxWidth: "400px" }}
              >
                <form onSubmit={handleSubmit}>
                  <Link href="/">
                    <Image
                      src="/images/IGL_Group_logo.png"
                      width={58}
                      height={58}
                      className="mb-4 d-block mx-auto"
                      alt=""
                    />
                  </Link>
                  <h6 className="mb-3 text-uppercase fw-semibold text-center">
                    Admin Login
                  </h6>

                  {error && (
                    <div className="alert alert-danger mb-3" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="admin@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>

                  <div className="col-12 text-center mt-3">
                    <span>
                      <span className="text-muted small me-2">
                        Don't have an admin account?
                      </span>
                      <Link href="/admin/admin-signup" className="text-dark fw-semibold small">
                        Sign up here
                      </Link>
                    </span>
                  </div>

                  <div className="col-12 text-center mt-2">
                    <span className="forgot-pass text-muted small">
                      <Link href="/admin/reset-password" className="text-muted">
                        Forgot password?
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}