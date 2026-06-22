import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
const listeners = new Set<(p: number) => void>();

export function getScrollProgress() {
  return lenisInstance ? lenisInstance.progress : 0;
}
export function onScrollProgress(fn: (p: number) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      lerp: 0.08,
    });
    lenisInstance = lenis;
    lenis.on("scroll", (e: any) => {
      listeners.forEach((fn) => fn(e.progress ?? 0));
    });
    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
