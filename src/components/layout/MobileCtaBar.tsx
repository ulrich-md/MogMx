import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { primaryCta, whatsappHref } from "@/lib/site";

/**
 * Phones: the primary action always sits in the thumb zone. It hides while a
 * page's own primary CTA ([data-primary-cta]) is on screen, and on Contacto.
 */
export function MobileCtaBar() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const [ctaInView, setCtaInView] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setCtaInView(seen.size > 0);
    });
    // Lazy routes mount a moment later
    const t = window.setTimeout(() => {
      document.querySelectorAll("[data-primary-cta]").forEach((el) => io.observe(el));
      setCtaInView(false);
    }, 400);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  const show = scrolled && !ctaInView && pathname !== "/contacto";

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduce ? false : { y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-3 backdrop-blur-md [padding-bottom:max(12px,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="flex items-center gap-3">
            <Link
              to={primaryCta.to}
              className="label flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-[12px] text-ink shadow-accent active:scale-[0.98]"
            >
              {primaryCta.label}
              <ArrowUpRight size={15} weight="bold" />
            </Link>
            <a
              href={whatsappHref("Hola, me interesa cotizar un proyecto de embotellado.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/15 text-ink active:scale-[0.96]"
            >
              <WhatsappLogo size={20} weight="fill" />
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
