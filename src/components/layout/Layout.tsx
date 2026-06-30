import { Outlet } from "react-router-dom";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollToTop } from "./ScrollToTop";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GlassFilter } from "../ui/liquid-glass";

export function Layout() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      {/* Defines #glass-distortion for the liquid-glass primitives. */}
      <GlassFilter />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
