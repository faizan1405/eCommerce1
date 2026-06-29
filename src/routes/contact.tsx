import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CONTACT_EMAIL, CONTACT_PHONE, INSTAGRAM_URL, whatsAppGeneral } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Thrift Hauz" },
      { name: "description", content: "Reach Thrift Hauz on WhatsApp, phone, email or Instagram. Based in Bangalore." },
      { property: "og:title", content: "Contact — Thrift Hauz" },
      { property: "og:description", content: "Reach The Hauz." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="bg-black text-white pt-32 min-h-screen">
      <section className="px-5 md:px-12">
        <div className="text-[10px] tracking-[0.45em] uppercase text-[#FF003C] mb-4">/ Reach</div>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">TALK TO<br /><span className="text-blood">THE HAUZ</span></h1>
        <p className="mt-6 max-w-xl text-white/65">Fastest response is WhatsApp. We're based in Bangalore. We ship pan-India.</p>
      </section>

      <section className="px-5 md:px-12 py-20 grid md:grid-cols-2 gap-6">
        {[
          { eyebrow: "Fastest", title: "WhatsApp", value: CONTACT_PHONE, href: whatsAppGeneral(), cta: "Open WhatsApp →" },
          { eyebrow: "Call",    title: "Phone",    value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}`, cta: "Dial →" },
          { eyebrow: "Email",   title: "Email",    value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, cta: "Send →" },
          { eyebrow: "Follow",  title: "Instagram", value: "@thrifthauz.blr", href: INSTAGRAM_URL, cta: "View Feed →" },
        ].map((c, i) => (
          <motion.a
            key={c.title}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 md:p-10 rounded-3xl border border-white/10 glass-dark chrome-edge overflow-hidden hover:border-[#FF003C]/40 transition"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,0,60,0.15), transparent 60%)" }} />
            <div className="relative">
              <div className="text-[10px] tracking-[0.4em] uppercase text-[#FF003C] mb-3">/ {c.eyebrow}</div>
              <div className="font-display text-3xl md:text-4xl mb-2">{c.title}</div>
              <div className="text-white/65 text-lg mb-6">{c.value}</div>
              <div className="text-[11px] tracking-[0.35em] uppercase text-white/80 group-hover:text-[#FF003C] transition">{c.cta}</div>
            </div>
          </motion.a>
        ))}
      </section>

      <section className="px-5 md:px-12 pb-32">
        <div className="rounded-3xl border border-white/10 p-8 md:p-14 glass-dark text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[#FF003C] mb-3">/ Visit</div>
          <div className="font-display text-3xl md:text-5xl">BANGALORE · INDIA</div>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">By appointment only. DM us on Instagram to coordinate a studio visit.</p>
        </div>
      </section>
    </main>
  );
}
