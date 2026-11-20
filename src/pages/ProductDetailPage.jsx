import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Box, Check, ShoppingBag } from "lucide-react";
import { useDesignTheme } from "../context/DesignThemeContext";
import { FASHION_PRODUCTS } from "../data/fashionProducts";

export default function ProductDetailPage({ onAddToCart }) {
  const { slug } = useParams();
  const { theme } = useDesignTheme();

  const product =
    FASHION_PRODUCTS.find((item) => item.slug === slug) || FASHION_PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colors[0] || "");
    setSelectedSize(product.sizes[0] || "");
    setAddedNotice(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  const handleAdd = () => {
    onAddToCart?.({
      ...product,
      selectedColor,
      selectedSize,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/"
        className={`inline-flex items-center gap-2 text-xs sm:text-sm mb-8 hover:opacity-75 ${theme.mutedText}`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to FAISAH ATELIER</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Product Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`aspect-[4/5] overflow-hidden border ${theme.border} ${theme.surface}`}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-3">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-24 overflow-hidden border ${
                    selectedImage === imgUrl
                      ? "ring-2 ring-current"
                      : theme.border
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-xs uppercase tracking-widest ${theme.mutedText}`}
              >
                {product.mainCategory.replace(/-/g, " ")} /{" "}
                {product.subCategory.replace(/-/g, " ")}
              </span>
              {product.has3DLayer && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs border ${theme.border} ${theme.surface}`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Showcase</span>
                </span>
              )}
            </div>

            <h1 className={`text-3xl sm:text-4xl ${theme.headingFont}`}>
              {product.name}
            </h1>

            <p className="text-xl font-semibold pt-1">
              PKR {product.price.toLocaleString()}
            </p>
          </div>

          <p className={`text-sm leading-relaxed ${theme.mutedText}`}>
            {product.description}
          </p>

          <div
            className={`p-4 border text-xs space-y-1 ${theme.border} ${theme.surface}`}
          >
            <span className={`uppercase tracking-wider ${theme.mutedText}`}>
              Fabric & Craftsmanship
            </span>
            <p className="text-sm font-medium">{product.material}</p>
          </div>

          {/* Colors */}
          <div className="space-y-2.5">
            <span className="text-xs uppercase tracking-wider block">
              Select Shade
            </span>
            <div className="flex items-center gap-2.5">
              {product.colors.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setSelectedColor(hex)}
                  aria-label={`Color ${hex}`}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-transform ${
                    selectedColor === hex
                      ? "scale-110 ring-2 ring-offset-2 ring-current"
                      : "border-black/20"
                  }`}
                  style={{ backgroundColor: hex }}
                >
                  {selectedColor === hex && (
                    <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2.5">
            <span className="text-xs uppercase tracking-wider block">
              Select Size
            </span>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[46px] px-3.5 py-2 text-xs font-medium border transition-all ${
                    theme.border
                  } ${selectedSize === size ? theme.accent : theme.surface}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-3.5 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90 ${theme.accent}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {addedNotice
                  ? "Added to Bag"
                  : `Add to Bag — PKR ${product.price.toLocaleString()}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}