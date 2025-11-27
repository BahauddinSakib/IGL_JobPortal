"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


const Page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        toast.success(data.message)
        setSuccess(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role:1,
        });

        router.push("/login")
      }
    } catch (err) {
      toast.error(error.message)
      setError(err.message);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div
          className="card shadow-lg"
          style={{ width: "100%", maxWidth: "450px" }}
        >
          <div className="card-header bg-primary text-white text-center py-3">
            <h3 style={{ color: "white" }} className="mb-0">
              Create Account
            </h3>
            <p style={{ color: "white" }} className="mb-0 opacity-75">
              Join our community today
            </p>
          </div>

          <div className="card-body p-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <i className="fas fa-user me-2"></i>Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-id-card"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope me-2"></i>Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-at"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  <i className="fas fa-phone me-2"></i>Phone
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                  {/* <input type="text" className="form-control" id="phone" value={formData.phone} onChange={handleChange} placeholder="01XXXXXXXXX" required /> */}
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    required
                    pattern="^01[3-9]\d{8}$"
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
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
                <div className="form-text">Minimum 8 characters</div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  <i className="fas fa-key me-2"></i>Confirm Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeTerms"
                  required
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  I agree to the{" "}
                  <Link href="/terms" className="text-decoration-none">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                <i className="fas fa-user-plus me-2"></i>Register
              </button>
            </form>
          </div>

          <div className="card-footer text-center py-3 bg-light">
            <p className="mb-0">
              Already have an account?{" "}
              <Link href="/login" className="text-decoration-none">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
