import { useState } from "react";
import { motion } from "framer-motion";
import { buildWhatsAppLink, productImage, type Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - r.top) / r.height - 0.5) * -10,
          y: ((e.clientX - r.left) / r.width - 0.5) * 10,
        });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl overflow-hidden bg-[#0F0F0F] border border-white/5 chrome-edge transition-shadow duration-500 hover:shadow-blood"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
        {/* Liquid symbiote backdrop layer that "births" the product */}
        <div
          className="absolute inset-0 opacity-90 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 110%, rgba(139,0,0,0.45), transparent 60%), radial-gradient(60% 50% at 50% 30%, rgba(255,0,60,0.12), transparent 70%), #0a0a0a",
          }}
        />
        <img
          src={productImage(product.id)}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="relative h-full w-full object-cover transition-transform duration-[1.2s] ease-out will-change-transform group-hover:scale-[1.06]"
          style={{ transform: hover ? `translate3d(${tilt.y * 0.6}px, ${tilt.x * -0.6}px, 40px)` : "translateZ(20px)" }}
          onError={(e) => {
            // Fallback gradient if image not yet generated
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />
        {/* Red hover rim */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "inset 0 0 80px rgba(255,0,60,0.35), inset 0 0 1px rgba(255,0,60,0.6)" }}
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FF003C] text-[10px] tracking-[0.25em] font-bold text-black">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            {product.badge}
          </div>
        )}
        {/* Category chip */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md glass-dark text-[9px] tracking-[0.3em] uppercase text-white/70">
          {product.category}
        </div>

        {/* Quick info overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 z-10" style={{ transform: "translateZ(40px)" }}>
          <h3 className="font-display text-[17px] leading-none tracking-wide text-white mb-1.5">
            {product.name}
          </h3>
          <p className="text-[11px] text-white/55 italic mb-2 line-clamp-1">{product.tagline}</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl text-white">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="text-xs text-white/40 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-3 border-t border-white/5">
        <div className="flex gap-1 mb-3 flex-wrap">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`text-[10px] px-2.5 py-1 rounded border transition ${
                size === s
                  ? "border-[#FF003C] bg-[#FF003C]/15 text-white"
                  : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <a
          href={buildWhatsAppLink(product, size)}
          target="_blank"
          rel="noreferrer"
          className="relative block w-full text-center py-3 rounded-lg font-display text-xs tracking-[0.32em] overflow-hidden group/btn border border-[#FF003C]/40 bg-gradient-to-r from-[#7A0000] via-[#8B0000] to-[#FF003C] text-white hover:shadow-blood transition-shadow"
        >
          <span className="relative z-10">BUY ON WHATSAPP →</span>
          <span className="absolute inset-0 bg-black opacity-0 group-hover/btn:opacity-15 transition-opacity" />
        </a>
      </div>
    </motion.article>
  );
}
