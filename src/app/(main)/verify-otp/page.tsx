// app/admin/verify-otp/page.tsx
'use client'
import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function VerifyOtpContent() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(300);
    const [canResend, setCanResend] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    // Countdown timer effect
    useEffect(() => {
        if (countdown <= 0) {
            setCanResend(true);
            return;
        }
        
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleResendOtp = async () => {
        if (!canResend || resendLoading || !token) return;
        
        setResendLoading(true);
        setError("");

        try {
            // Secure token decoding with error handling
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            const phoneNumber = payload.phoneNumber;

            const response = await fetch('/api/auth/send-sms-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    phoneNumber: phoneNumber,
                    purpose: 'password_reset' 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setCountdown(300);
                setCanResend(false);
                setOtp("");
                setError("");
            } else {
                setError(data.error || 'Failed to resend OTP');
            }
        } catch (err) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Immediate client-side validation
        if (otp.length !== 6 || !/^\d+$/.test(otp)) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        if (!token) {
            setError('Invalid session. Please request a new OTP.');
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/verify-sms-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, otp }),
            });

            const data = await response.json();

            if (response.ok && data.resetToken) {
                // Show success message first
                setSuccess(true);
                
                // Then redirect after a brief delay to show the success message
                setTimeout(() => {
                    router.push(`/admin/new-password?token=${encodeURIComponent(data.resetToken)}`);
                }, 1000); // 1.5 seconds to see the success message
            } else {
                setError(data.error || 'Invalid OTP');
                setLoading(false);
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
            setLoading(false);
        }
    };

  // Show success state
// Show success state
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
                    <div className="col-lg-6 col-md-8 col-12"> {/* Increased column width */}
                        <div className="p-5 bg-white rounded shadow-md mx-auto w-100 text-center" style={{ maxWidth: '500px' }}> {/* Increased maxWidth and padding */}
                            <Link href="/">
                                <Image
                                    src='/images/IGL_Group_logo.png'
                                    width={70}
                                    height={70}
                                    className="mb-4 d-block mx-auto"
                                    alt="Company Logo"
                                    priority
                                />
                            </Link>
                            <div className="success-animation mb-4">
                                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                </svg>
                            </div>
                            <h4 className="text-success fw-semibold mb-3">OTP Verified Successfully!</h4>
                            <p className="text-muted mb-4 fs-6">Redirecting to set new password...</p>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" 
                                     style={{ width: '2rem', height: '2rem', borderWidth: '3px' }} 
                                     role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .success-animation {
                    margin: 0 auto;
                }
                .checkmark {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: block;
                    stroke-width: 2;
                    stroke: #4bb71b;
                    stroke-miterlimit: 10;
                    box-shadow: inset 0px 0px 0px #4bb71b;
                    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
                }
                .checkmark__circle {
                    stroke-dasharray: 166;
                    stroke-dashoffset: 166;
                    stroke-width: 2;
                    stroke-miterlimit: 10;
                    stroke: #4bb71b;
                    fill: none;
                    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                }
                .checkmark__check {
                    transform-origin: 50% 50%;
                    stroke-dasharray: 48;
                    stroke-dashoffset: 48;
                    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
                }
                @keyframes stroke {
                    100% {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes scale {
                    0%, 100% {
                        transform: none;
                    }
                    50% {
                        transform: scale3d(1.1, 1.1, 1);
                    }
                }
                @keyframes fill {
                    100% {
                        box-shadow: inset 0px 0px 0px 30px #4bb71b;
                    }
                }
            `}</style>
        </div>
        );
    }

    if (!token) {
        return (
            <div className="alert alert-danger text-center">
                Invalid or missing token. Please request a new OTP.
                <Link href="/admin/reset-password" className="d-block mt-2">Back to Reset Password</Link>
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
                    alt="Company Logo"
                    priority
                />
            </Link>
            <h6 className="mb-2 text-uppercase fw-semibold text-center">Verify SMS OTP</h6>

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
                    <div className="form-text">Check your phone for the OTP code sent via SMS</div>
                    
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
                        "Verify OTP"
                    )}
                </button>

                <div className="text-center mt-3">
                    <button
                        type="button"
                        className={`btn btn-outline-secondary btn-sm ${!canResend ? 'disabled' : ''}`}
                        onClick={handleResendOtp}
                        disabled={!canResend || resendLoading}
                    >
                        {resendLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Sending...
                            </>
                        ) : (
                            "Resend OTP"
                        )}
                    </button>
                </div>

                <div className="text-center mt-3">
                    <Link href="/admin/reset-password" className="text-dark fw-semibold small">
                        Back to Reset Password
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default function VerifyOtp() {
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
                            <div className="p-4 bg-white rounded shadow-md mx-auto w-100 text-center" style={{ maxWidth: '400px' }}>
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="spinner-border text-primary" 
                                         style={{ width: '3rem', height: '3rem', borderWidth: '3px' }} 
                                         role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <h6 className="text-primary fw-semibold">Loading Verification</h6>
                                <p className="text-muted small mb-0">Please wait while we load the OTP verification page...</p>
                            </div>
                        }>
                            <VerifyOtpContent />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}