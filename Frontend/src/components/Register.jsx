import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5900/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password: password,
        }
      );

      if (
        response.data.message ===
        "Registration successful. Please verify your email."
      ) {
        alert(
          "Registration successful! Please check your Gmail and verify your email."
        );

        navigate("/login");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-5 py-12">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500 text-white text-3xl shadow-xl shadow-orange-200 mb-4">
            🍔
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join FoodNest and discover better food
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100 border border-gray-100 p-8">

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-orange-500 hover:text-orange-600"
            >
              Login
            </Link>
          </p>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 FoodNest. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Register;