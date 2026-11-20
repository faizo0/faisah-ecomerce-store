import React, { useState } from "react";

export default function CartDrawer({
  isOpen = false,
  onClose,
  items = [],
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) {
  const [step, setStep] = useState("cart"); // "cart" | "checkout" | "success"
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    city: "Lahore",
    address: "",
    paymentMethod: "Cash on Delivery",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!isOpen) return null;

  const totalQty = items.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
  const deliveryFee = items.length > 0 ? 250 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCloseDrawer = () => {
    if (step === "success") {
      setStep("cart");
      setPlacedOrder(null);
    }
    setErrorMsg("");
    onClose?.();
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setErrorMsg("براہ کرم اپنا نام، فون نمبر اور مکمل پتہ درج کریں۔");
      return;
    }

    setErrorMsg("");
    const orderRecord = {
      orderId: `FA-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleString(),
      items: [...items],
      subtotal,
      deliveryFee,
      total: grandTotal,
      customer: { ...customer },
      status: "Order Placed",
    };

    setPlacedOrder(orderRecord);
    setStep("success");
    onOrderPlaced?.(orderRecord);
    onClearCart?.();
  };

  return (
    <div
      onClick={handleCloseDrawer}
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col justify-between border-l border-white/15 bg-[#09090f]/95 p-5 text-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] text-orange-300 uppercase">
              FAISAH ATELIER · E-COMMERCE
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-white">
              {step === "checkout"
                ? "Checkout & Delivery"
                : step === "success"
                ? "Order Confirmation"
                : `Shopping Bag (${totalQty})`}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-zinc-200 hover:border-orange-400/60 hover:text-orange-300"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="my-4 flex-1 space-y-3 overflow-y-auto pr-1">
          {step === "success" && placedOrder ? (
            <div className="space-y-4 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4">
              <div className="text-center border-b border-white/10 pb-3">
                <p className="text-sm font-bold text-emerald-300">
                  ✓ آپ کا آرڈر کامیابی سے پلیس ہو گیا ہے!
                </p>
                <p className="mt-1 text-xs text-zinc-300">
                  Order ID:{" "}
                  <strong className="text-white">{placedOrder.orderId}</strong>
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-200">
                <p>
                  <span className="text-zinc-400">Customer:</span>{" "}
                  {placedOrder.customer.name} ({placedOrder.customer.phone})
                </p>
                <p>
                  <span className="text-zinc-400">Delivery:</span>{" "}
                  {placedOrder.customer.address}, {placedOrder.customer.city}
                </p>
                <p>
                  <span className="text-zinc-400">Payment:</span>{" "}
                  {placedOrder.customer.paymentMethod}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-3">
                {placedOrder.items.map((it, i) => (
                  <div
                    key={`${it.id || it.name}-${i}`}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-200 line-clamp-1">
                      {it.name} ({it.selectedSize || "Standard"}) ×{" "}
                      {it.quantity || 1}
                    </span>
                    <span className="font-semibold text-orange-300">
                      PKR{" "}
                      {(
                        Number(it.price || 0) * Number(it.quantity || 1)
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm font-bold">
                <span>Total Paid / Payable</span>
                <span className="text-orange-300">
                  PKR {Number(placedOrder.total || 0).toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep("cart");
                  setPlacedOrder(null);
                  onClose?.();
                }}
                className="w-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 py-2.5 text-xs font-bold text-white"
              >
                Continue Shopping
              </button>
            </div>
          ) : step === "checkout" ? (
            <form
              id="atelier-checkout-form"
              onSubmit={handleConfirmOrder}
              className="space-y-3"
            >
              {errorMsg && (
                <div className="rounded-xl border border-rose-400/40 bg-rose-500/15 px-3 py-2 text-xs text-rose-200">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-orange-400/70"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  placeholder="03XX-XXXXXXX"
                  className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-orange-400/70"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) =>
                      setCustomer({ ...customer, city: e.target.value })
                    }
                    placeholder="City"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-orange-400/70"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={customer.paymentMethod}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/15 bg-[#12121b] px-3 py-2 text-xs text-white outline-none focus:border-orange-400/70"
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Card Payment">Card Payment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  rows={3}
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  placeholder="House/Street, Area, Landmark..."
                  className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-orange-400/70"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep("cart")}
                className="text-xs font-medium text-sky-300 hover:underline"
              >
                ← Back to Bag Items
              </button>
            </form>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-sm font-semibold text-zinc-200">
                Your bag is currently empty
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Add items from the catalog to place an order.
              </p>
            </div>
          ) : (
            items.map((item, idx) => {
              const key = `${item.id || item.name}-${item.selectedSize || "std"}-${idx}`;
              const qty = Number(item.quantity || 1);
              const price = Number(item.price || 0);

              return (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111119]/90 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-14 shrink-0 rounded-xl object-cover bg-zinc-900"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xs sm:text-sm font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      {item.category || "Atelier"}
                      {item.selectedSize ? ` · Size: ${item.selectedSize}` : ""}
                    </p>
                    <p className="mt-1 text-xs font-bold text-orange-300">
                      PKR {(price * qty).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center rounded-full border border-white/15 bg-white/[0.05]">
                      <button
                        type="button"
                        onClick={() => onUpdateQty?.(idx, qty - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-zinc-200 hover:text-orange-300"
                      >
                        −
                      </button>
                      <span className="px-2 text-xs font-semibold">{qty}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty?.(idx, qty + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-zinc-200 hover:text-orange-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem?.(idx)}
                      className="text-[10px] text-rose-300 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Order Action */}
        {step !== "success" && items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Items Subtotal</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Delivery Charges</span>
              <span>PKR {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-sm font-bold">
              <span className="text-white">Total Payable</span>
              <span className="text-base text-orange-300">
                PKR {grandTotal.toLocaleString()}
              </span>
            </div>

            {step === "cart" ? (
              <button
                type="button"
                onClick={() => setStep("checkout")}
                data-cursor="interactive"
                className="w-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:brightness-110"
              >
                Proceed to Order · PKR {grandTotal.toLocaleString()}
              </button>
            ) : (
              <button
                type="submit"
                form="atelier-checkout-form"
                data-cursor="interactive"
                className="w-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:brightness-110"
              >
                Place Order Now · PKR {grandTotal.toLocaleString()}
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}