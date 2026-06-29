import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, byCategory, productImage, type Category } from "@/lib/products";
import { ProductCard } from "@/components/experience/ProductCard";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Thrift Hauz" },
      { name: "description", content: "Shop hoodies, tees, cargos, denim, jackets, sneakers and more. Dark streetwear from Bangalore." },
      { property: "og:title", content: "Categories — Thrift Hauz" },
      { property: "og:description", content: "Browse every category of dark luxury streetwear." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const list = byCategory(active);
  const cover = list[0];

  return (
    <main className="bg-black text-white pt-28">
      <section className="px-5 md:px-10">
        <div className="text-[10px] tracking-[0.45em] uppercase text-[#FF003C] mb-4">/ The Wardrobe</div>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">SHOP BY<br /><span className="text-blood">CATEGORY</span></h1>
      </section>

      {/* Tabs */}
      <section className="px-5 md:px-10 mt-10 mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-[11px] tracking-[0.3em] uppercase px-4 py-2 rounded-lg border transition whitespace-nowrap ${
                active === c
                  ? "border-[#FF003C] bg-gradient-to-r from-[#7A0000] to-[#FF003C] text-white"
                  : "border-white/10 text-white/65 hover:border-white/30 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Cover banner */}
      <section className="px-5 md:px-10 mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[42vh] md:h-[55vh] rounded-3xl overflow-hidden border border-white/10"
          >
            {cover && (
              <img src={productImage(cover.id)} alt={active} className="absolute inset-0 h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-end p-8 md:p-14">
              <div>
                <div className="text-[11px] tracking-[0.45em] uppercase text-[#FF003C] mb-3">/ Collection</div>
                <h2 className="font-display text-5xl md:text-7xl leading-none">{active}</h2>
                <div className="mt-2 text-white/60 text-sm">{list.length} pieces in stock</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="px-5 md:px-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
