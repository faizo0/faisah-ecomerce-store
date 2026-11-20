import React, { useEffect, useState } from "react";

const SMOKE_SHOWCASE_ITEMS = [
  {
    id: "white-shirt",
    tag: "MEN'S",
    title: "White Shirt",
    image:
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "black-pant",
    tag: "MEN'S",
    title: "Black Trouser",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "brown-shoes",
    tag: "FOOTWEAR",
    title: "Brown Shoes",
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "green-jacket",
    tag: "OUTERWEAR",
    title: "Green Jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lady-suit",
    tag: "WOMEN'S",
    title: "Lady Suit",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "leather-bag",
    tag: "BAGS",
    title: "Structured Bag",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ladies-makeup",
    tag: "MAKEUP",
    title: "Ladies Makeup",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "luxury-watch",
    tag: "LUXURY WATCH",
    title: "Luxury Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ScrollPlanesCanvas({
  className = "",
  onSelectProduct,
}) {
  const [shift, setShift] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let lastY = window.scrollY || 0;
    let targetShift = 0;
    let currentShift = 0;
    let dragX = null;
    const startTime = performance.now();

    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY;
      lastY = y;
      targetShift += delta * 0.45;
    };

    const onMouseDown = (e) => {
      dragX = e.clientX;
    };

    const onMouseMove = (e) => {
      if (dragX === null) return;
      const dx = e.clientX - dragX;
      dragX = e.clientX;
      targetShift -= dx * 1.1;
    };

    const onMouseUp = () => {
      dragX = null;
    };

    const onTouchStart = (e) => {
      if (!e.touches.length) return;
      dragX = e.touches[0].clientX;
    };

    const onTouchMove = (e) => {
      if (!e.touches.length || dragX === null) return;
      const dx = e.touches[0].clientX - dragX;
      dragX = e.touches[0].clientX;
      targetShift -= dx * 1.25;
    };

    const onTouchEnd = () => {
      dragX = null;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const loop = (now) => {
      const t = (now - startTime) * 0.001;
      targetShift += 0.25;
      currentShift += (targetShift - currentShift) * 0.08;
      setShift(currentShift + Math.sin(t) * 2);

      const idx =
        ((Math.round(currentShift / 210) % SMOKE_SHOWCASE_ITEMS.length) +
          SMOKE_SHOWCASE_ITEMS.length) %
        SMOKE_SHOWCASE_ITEMS.length;
      setActiveIndex(idx);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const cardPitch = 212;
  const loopWidth = SMOKE_SHOWCASE_ITEMS.length * cardPitch;
  const translateX = (((shift % loopWidth) + loopWidth) % loopWidth);

  return (
    <div
      data-cursor="interactive"
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#08080b] py-6 text-white select-none ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          style={{
            transform: `translate3d(${Math.sin(shift * 0.006) * 65}px, ${
              Math.cos(shift * 0.005) * 32
            }px, 0) rotate(${Math.sin(shift * 0.003) * 18}deg) scale(1.25)`,
          }}
          className="absolute -top-20 -left-16 h-80 w-80 rounded-full bg-purple-600/35 blur-[95px]"
        />
        <div
          style={{
            transform: `translate3d(${Math.cos(shift * 0.0055) * -70}px, ${
              Math.sin(shift * 0.005) * 36
            }px, 0) rotate(${Math.cos(shift * 0.003) * -22}deg) scale(1.3)`,
          }}
          className="absolute top-6 -right-20 h-96 w-96 rounded-full bg-emerald-500/25 blur-[105px]"
        />
        <div
          style={{
            transform: `translate3d(${Math.sin(shift * 0.004) * 55}px, ${
              Math.cos(shift * 0.006) * -28
            }px, 0) scale(1.2)`,
          }}
          className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-amber-400/20 blur-[100px]"
        />
      </div>

      <div className="relative z-10 flex w-full items-center overflow-hidden px-4 py-2">
        <div
          style={{
            transform: `translate3d(${-translateX}px, 0, 0)`,
          }}
          className="flex items-center gap-4 will-change-transform"
        >
          {[...SMOKE_SHOWCASE_ITEMS, ...SMOKE_SHOWCASE_ITEMS].map((item, idx) => {
            const isActive = idx % SMOKE_SHOWCASE_ITEMS.length === activeIndex;
            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => onSelectProduct?.(item)}
                className={`flex w-44 sm:w-48 shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border bg-[#121218]/85 backdrop-blur-md transition-all duration-200 ${
                  isActive
                    ? "-translate-y-1.5 border-[#FACC15] shadow-[0_14px_32px_rgba(0,0,0,0.65)]"
                    : "border-white/15 opacity-90 hover:border-[#FACC15]/60"
                }`}
              >
                <div className="h-36 sm:h-40 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] tracking-wider text-[#FACC15] uppercase">
                    {item.tag}
                  </span>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-white truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mt-3 flex items-center justify-between border-t border-white/10 px-5 pt-3 text-xs text-zinc-300">
        <span>Scroll or drag smoke stage</span>
        <span className="font-semibold text-[#FACC15]">
          {SMOKE_SHOWCASE_ITEMS[activeIndex].title}
        </span>
      </div>
    </div>
  );
}