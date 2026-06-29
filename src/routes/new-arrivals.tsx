import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/experience/ProductCard";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Thrift Hauz" },
      { name: "description", content: "Latest dark streetwear arrivals. Heavyweight hoodies, oversized tees, baggy cargos, chunky sneakers. Born Symbiote." },
      { property: "og:title", content: "New Arrivals — Thrift Hauz" },
      { property: "og:description", content: "Latest dark streetwear arrivals from Bangalore." },
    ],
  }),
  component: NewArrivalsPage,
});

type Sort = "newest" | "priceAsc" | "priceDesc";

function NewArrivalsPage() {
  const [cat, setCat] = useState<Category | "ALL">("ALL");
  const [sort, setSort] = useState<Sort>("newest");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    let list = PRODUCTS;
    if (cat !== "ALL") list = list.filter((p) => p.category === cat);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    list = [...list];
    if (sort === "priceAsc")  list.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sort, q]);

  return (
    <main className="bg-black text-white pt-32">
      <section className="px-5 md:px-10 pb-10">
        <div className="text-[10px] tracking-[0.45em] uppercase text-[#FF003C] mb-4">/ The Drop</div>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">NEW<br /><span className="text-blood">ARRIVALS</span></h1>
        <p className="mt-6 max-w-xl text-white/65">Fresh blood. 50+ pieces from the latest Symbiote wave. Filter, sort, lock it in via WhatsApp.</p>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-20 bg-black/80 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="px-5 md:px-10 flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-sm w-48 outline-none focus:border-[#FF003C]/60"
          />
          <div className="flex flex-wrap gap-2">
            {(["ALL", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-md border transition ${
                  cat === c
                    ? "border-[#FF003C] bg-[#FF003C]/15 text-white"
                    : "border-white/10 text-white/55 hover:border-white/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="ml-auto bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs tracking-wider uppercase outline-none"
          >
            <option value="newest">Newest</option>
            <option value="priceAsc">Price ↑</option>
            <option value="priceDesc">Price ↓</option>
          </select>
        </div>
      </section>

      <section className="px-5 md:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        {items.length === 0 && (
          <div className="py-32 text-center text-white/50">No pieces match. Try another filter.</div>
        )}
      </section>
    </main>
  );
}
