import React, { useEffect, useRef, useState } from "react";

export default function Footer({
  onSelectCategory,
  onOpenCart,
  cartCount = 0,
}) {
  const [now, setNow] = useState(() => new Date());
  const footerSmokeRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slow white & light-black smoky canvas inside Footer
  useEffect(() => {
    const canvas = footerSmokeRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = Math.max(parent ? parent.scrollHeight : 440, 340);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const smokeClouds = Array.from({ length: 16 }, (_, i) => {
      const isWhiteTone = i % 2 === 0;
      return {
        baseX: ((i * 29 + 11) % 100) / 100,
        baseY: ((i * 43 + 19) % 100) / 100,
        radius: 170 + (i % 3) * 55,
        color: isWhiteTone ? "244, 244, 248" : "38, 38, 48",
        speedX: (i % 2 === 0 ? 1 : -1) * (0.14 + (i % 3) * 0.03),
        speedY: -0.1 - (i % 3) * 0.02,
        phase: i * 0.8,
        alpha: isWhiteTone ? 0.22 : 0.36,
      };
    });

    const wisps = Array.from({ length: 42 }, (_, i) => {
      const isWhiteWisp = i % 3 !== 0;
      return {
        x: ((i * 67) % 100) / 100,
        y: ((i * 37) % 100) / 100,
        r: 14 + (i % 4) * 10,
        color: isWhiteWisp ? "255, 255, 255" : "24, 24, 32",
        vy: 0.00018 + (i % 3) * 0.00004,
        vxAmp: 0.00012 + (i % 3) * 0.00003,
        phase: i * 0.65,
        alpha: isWhiteWisp ? 0.12 : 0.16,
      };
    });

    const start = performance.now();

    const draw = (nowTime) => {
      const width = canvas.width;
      const height = canvas.height;
      const t = (nowTime - start) * 0.001;

      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#14141b");
      bgGrad.addColorStop(0.5, "#1e1e28");
      bgGrad.addColorStop(1, "#121218");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      smokeClouds.forEach((c, idx) => {
        const driftX =
          Math.sin(t * c.speedX + c.phase) * (width * 0.16) +
          Math.cos(t * 0.12 + idx) * 20;
        const driftY =
          Math.cos(t * Math.abs(c.speedY) * 1.1 + c.phase) * (height * 0.12) +
          Math.sin(t * 0.14 + idx) * 14;

        const cx = c.baseX * width + driftX;
        const cy = c.baseY * height + driftY;
        const rad =
          c.radius *
          (Math.min(width, 1200) / 900) *
          (1.04 + Math.sin(t * 0.18 + idx) * 0.05);

        const grad = ctx.createRadialGradient(cx, cy, rad * 0.05, cx, cy, rad);
        grad.addColorStop(0, `rgba(${c.color}, ${c.alpha})`);
        grad.addColorStop(0.58, `rgba(${c.color}, ${c.alpha * 0.45})`);
        grad.addColorStop(1, `rgba(${c.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      wisps.forEach((w, idx) => {
        w.y -= w.vy;
        w.x += Math.sin(t * 0.24 + w.phase + idx * 0.2) * w.vxAmp;

        if (w.y < -0.1) w.y = 1.08;
        if (w.x < -0.1) w.x = 1.08;
        if (w.x > 1.08) w.x = -0.1;

        const px = w.x * width;
        const py = w.y * height;
        const pGrad = ctx.createRadialGradient(px, py, 1, px, py, w.r);
        pGrad.addColorStop(0, `rgba(${w.color}, ${w.alpha})`);
        pGrad.addColorStop(1, `rgba(${w.color}, 0)`);

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(px, py, w.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = now.toLocaleDateString([], {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleCategoryJump = (catName) => {
    onSelectCategory?.(catName);
    const el = document.getElementById("atelier-categories");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 mt-16 overflow-hidden border-t border-white/25 text-white">
      {/* Slow White & Light-Black Smoky Canvas */}
      <canvas
        ref={footerSmokeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Top Luxury Accent Line */}
      <div className="relative z-10 h-[3px] w-full bg-gradient-to-r from-white/80 via-zinc-200 to-white/80" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {/* 3-Column Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Brand Identity & Luxury Ethos */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-[0_0_18px_rgba(255,255,255,0.25)]">
                <span className="h-3 w-3 rotate-45 bg-white" />
              </span>
              <span className="text-lg sm:text-xl font-extrabold tracking-[0.18em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
                FAISAH ATELIER
              </span>
            </div>

            <p className="font-serif italic text-base font-bold text-white">
              “Crafted Silhouettes, Timeless Luxury.”
            </p>

            <p className="text-sm font-semibold leading-relaxed text-zinc-100">
              Tailored menswear, refined womenswear, handcrafted footwear,
              structured leather bags, and curated ladies makeup designed for
              modern elegance.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="rounded-full border border-white/30 bg-black/55 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                Cash on Delivery
              </span>
              <span className="rounded-full border border-white/30 bg-black/55 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                Express Dispatch
              </span>
            </div>
          </div>

          {/* Column 2: Quick Atelier Collections & Navigation */}
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-white uppercase">
              ATELIER COLLECTIONS
            </p>

            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm font-bold text-zinc-100">
              {["Men's", "Women's", "Footwear", "Bags", "Makeup"].map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleCategoryJump(cat)}
                    data-cursor="interactive"
                    className="font-bold transition hover:text-white hover:underline"
                  >
                    → {cat}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCart?.()}
                  data-cursor="interactive"
                  className="font-extrabold text-white transition hover:underline"
                >
                  → Cart ({cartCount})
                </button>
              </li>
            </ul>

            <div className="pt-3 border-t border-white/25 text-xs sm:text-sm font-semibold text-zinc-100 space-y-1.5">
              <p className="font-bold">Concierge Support: +92 300 0000000</p>
              <p className="font-bold">Flagship Studio: Lahore, Pakistan</p>
            </div>
          </div>

          {/* Column 3: Live Atelier Clock & Boutique Hours */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/30 bg-black/60 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold tracking-[0.2em] text-zinc-100 uppercase">
                  ATELIER LIVE TIME
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-bold text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  Boutique Open
                </span>
              </div>

              <div className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-wider text-white font-mono">
                {formattedTime}
              </div>

              <p className="mt-1.5 text-sm font-bold text-zinc-100">
                {formattedDate}
              </p>
            </div>

            <div className="mt-4 border-t border-white/20 pt-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-100">
              <span>24/7 Online Orders</span>
              <a
                href="#top"
                data-cursor="interactive"
                className="font-extrabold text-white hover:underline"
              >
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/25 pt-5 text-xs sm:text-sm font-bold text-zinc-100">
          <p>
            © {now.getFullYear()}{" "}
            <span className="font-extrabold text-white">FAISAH ATELIER</span>. All
            Rights Reserved.
          </p>
          <p className="font-semibold text-zinc-200">
            Luxury Fashion · Tailored Craftsmanship · Editorial Experience
          </p>
        </div>
      </div>
    </footer>
  );
}