import { useState } from "react";
import { Eye, EyeOff, Loader, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthLayout from "../componenet/auth/AuthLayout";
import { useSignup } from "../hooks/useAuth";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setMessage] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const signupMutation = useSignup();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage(true);
      return;
    }

    signupMutation.mutate(formData);
  };

  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Sign up to start managing your tasks."
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="h-10 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-10 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Password */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-slate-300 pl-10 pr-10 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-slate-300 pl-10 pr-10 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        {/* Error show */}
        {errorMessage && (
          <div className="flex w-full text-red-500">
            <p className="text-xs">Password not matched</p>
          </div>
        )}
        {/* Terms */}
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-indigo-600"
          />

          <span>
            I agree to the{" "}
            <span className="font-medium text-indigo-600">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="font-medium text-indigo-600">Privacy Policy</span>.
          </span>
        </label>

        {/* Button */}
        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700"
        >
          {signupMutation.isPending ? (
            <span className="flex items-center justify-center w-full gap-2">
              <Loader className=" animate-spin" size={18} /> Creating...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-slate-400">OR</span>
          </div>
        </div>

        {/* Login */}
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
