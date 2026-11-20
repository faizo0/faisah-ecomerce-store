import React, { useEffect, useState } from "react";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}) {
  const sizes = Array.isArray(product?.sizes) && product.sizes.length > 0
    ? product.sizes
    : ["Standard"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const nextSizes =
      Array.isArray(product?.sizes) && product.sizes.length > 0
        ? product.sizes
        : ["Standard"];
    setSelectedSize(nextSizes[0]);
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  const title = product.name || product.title || "Atelier Piece";
  const unitPrice = Number(product.price) || 7500;
  const totalPrice = unitPrice * quantity;

  const handleConfirmAdd = () => {
    onAddToCart?.({
      ...product,
      id: product.id || title,
      name: title,
      price: unitPrice,
      selectedSize,
      quantity,
    });
    onClose?.();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3.5 sm:p-6 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-3xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border border-white/15 bg-[#0b0b11]/95 text-white shadow-[0_24px_70px_rgba(0,0,0,0.75)]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-xs font-bold text-zinc-200 transition hover:border-orange-400/70 hover:text-orange-300"
        >
          ✕
        </button>

        {/* Product Image */}
        <div className="aspect-square md:aspect-auto md:min-h-[380px] w-full overflow-hidden bg-zinc-900">
          <img
            src={product.image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-orange-300 uppercase">
              {product.category || "Atelier"}
              {product.subCategory ? ` · ${product.subCategory}` : ""}
            </p>

            <h2 className="mt-1.5 text-xl sm:text-2xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-300 via-pink-300 to-sky-300 bg-clip-text text-transparent">
              PKR {unitPrice.toLocaleString()}
            </p>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-300/90">
              {product.description ||
                "Crafted for FAISAH ATELIER with refined finishing, balanced proportions, and luxury everyday wearability."}
            </p>

            {/* Size / Variant Selector */}
            <div className="mt-5">
              <span className="block text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                Select Size / Option
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizes.map((sz) => {
                  const active = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        active
                          ? "bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 text-white"
                          : "border border-white/15 bg-white/[0.05] text-zinc-300 hover:border-orange-400/50"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                Quantity
              </span>
              <div className="flex items-center rounded-full border border-white/15 bg-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-xs font-bold text-zinc-200 hover:text-orange-300"
                >
                  −
                </button>
                <span className="px-2.5 text-xs font-semibold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-xs font-bold text-zinc-200 hover:text-orange-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Bag CTA */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={handleConfirmAdd}
              data-cursor="interactive"
              className="w-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_10px_28px_rgba(249,115,22,0.35)] transition hover:brightness-110"
            >
              Add to Bag · PKR {totalPrice.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}