import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CATEGORIES } from "@/lib/products";

const RUNWAY_WORDS = ["THRIFTED", "CURATED", "ICONIC", "EXCLUSIVE", "LIMITED"];

export function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-between p-6 md:p-10 z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="flex justify-between items-start pointer-events-auto"
      >
        <div className="text-xs tracking-[0.4em] uppercase text-luxury-silver/80">
          /THRIFT-HAUZ <span className="text-primary">●</span> ONLINE
        </div>
        <nav className="hidden md:flex gap-6 text-xs tracking-[0.3em] uppercase text-luxury-silver/80">
          <a href="#collections" className="hover:text-foreground transition">Wardrobe</a>
          <a href="#runway" className="hover:text-foreground transition">Runway</a>
          <a href="#manifesto" className="hover:text-foreground transition">Manifesto</a>
        </nav>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="self-start max-w-3xl"
      >
        <div className="text-xs tracking-[0.5em] uppercase text-primary mb-4">Volume 001 — Fashion Dimension</div>
        <h1 className="font-display text-[14vw] md:text-[10vw] leading-[0.85] font-bold">
          <span className="block">THRIFT</span>
          <span className="block text-gradient-neon">HAUZ</span>
        </h1>
        <p className="mt-6 max-w-md text-luxury-silver/70 text-sm md:text-base">
          One stop place for all exclusive thrifts. Scroll to enter the universe.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex justify-between items-end text-[10px] tracking-[0.4em] uppercase text-luxury-silver/50"
      >
        <span>SCROLL ↓ TO ENTER</span>
        <span>EST. 2026 — INDIA</span>
      </motion.div>
    </section>
  );
}

export function ManifestoSection() {
  return (
    <section className="relative z-10 py-40 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs tracking-[0.4em] text-primary/80 uppercase mb-6">/ Manifesto</div>
        <p className="font-display text-3xl md:text-6xl leading-tight font-bold">
          We don't sell clothes. We <span className="text-gradient-neon">archive timelines</span>.
          Every piece in the Hauz was once worn, lived in, and chosen again — sharper,
          rarer, and impossible to <span className="text-gradient-purple-pink">repeat</span>.
        </p>
      </div>
    </section>
  );
}

export function CategoryMarquee() {
  return (
    <section className="relative z-10 py-20 overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((c, i) => (
          <span
            key={i}
            className="font-display text-7xl md:text-9xl font-bold px-12 text-transparent"
            style={{ WebkitTextStroke: "1px rgba(229,231,235,0.4)" }}
          >
            {c} <span className="text-primary">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}

export function RunwaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section id="runway" ref={ref} className="relative z-10 py-40 overflow-hidden">
      <div className="px-6 md:px-12 mb-16 max-w-7xl mx-auto">
        <div className="text-xs tracking-[0.4em] text-primary/80 uppercase mb-3">/ Runway</div>
        <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
          A Walkway Through<br /><span className="text-gradient-neon">The Dimension</span>
        </h2>
      </div>

      <motion.div style={{ x }} className="flex gap-12 whitespace-nowrap will-change-transform">
        {RUNWAY_WORDS.concat(RUNWAY_WORDS).map((w, i) => (
          <motion.span
            key={i}
            style={{ rotate }}
            className="font-display text-[18vw] font-bold leading-none"
          >
            <span className={i % 2 ? "text-gradient-neon" : "text-transparent"}
                  style={i % 2 ? {} : { WebkitTextStroke: "2px rgba(168,85,247,0.6)" }}>
              {w}
            </span>
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

export function FooterCTA() {
  return (
    <footer className="relative z-10 px-6 md:px-12 py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <div className="font-display text-5xl md:text-7xl font-bold text-gradient-neon">THRIFT HAUZ</div>
          <p className="mt-4 max-w-md text-muted-foreground text-sm">
            One Stop Place For All Exclusive Thrifts. DM the Hauz on WhatsApp to claim a piece —
            we ship across India.
          </p>
        </div>
        <div className="flex flex-col md:items-end justify-end gap-3">
          <a
            href="https://wa.me/919353203570"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass hover:shadow-neon transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="tracking-[0.2em] text-sm uppercase">+91 93532 03570</span>
          </a>
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            © {new Date().getFullYear()} — Built in the void
          </span>
        </div>
      </div>
    </footer>
  );
}
