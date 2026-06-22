export const WHATSAPP_NUMBER = "919353203570";
export const INSTAGRAM_URL = "https://www.instagram.com/thrifthauz.blr";
export const CONTACT_EMAIL = "hello@thrifthauz.com";
export const CONTACT_PHONE = "+91 93532 03570";

export type Category =
  | "Oversized T-Shirts"
  | "Vintage Tees"
  | "Hoodies"
  | "Sweatshirts"
  | "Cargo Pants"
  | "Baggy Jeans"
  | "Denim"
  | "Jackets"
  | "Sneakers"
  | "Accessories";

export const CATEGORIES: Category[] = [
  "Oversized T-Shirts",
  "Vintage Tees",
  "Hoodies",
  "Sweatshirts",
  "Cargo Pants",
  "Baggy Jeans",
  "Denim",
  "Jackets",
  "Sneakers",
  "Accessories",
];

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  sizes: string[];
  badge?: "NEW" | "TRENDING" | "BESTSELLER" | "LIMITED" | "DROP";
  tagline: string;
};

const sizesApparel = ["S", "M", "L", "XL"];
const sizesBottom = ["28", "30", "32", "34", "36"];
const sizesShoe = ["7", "8", "9", "10", "11"];
const one = ["One Size"];

export const PRODUCTS: Product[] = [
  // Oversized T-Shirts (7)
  { id: "p1",  name: "Phantom Oversized Tee",      category: "Oversized T-Shirts", price: 1499, originalPrice: 2199, sizes: sizesApparel, badge: "BESTSELLER", tagline: "Heavyweight cotton. Drop-shoulder cut." },
  { id: "p2",  name: "Void Boxy Tee",              category: "Oversized T-Shirts", price: 1399, sizes: sizesApparel, badge: "NEW",        tagline: "Boxy fit. Washed black." },
  { id: "p3",  name: "Symbiote Drop Tee",          category: "Oversized T-Shirts", price: 1599, sizes: sizesApparel, badge: "TRENDING",   tagline: "Liquid graphic print." },
  { id: "p4",  name: "Onyx Heavyweight Tee",       category: "Oversized T-Shirts", price: 1499, sizes: sizesApparel,                      tagline: "240 GSM. Built to last." },
  { id: "p5",  name: "Crimson Skull Tee",          category: "Oversized T-Shirts", price: 1699, sizes: sizesApparel, badge: "LIMITED",    tagline: "Hand-bleached. Skull motif." },
  { id: "p6",  name: "Static Noise Tee",           category: "Oversized T-Shirts", price: 1499, sizes: sizesApparel,                      tagline: "All-over noise print." },
  { id: "p7",  name: "Anti-Hero Long Tee",         category: "Oversized T-Shirts", price: 1599, sizes: sizesApparel, badge: "NEW",        tagline: "Extended hem. Razor cut." },

  // Vintage Tees (5)
  { id: "p8",  name: "1994 Faded Tee",             category: "Vintage Tees", price: 1299, sizes: sizesApparel, badge: "TRENDING", tagline: "Sun-faded vintage wash." },
  { id: "p9",  name: "Bootleg Rap Tee",            category: "Vintage Tees", price: 1599, sizes: sizesApparel, badge: "DROP",     tagline: "90s bootleg revival." },
  { id: "p10", name: "Distressed Tour Tee",        category: "Vintage Tees", price: 1499, sizes: sizesApparel,                    tagline: "Hand-distressed. One-of-one." },
  { id: "p11", name: "Acid Wash Vintage",          category: "Vintage Tees", price: 1399, sizes: sizesApparel,                    tagline: "Acid wash. Soft hand-feel." },
  { id: "p12", name: "Garage Print Tee",           category: "Vintage Tees", price: 1299, sizes: sizesApparel, badge: "NEW",      tagline: "Underground print." },

  // Hoodies (8)
  { id: "p13", name: "Nebula Heavyweight Hoodie",  category: "Hoodies", price: 2899, originalPrice: 3499, sizes: sizesApparel, badge: "BESTSELLER", tagline: "500 GSM. Boxed silhouette." },
  { id: "p14", name: "Venom Pullover",             category: "Hoodies", price: 3199, sizes: sizesApparel, badge: "LIMITED",   tagline: "Liquid black coating." },
  { id: "p15", name: "Shadow Zip Hoodie",          category: "Hoodies", price: 3299, sizes: sizesApparel,                     tagline: "Full-zip. Tonal trim." },
  { id: "p16", name: "Cropped Boxy Hoodie",        category: "Hoodies", price: 2699, sizes: sizesApparel, badge: "NEW",       tagline: "Cropped. Heavy weight." },
  { id: "p17", name: "Blood Moon Hoodie",          category: "Hoodies", price: 2999, sizes: sizesApparel, badge: "DROP",      tagline: "Tonal moon embroidery." },
  { id: "p18", name: "Reaper Oversized Hoodie",    category: "Hoodies", price: 2899, sizes: sizesApparel,                     tagline: "Drop shoulder. Heavy hood." },
  { id: "p19", name: "Carbon Tech Hoodie",         category: "Hoodies", price: 3499, sizes: sizesApparel, badge: "TRENDING",  tagline: "Technical weave. Matte black." },
  { id: "p20", name: "Asylum Faded Hoodie",        category: "Hoodies", price: 2799, sizes: sizesApparel,                     tagline: "Washed black. Distressed." },

  // Sweatshirts (4)
  { id: "p21", name: "Foundry Crewneck",           category: "Sweatshirts", price: 2499, sizes: sizesApparel,                  tagline: "Heavyweight crew. Boxy." },
  { id: "p22", name: "Riot Crew",                  category: "Sweatshirts", price: 2399, sizes: sizesApparel, badge: "NEW",    tagline: "Loopback fleece interior." },
  { id: "p23", name: "Concrete Crewneck",          category: "Sweatshirts", price: 2599, sizes: sizesApparel,                  tagline: "Garment-dyed grey-black." },
  { id: "p24", name: "Smoke Mock-Neck Sweat",      category: "Sweatshirts", price: 2799, sizes: sizesApparel, badge: "LIMITED",tagline: "Mock neck. Heavy gauge." },

  // Cargo Pants (5)
  { id: "p25", name: "Voltage Cargo",              category: "Cargo Pants", price: 2499, sizes: sizesBottom, badge: "BESTSELLER", tagline: "8 utility pockets." },
  { id: "p26", name: "Tactical Wide Cargo",        category: "Cargo Pants", price: 2899, sizes: sizesBottom,                      tagline: "Wide leg. Drawcord hem." },
  { id: "p27", name: "Combat Black Cargo",         category: "Cargo Pants", price: 2699, sizes: sizesBottom, badge: "TRENDING",   tagline: "Ripstop combat fabric." },
  { id: "p28", name: "Stealth Parachute Pant",     category: "Cargo Pants", price: 3199, sizes: sizesBottom, badge: "DROP",       tagline: "Parachute silhouette." },
  { id: "p29", name: "Utility Cargo Short",        category: "Cargo Pants", price: 1899, sizes: sizesBottom, badge: "NEW",        tagline: "Mid-thigh cargo short." },

  // Baggy Jeans (4)
  { id: "p30", name: "Wraith Baggy Jeans",         category: "Baggy Jeans", price: 2799, sizes: sizesBottom, badge: "TRENDING", tagline: "Super-baggy 24'' leg." },
  { id: "p31", name: "Asphalt Wide Jean",          category: "Baggy Jeans", price: 2899, sizes: sizesBottom,                    tagline: "Wide-leg raw selvedge." },
  { id: "p32", name: "Distressed Baggy Denim",     category: "Baggy Jeans", price: 2999, sizes: sizesBottom, badge: "NEW",      tagline: "Hand-distressed knees." },
  { id: "p33", name: "Carpenter Baggy",            category: "Baggy Jeans", price: 2699, sizes: sizesBottom,                    tagline: "Carpenter cut. Loose fit." },

  // Denim (3)
  { id: "p34", name: "Acid Wash Denim",            category: "Denim", price: 2799, sizes: sizesBottom,                    tagline: "Faded by time. Sharpened by us." },
  { id: "p35", name: "Indigo Raw Denim",           category: "Denim", price: 3299, sizes: sizesBottom, badge: "LIMITED",  tagline: "Raw selvedge. Heavy weight." },
  { id: "p36", name: "Black On Black Jean",        category: "Denim", price: 2599, sizes: sizesBottom, badge: "BESTSELLER", tagline: "Triple black coated denim." },

  // Jackets (5)
  { id: "p37", name: "Onyx Bomber Jacket",         category: "Jackets", price: 4499, originalPrice: 5499, sizes: sizesApparel, badge: "BESTSELLER", tagline: "Bulletproof silhouette." },
  { id: "p38", name: "Symbiote Trench Coat",       category: "Jackets", price: 6999, sizes: sizesApparel, badge: "LIMITED",   tagline: "Liquid coated cotton." },
  { id: "p39", name: "Combat Tactical Jacket",     category: "Jackets", price: 5299, sizes: sizesApparel, badge: "DROP",      tagline: "Multi-pocket combat shell." },
  { id: "p40", name: "Carbon Puffer",              category: "Jackets", price: 5899, sizes: sizesApparel, badge: "TRENDING",  tagline: "Matte tech puffer." },
  { id: "p41", name: "Denim Trucker — Black",      category: "Jackets", price: 3899, sizes: sizesApparel,                     tagline: "Heavyweight black denim trucker." },

  // Sneakers (6)
  { id: "p42", name: "Hauz Sneaker 001",           category: "Sneakers", price: 3999, sizes: sizesShoe, badge: "BESTSELLER", tagline: "Cloud sole. Asphalt soul." },
  { id: "p43", name: "Chunky Triple Black",        category: "Sneakers", price: 4499, sizes: sizesShoe, badge: "TRENDING",   tagline: "Triple black chunky sole." },
  { id: "p44", name: "Combat High-Top",            category: "Sneakers", price: 4799, sizes: sizesShoe,                      tagline: "High-top combat boot sneaker." },
  { id: "p45", name: "Stealth Runner",             category: "Sneakers", price: 4299, sizes: sizesShoe, badge: "NEW",        tagline: "Matte tech runner." },
  { id: "p46", name: "Distorted Trainer",          category: "Sneakers", price: 4999, sizes: sizesShoe, badge: "DROP",       tagline: "Distressed luxury trainer." },
  { id: "p47", name: "Reaper Boot Sneaker",        category: "Sneakers", price: 5299, sizes: sizesShoe, badge: "LIMITED",    tagline: "Boot-meets-sneaker hybrid." },

  // Accessories (3)
  { id: "p48", name: "Chrome Chain Bag",           category: "Accessories", price: 1899, sizes: one, badge: "TRENDING", tagline: "Liquid metal cross-body." },
  { id: "p49", name: "Tactical Sling Bag",         category: "Accessories", price: 2199, sizes: one,                    tagline: "Multi-strap tactical sling." },
  { id: "p50", name: "Symbiote Cap",               category: "Accessories", price:  899, sizes: one, badge: "NEW",      tagline: "Embroidered tonal cap." },
];

export function productImage(id: string) {
  return `/products/${id}.jpg`;
}

export function buildWhatsAppLink(product: Product, size: string) {
  const url = typeof window !== "undefined" ? window.location.href : "https://thrifthauz.app";
  const msg = `Hello Thrift Hauz,\n\nI would like to order:\n\n${product.name}\n\nPrice:\n₹${product.price}\n\nSize:\n${size}\n\nProduct Link:\n${url}\n\nPlease assist me with ordering.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function whatsAppGeneral(message = "Hello Thrift Hauz, I'd like to know more about your collection.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const byCategory = (c: Category) => PRODUCTS.filter((p) => p.category === c);
export const newArrivals = () => PRODUCTS.filter((p) => p.badge === "NEW").concat(PRODUCTS.slice(0, 8)).slice(0, 12);
export const trending = () => PRODUCTS.filter((p) => p.badge === "TRENDING" || p.badge === "BESTSELLER").slice(0, 8);
export const bestSellers = () => PRODUCTS.filter((p) => p.badge === "BESTSELLER").concat(PRODUCTS.slice(10, 18)).slice(0, 8);
export const limitedDrops = () => PRODUCTS.filter((p) => p.badge === "LIMITED" || p.badge === "DROP").slice(0, 8);
