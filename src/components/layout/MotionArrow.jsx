import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDesignTheme } from "../../context/DesignThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function MotionArrow({
  targetId = "collections-section",
  label = "Explore 3D & Collections",
  onNextStep,
}) {
  const { theme } = useDesignTheme();
  const arrowRef = useRef(null);
  const ringRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(Math.min(100, Math.max(0, Math.round(progress * 100))));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    const ctx = gsap.context(() => {
      gsap.to(arrowRef.current, {
        y: 8,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(ringRef.current, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      ctx.revert();
    };
  }, []);

  const handleClick = () => {
    if (typeof onNextStep === "function") {
      onNextStep();
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        className={`group flex items-center gap-2.5 px-4 py-2 text-xs font-medium transition-all duration-300 ${theme.surface} ${theme.border} border shadow-lg`}
        title="Jump to next section / 3D stage"
      >
        <span className={theme.mutedText}>{scrollProgress}%</span>
        <span>{label}</span>
        <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <button
        type="button"
        onClick={handleClick}
        aria-label="Interactive motion arrow"
        className={`relative flex items-center justify-center w-14 h-14 rounded-full border transition-all duration-300 shadow-xl ${theme.arrowStyle} ${theme.bg}`}
      >
        <span
          ref={ringRef}
          className="absolute inset-1 rounded-full border border-dashed border-current opacity-50 pointer-events-none"
        />
        <span ref={arrowRef} className="relative flex items-center justify-center">
          {scrollProgress > 75 ? (
            <ArrowUpRight className="w-5 h-5" />
          ) : (
            <ArrowDown className="w-5 h-5" />
          )}
        </span>
      </button>
    </div>
  );
}