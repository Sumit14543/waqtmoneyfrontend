import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Mail, Eye, EyeOff, KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";
import SEO from "@/Components/SEO";
import { API_BASE_URL } from "@/config/api";

const ALLOWED_DOMAINS = ["waqtfinance.com", "waqtmoney.in"];

const isAllowedDomain = (email: string) => {
  const clean = email.trim().toLowerCase();
  const domain = clean.split("@")[1];
  return domain ? ALLOWED_DOMAINS.includes(domain) : false;
};

export default function AdminLogin() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError("Please fill in both Email and Password.");
      return;
    }

    if (!isAllowedDomain(cleanEmail)) {
      setError("Access restricted. Only @waqtfinance.com or @waqtmoney.in email addresses are allowed.");
      return;
    }

    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPass }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStep(2);
        setTimer(60);
        setSuccessMsg(data.message || `OTP sent to ${cleanEmail}`);
      } else {
        setError(data?.message || `Request failed (${response.status}: ${response.statusText})`);
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.error("Admin OTP request error:", errorObj);
      setError(errorObj?.message || "Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (!cleanOtp) {
      setError("Please enter the 6-digit OTP sent to your email.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, otp: cleanOtp }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_username", data.username || cleanEmail);
        navigate("/admin/dashboard");
      } else {
        setError(data?.message || "Verification failed. Please check OTP and try again.");
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.error("Admin OTP verify error:", errorObj);
      setError(errorObj?.message || "Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0 || loading) return;
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: password.trim() }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setTimer(60);
        setSuccessMsg("A new OTP has been sent to your email.");
      } else {
        setError(data?.message || "Failed to resend OTP.");
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Admin Login - Secure OTP Portal Access"
        description="Administrative portal login for Waqt Money management operations."
        robots="noindex, nofollow"
      />

      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-purple-100 shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
              <ShieldAlert size={28} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="mt-2 text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Waqt Money Management Portal
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium flex items-center gap-2">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
                  Admin Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Mail size={18} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-600 outline-none text-slate-800"
                    placeholder="shivani@waqtfinance.com or support@waqtmoney.in"
                    required
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Allowed domains: <span className="font-semibold text-purple-600">@waqtfinance.com</span> or <span className="font-semibold text-purple-600">@waqtmoney.in</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Lock size={18} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-600 outline-none text-slate-800"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full h-12 inline-flex items-center justify-center rounded-xl bg-purple-600 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Send Email OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Sending OTP to:</span>
                  <p className="font-bold text-slate-800 truncate">{email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1 shrink-0"
                >
                  <ArrowLeft size={14} /> Change
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="otp">
                  Enter 6-Digit Email OTP
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <KeyRound size={18} />
                  </span>
                  <input
                    id="otp"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold tracking-widest text-center focus:bg-white focus:ring-2 focus:ring-purple-600 outline-none text-slate-800"
                    placeholder="• • • • • •"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Didn't receive code?</span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || loading}
                  className="font-semibold text-purple-600 hover:text-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full h-12 inline-flex items-center justify-center rounded-xl bg-purple-600 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify OTP & Login"}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
