export const ATELIER_CATEGORIES = [
  {
    id: "mens",
    name: "Men's",
    subtitle: "Tailored Shirts, Trousers, Jackets & Luxury Watches",
    subCategories: [
      "Formal Shirts",
      "Trousers",
      "Jackets",
      "Luxury Watches",
    ],
  },
  {
    id: "womens",
    name: "Women's",
    subtitle: "Embroidered Lady Suits, Silk & Evening Wear",
    subCategories: [
      "Embroidered Suits",
      "Silk Collections",
      "Festive Wear",
    ],
  },
  {
    id: "footwear",
    name: "Footwear",
    subtitle: "Handcrafted Leather Shoes, Loafers & Heels",
    subCategories: [
      "Leather Shoes",
      "Loafers",
      "Formal Heels",
    ],
  },
  {
    id: "bags",
    name: "Bags",
    subtitle: "Structured Handbags, Totes & Crossbody",
    subCategoryListNote: "",
    subCategories: [
      "Structured Bags",
      "Tote Bags",
      "Crossbody Bags",
    ],
  },
  {
    id: "makeup",
    name: "Makeup",
    subtitle: "Ladies Makeup Palettes, Foundations & Beauty Sets",
    subCategories: [
      "Makeup Palettes",
      "Foundations & Glow",
      "Beauty Sets",
    ],
  },
];

// Total: 5 Main Categories & 16 Sub-Categories (4 + 3 + 3 + 3 + 3 = 16)
export const FASHION_PRODUCTS = [
  // MEN'S (4 Sub-Categories)
  {
    id: "fa-men-shirt-01",
    name: "Crisp Cotton Poplin Shirt",
    category: "Men's",
    subCategory: "Formal Shirts",
    price: 5800,
    sizes: ["S", "M", "L", "XL"],
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=800&q=80",
    description:
      "Tailored crisp shirt crafted from breathable fine cotton poplin with clean placket detailing for formal and evening occasions.",
  },
  {
    id: "fa-men-trouser-02",
    name: "Charcoal Tailored Trouser",
    category: "Men's",
    subCategory: "Trousers",
    price: 6400,
    sizes: ["30", "32", "34", "36"],
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    description:
      "Sharp structured trouser with a clean drape, comfortable waistband finish, and modern tailored silhouette.",
  },
  {
    id: "fa-men-jacket-03",
    name: "Emerald Editorial Jacket",
    category: "Men's",
    subCategory: "Jackets",
    price: 11500,
    sizes: ["S", "M", "L", "XL"],
    badge: "Limited Edit",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description:
      "Statement seasonal jacket designed with rich texture, refined hardware, and structured shoulders.",
  },
  {
    id: "fa-men-watch-04",
    name: "Sovereign Luxury Watch",
    category: "Men's",
    subCategory: "Luxury Watches",
    price: 16500,
    sizes: ["Standard"],
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description:
      "Precision luxury timepiece with a minimalist dial, durable casing, and timeless everyday elegance.",
  },

  // WOMEN'S (3 Sub-Categories)
  {
    id: "fa-women-suit-05",
    name: "Royal Embroidered Lady Suit",
    category: "Women's",
    subCategory: "Embroidered Suits",
    price: 14200,
    sizes: ["S", "M", "L", "XL"],
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description:
      "Graceful lady suit featuring intricate threadwork, rich fabric flow, and refined festive styling.",
  },
  {
    id: "fa-women-silk-06",
    name: "Lustre Silk Atelier Ensemble",
    category: "Women's",
    subCategory: "Silk Collections",
    price: 15800,
    sizes: ["S", "M", "L"],
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80",
    description:
      "Smooth natural sheen silk ensemble tailored for evening gatherings with effortless movement.",
  },
  {
    id: "fa-women-festive-07",
    name: "Velvet Evening Festive Drape",
    category: "Women's",
    subCategory: "Festive Wear",
    price: 17500,
    sizes: ["S", "M", "L", "XL"],
    badge: "Limited Edit",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    description:
      "Editorial festive silhouette crafted with rich tone depth and delicate finishing details.",
  },

  // FOOTWEAR (3 Sub-Categories)
  {
    id: "fa-foot-leather-08",
    name: "Cognac Full-Grain Leather Shoes",
    category: "Footwear",
    subCategory: "Leather Shoes",
    price: 9900,
    sizes: ["40", "41", "42", "43", "44"],
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
    description:
      "Hand-finished tan brown leather shoes with cushioned insole and stitched sole durability.",
  },
  {
    id: "fa-foot-loafer-09",
    name: "Suede Penny Loafer",
    category: "Footwear",
    subCategory: "Loafers",
    price: 8600,
    sizes: ["40", "41", "42", "43", "44"],
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
    description:
      "Slip-on refined loafer combining smart-casual comfort with clean architectural lines.",
  },
  {
    id: "fa-foot-heel-10",
    name: "Sculpted Evening Heel",
    category: "Footwear",
    subCategory: "Formal Heels",
    price: 9200,
    sizes: ["37", "38", "39", "40"],
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    description:
      "Poised formal heel engineered for balance, comfort, and upscale evening polish.",
  },

  // BAGS (3 Sub-Categories)
  {
    id: "fa-bag-struct-11",
    name: "Atelier Structured Top-Handle Bag",
    category: "Bags",
    subCategory: "Structured Bags",
    price: 8750,
    sizes: ["One Size"],
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    description:
      "Crisp structured bag with clean gussets, polished clasp detail, and organized interior space.",
  },
  {
    id: "fa-bag-tote-12",
    name: "Everyday Executive Tote",
    category: "Bags",
    subCategory: "Tote Bags",
    price: 7900,
    sizes: ["One Size"],
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    description:
      "Spacious tote crafted for daily essentials, workdays, and seamless travel transitions.",
  },
  {
    id: "fa-bag-cross-13",
    name: "Compact Quilted Crossbody",
    category: "Bags",
    subCategory: "Crossbody Bags",
    price: 6800,
    sizes: ["One Size"],
    badge: "Limited Edit",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    description:
      "Hands-free crossbody bag featuring adjustable strap length and refined compact proportions.",
  },

  // MAKEUP (3 Sub-Categories)
  {
    id: "fa-make-palette-14",
    name: "Velvet Rose Ladies Makeup Palette",
    category: "Makeup",
    subCategory: "Makeup Palettes",
    price: 4500,
    sizes: ["Standard"],
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    description:
      "Curated ladies makeup collection with blendable shades, silky pigments, and travel-ready compact.",
  },
  {
    id: "fa-make-glow-15",
    name: "Luminous Satin Foundation & Glow",
    category: "Makeup",
    subCategory: "Foundations & Glow",
    price: 3900,
    sizes: ["30ml"],
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    description:
      "Lightweight buildable base designed for a natural radiant finish without feeling heavy.",
  },
  {
    id: "fa-make-set-16",
    name: "Complete Bridal & Party Beauty Set",
    category: "Makeup",
    subCategory: "Beauty Sets",
    price: 7400,
    sizes: ["Gift Box"],
    badge: "Signature",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    description:
      "All-in-one ladies makeup gift set combining everyday essentials and evening glam finishes.",
  },
];