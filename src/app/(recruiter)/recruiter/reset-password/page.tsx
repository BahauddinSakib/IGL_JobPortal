// app/admin/reset-password/page.tsx
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
                router.push(`/admin/verify-otp?token=${encodeURIComponent(data.token)}`);
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
                            <form onSubmit={handleSubmit}>
                                <Link href="/">
                                    <Image
                                        src='/images/IGL_Group_logo.png'
                                        width={58}
                                        height={58}
                                        className="mb-4 d-block mx-auto"
                                        alt=""
                                    />
                                </Link>
                                <h6 className="mb-2 text-uppercase fw-semibold text-center">Reset Password via SMS</h6>

                                {error && (
                                    <div className="alert alert-danger mb-3" role="alert">
                                        <strong>Error:</strong> {error}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="017XXXXXXXX"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <div className="form-text">
                                        Enter your phone number to receive OTP
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Sending OTP...
                                        </>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>

                                <div className="col-12 text-center mt-3">
                                    <Link href="/admin/admin-login" className="text-dark fw-semibold small">
                                        Back to Login
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