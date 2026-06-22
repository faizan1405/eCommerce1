import { useEffect, useState } from "react";

export function Loader({ onDone }: { onDone?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const total = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => { setDone(true); onDone?.(); }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-black transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,214,10,0.25), transparent 60%)" }} />
      <div className="relative text-center">
        <div className="font-display text-5xl md:text-7xl tracking-wider mb-6">
          THRIFT<span className="text-[#FFC300]">·</span>HAUZ
        </div>
        <div className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-6">
          Entering The Hauz
        </div>
        <div className="h-px w-64 mx-auto bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0D0D0D] to-[#FFC300] transition-[width] duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="text-[10px] tracking-[0.4em] text-white/35 mt-3">
          {Math.round(progress * 100).toString().padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
}
