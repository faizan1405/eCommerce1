import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y      = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale  = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade   = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  // 3D parallax tilt driven by pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]),  { stiffness: 80, damping: 18 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 60, damping: 20 });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth  - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden" style={{ perspective: 1400 }}>
      {/* Golden rim halo BEHIND the model */}
      <motion.div
        aria-hidden
        style={{ x: tx, y: ty }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] w-[120vmin] h-[120vmin] rounded-full pointer-events-none animate-float-y"
      >
        <div className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,195,0,0.45) 0%, rgba(255,234,0,0.18) 30%, transparent 62%)", filter: "blur(40px)" }} />
        <div className="absolute inset-[18%] rounded-full animate-pulse-gold"
          style={{ background: "radial-gradient(circle, rgba(255,234,0,0.55), transparent 60%)" }} />
      </motion.div>

      {/* Model layer with 3D tilt */}
      <motion.div
        style={{ y, scale, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="absolute inset-0 z-[2] will-change-transform"
      >
        <img
          src="/hero.jpg"
          alt="Thrift Hauz — Editorial fashion model in oversized black streetwear"
          className="h-full w-full object-cover object-[center_20%]"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
        />
        {/* Black liquid base behind model in case image missing */}
        <div className="absolute inset-0 -z-10 animate-liquid"
          style={{ background: "radial-gradient(circle at 50% 60%, #141414, #050505 70%)" }} />
      </motion.div>

      {/* Color/depth gradients on top of model */}
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.0) 30%, rgba(5,5,5,0.0) 60%, rgba(5,5,5,0.95) 100%), radial-gradient(80% 60% at 30% 50%, transparent, rgba(5,5,5,0.6))",
        }} />

      {/* Gold side glow */}
      <div className="absolute inset-y-0 right-0 w-[65%] z-[3] pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 80% 50%, rgba(255,195,0,0.22), transparent 70%)" }} />

      {/* Lightning streaks */}
      <div aria-hidden className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-[15%] w-[2px] h-[60%] bg-gradient-to-b from-transparent via-[#FFEA00] to-transparent animate-lightning"
             style={{ filter: "blur(1px)", boxShadow: "0 0 24px #FFC300" }} />
        <div className="absolute -top-10 right-[20%] w-[1px] h-[70%] bg-gradient-to-b from-transparent via-[#FFD60A] to-transparent animate-lightning"
             style={{ animationDelay: "2.5s", filter: "blur(1px)", boxShadow: "0 0 18px #FFD60A" }} />
        <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFEA00]/70 to-transparent animate-streak" />
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-[10] min-h-[100svh] flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12"
      >
        {/* Top eyebrow */}
        <div className="absolute top-28 left-6 md:left-12 flex items-center gap-3 text-[10px] tracking-[0.45em] uppercase text-white/60">
          <span className="h-px w-8 bg-[#FFC300]" />
          Volume 01 · Symbiote Drop · Bangalore
        </div>

        {/* Side label */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-8 rotate-90 origin-right gap-3 text-[10px] tracking-[0.45em] uppercase text-white/40">
          <span>Scroll to enter the Hauz</span>
          <span className="h-px w-12 bg-white/30 self-center" />
        </div>

        <div className="max-w-6xl">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[18vw] md:text-[10.5vw] leading-[0.85] tracking-[-0.01em] text-white"
          >
            BORN<br />
            <span className="inline-block text-gold animate-flicker">SYMBIOTE</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-8 grid md:grid-cols-3 gap-6 md:gap-12 max-w-4xl"
          >
            <p className="md:col-span-2 text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
              Curated dark streetwear, forged in the underground. Heavyweight cottons,
              razor-cut silhouettes, and limited drops shipped from Bangalore.
              This isn't fashion — it's armor.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#collections"
                className="btn-gold group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-lg font-display text-xs tracking-[0.4em] overflow-hidden"
              >
                <span className="relative z-10">SHOP THE DROP</span>
                <span aria-hidden className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/new-arrivals"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg border border-white/15 text-white/85 font-display text-xs tracking-[0.4em] hover:border-[#FFC300]/60 hover:text-[#FFEA00] transition"
              >
                NEW ARRIVALS
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[11] flex flex-col items-center gap-2 text-[10px] tracking-[0.45em] uppercase text-white/45">
        <span>SCROLL</span>
        <span className="h-10 w-px bg-gradient-to-b from-[#FFC300]/60 to-transparent" />
      </div>
    </section>
  );
}
