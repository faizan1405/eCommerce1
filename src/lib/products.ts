export const WHATSAPP_NUMBER = "919353203570";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  color: string;       // hex for 3D tint
  accent: string;      // secondary hex
  shape: "tee" | "hoodie" | "jacket" | "cargo" | "sneaker" | "denim" | "accessory";
  tagline: string;
};

export const CATEGORIES = [
  "Oversized Tees",
  "Vintage Tees",
  "Hoodies",
  "Cargo Pants",
  "Denim",
  "Jackets",
  "Sneakers",
  "Accessories",
] as const;

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Phantom Oversized Tee",  category: "Oversized Tees", price: 1499, sizes: ["S","M","L","XL"], color: "#A855F7", accent: "#EC4899", shape: "tee",      tagline: "Drapes like silk, hits like thunder." },
  { id: "p2", name: "Static Vintage Tee",     category: "Vintage Tees",   price: 1299, sizes: ["S","M","L"],      color: "#3B82F6", accent: "#A855F7", shape: "tee",      tagline: "1994 print. 2026 attitude." },
  { id: "p3", name: "Nebula Hoodie",          category: "Hoodies",        price: 2899, sizes: ["M","L","XL"],     color: "#EC4899", accent: "#A855F7", shape: "hoodie",   tagline: "Heavyweight cotton. Cosmic finish." },
  { id: "p4", name: "Voltage Cargo",          category: "Cargo Pants",    price: 2499, sizes: ["28","30","32","34"], color: "#10B981", accent: "#3B82F6", shape: "cargo", tagline: "Eight pockets. Zero compromise." },
  { id: "p5", name: "Acid Wash Denim",        category: "Denim",          price: 2799, sizes: ["28","30","32","34"], color: "#60A5FA", accent: "#E5E7EB", shape: "denim", tagline: "Faded by time. Sharpened by us." },
  { id: "p6", name: "Onyx Bomber Jacket",     category: "Jackets",        price: 4499, sizes: ["M","L","XL"],     color: "#1F2937", accent: "#A855F7", shape: "jacket",   tagline: "Bulletproof silhouette." },
  { id: "p7", name: "Hauz Sneaker 001",       category: "Sneakers",       price: 3999, sizes: ["7","8","9","10","11"], color: "#E5E7EB", accent: "#EC4899", shape: "sneaker", tagline: "Cloud sole. Asphalt soul." },
  { id: "p8", name: "Chrome Chain Bag",       category: "Accessories",    price: 1899, sizes: ["One Size"],       color: "#9CA3AF", accent: "#3B82F6", shape: "accessory", tagline: "Liquid metal. Carry the future." },
];

export function buildWhatsAppLink(product: Product, size: string) {
  const url = typeof window !== "undefined" ? window.location.href : "https://thrifthauz.app";
  const msg = `Hello Thrift Hauz,\n\nI would like to order:\n\n${product.name}\n\nPrice:\n₹${product.price}\n\nSize:\n${size}\n\nProduct Link:\n${url}\n\nPlease assist me with ordering.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
