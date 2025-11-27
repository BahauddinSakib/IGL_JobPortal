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

    if (!resetToken) {
        setError('Invalid reset token. Please restart the process.');
        return;
    }

    if (password.length < 6) {
        setError('Password must be at least 6 characters long');
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                token: resetToken,  // Change resetToken to token
                newPassword: password 
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/admin-login');
            }, 3000);
        } else {
            setError(data.message || 'Failed to update password');
        }
    } catch (err) {
        setError('An error occurred. Please try again.');
    } finally {
        setLoading(false);
    }
};

    if (success) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100"
                style={{
                    backgroundImage: "url('/images/hero/bg3.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
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
                                        alt=""
                                    />
                                </Link>
                                <div className="alert alert-success mb-0" role="alert">
                                    <strong>Success!</strong> Password updated successfully.
                                    <div className="mt-3">
                                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                                        <span className="small">Redirecting to login...</span>
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
                backgroundRepeat: 'no-repeat',
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
                                <h6 className="mb-2 text-uppercase fw-semibold text-center">Set New Password</h6>

                                {error && (
                                    <div className="alert alert-danger mb-3" role="alert">
                                        {error}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        minLength={6}
                                    />
                                    <div className="form-text">Password must be at least 6 characters long.</div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Updating..." : "Update Password"}
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

export default function NewPassword() {
    return (
        <Suspense fallback={
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        }>
            <NewPasswordContent />
        </Suspense>
    );
}