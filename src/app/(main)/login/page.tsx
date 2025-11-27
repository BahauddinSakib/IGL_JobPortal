'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/contexts/AuthContext';
import Navbar from "../componants/navbarDark"; // Make sure this file exists

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(email, password);
        
        if (!result.success) {
            setError(result.error || 'Login failed');
        }
        
        setLoading(false);
    };

    return(
        <>
            <Navbar /> {/* Add Navbar here */}
            <section className="bg-home d-flex align-items-center justify-content-center" style={{backgroundImage:"url('/images/hero/bg3.jpg')", backgroundPosition:'center'}}>
                <div className="bg-overlay bg-linear-gradient-2"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-5 col-12">
                            <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                                <form onSubmit={handleSubmit}>
                                    <Link href="/"><Image src='/images/IGL_Group_logo.png' width={58} height={58} className="mb-4 d-block mx-auto" alt=""/></Link>
                                    <h6 className="mb-3 text-uppercase fw-semibold">Please log in</h6>
                                
                                    {error && (
                                        <div className="alert alert-danger mb-3" role="alert">
                                            {error}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            placeholder="example@website.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                    
                                    <button 
                                        className="btn btn-primary w-100" 
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </button>

                                    <div className="col-12 text-center mt-3">
                                        <span>
                                            <span className="text-muted me-2 small">Don't have an account?</span> 
                                            <Link href="/signup" className="text-dark fw-semibold small">Sign Up</Link>
                                        </span>
                                    </div>

                                    <div className="col-12 text-center mt-2">
                                        <span className="forgot-pass text-muted small">
                                            <Link href="/reset-password" className="text-muted">Forgot password?</Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}