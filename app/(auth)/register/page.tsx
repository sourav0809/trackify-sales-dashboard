"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  BarChart2,
  PieChart,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/reducers/userReducer";
import agent from "@/agent/agent";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import { validateForm } from "@/helpers/validation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import axios from "axios";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_EXPIRES } from "@/constants/auth";
import { pathNames } from "@/constants/pathname.const";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (formError) {
      setFormError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = validateForm(registerSchema, formData);

    if (!validationResult.success) {
      setValidationErrors(validationResult.errors || {});
      return;
    }

    try {
      setIsSubmitting(true);
      setValidationErrors({});
      setFormError(null);

      const response = await agent.Auth.register(formData);

      Cookies.set(AUTH_COOKIE_NAME, response.data.token, {
        expires: AUTH_COOKIE_EXPIRES,
      });

      dispatch(
        setUser({
          token: response.data.token,
          user: response.data.user,
        })
      );

      toast.success("Account created successfully!");
      router.push(pathNames.dashboard);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Registration failed";
        setFormError(message);
      } else {
        const message = "An unexpected error occurred";
        setFormError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <div className="text-white space-y-8 max-w-lg">
            <h1 className="text-5xl font-bold leading-tight">
              Unlock the Power of Analytics
            </h1>
            <p className="text-xl text-blue-100">
              Join thousands of businesses making smarter decisions with data
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <BarChart2 className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-blue-100">Real-time Analytics</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-blue-100">Visual Reports</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-blue-100">Growth Insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Start your analytics journey today
            </p>
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      validationErrors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      validationErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      validationErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Create a password"
                  />
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.password}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-sm text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href={pathNames.login}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
