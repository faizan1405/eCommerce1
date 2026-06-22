import { createFileRoute } from "@tanstack/react-router";
import { useState, lazy, Suspense } from "react";
import { Loader } from "@/components/experience/Loader";
import { Hero, ManifestoSection, CategoryMarquee, RunwaySection, FooterCTA } from "@/components/experience/Sections";
import { ProductGrid } from "@/components/experience/ProductGrid";
import { useLenis } from "@/hooks/use-lenis";

const ImmersiveScene = lazy(() =>
  import("@/components/experience/ImmersiveScene").then((m) => ({ default: m.ImmersiveScene }))
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thrift Hauz — One Stop Place For All Exclusive Thrifts" },
      { name: "description", content: "An immersive WebGL fashion universe. Exclusive curated thrift streetwear: oversized tees, hoodies, jackets, cargos & sneakers. Buy directly on WhatsApp." },
      { property: "og:title", content: "Thrift Hauz — Exclusive Thrift Fashion Universe" },
      { property: "og:description", content: "Enter the futuristic fashion dimension." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <main className="relative bg-background text-foreground">
      <Loader onDone={() => setLoaded(true)} />

      {/* Fixed WebGL backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="h-full w-full bg-background" />}>
          {loaded && <ImmersiveScene />}
        </Suspense>
      </div>

      {/* Vignette + grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Scrolling content layered above */}
      <div className="relative z-10">
        <Hero />
        {/* spacer so character + scenes have time to play */}
        <section className="h-[100vh]" aria-hidden />
        <ManifestoSection />
        <CategoryMarquee />
        <RunwaySection />
        <ProductGrid />
        <FooterCTA />
      </div>
    </main>
  );
}
