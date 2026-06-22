import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 9 + 3);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 900);
        }, 400);
      }
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden noise"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Particles */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0 ? "#A855F7" : i % 3 === 1 ? "#3B82F6" : "#EC4899",
                  boxShadow: "0 0 8px currentColor",
                  color: i % 3 === 0 ? "#A855F7" : i % 3 === 1 ? "#3B82F6" : "#EC4899",
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.25), transparent 60%)" }}
          />

          {/* Logo */}
          <motion.div
            initial={{ y: 20, opacity: 0, letterSpacing: "0.5em" }}
            animate={{ y: 0, opacity: 1, letterSpacing: "0.05em" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center"
          >
            <div className="font-display text-5xl md:text-7xl font-bold text-gradient-neon">
              THRIFT HAUZ
            </div>
            <div className="mt-3 text-xs md:text-sm tracking-[0.4em] text-muted-foreground uppercase">
              Entering the Fashion Dimension
            </div>
          </motion.div>

          {/* Audio visualizer bars */}
          <div className="relative z-10 mt-12 flex h-12 items-end gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full"
                style={{
                  background: `linear-gradient(to top, #A855F7, #EC4899)`,
                }}
                animate={{ height: [`${10 + Math.random() * 20}%`, `${40 + Math.random() * 60}%`, `${10 + Math.random() * 20}%`] }}
                transition={{ duration: 0.6 + Math.random() * 0.6, repeat: Infinity, delay: i * 0.04 }}
              />
            ))}
          </div>

          {/* Progress */}
          <div className="relative z-10 mt-12 w-72 max-w-[80vw]">
            <div className="flex justify-between text-[10px] tracking-[0.3em] text-muted-foreground mb-2">
              <span>RENDERING UNIVERSE</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(to right, #A855F7, #3B82F6, #EC4899)" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
