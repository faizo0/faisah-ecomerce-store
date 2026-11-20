import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/layout/Navbar";
import HeroAndExplorer from "./components/home/HeroAndExplorer";
import CategoryExplorerSection from "./components/home/CategoryExplorerSection";
import Footer from "./components/layout/Footer";
import ProductDetailModal from "./components/shop/ProductDetailModal";
import CartDrawer from "./components/shop/CartDrawer";
import { FASHION_PRODUCTS } from "./data/fashionProducts";

function AuthModal({
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

    onAuthSuccess?.(
      {
        name: derivedName || "Atelier Member",
        email: cleanEmail,
        signedInAt: new Date().toLocaleString(),
      },
      mode
    );
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

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const appSmokeCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = appSmokeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const smokeClouds = Array.from({ length: 16 }, (_, i) => {
      const richColorPalette = [
        "249, 115, 22",
        "236, 72, 153",
        "56, 189, 248",
        "16, 185, 129",
        "239, 68, 68",
      ];
      return {
        baseX: ((i * 29 + 11) % 100) / 100,
        baseY: ((i * 47 + 17) % 100) / 100,
        radius: 175 + (i % 3) * 55,
        color: richColorPalette[i % richColorPalette.length],
        speedX: (i % 2 === 0 ? 1 : -1) * (0.14 + (i % 3) * 0.03),
        speedY: -0.11 - (i % 3) * 0.02,
        phase: i * 0.85,
        alpha: 0.24,
      };
    });

    const wisps = Array.from({ length: 34 }, (_, i) => {
      const wispPalette = [
        "251, 146, 60",
        "244, 114, 182",
        "96, 165, 250",
        "52, 211, 153",
        "248, 113, 113",
      ];
      return {
        x: ((i * 73) % 100) / 100,
        y: ((i * 41) % 100) / 100,
        r: 14 + (i % 4) * 9,
        color: wispPalette[i % wispPalette.length],
        vy: 0.00018 + (i % 3) * 0.00005,
        vxAmp: 0.00012 + (i % 3) * 0.00004,
        phase: i * 0.65,
        alpha: 0.07 + (i % 3) * 0.02,
      };
    });

    const start = performance.now();

    const draw = (now) => {
      const width = canvas.width;
      const height = canvas.height;
      const t = (now - start) * 0.001;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      smokeClouds.forEach((c, idx) => {
        const driftX =
          Math.sin(t * c.speedX + c.phase) * (width * 0.13) +
          Math.cos(t * 0.12 + idx) * 20;
        const driftY =
          Math.cos(t * Math.abs(c.speedY) * 1.1 + c.phase) * (height * 0.08) +
          Math.sin(t * 0.14 + idx) * 16;

        const cx = c.baseX * width + driftX;
        const cy = c.baseY * height + driftY;
        const rad =
          c.radius *
          (Math.min(width, 1200) / 900) *
          (1.03 + Math.sin(t * 0.2 + idx) * 0.06);

        const grad = ctx.createRadialGradient(cx, cy, rad * 0.06, cx, cy, rad);
        grad.addColorStop(0, `rgba(${c.color}, ${c.alpha})`);
        grad.addColorStop(0.55, `rgba(${c.color}, ${c.alpha * 0.42})`);
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

      const vig = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        Math.min(width, height) * 0.18,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.9
      );
      vig.addColorStop(0, "rgba(5, 5, 8, 0.14)");
      vig.addColorStop(1, "rgba(5, 5, 8, 0.68)");
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

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleAddToCart = (productToAdd) => {
    const sizeKey = productToAdd.selectedSize || "Standard";
    const qtyToAdd = Number(productToAdd.quantity || 1);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          (item.id || item.name) === (productToAdd.id || productToAdd.name) &&
          (item.selectedSize || "Standard") === sizeKey
      );

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + qtyToAdd }
            : item
        );
      }

      return [
        ...prev,
        {
          ...productToAdd,
          selectedSize: sizeKey,
          quantity: qtyToAdd,
        },
      ];
    });

    setToast({
      text: `${productToAdd.name} (${sizeKey}) added to cart`,
      actionLabel: "Place Order",
    });
  };

  const handleUpdateQty = (index, nextQty) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((_, idx) => idx !== index));
      return;
    }
    setCartItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, quantity: nextQty } : item
      )
    );
  };

  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (newOrder) => {
    const orderEntry = newOrder || {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString(),
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
        0
      ),
      status: "Order Placed",
    };

    setOrders((prev) => [orderEntry, ...prev]);
    setCartItems([]);
    setToast({
      text: `Order ${orderEntry.id || orderEntry.orderId || ""} placed successfully!`,
      actionLabel: null,
    });
  };

  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="relative min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <canvas
        ref={appSmokeCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />

      <div className="relative z-10">
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cartCount={totalCount}
          currentUser={currentUser}
          onOpenCart={() => setIsCartOpen(true)}
          onLoginClick={() => {
            setAuthMode("login");
            setAuthModalOpen(true);
          }}
          onSignUpClick={() => {
            setAuthMode("signup");
            setAuthModalOpen(true);
          }}
          onBrandClick={() => {
            setSearchQuery("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        <main>
          <HeroAndExplorer
            products={FASHION_PRODUCTS}
            onSelectProduct={(item) => setActiveProduct(item)}
            onExploreClick={() => {
              const el = document.getElementById("atelier-categories");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />

          <CategoryExplorerSection
            products={FASHION_PRODUCTS}
            searchQuery={searchQuery}
            onSelectProduct={(item) => setActiveProduct(item)}
            onAddToCart={(item) =>
              handleAddToCart({
                ...item,
                selectedSize: item.sizes?.[0] || "Standard",
                quantity: 1,
              })
            }
          />
        </main>

        <Footer
          cartCount={totalCount}
          onOpenCart={() => setIsCartOpen(true)}
        />
      </div>

      {totalCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-1/2 z-40 flex w-[92%] max-w-xl -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-orange-400/40 bg-[#0b0b12]/90 px-4 py-2.5 text-xs shadow-[0_14px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div className="flex items-center gap-2.5 truncate">
            <span className="rounded-full bg-orange-500/20 px-2.5 py-1 font-bold text-orange-300">
              {totalCount} in Cart
            </span>
            <span className="font-bold text-white">
              PKR {totalAmount.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            data-cursor="interactive"
            className="shrink-0 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 px-4 py-1.5 text-xs font-bold text-white shadow-[0_6px_20px_rgba(249,115,22,0.35)] transition hover:brightness-110"
          >
            Place Order →
          </button>
        </div>
      )}

      {toast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-orange-400/50 bg-[#0d0d15]/95 px-4 py-2.5 text-xs text-white shadow-xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          <span>{toast.text}</span>
          {toast.actionLabel && (
            <button
              type="button"
              onClick={() => {
                setToast(null);
                setIsCartOpen(true);
              }}
              className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-200 hover:bg-orange-500/25"
            >
              {toast.actionLabel}
            </button>
          )}
        </div>
      )}

      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        orders={orders}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

     <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        currentUser={currentUser}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(userData, actionMode) => {
          setCurrentUser(userData);
          setToast({
            text:
              actionMode === "signup"
                ? `Account created for ${userData.name}!`
                : `Welcome back, ${userData.name}!`,
            actionLabel: null,
          });
        }}
        onLogout={() => {
          setCurrentUser(null);
          setToast({
            text: "You have signed out.",
            actionLabel: null,
          });
        }}
      />
    </div>
  );
}