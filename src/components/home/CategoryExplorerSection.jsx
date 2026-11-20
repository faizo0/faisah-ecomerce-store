import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ATELIER_CATEGORIES,
  FASHION_PRODUCTS,
} from "../../data/fashionProducts";

export default function CategoryExplorerSection({
  products = FASHION_PRODUCTS,
  searchQuery = "",
  onSelectProduct,
  onAddToCart,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const sectionSmokeRef = useRef(null);

  useEffect(() => {
    const canvas = sectionSmokeRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = Math.max(parent ? parent.scrollHeight : 700, 500);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Full-slow multi-color glow
    const smokeClouds = Array.from({ length: 18 }, (_, i) => {
      const softGlowPalette = [
        "244, 114, 182", // Soft Pink
        "251, 146, 60",  // Warm Peach / Orange
        "56, 189, 248",  // Soft Sky Blue
        "192, 132, 252", // Soft Lavender / Lilac
        "52, 211, 153",  // Soft Mint Green
      ];
      return {
        baseX: ((i * 29 + 13) % 100) / 100,
        baseY: ((i * 41 + 19) % 100) / 100,
        radius: 230 + (i % 3) * 75,
        color: softGlowPalette[i % softGlowPalette.length],
        speedX: (i % 2 === 0 ? 1 : -1) * (0.16 + (i % 4) * 0.03),
        speedY: -0.13 - (i % 3) * 0.025,
        phase: i * 0.85,
        alpha: 0.28,
      };
    });

    const wisps = Array.from({ length: 48 }, (_, i) => {
      const wispPalette = [
        "249, 168, 212",
        "253, 186, 116",
        "125, 211, 252",
        "216, 180, 254",
        "110, 231, 183",
      ];
      return {
        x: ((i * 67) % 100) / 100,
        y: ((i * 37) % 100) / 100,
        r: 18 + (i % 4) * 12,
        color: wispPalette[i % wispPalette.length],
        vy: 0.00022 + (i % 4) * 0.00005,
        vxAmp: 0.00014 + (i % 3) * 0.00004,
        phase: i * 0.7,
        alpha: 0.11 + (i % 3) * 0.03,
      };
    });

    const start = performance.now();

    const draw = (now) => {
      const width = canvas.width;
      const height = canvas.height;
      const t = (now - start) * 0.001;

      ctx.clearRect(0, 0, width, height);

      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, "rgba(15, 16, 28, 0.82)");
      baseGrad.addColorStop(0.5, "rgba(22, 18, 34, 0.72)");
      baseGrad.addColorStop(1, "rgba(14, 20, 32, 0.84)");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      smokeClouds.forEach((c, idx) => {
        const driftX =
          Math.sin(t * c.speedX + c.phase) * (width * 0.22) +
          Math.cos(t * 0.15 + idx) * 24;
        const driftY =
          Math.cos(t * Math.abs(c.speedY) * 1.2 + c.phase) * (height * 0.14) +
          Math.sin(t * 0.17 + idx) * 20;

        const cx = c.baseX * width + driftX;
        const cy = c.baseY * height + driftY;
        const rad =
          c.radius *
          (Math.min(width, 1200) / 900) *
          (1.06 + Math.sin(t * 0.2 + idx) * 0.06);

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
        w.x += Math.sin(t * 0.25 + w.phase + idx * 0.2) * w.vxAmp;

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

  const activeCategoryObj = useMemo(
    () => ATELIER_CATEGORIES.find((c) => c.name === selectedCategory) || null,
    [selectedCategory]
  );

  const subCategoryOptions = useMemo(() => {
    if (activeCategoryObj) {
      return ["All", ...activeCategoryObj.subCategories];
    }
    const allSubs = ATELIER_CATEGORIES.flatMap((c) => c.subCategories);
    return ["All", ...allSubs];
  }, [activeCategoryObj]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return (Array.isArray(products) ? products : FASHION_PRODUCTS).filter(
      (item) => {
        const matchCat =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchSub =
          selectedSubCategory === "All" ||
          item.subCategory === selectedSubCategory;
        const matchSearch =
          !q ||
          item.name?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.subCategory?.toLowerCase().includes(q);

        return matchCat && matchSub && matchSearch;
      }
    );
  }, [products, selectedCategory, selectedSubCategory, searchQuery]);

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    setSelectedSubCategory("All");
  };

  return (
    <section
      id="atelier-categories"
      className="relative w-full overflow-hidden py-12 sm:py-16 text-white"
    >
      <canvas
        ref={sectionSmokeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-3.5 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-orange-200 uppercase">
              5 CORE CATEGORIES · 16 SUB-CATEGORIES
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)]">
              Curated{" "}
              <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-sky-300 bg-clip-text text-transparent">
                Atelier Catalog
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-medium text-zinc-200/90 max-w-md">
            {activeCategoryObj
              ? activeCategoryObj.subtitle
              : "Browse Men's, Women's, Footwear, Bags, and Ladies Makeup across 16 specialized sub-categories."}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleCategoryChange("All")}
            data-cursor="interactive"
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 text-white shadow-[0_6px_20px_rgba(249,115,22,0.3)]"
                : "border border-white/20 bg-[#09090f]/75 text-zinc-200 backdrop-blur-md hover:border-orange-400/50 hover:text-white"
            }`}
          >
            All ({FASHION_PRODUCTS.length})
          </button>

          {ATELIER_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.name)}
                data-cursor="interactive"
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 text-white shadow-[0_6px_20px_rgba(249,115,22,0.3)]"
                    : "border border-white/20 bg-[#09090f]/75 text-zinc-200 backdrop-blur-md hover:border-orange-400/50 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {subCategoryOptions.map((sub) => {
            const active = selectedSubCategory === sub;
            return (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubCategory(sub)}
                data-cursor="interactive"
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-medium backdrop-blur-md transition ${
                  active
                    ? "border border-sky-300 bg-[#09090f]/90 text-sky-200"
                    : "border border-white/15 bg-[#09090f]/75 text-zinc-200 hover:border-white/30 hover:text-white"
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        <div className="mt-5 mb-6 flex items-center justify-between text-xs font-semibold text-zinc-200">
          <span>
            Showing <strong className="text-white">{filteredProducts.length}</strong>{" "}
            {filteredProducts.length === 1 ? "piece" : "pieces"}
            {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
            {selectedSubCategory !== "All" ? ` · ${selectedSubCategory}` : ""}
          </span>

          {(selectedCategory !== "All" ||
            selectedSubCategory !== "All" ||
            searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedSubCategory("All");
              }}
              className="rounded-full bg-white/15 px-3 py-1 text-white hover:bg-white/25"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#0d0d13]/85 p-10 text-center">
            <p className="text-sm font-semibold text-white">
              No matching pieces found
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Try switching category or clearing your search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                onClick={() => onSelectProduct?.(product)}
                data-cursor="interactive"
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0d0d13]/85 backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-orange-400/65"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 rounded-full border border-white/15 bg-black/65 px-2.5 py-0.5 text-[10px] font-semibold text-orange-200 backdrop-blur-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                  <div>
                    <p className="text-[10px] tracking-wider text-sky-300/90 uppercase">
                      {product.category} · {product.subCategory}
                    </p>
                    <h3 className="mt-1 text-xs sm:text-sm font-semibold text-white line-clamp-1 group-hover:text-orange-300 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                    <span className="text-xs sm:text-sm font-bold text-orange-300">
                      PKR {Number(product.price || 0).toLocaleString()}
                    </span>

                    {typeof onAddToCart === "function" ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-3.5 py-1 text-[10px] sm:text-[11px] font-bold text-white shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition hover:brightness-110"
                      >
                        Buy
                      </button>
                    ) : (
                      <span className="text-[11px] font-medium text-zinc-300 group-hover:text-white">
                        Buy →
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}