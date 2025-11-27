// app/reset-password/page.tsx
'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            console.log('📱 Sending SMS OTP request for:', phoneNumber);
            
            const response = await fetch('/api/auth/send-sms-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();
            console.log('📨 API Response:', data);

            if (response.ok) {
                // DIRECTLY redirect to verify OTP page
                router.push(`/verify-otp?token=${encodeURIComponent(data.token)}`);
            } else {
                setError(data.error || 'Failed to send OTP');
            }
        } catch (err) {
            console.error('❌ Error:', err);
            setError('Network error: Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

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
                            <h6 className="mb-3 text-uppercase fw-semibold text-center">Reset Password via SMS</h6>
                            <p className="text-center text-muted small mb-4">
                                Enter your phone number to receive a verification code
                            </p>

                            {error && (
                                <div className="alert alert-danger mb-3" role="alert">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        <div>
                                            <strong>Error:</strong> {error}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg"
                                        placeholder="017XXXXXXXX"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                        disabled={loading}
                                        pattern="[0-9]{11}"
                                        title="Please enter a valid 11-digit phone number"
                                    />
                                    <div className="form-text">
                                        Enter your registered 11-digit phone number
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary w-100 py-2 fw-semibold"
                                    type="submit"
                                    disabled={loading || !phoneNumber}
                                    style={{ height: '48px' }}
                                >
                                    {loading ? (
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="spinner-border spinner-border-sm text-light me-2" 
                                                style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} 
                                                role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <span>Sending OTP...</span>
                                        </div>
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="bi bi-send-check me-2"></i>
                                            <span>Send OTP</span>
                                        </div>
                                    )}
                                </button>

                                <div className="text-center mt-4">
                                    <Link href="/login" className="text-dark fw-semibold small text-decoration-none">
                                        <i className="bi bi-arrow-left me-1"></i>
                                        Back to Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Bootstrap Icons CSS if not already included */}
            <style jsx>{`
                .btn-primary:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                
                .form-control:disabled {
                    background-color: #f8f9fa;
                    opacity: 0.7;
                }
                
                .spinner-border-sm {
                    width: 1.2rem;
                    height: 1.2rem;
                    border-width: 2px;
                }
            `}</style>
        </div>
    );
}