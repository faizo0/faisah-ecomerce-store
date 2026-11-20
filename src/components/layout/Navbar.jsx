import React from "react";

export default function Navbar({
  searchQuery = "",
  onSearchChange,
  onLoginClick,
  onSignUpClick,
  onBrandClick,
}) {
  return (
    <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl rounded-full border border-white/15 bg-[#07070b]/75 backdrop-blur-xl text-white shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 px-2.5 py-2 sm:px-5 sm:py-3">
        {/* Brand Logo & Name */}
        <a
          href="#top"
          onClick={(e) => {
            if (onBrandClick) {
              e.preventDefault();
              onBrandClick();
            }
          }}
          data-cursor="interactive"
          className="flex min-w-0 items-center gap-1.5 sm:gap-2.5 shrink-0"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-orange-400/50 bg-gradient-to-br from-orange-500/25 via-pink-500/20 to-sky-500/20 text-orange-300 shadow-[0_0_16px_rgba(249,115,22,0.25)]">
            <span className="h-2 w-2 rotate-45 bg-gradient-to-tr from-orange-400 to-pink-400" />
          </span>
          <span className="truncate max-w-[78px] sm:max-w-none text-[10px] sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase bg-gradient-to-r from-white via-orange-200 to-pink-300 bg-clip-text text-transparent">
            FAISAH ATELIER
          </span>
        </a>

        {/* Search Bar */}
        <div className="flex min-w-0 flex-1 max-w-md items-center">
          <div className="relative w-full min-w-0">
            <span className="pointer-events-none absolute inset-y-0 left-2.5 sm:left-3.5 flex items-center text-[11px] sm:text-xs text-orange-300/80">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search..."
              className="w-full min-w-0 rounded-full border border-white/15 bg-white/[0.06] py-1.5 sm:py-2 pl-7 sm:pl-9 pr-2.5 sm:pr-4 text-[11px] sm:text-xs text-white placeholder-zinc-400 outline-none transition focus:border-orange-400/70 focus:bg-white/[0.1]"
            />
          </div>
        </div>

        {/* Login & Sign Up Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onLoginClick?.()}
            data-cursor="interactive"
            className="whitespace-nowrap rounded-full border border-orange-400/40 bg-white/[0.06] px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-orange-200 transition hover:border-orange-300 hover:bg-orange-500/15 hover:text-white"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => onSignUpClick?.()}
            data-cursor="interactive"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white shadow-[0_6px_20px_rgba(249,115,22,0.3)] transition hover:brightness-110"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
