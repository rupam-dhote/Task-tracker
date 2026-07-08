import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import AuthLayout from "../componenet/auth/AuthLayout.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useLogin } from "../hooks/useAuth.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        login({
          token: data.token,
          user: data.user,
        });
      },
    });
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue managing your tasks."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
              className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-slate-300 px-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember */}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="h-4 w-4 accent-indigo-600" />
            Remember me
          </label>

          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Forgot password?
          </button>
        </div>

        {/* Login */}

        <button
          disabled={loginMutation.isPending}
          type="submit"
          className="h-12 w-full rounded-xl bg-indigo-600 text-white font-semibold transition hover:bg-indigo-700"
        >
          {loginMutation.isPending ? (
            <span className="flex items-center justify-center w-full gap-2">
              <Loader className=" animate-spin" size={18} /> Signing...
            </span>
          ) : (
            "Sign in"
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

        {/* Signup */}

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
