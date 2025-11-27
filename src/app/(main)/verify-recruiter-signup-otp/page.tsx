'use client'
import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

function VerifyRecruiterSignupOtpContent() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'otp' | 'creating'>('otp');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { recruiterSignup } = useAuth();

  const token = searchParams.get('token');
  const purpose = searchParams.get('purpose');
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const companyName = searchParams.get('companyName');
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
          purpose: 'recruiter_signup_verification'
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyResponse.ok) {
        // Show OTP verification success message
        setVerificationStep('creating');
        setSuccess(true);
        
        // Wait briefly to show success message, then create account
        setTimeout(async () => {
          try {
            // OTP verified, now create the recruiter account
            const signupData = {
              firstName: firstName || "",
              lastName: lastName || "",
              email: email || "",
              password: password || "",
              phone: phone || "",
              companyName: companyName || "",
              type: "3" // Recruiter type
            };

            const result = await recruiterSignup(signupData);

            if (result.success) {
              // Redirect to login immediately after account creation
              router.push('/login');
            } else {
              setError(result.error || "Recruiter signup failed after OTP verification");
              setSuccess(false);
              setVerificationStep('otp');
            }
          } catch (err) {
            setError('Account creation failed. Please try again.');
            setSuccess(false);
            setVerificationStep('otp');
          }
        }, 1500); // 1.5 seconds to show OTP success message
      } else {
        setError(verifyData.error || 'Invalid OTP');
        setLoading(false);
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
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
          purpose: 'recruiter_signup_verification'
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

  // Success state - OTP verified, creating account
  if (success) {
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
              <div className="p-4 bg-white rounded shadow-md mx-auto w-100 text-center" style={{ maxWidth: '400px' }}>
                <Link href="/">
                  <Image
                    src='/images/IGL_Group_logo.png'
                    width={58}
                    height={58}
                    className="mb-4 d-block mx-auto"
                    alt="Company Logo"
                    priority
                  />
                </Link>
                
                {verificationStep === 'creating' ? (
                  <div className="alert alert-success mb-0" role="alert">
                    <strong>✓ OTP Verification Successful!</strong>
                    <div className="mt-2 small">
                      Creating your recruiter account...
                    </div>
                    <div className="mt-2">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-success mb-0" role="alert">
                    <strong>✓ Account Created Successfully!</strong>
                    <div className="mt-2 small">
                      Redirecting to login...
                    </div>
                    <div className="mt-2">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token || purpose !== 'recruiter_signup') {
    return (
      <div className="alert alert-danger text-center">
        Invalid verification session. Please restart recruiter signup.
        <Link href="/recruiter-signup" className="d-block mt-2">Back to Recruiter Signup</Link>
      </div>
    );
  }

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
            <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{ maxWidth: '400px' }}>
              <Link href="/">
                <Image
                  src='/images/IGL_Group_logo.png'
                  width={58}
                  height={58}
                  className="mb-4 d-block mx-auto"
                  alt="Company Logo"
                  priority
                />
              </Link>
              <h6 className="mb-2 text-uppercase fw-semibold text-center">Verify Recruiter Phone Number</h6>
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
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    autoFocus
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
                  className="btn btn-primary w-100 py-2"
                  type="submit"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Verifying...
                    </>
                  ) : (
                    "Verify & Create Account"
                  )}
                </button>

                <div className="text-center mt-3">
                  <button
                    type="button"
                    className={`btn btn-outline-secondary btn-sm ${!canResend ? 'disabled' : ''}`}
                    onClick={handleResendOtp}
                    disabled={!canResend || loading}
                  >
                    {loading ? "Sending..." : "Resend OTP"}
                  </button>
                </div>

                <div className="text-center mt-3">
                  <Link href="/recruiter-signup" className="text-dark fw-semibold small">
                    Back to Recruiter Signup
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyRecruiterSignupOtp() {
  return (
    <Suspense fallback={
      <div className="d-flex align-items-center justify-content-center min-vh-100"
        style={{
          backgroundImage: "url('/images/hero/bg3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-overlay bg-linear-gradient-2 position-absolute w-100 h-100"></div>
        <div className="container position-relative z-1">
          <div className="text-center text-white">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading verification...</p>
          </div>
        </div>
      </div>
    }>
      <VerifyRecruiterSignupOtpContent />
    </Suspense>
  );
}