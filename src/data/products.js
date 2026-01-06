// Mock product data for the vape store
export const products = [
  {
    id: 1,
    name: "PUFFCO PEAK PRO 3DXL",
    category: "devices",
    price: 419.99,
    salePrice: null,
    image: "/images/peak-pro.jpg",
    badge: "hot",
    description: "The ultimate smart rig with 3D chamber technology for unmatched flavor and vapor production.",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "STORZ & BICKEL VOLCANO HYBRID",
    category: "devices",
    price: 699.99,
    salePrice: 599.99,
    image: "/images/volcano.jpg",
    badge: "sale",
    description: "Legendary German engineering, now with app control and hybrid heating.",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "PAX PLUS VAPORIZER",
    category: "devices",
    price: 249.99,
    salePrice: null,
    image: "/images/pax-plus.jpg",
    badge: "new",
    description: "Premium portable vaporizer with dual-use capability and precision temperature control.",
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "DR. DABBER SWITCH",
    category: "devices",
    price: 399.99,
    salePrice: 349.99,
    image: "/images/dr-dabber.jpg",
    badge: "sale",
    description: "Induction heating technology for consistent, flavorful sessions every time.",
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: "GLASS RECYCLER ATTACHMENT",
    category: "accessories",
    price: 149.99,
    salePrice: null,
    image: "/images/recycler.jpg",
    badge: null,
    description: "Premium borosilicate glass recycler for smoother, cooler vapor.",
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: "PUFFCO HOT KNIFE",
    category: "accessories",
    price: 49.99,
    salePrice: 39.99,
    image: "/images/hot-knife.jpg",
    badge: "sale",
    description: "Heated loading tool for mess-free concentrate handling.",
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: "PREMIUM QUARTZ BANGER",
    category: "accessories",
    price: 39.99,
    salePrice: null,
    image: "/images/quartz-banger.jpg",
    badge: null,
    description: "Crystal clear quartz for pure, clean flavor profiles.",
    inStock: true,
    featured: false
  },
  {
    id: 8,
    name: "TITANIUM NAIL SET",
    category: "accessories",
    price: 29.99,
    salePrice: 24.99,
    image: "/images/titanium-nail.jpg",
    badge: "sale",
    description: "Durable titanium nail with carb cap for optimal vaporization.",
    inStock: true,
    featured: false
  },
  {
    id: 9,
    name: "TERP PEARL SET",
    category: "accessories",
    price: 19.99,
    salePrice: null,
    image: "/images/terp-pearls.jpg",
    badge: "new",
    description: "Ruby terp pearls for enhanced heat distribution and flavor.",
    inStock: true,
    featured: true
  },
  {
    id: 10,
    name: "MIGHTY+ VAPORIZER",
    category: "devices",
    price: 349.99,
    salePrice: null,
    image: "/images/mighty-plus.jpg",
    badge: null,
    description: "Industry-leading portable vaporizer with USB-C fast charging.",
    inStock: true,
    featured: true
  },
  {
    id: 11,
    name: "LOOKAH SEAHORSE PRO PLUS",
    category: "devices",
    price: 59.99,
    salePrice: 49.99,
    image: "/images/seahorse.jpg",
    badge: "sale",
    description: "Versatile electric nectar collector with quartz tip technology.",
    inStock: true,
    featured: false
  },
  {
    id: 12,
    name: "CARTA 2 BY FOCUS V",
    category: "devices",
    price: 249.99,
    salePrice: null,
    image: "/images/carta2.jpg",
    badge: "hot",
    description: "Smart e-rig with wireless charging and app connectivity.",
    inStock: true,
    featured: true
  },
  {
    id: 13,
    name: "SILICON DOCKING STATION",
    category: "accessories",
    price: 34.99,
    salePrice: null,
    image: "/images/dock.jpg",
    badge: null,
    description: "Premium silicone stand for your vaporizer with tool holders.",
    inStock: true,
    featured: false
  },
  {
    id: 14,
    name: "CLEANING KIT DELUXE",
    category: "accessories",
    price: 24.99,
    salePrice: 19.99,
    image: "/images/cleaning-kit.jpg",
    badge: "sale",
    description: "Everything you need to keep your devices pristine.",
    inStock: true,
    featured: false
  },
  {
    id: 15,
    name: "GLASS BUBBLE CAP",
    category: "accessories",
    price: 29.99,
    salePrice: null,
    image: "/images/bubble-cap.jpg",
    badge: "new",
    description: "Artisan glass directional carb cap for perfect airflow.",
    inStock: true,
    featured: true
  },
  {
    id: 16,
    name: "PROXY BY PUFFCO",
    category: "devices",
    price: 299.99,
    salePrice: null,
    image: "/images/proxy.jpg",
    badge: "new",
    description: "Modular vaporizer system with interchangeable glass pipes.",
    inStock: true,
    featured: true
  }
];

export const categories = [
  { id: "all", name: "All Products", icon: "grid" },
  { id: "devices", name: "Devices", icon: "zap" },
  { id: "accessories", name: "Accessories", icon: "settings" },
  { id: "sale", name: "On Sale", icon: "tag" }
];

export const featuredCollections = [
  {
    id: 1,
    title: "Premium Devices",
    description: "Top-tier vaporizers for the discerning connoisseur",
    image: "/images/collection-devices.jpg",
    link: "/products?category=devices"
  },
  {
    id: 2,
    title: "Accessories",
    description: "Elevate your experience with premium add-ons",
    image: "/images/collection-accessories.jpg",
    link: "/products?category=accessories"
  }
];
