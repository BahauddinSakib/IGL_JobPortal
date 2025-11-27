
"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed. Try again.");
        setLoading(false);
        return;
      }
      document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=Lax`;
      toast.success(data.message);
      router.push("/");
      window.location.reload(); 
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-header bg-primary text-white text-center py-3">
          <h3 style={{ color: "white" }} className="mb-0">
            Welcome Back
          </h3>
          <p style={{ color: "white" }} className="mb-0 opacity-75">
            Sign in to your account
          </p>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope me-2"></i>Email or Phone
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="example@domain.com or phone"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-key me-2"></i>Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-decoration-none">
                Forgot password?
              </Link>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Signing In...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i>Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <div className="card-footer text-center py-3 bg-light">
          <p className="mb-0">
            Don't have an account?{" "}
            <Link href="/register" className="text-decoration-none">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default page;
