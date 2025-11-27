'use client'
import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function NewPasswordContent() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetToken = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validation
        if (!resetToken) {
            setError('Invalid reset token. Please restart the password reset process.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/update-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    token: resetToken,
                    newPassword: password 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                // Industry standard: Short delay for user feedback, then immediate redirect
                setTimeout(() => {
                    router.push('/login');
                }, 1500); // Reduced from 3000ms to 1500ms for better UX
            } else {
                setError(data.message || 'Failed to update password. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    // Success state - show confirmation and redirect
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
                                <div className="alert alert-success mb-0" role="alert">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    <strong>Password Updated Successfully!</strong>
                                    <div className="mt-2 small">
                                        You will be redirected to login shortly...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                            <h6 className="mb-3 text-uppercase fw-semibold text-center">Set New Password</h6>

                            {error && (
                                <div className="alert alert-danger mb-3" role="alert">
                                    <strong>Error:</strong> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">
                                        New Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        minLength={8}
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                                        autoComplete="new-password"
                                    />
                                    <div className="form-text">
                                        Password must be at least 8 characters with uppercase, lowercase, and number.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        autoComplete="new-password"
                                    />
                                </div>

                                <button
                                    className="btn btn-primary w-100 py-2"
                                    type="submit"
                                    disabled={loading || !password || !confirmPassword}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Updating Password...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
                                </button>

                                <div className="text-center mt-3">
                                    <Link href="/login" className="text-dark fw-semibold small">
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

export default function NewPassword() {
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
                        <p className="mt-2">Loading password reset...</p>
                    </div>
                </div>
            </div>
        }>
            <NewPasswordContent />
        </Suspense>
    );
}