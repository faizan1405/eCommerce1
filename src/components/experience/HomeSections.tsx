import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  PRODUCTS,
  CATEGORIES,
  byCategory,
  bestSellers,
  limitedDrops,
  trending,
  newArrivals,
  productImage,
} from "@/lib/products";
import { ProductCard } from "./ProductCard";

/* ───────────────── shared headers ───────────────── */
function SectionHeader({
  eyebrow,
  title,
  accent,
  cta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: string;
  cta?: { to: string; label: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <div className="flex items-center gap-3 text-[10px] tracking-[0.45em] uppercase text-[#FF003C] mb-4">
          <span className="h-px w-8 bg-[#FF003C]" />
          {eyebrow}
        </div>
        <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-[-0.01em]">
          {title}
          {accent && <span className="block text-blood">{accent}</span>}
        </h2>
      </div>
      {cta && (
        <Link
          to={cta.to as "/new-arrivals"}
          className="self-start md:self-end inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-white/15 text-[11px] tracking-[0.35em] uppercase hover:border-[#FF003C] hover:text-[#FF003C] transition"
        >
          {cta.label} →
        </Link>
      )}
    </div>
  );
}

/* ───────────────── New Arrivals ───────────────── */
export function NewArrivalsSection() {
  const items = newArrivals().slice(0, 8);
  return (
    <section id="new" className="relative z-10 px-5 md:px-10 py-28">
      <SectionHeader
        eyebrow="/ Just Dropped"
        title="NEW"
        accent="ARRIVALS"
        cta={{ to: "/new-arrivals", label: "VIEW ALL" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────── Trending ───────────────── */
export function TrendingSection() {
  const items = trending();
  return (
    <section className="relative z-10 px-5 md:px-10 py-24">
      <SectionHeader
        eyebrow="/ This Week"
        title="TRENDING"
        accent="IN THE HAUZ"
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────── Best Sellers strip ───────────────── */
export function BestSellersSection() {
  const items = bestSellers();
  return (
    <section className="relative z-10 px-5 md:px-10 py-24">
      <SectionHeader eyebrow="/ Repeat Offenders" title="BEST" accent="SELLERS" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────── Limited Drops ───────────────── */
export function LimitedDropsSection() {
  const items = limitedDrops();
  return (
    <section className="relative z-10 px-5 md:px-10 py-28">
      <div
        className="relative rounded-3xl overflow-hidden border border-[#FF003C]/20 p-8 md:p-14"
        style={{
          background:
            "radial-gradient(60% 80% at 80% 20%, rgba(255,0,60,0.18), transparent 70%), linear-gradient(180deg, #0a0a0a, #050505)",
        }}
      >
        <SectionHeader
          eyebrow="/ Limited · Numbered · Gone"
          title="LIMITED"
          accent="DROPS"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Featured Collection (editorial) ───────────────── */
export function FeaturedCollection() {
  const featured = PRODUCTS.find((p) => p.id === "p14") ?? PRODUCTS[0];
  return (
    <section className="relative z-10 px-5 md:px-10 py-28">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10"
        >
          <img src={productImage(featured.id)} alt={featured.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-[10px] tracking-[0.4em] text-[#FF003C] mb-2">/ Featured</div>
            <h3 className="font-display text-3xl text-white">{featured.name}</h3>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[10px] tracking-[0.45em] uppercase text-[#FF003C] mb-4">
            / Editor's Cut
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] mb-6">
            THE VENOM<br /><span className="text-blood">CAPSULE</span>
          </h2>
          <p className="text-white/65 leading-relaxed max-w-md mb-8">
            A 14-piece capsule built from liquid black coatings, heavyweight cottons and
            blood-red accents. Each piece is individually numbered. When they're gone,
            they're gone.
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-lg border border-[#FF003C]/50 bg-gradient-to-r from-[#7A0000] to-[#FF003C] text-white font-display text-xs tracking-[0.4em] hover:shadow-blood transition"
          >
            EXPLORE THE CAPSULE →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────── Shop by Category ───────────────── */
export function ShopByCategory() {
  return (
    <section className="relative z-10 px-5 md:px-10 py-28">
      <SectionHeader eyebrow="/ Wardrobe" title="SHOP BY" accent="CATEGORY" cta={{ to: "/categories", label: "ALL CATEGORIES" }} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat, i) => {
          const sample = byCategory(cat)[0];
          if (!sample) return null;
          return (
            <Link
              to="/categories"
              key={cat}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 chrome-edge"
            >
              <img
                src={productImage(sample.id)}
                alt={cat}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:from-[#7A0000]/80 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="text-[9px] tracking-[0.35em] text-white/50 mb-1">/0{i + 1}</div>
                <div className="font-display text-base md:text-lg leading-tight text-white">{cat}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────── Runway Showcase (horizontal marquee) ───────────────── */
export function RunwaySection() {
  const ids = ["p14", "p17", "p38", "p37", "p13", "p25", "p43", "p3", "p40", "p47"];
  const items = ids.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
  const loop = [...items, ...items];
  return (
    <section className="relative z-10 py-28 overflow-hidden">
      <div className="px-5 md:px-10 mb-10">
        <SectionHeader eyebrow="/ Runway" title="THE RUNWAY" accent="SHOWCASE" />
      </div>
      <div className="relative">
        <div className="flex gap-5 animate-marquee w-max">
          {loop.map((p, i) => (
            <div
              key={i}
              className="relative w-[300px] md:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 flex-shrink-0"
            >
              <img src={productImage(p.id)} alt={p.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] tracking-[0.3em] text-[#FF003C] mb-1">{p.category}</div>
                <div className="font-display text-lg text-white leading-tight">{p.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Marquee text ───────────────── */
export function MarqueeText() {
  const items = ["LIMITED DROPS", "MADE IN BLR", "FREE SHIPPING", "WHATSAPP TO ORDER", "BORN SYMBIOTE", "HEAVYWEIGHT ONLY"];
  const loop = [...items, ...items, ...items];
  return (
    <section className="relative z-10 py-12 border-y border-white/5 overflow-hidden bg-black/40">
      <div className="flex gap-12 animate-marquee w-max font-display text-3xl md:text-5xl tracking-[0.15em] text-white/80">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-[#FF003C]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── Reviews ───────────────── */
const REVIEWS = [
  { name: "Aarav K.", city: "Mumbai", text: "The hoodie weight is insane. Heavier than anything Zara, Uniqlo, even H&M premium. Worth every rupee." },
  { name: "Sneha R.", city: "Bangalore", text: "Cargos drape PERFECTLY. The quality could rival Represent at 1/4th the price. Shipping was 2 days." },
  { name: "Karan S.", city: "Delhi", text: "Bought the Symbiote Trench. Compliments everywhere. Feels like I'm wearing armor." },
  { name: "Tanvi P.", city: "Hyderabad", text: "Best thrift store in India hands down. The WhatsApp ordering is so convenient." },
];

export function ReviewsSection() {
  return (
    <section className="relative z-10 px-5 md:px-10 py-28">
      <SectionHeader eyebrow="/ The Hauz Speaks" title="CULT" accent="LOVE" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {REVIEWS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-2xl p-6 glass border-white/5 chrome-edge"
          >
            <div className="text-[#FF003C] text-2xl mb-3">★★★★★</div>
            <p className="text-white/75 text-sm leading-relaxed mb-6">"{r.text}"</p>
            <div className="text-xs tracking-[0.2em] text-white/50 uppercase">
              {r.name} · {r.city}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── Instagram Feed ───────────────── */
export function InstagramFeed() {
  const ids = ["p1", "p13", "p25", "p37", "p42", "p38", "p3", "p17"];
  return (
    <section className="relative z-10 px-5 md:px-10 py-28">
      <SectionHeader
        eyebrow="/ @thrifthauz.blr"
        title="ON THE"
        accent="GRAM"
        cta={{ to: "/contact", label: "FOLLOW" }}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {ids.map((id, i) => {
          const p = PRODUCTS.find((x) => x.id === id)!;
          return (
            <a
              key={id}
              href="https://www.instagram.com/thrifthauz.blr"
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square overflow-hidden rounded-xl group border border-white/5"
              style={{ transform: i % 2 === 0 ? "translateY(0)" : "translateY(12px)" }}
            >
              <img src={productImage(p.id)} alt={p.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-[#7A0000]/60 transition-colors flex items-end p-3">
                <div className="text-[10px] tracking-[0.3em] text-white/0 group-hover:text-white transition">VIEW POST →</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
