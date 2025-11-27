'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { adminSignup } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms and Conditions");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!formData.phone) {
      setError("Phone number is required for OTP verification");
      setLoading(false);
      return;
    }

    try {
      // Send OTP to the provided phone number
      const response = await fetch('/api/auth/send-sms-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: formData.phone,
          purpose: 'admin_signup_verification'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // DIRECTLY redirect to verify OTP page with token and signup data
        const queryParams = new URLSearchParams({
          token: data.token,
          purpose: 'admin_signup',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });

        router.push(`/admin/verify-admin-signup-otp?${queryParams.toString()}`);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (success) {
    return (
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
                  <strong>Success!</strong> Admin account created successfully.
                 
                  <div className="mt-3">
                    <div
                      className="spinner-border spinner-border-sm text-primary me-2"
                      role="status"
                    ></div>
                    <span className="small">Redirecting to admin login...</span>
                  </div>
                  <div className="mt-3">
                    <Link href="/admin/admin-login" className="btn btn-sm btn-outline-primary">
                      Go to Login Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Admin Signup Form
  return (
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
          <div className="col-lg-5 col-md-6 col-12">
            <div
              className="p-4 bg-white rounded shadow-md mx-auto w-100"
              style={{ maxWidth: "450px" }}
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
                  Admin Signup
                </h6>

                {error && (
                  <div className="alert alert-danger mb-3" role="alert">
                    {error}
                  </div>
                )}

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        name="firstName"
                        type="text"
                        className="form-control"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        name="lastName"
                        type="text"
                        className="form-control"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

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
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="form-control"
                    placeholder="017XXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <div className="form-text">We'll send a verification code to this number</div>
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

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      name="agreeTerms"
                      type="checkbox"
                      className="form-check-input"
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <label
                      className="form-check-label text-muted"
                      htmlFor="agreeTerms"
                    >
                      I agree to the{" "}
                      <Link href="/admin/terms" className="text-primary">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/admin/privacy" className="text-primary">
                        Privacy Policy
                      </Link>{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Sign Up"}
                </button>

                <div className="col-12 text-center mt-3">
                  <span>
                    <span className="text-muted small me-2">
                      Already have an admin account?
                    </span>
                    <Link href="/admin/admin-login" className="text-dark fw-semibold small">
                      Sign in here
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}