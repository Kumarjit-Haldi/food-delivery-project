import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      alert("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5900/api/auth/verify-otp",
        {
          email: email,
          otp: otp.trim(),
        }
      );

      if (
        response.data.message ===
        "Email verified successfully"
      ) {
        alert("Email verified successfully!");

        navigate("/login");
      } else {
        alert(response.data.message);
      }

    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("OTP verification failed");
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
            🔐
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h1>

          <p className="text-gray-500 mt-2">
            Enter the 6-digit OTP sent to your Gmail
          </p>

        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100 border border-gray-100 p-8">

          <form onSubmit={handleVerify} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-600 outline-none"
              />
            </div>

            {/* OTP */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Verification OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-center text-2xl font-bold tracking-[0.5em] outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already verified?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-orange-500 hover:text-orange-600"
            >
              Login
            </button>
          </p>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 FoodNest. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default VerifyOTP;