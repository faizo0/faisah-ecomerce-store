import React, { useEffect, useRef } from "react";
import ScrollPlanesCanvas from "../three/ScrollPlanesCanvas";

export default function HeroAndExplorer({
  onSelectProduct,
  onExploreClick,
}) {
  const smokeCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = smokeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = Math.max(
        parent ? parent.scrollHeight : window.innerHeight,
        window.innerHeight
      );
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const smokeClouds = Array.from({ length: 76 }, (_, i) => {
      const pinkTurboPalette = [
        "244, 114, 182",
        "236, 72, 153",
        "249, 168, 212",
        "251, 146, 60",
        "248, 113, 113",
        "56, 189, 248",
        "52, 211, 153",
      ];
      return {
        baseX: ((i * 31 + 13) % 100) / 100,
        baseY: ((i * 43 + 19) % 100) / 100,
        radius: 275 + (i % 4) * 110,
        color: pinkTurboPalette[i % pinkTurboPalette.length],
        speedX: (i % 2 === 0 ? 1 : -1) * (7.4 + (i % 5) * 1.35),
        speedY: -6.4 - (i % 4) * 1.2,
        phase: i * 0.9,
        alpha: 0.78,
      };
    });

    const wisps = Array.from({ length: 240 }, (_, i) => {
      const pinkWispPalette = [
        "244, 114, 182",
        "249, 168, 212",
        "236, 72, 153",
        "253, 186, 116",
        "252, 165, 165",
        "125, 211, 252",
        "110, 231, 183",
      ];
      return {
        x: ((i * 73) % 100) / 100,
        y: ((i * 41) % 100) / 100,
        r: 25 + (i % 5) * 21,
        color: pinkWispPalette[i % pinkWispPalette.length],
        vy: 0.0115 + (i % 6) * 0.0026,
        vxAmp: 0.0068 + (i % 4) * 0.0018,
        phase: i * 0.7,
        alpha: 0.4 + (i % 4) * 0.07,
      };
    });

    const start = performance.now();

    const draw = (now) => {
      const width = canvas.width;
      const height = canvas.height;
      const t = (now - start) * 0.001;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#06060b";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      smokeClouds.forEach((c, idx) => {
        const driftX =
          Math.sin(t * c.speedX + c.phase) * (width * 0.48) +
          Math.cos(t * 6.2 + idx) * 150;
        const driftY =
          Math.cos(t * Math.abs(c.speedY) * 2.5 + c.phase) * (height * 0.36) +
          Math.sin(t * 6.8 + idx) * 130;

        const cx = c.baseX * width + driftX;
        const cy = c.baseY * height + driftY;
        const rad =
          c.radius *
          (Math.min(width, 1200) / 900) *
          (1.3 + Math.sin(t * 6.9 + idx) * 0.38);

        const grad = ctx.createRadialGradient(cx, cy, rad * 0.04, cx, cy, rad);
        grad.addColorStop(0, `rgba(${c.color}, ${c.alpha})`);
        grad.addColorStop(0.56, `rgba(${c.color}, ${c.alpha * 0.68})`);
        grad.addColorStop(1, `rgba(${c.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      wisps.forEach((w, idx) => {
        w.y -= w.vy;
        w.x += Math.sin(t * 9.6 + w.phase + idx * 0.2) * w.vxAmp;

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

      const vig = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        Math.min(width, height) * 0.2,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.92
      );
      vig.addColorStop(0, "rgba(6, 6, 11, 0)");
      vig.addColorStop(1, "rgba(6, 6, 11, 0.2)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const target = document.getElementById("atelier-categories");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative -mt-16 min-h-screen w-full overflow-hidden text-[#f4f4f6] pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      <canvas
        ref={smokeCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-3.5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] sm:text-xs font-medium tracking-[0.32em] text-black uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            THE ART OF LUXURY FASHION
          </p>

          <h1 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.14em] uppercase text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]">
            FAISAH{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">
              ATELIER
            </span>
          </h1>

          <p className="mt-2 font-serif italic text-base sm:text-xl text-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Tailored Shirts, Trousers, Footwear, Bags, Jackets &amp; Ladies Makeup
          </p>

          <p className="mx-auto mt-3.5 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Where refined silhouettes meet everyday elegance across menswear, womenswear,
            leather footwear, structured bags, luxury watches, and ladies makeup.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleExplore}
              data-cursor="interactive"
              className="rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:brightness-110"
            >
              Step Inside
            </button>

            <a
              href="#atelier-categories"
              data-cursor="interactive"
              className="rounded-full border border-sky-400/45 bg-sky-500/15 px-5 py-2.5 text-xs sm:text-sm font-semibold text-black transition hover:bg-sky-500/25"
            >
              Explore Categories
            </a>
          </div>
        </div>

        {/* Continuous Scrolling / Dragging Strip */}
        <div className="mt-8 sm:mt-10">
          <ScrollPlanesCanvas onSelectProduct={onSelectProduct} />
        </div>
      </div>
    </section>
  );
}