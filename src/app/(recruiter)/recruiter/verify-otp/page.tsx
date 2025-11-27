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
    const [countdown, setCountdown] = useState(300); // 300 seconds = 5 minutes
    const [canResend, setCanResend] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    // Countdown timer effect
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

    const handleResendOtp = async () => {
        if (!canResend || resendLoading) return;
        
        setResendLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/send-sms-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: "" }), // You might need to pass phone number here
            });

            const data = await response.json();

            if (response.ok) {
                setCountdown(300); // Reset to 5 minutes
                setCanResend(false);
                setOtp(""); // Clear previous OTP
                alert('OTP sent successfully!');
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
        setLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/verify-sms-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push(`/admin/new-password?token=${encodeURIComponent(data.resetToken)}`);
            } else {
                setError(data.error || 'Invalid OTP');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    alt=""
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
                    />
                    <div className="form-text">Check your phone for the OTP code sent via SMS</div>
                    
                    {/* Countdown Timer */}
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
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                {/* Resend OTP Button */}
                <div className="text-center mt-3">
                    <button
                        type="button"
                        className={`btn btn-outline-secondary btn-sm ${!canResend ? 'disabled' : ''}`}
                        onClick={handleResendOtp}
                        disabled={!canResend || resendLoading}
                    >
                        {resendLoading ? "Sending..." : "Resend OTP"}
                    </button>
                </div>

                <div className="col-12 text-center mt-3">
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
                            <div className="text-center text-white">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
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