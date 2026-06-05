import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Local state for tracking form submission status
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  // Pull auth data from Redux Reducer
  // Renamed 'loading' to 'isAuthLoading' to prevent duplicate declaration
  const user = useSelector((state) => state.auth.user);
  const isAuthLoading = useSelector((state) => state.auth.loading);

  // Feature: If user is already logged in, automatically push them to dashboard
  useEffect(() => {
    if (!isAuthLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isAuthLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setSubmitLoading(true);
      setError("");

      // Pass payload to hook
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });

      // Navigate to dashboard upon successful login
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Prevent flashing the form if the user is already authenticated
  if (user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Form Container */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-xl rounded-xl shadow-2xl p-8 border border-purple-500 border-opacity-30">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-300 text-sm">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-20 transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-20 transition-all duration-200"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
            >
              {submitLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-600"></div>
            <span className="px-3 text-slate-400 text-sm">
              Don't have an account?
            </span>
            <div className="flex-1 border-t border-slate-600"></div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="block w-full py-3 px-4 border border-purple-500 border-opacity-50 hover:border-cyan-400 text-slate-200 hover:text-cyan-400 font-semibold rounded-lg transition-all duration-200 text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;