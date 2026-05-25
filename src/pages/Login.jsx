import logo from "../assets/icon/logo.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  adminLogin,
  forgotPassword,
} from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [forgotMode, setForgotMode] =
    useState(false);

  const [loading, setLoading] =
    useState(false);




const handleLogin = async () => {
  try {
    if (!email || !password) {
      return toast.error(
        "Email & password required"
      );
    }

    setLoading(true);


    const data = await adminLogin({
  email,
  password,
});

    if (
      data?.user?.role !== "admin"
    ) {
      return toast.error(
        "Unauthorized access"
      );
    }

    // IMPORTANT: update auth context
    setUser(data.user);

    toast.success(
      "Login successful"
    );

    navigate("/admin", {
      replace: true,
    });
  } catch (err) {
    toast.error(
      err?.response?.data
        ?.message ||
        "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  // FORGOT PASSWORD
  const handleForgotPassword =
    async () => {
      try {
        if (!email) {
          return toast.error(
            "Enter email"
          );
        }

        setLoading(true);

       await forgotPassword(email);

        toast.success(
          "Reset link sent to email"
        );
      } catch (err) {
        toast.error(
          err?.response?.data
            ?.message ||
            "Failed to send reset link"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B0C] text-white">
      {/* gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[420px] h-[420px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
      </div>

      {/* grid */}
      <div
        className="
          absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div
          className="
            w-full
            max-w-[460px]
            rounded-[32px]
            border border-white/10
            bg-surface/[0.04]
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            p-10
          "
        >
          {/* logo */}
          <div className="flex items-center gap-4 mb-10">
            <img
              src={logo}
              alt="Gemora"
              className="w-20 h-20 object-contain"
            />

            <div>
              <h1 className="text-[1.05rem] font-semibold tracking-[0.18em] text-white">
                GEMORA
              </h1>

              <p className="text-xs uppercase tracking-[0.22em] text-white/35 mt-1">
                Admin Console
              </p>
            </div>
          </div>

          {/* heading */}
          <div className="mb-8">
            <h2 className="text-[2rem] font-semibold tracking-[-0.03em]">
              {forgotMode
                ? "Forgot Password"
                : "Welcome Back"}
            </h2>

            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              {forgotMode
                ? "Reset your admin password securely."
                : "Sign in securely to manage products, orders and dashboard."}
            </p>
          </div>

          <div className="space-y-5">
            {/* GOOGLE ADMIN LOGIN */}
            {!forgotMode && (
              <>
                <button
                  onClick={() => {
                    window.location.href =
  `${import.meta.env.VITE_API_URL}/auth/google/admin`;
                  }}
                  className="
                    w-full
                    rounded-2xl
                    bg-brand
                    px-5
                    py-4
                    font-medium
                    hover:bg-[#7A1D30]
                    transition
                  "
                >
                  Continue with Google
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                    Or continue with email
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </>
            )}

            {/* EMAIL */}
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                h-14
                rounded-2xl
                border border-white/10
                bg-white/5
                px-4
                outline-none
                text-sm
                placeholder:text-white/25
              "
            />

            {/* PASSWORD */}
            {!forgotMode && (
              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    px-4
                    pr-16
                    outline-none
                    text-sm
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50"
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            )}

            {/* ACTION BUTTON */}
            <button
              onClick={
                forgotMode
                  ? handleForgotPassword
                  : handleLogin
              }
              disabled={loading}
              className="
                w-full
                h-14
                rounded-2xl
                bg-white
                text-black
                font-medium
                hover:opacity-90
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Please wait..."
                : forgotMode
                ? "Send Reset Link"
                : "Login"}
            </button>

            {/* TOGGLE */}
            <button
              onClick={() =>
                setForgotMode(
                  !forgotMode
                )
              }
              className="w-full text-sm text-brand hover:underline"
            >
              {forgotMode
                ? "Back to Login"
                : "Forgot Password?"}
            </button>
          </div>

          {/* footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/35">
            <span>
              Protected Admin Access
            </span>
            <span>v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
