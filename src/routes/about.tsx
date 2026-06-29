import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { productImage } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Thrift Hauz" },
      { name: "description", content: "Born from the underground. Curated dark streetwear from Bangalore. This is the Thrift Hauz story." },
      { property: "og:title", content: "About — Thrift Hauz" },
      { property: "og:description", content: "The Thrift Hauz story. Born Symbiote." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <img src="/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" onError={(e) => {(e.currentTarget as HTMLImageElement).style.display='none';}} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40" />
        <div className="absolute inset-0 flex items-end p-6 md:p-12 pb-20">
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <div className="text-[10px] tracking-[0.45em] uppercase text-[#FF003C] mb-4">/ The Hauz</div>
            <h1 className="font-display text-6xl md:text-9xl leading-[0.85]">
              BORN FROM<br /><span className="text-blood">THE UNDERGROUND</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Editorial */}
      <section className="px-5 md:px-12 py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#FF003C] mb-4">/ 01 — Origin</div>
            <h2 className="font-display text-3xl md:text-5xl leading-[0.95]">From a garage in Bangalore.</h2>
          </div>
          <div className="md:col-span-8 text-white/70 text-lg leading-relaxed space-y-5 max-w-2xl">
            <p>Thrift Hauz started where most ideas die: in a garage with no funding, three friends and a heavy-duty sewing machine pulled from a defunct workshop in Shivajinagar.</p>
            <p>We were tired of mall fashion. Tired of thin tees, generic prints, soft silhouettes. We wanted heavy. We wanted dark. We wanted clothes that felt like armor.</p>
            <p>What started as personal pieces became a cult. Then a brand. Then The Hauz.</p>
          </div>
        </div>
      </section>

      {/* Image collage */}
      <section className="px-5 md:px-12 py-12 grid md:grid-cols-3 gap-4">
        {["p14", "p37", "p25"].map((id, i) => (
          <motion.div
            key={id}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5"
            style={{ transform: i === 1 ? "translateY(40px)" : undefined }}
          >
            <img src={productImage(id)} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </motion.div>
        ))}
      </section>

      {/* Manifesto */}
      <section className="px-5 md:px-12 py-28 text-center">
        <div className="text-[10px] tracking-[0.45em] uppercase text-[#FF003C] mb-4">/ Manifesto</div>
        <h2 className="font-display text-4xl md:text-7xl leading-[0.9] max-w-5xl mx-auto">
          WE DON'T MAKE CLOTHES.<br />
          <span className="text-blood">WE FORGE ARMOR</span>
        </h2>
        <p className="max-w-xl mx-auto mt-6 text-white/65 text-lg">
          Every piece is heavyweight. Every cut is razor sharp. Every drop is limited.
          When we say "Born Symbiote," we mean it.
        </p>
      </section>

      {/* Stats */}
      <section className="px-5 md:px-12 py-20 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { v: "50+", l: "Pieces in stock" },
            { v: "240", l: "GSM minimum" },
            { v: "12K+", l: "Cult members" },
            { v: "1", l: "City. BLR." },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-5xl md:text-6xl text-blood">{s.v}</div>
              <div className="mt-2 text-[10px] tracking-[0.35em] uppercase text-white/55">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
