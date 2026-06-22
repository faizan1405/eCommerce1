import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navigation } from "@/components/experience/Navigation";
import { WhatsAppButton } from "@/components/experience/WhatsAppButton";
import { Footer } from "@/components/experience/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-blood">404</h1>
        <h2 className="mt-4 font-display text-xl tracking-wider">PAGE NOT FOUND</h2>
        <p className="mt-2 text-sm text-white/60">
          This piece is sold out. Or never existed.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#7A0000] to-[#FF003C] px-5 py-3 text-xs tracking-[0.35em] uppercase">
            Back to the Hauz
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl tracking-wider">SYMBIOTE GLITCH</h1>
        <p className="mt-2 text-sm text-white/60">Something went sideways. Try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-gradient-to-r from-[#7A0000] to-[#FF003C] px-5 py-3 text-xs tracking-[0.35em] uppercase"
          >
            Retry
          </button>
          <a href="/" className="rounded-md border border-white/20 px-5 py-3 text-xs tracking-[0.35em] uppercase">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Thrift Hauz — Dark Luxury Streetwear · Born Symbiote" },
      { name: "description", content: "Premium dark streetwear from Bangalore. Heavyweight hoodies, oversized tees, baggy cargos, chunky sneakers. Limited drops. Order on WhatsApp." },
      { name: "author", content: "Thrift Hauz" },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "Thrift Hauz — Born Symbiote" },
      { property: "og:description", content: "Premium dark streetwear. Limited drops. WhatsApp to order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Thrift Hauz — Born Symbiote" },
      { name: "twitter:description", content: "Premium dark streetwear from Bangalore." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
