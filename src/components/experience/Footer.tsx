import { Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, CONTACT_PHONE, INSTAGRAM_URL } from "@/lib/products";

export function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/5 px-5 md:px-10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="font-display text-4xl md:text-5xl tracking-wide mb-4">
              BORN<br /><span className="text-blood">SYMBIOTE</span>
            </div>
            <p className="text-white/55 max-w-md text-sm leading-relaxed">
              Thrift Hauz. Curated dark streetwear from Bangalore. Heavyweight cottons,
              razor-cut silhouettes, limited drops.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#FF003C] mb-4">/ Shop</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/new-arrivals" className="hover:text-white">New Arrivals</Link></li>
              <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link to="/" hash="collections" className="hover:text-white">Bestsellers</Link></li>
              <li><Link to="/" hash="limited" className="hover:text-white">Limited Drops</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#FF003C] mb-4">/ Hauz</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#FF003C] mb-4">/ Contact</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-white">{CONTACT_PHONE}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a></li>
              <li className="text-white/40 text-xs">Bangalore, India</li>
            </ul>
          </div>
        </div>
        <div className="blood-divider mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-white/40">
          <div>© 2026 Thrift Hauz · All rights reserved</div>
          <div>Born Symbiote · Made in BLR</div>
        </div>
      </div>
    </footer>
  );
}
