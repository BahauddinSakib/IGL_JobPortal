'use client'
import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function VerifySignupOtpContent() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [canResend, setCanResend] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const purpose = searchParams.get('purpose');
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const password = searchParams.get('password');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // First verify the OTP
      const verifyResponse = await fetch('/api/auth/verify-sms-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token, 
          otp,
          purpose: 'signup_verification'
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyResponse.ok) {
        // OTP verified, now create the account using your existing signup API
        const signupResponse = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            password: password || "",
            type: "2", // Job Seeker
            phone: phone || "",
          }),
        });

        const signupData = await signupResponse.json();

        if (signupResponse.ok) {
          setSuccess(true);
          // Redirect to login immediately after success
          setTimeout(() => {
            router.push('/login');
          }, 1000);
        } else {
          setError(signupData.message || "Signup failed after OTP verification");
        }
      } else {
        setError(verifyData.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    
    try {
      const response = await fetch('/api/auth/send-sms-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: phone,
          purpose: 'signup_verification'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCountdown(300);
        setCanResend(false);
        setOtp("");
        alert('OTP sent successfully!');
      } else {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="p-4 bg-white rounded shadow-md mx-auto w-100 text-center" style={{ maxWidth: '400px' }}>
        <Link href="/">
          <Image
            src='/images/IGL_Group_logo.png'
            width={58}
            height={58}
            className="mb-4 d-block mx-auto"
            alt=""
          />
        </Link>
        <div className="alert alert-success mb-0" role="alert">
          <strong>Success!</strong> Account created successfully.
          <div className="mt-3">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
            <span className="small">Redirecting to login...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!token || purpose !== 'signup') {
    return (
      <div className="alert alert-danger text-center">
        Invalid verification session. Please restart signup.
        <Link href="/signup" className="d-block mt-2">Back to Signup</Link>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{ maxWidth: '400px' }}>
      <Link href="/">
        <Image
          src='/images/IGL_Group_logo.png'
          width={58}
          height={58}
          className="mb-4 d-block mx-auto"
          alt=""
        />
      </Link>
      <h6 className="mb-2 text-uppercase fw-semibold text-center">Verify Phone Number</h6>
      <p className="text-center text-muted small mb-3">
        We sent a verification code to your phone number
        
      </p>

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Enter OTP from SMS</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            maxLength={6}
            disabled={loading}
          />
          <div className="form-text">Check your phone for the OTP code</div>
          
          <div className="mt-2 text-left">
            {!canResend ? (
              <small className="text-muted">
                OTP expires in: <strong>{formatTime(countdown)}</strong>
              </small>
            ) : (
              <small className="text-danger">
                OTP has expired
              </small>
            )}
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={loading || otp.length !== 6}
        >
          {loading ? "Verifying..." : "Verify & Create Account"}
        </button>

        <div className="text-center mt-3">
          <button
            type="button"
            className={`btn btn-outline-secondary btn-sm ${!canResend ? 'disabled' : ''}`}
            onClick={handleResendOtp}
            disabled={!canResend}
          >
            Resend OTP
          </button>
        </div>

        <div className="col-12 text-center mt-3">
          <Link href="/signup" className="text-dark fw-semibold small">
            Back to Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function VerifySignupOtp() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: "url('/images/hero/bg3.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-overlay bg-linear-gradient-2 position-absolute w-100 h-100"></div>
      <div className="container position-relative z-1">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-5 col-12">
            <Suspense fallback={
              <div className="text-center text-white">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }>
              <VerifySignupOtpContent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}