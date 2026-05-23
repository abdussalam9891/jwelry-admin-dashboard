import logo from "../assets/icon/logo.png";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] =
    useSearchParams();

  const token =
    searchParams.get("token");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleResetPassword =
    async () => {
      try {
        if (!token) {
          return toast.error(
            "Invalid reset token"
          );
        }

        if (!password) {
          return toast.error(
            "Password required"
          );
        }

        if (
          password !==
          confirmPassword
        ) {
          return toast.error(
            "Passwords do not match"
          );
        }

        setLoading(true);

        await axios.post(
          "http://localhost:5000/api/v1/auth/reset-password",
          {
            token,
            password,
          }
        );

        toast.success(
          "Password reset successful"
        );

        navigate("/login");
      } catch (err) {
        toast.error(
          err?.response?.data
            ?.message ||
            "Reset failed"
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
              Reset Password
            </h2>

            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              Create a new secure password.
            </p>
          </div>

          <div className="space-y-5">
            {/* PASSWORD */}
            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                placeholder="New password"
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

            {/* CONFIRM PASSWORD */}
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) =>
                setConfirmPassword(
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
              "
            />

            {/* BUTTON */}
            <button
              onClick={
                handleResetPassword
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
                ? "Resetting..."
                : "Reset Password"}
            </button>

            <button
              onClick={() =>
               navigate("/login", {
  replace: true,
})
              }
              className="w-full text-sm text-brand hover:underline"
            >
              Back to Login
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
