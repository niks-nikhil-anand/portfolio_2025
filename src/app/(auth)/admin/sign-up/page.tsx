"use client";
import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("Register Response:", data);

      if (res.ok) {
        router.push("/admin/auth")
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      console.error("❌ Error during registration:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white/15 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main card */}
        <div className="relative bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-900 to-black rounded-2xl mb-4 shadow-xl border border-gray-700">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-2">
              Create Admin Account 🚀
            </h1>
            <p className="text-gray-600 text-sm">
              Join the admin dashboard and manage your platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 bg-gray-50/80 hover:bg-white text-gray-900"
                  placeholder="Enter your full name"
                  required
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 bg-gray-50/80 hover:bg-white text-gray-900"
                  placeholder="admin@company.com"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 pl-12 pr-12 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 bg-gray-50/80 hover:bg-white text-gray-900"
                  placeholder="Create a strong password"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-4 pl-12 pr-12 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 bg-gray-50/80 hover:bg-white text-gray-900"
                  placeholder="Confirm your password"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 text-black border-gray-400 rounded focus:ring-black accent-black"
                required
              />
              <span className="text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-black hover:text-gray-700 underline font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-black hover:text-gray-700 underline font-medium">
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:from-black hover:to-gray-800 transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-800"
            >
              Create Admin Account
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Button */}
            <Link href={"/admin/auth"} > 
            <button
              type="button"
              onClick={() => {
                /* Handle signin navigation */
              }}
              className="w-full py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-semibold   hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Sign In to Existing Account
            </button>
             </Link>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Protected by industry-standard encryption and security measures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
