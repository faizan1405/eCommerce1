import { createFileRoute } from "@tanstack/react-router";
import { useState, lazy, Suspense } from "react";
import { Loader } from "@/components/experience/Loader";
import { Hero } from "@/components/experience/Hero";
import {
  NewArrivalsSection,
  TrendingSection,
  BestSellersSection,
  LimitedDropsSection,
  FeaturedCollection,
  ShopByCategory,
  RunwaySection,
  MarqueeText,
  ReviewsSection,
  InstagramFeed,
} from "@/components/experience/HomeSections";
import { useLenis } from "@/hooks/use-lenis";

const SymbioteBackground = lazy(() =>
  import("@/components/experience/SymbioteBackground").then((m) => ({ default: m.SymbioteBackground })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thrift Hauz — Dark Luxury Streetwear · Born Symbiote" },
      { name: "description", content: "Premium dark streetwear from Bangalore. Heavyweight hoodies, oversized tees, baggy cargos, chunky sneakers. Limited drops. Order on WhatsApp." },
      { property: "og:title", content: "Thrift Hauz — Born Symbiote" },
      { property: "og:description", content: "Premium dark streetwear from Bangalore. Limited drops. WhatsApp to order." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <main id="top" className="relative bg-black text-white">
      <Loader onDone={() => setLoaded(true)} />

      {/* Fixed WebGL symbiote backdrop, behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
        <Suspense fallback={null}>
          {loaded && <SymbioteBackground />}
        </Suspense>
      </div>

      {/* Vignette overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] grain"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)" }} />

      <div id="collections" />
      <Hero />
      <MarqueeText />
      <NewArrivalsSection />
      <TrendingSection />
      <FeaturedCollection />
      <ShopByCategory />
      <BestSellersSection />
      <LimitedDropsSection />
      <RunwaySection />
      <ReviewsSection />
      <InstagramFeed />
    </main>
  );
}
