import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Menu, X, ShoppingBag } from "lucide-react";

const NAV = [
  { label: "Home",         to: "/" as const },
  { label: "New Arrivals", to: "/new-arrivals" as const },
  { label: "Categories",   to: "/categories" as const },
  { label: "About",        to: "/about" as const },
  { label: "Contact",      to: "/contact" as const },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-3 md:mx-6 transition-all duration-500 ${
            scrolled
              ? "glass rounded-2xl chrome-edge shadow-deep"
              : "bg-transparent border border-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-5 md:px-7 h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-[#FFC300] animate-pulse-red" />
              <span className="font-display text-xl md:text-2xl tracking-[0.18em] text-white">
                THRIFT<span className="text-[#FFC300]">·</span>HAUZ
              </span>
            </Link>

            {/* Desktop menu */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative px-4 py-2 text-[11px] tracking-[0.3em] uppercase text-white/75 hover:text-white transition-colors group"
                  activeProps={{ className: "text-white" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                  <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-[#FFC300] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearch((s) => !s)}
                aria-label="Search"
                className="h-10 w-10 grid place-items-center rounded-xl glass-dark chrome-edge hover:bg-[#FFC300]/15 transition"
              >
                <Search className="h-4 w-4" />
              </button>
              <a
                href="#collections"
                aria-label="Shop"
                className="hidden md:grid h-10 w-10 place-items-center rounded-xl glass-dark chrome-edge hover:bg-[#FFC300]/15 transition"
              >
                <ShoppingBag className="h-4 w-4" />
              </a>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Menu"
                className="lg:hidden h-10 w-10 grid place-items-center rounded-xl glass-dark chrome-edge"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Inline search */}
          {search && (
            <div className="px-5 md:px-7 pb-4 -mt-1">
              <input
                autoFocus
                placeholder="Search the Hauz — Hoodies, Cargos, Sneakers..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm tracking-wide outline-none focus:border-[#FFC300]/60"
              />
            </div>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[78%] max-w-sm glass border-l border-white/10 p-8 pt-24 transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-2">
            {NAV.map((item, i) => (
              <li
                key={item.to}
                style={{ transitionDelay: `${i * 60}ms` }}
                className={`transition-all duration-500 ${
                  open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
              >
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block font-display text-3xl tracking-wider text-white/90 hover:text-[#FFC300] transition py-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="blood-divider mb-4" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">
              Bangalore · India
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
