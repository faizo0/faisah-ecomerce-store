import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouchDevice) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target.closest(
        "a, button, [role='button'], input, select, textarea, [data-cursor='interactive'], .cursor-dot-target"
      );
      setActive(Boolean(target));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
          pressed ? 0.8 : active ? 1.9 : 1
        })`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-150 ${
          active
            ? "h-5 w-5 border border-[#FACC15] bg-[#FACC15]/25 shadow-[0_0_18px_rgba(250,204,21,0.55)]"
            : "h-2.5 w-2.5 bg-gradient-to-r from-[#FACC15] to-[#EAB308] shadow-[0_0_12px_rgba(250,204,21,0.75)]"
        }`}
      />
    </div>
  );
}