import React, { useEffect, useState } from "react";

export default function AuthModal({
  isOpen = false,
  initialMode = "login",
  currentUser = null,
  onClose,
  onAuthSuccess,
  onLogout,
}) {
  const [mode, setMode] = useState(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMode(initialMode === "signup" ? "signup" : "login");
    setErrorMsg("");
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanEmail = email.trim();
    const cleanPass = password.trim();
    const cleanName = fullName.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (cleanPass.length < 4) {
      setErrorMsg("Password must be at least 4 characters long.");
      return;
    }

    if (mode === "signup" && cleanName.length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const derivedName =
      mode === "signup"
        ? cleanName
        : cleanEmail.split("@")[0].replace(/[._-]+/g, " ");

    const userData = {
      name: derivedName || "Atelier Member",
      email: cleanEmail,
      signedInAt: new Date().toLocaleString(),
    };

    onAuthSuccess?.(userData, mode);
    setPassword("");
    onClose?.();
  };

  return (
    <div
      onClick={() => onClose?.()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#0b0b12]/95 p-6 sm:p-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500" />

        <button
          type="button"
          onClick={() => onClose?.()}
          aria-label="Close authentication modal"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-xs font-bold text-zinc-300 transition hover:border-white/35 hover:text-white"
        >
          ✕
        </button>

        <div>
          <p className="text-[10px] font-bold tracking-[0.28em] text-orange-300 uppercase">
            FAISAH ATELIER ACCOUNT
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
            {currentUser
              ? "Member Profile"
              : mode === "login"
              ? "Welcome Back"
              : "Create Your Account"}
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            {currentUser
              ? "Manage your signed-in boutique session."
              : mode === "login"
              ? "Sign in to access your saved selections and faster checkout."
              : "Join FAISAH ATELIER for curated collections and seamless ordering."}
          </p>
        </div>

        {currentUser ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 space-y-1.5">
              <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider">
                Signed In Member
              </p>
              <p className="text-base font-bold text-white">
                {currentUser.name}
              </p>
              <p className="text-xs text-zinc-300">{currentUser.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onLogout?.();
                  onClose?.();
                }}
                className="flex-1 rounded-full border border-rose-400/40 bg-rose-500/15 py-2.5 text-xs font-bold text-rose-200 transition hover:bg-rose-500/25 hover:text-white"
              >
                Sign Out
              </button>
              <button
                type="button"
                onClick={() => onClose?.()}
                className="flex-1 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 py-2.5 text-xs font-bold text-white transition hover:brightness-110"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg("");
                }}
                className={`rounded-full py-2 text-xs font-bold transition ${
                  mode === "login"
                    ? "bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMsg("");
                }}
                className={`rounded-full py-2 text-xs font-bold transition ${
                  mode === "signup"
                    ? "bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              {mode === "signup" && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition focus:border-orange-400/70 focus:bg-white/[0.1]"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition focus:border-orange-400/70 focus:bg-white/[0.1]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition focus:border-orange-400/70 focus:bg-white/[0.1]"
                />
              </div>

              {errorMsg && (
                <p className="rounded-xl border border-rose-400/40 bg-rose-500/15 px-3 py-2 text-xs font-medium text-rose-200">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:brightness-110"
              >
                {mode === "login" ? "Login to Atelier" : "Create Account"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}