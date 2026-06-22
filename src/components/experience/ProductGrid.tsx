import { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS, type Product, buildWhatsAppLink } from "@/lib/products";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientY - r.top) / r.height - 0.5) * -14,
          y: ((e.clientX - r.left) / r.width - 0.5) * 14,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-2xl glass p-5 transition-shadow duration-500 hover:shadow-neon"
    >
      {/* Product visual */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${product.color}40, transparent 70%), linear-gradient(135deg, ${product.accent}30, #0a0a0f 80%)`,
        }}
      >
        {/* Floating shape */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(40px)" }}
        >
          <div
            className="h-3/4 w-3/4 rounded-3xl blur-[2px]"
            style={{
              background: `linear-gradient(135deg, ${product.color}, ${product.accent})`,
              boxShadow: `0 30px 80px ${product.color}88, inset 0 0 60px ${product.accent}66`,
              maskImage: shapeMask(product.shape),
              WebkitMaskImage: shapeMask(product.shape),
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
            }}
          />
        </motion.div>
        {/* Glow ring */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: `inset 0 0 60px ${product.color}88` }} />
        <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase text-luxury-silver/70">
          {product.category}
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] tracking-[0.2em] text-luxury-silver/70">
          /0{index + 1}
        </div>
      </div>

      {/* Info */}
      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="font-display text-xl font-bold mb-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 italic">{product.tagline}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-display text-gradient-purple-pink">₹{product.price}</span>
          <div className="flex gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`text-[10px] px-2 py-1 rounded-md border transition-all ${
                  size === s
                    ? "border-primary bg-primary/20 text-foreground"
                    : "border-white/10 text-muted-foreground hover:border-white/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <a
          href={buildWhatsAppLink(product, size)}
          target="_blank"
          rel="noreferrer"
          className="relative block w-full text-center py-3 rounded-xl font-medium tracking-widest text-sm uppercase overflow-hidden group/btn"
          style={{ background: "linear-gradient(135deg, #A855F7, #EC4899)" }}
        >
          <span className="relative z-10">Buy on WhatsApp</span>
          <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
            style={{ background: "linear-gradient(135deg, #EC4899, #3B82F6)" }} />
        </a>
      </div>
    </motion.div>
  );
}

// SVG mask shapes per product type — keeps look graphic without stock photos
function shapeMask(shape: string) {
  const svgs: Record<string, string> = {
    tee:     `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='black' d='M20 20 L35 12 L40 22 Q50 30 60 22 L65 12 L80 20 L72 36 L65 32 L65 88 L35 88 L35 32 L28 36 Z'/></svg>`,
    hoodie:  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='black' d='M30 18 Q50 6 70 18 L82 30 L75 44 L70 40 L70 88 L30 88 L30 40 L25 44 L18 30 Z M40 18 Q50 30 60 18'/></svg>`,
    jacket:  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='black' d='M25 18 L45 14 L50 22 L55 14 L75 18 L82 32 L72 38 L72 88 L28 88 L28 38 L18 32 Z'/></svg>`,
    cargo:   `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='black' d='M30 10 L70 10 L72 50 L68 90 L54 90 L52 50 L48 50 L46 90 L32 90 L28 50 Z'/><rect fill='black' x='32' y='40' width='10' height='14'/><rect fill='black' x='58' y='40' width='10' height='14'/></svg>`,
    denim:   `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='black' d='M32 10 L68 10 L70 50 L66 90 L54 90 L50 50 L46 90 L34 90 L30 50 Z'/></svg>`,
    sneaker: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='black' d='M10 60 Q15 40 35 38 L60 38 Q80 40 88 55 L90 70 Q90 78 82 78 L14 78 Q8 78 8 70 Z'/></svg>`,
    accessory: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='32' fill='black'/><circle cx='50' cy='50' r='16' fill='white'/></svg>`,
  };
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svgs[shape] ?? svgs.tee)}")`;
}

export function ProductGrid() {
  return (
    <section id="collections" className="relative z-10 px-6 md:px-12 py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="text-xs tracking-[0.4em] text-primary/80 uppercase mb-3">/ The Wardrobe</div>
            <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
              Interactive<br /><span className="text-gradient-neon">Collections</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Each piece is hand-curated, photographed in the void, and rendered into the Hauz. Hover to tilt — tap to claim.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
