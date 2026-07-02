import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { List, X, WhatsappLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { nav, primaryCta, site, whatsappHref, mailtoHref } from "@/lib/site";
import { Logo } from "./Logo";
import { Button } from "../ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

function DesktopLink({
  to,
  label,
  light,
}: {
  to: string;
  label: string;
  light?: boolean;
}) {
  const active = light ? "text-white" : "text-navy";
  const idle = light ? "text-white/75 hover:text-white" : "text-slate hover:text-navy";
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `group relative whitespace-nowrap text-[13.5px] font-medium transition-colors duration-200 ${
          isActive ? active : idle
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {/* Animated underline: grows from the left on hover, full when active */}
          <span
            aria-hidden="true"
            className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full transition-transform duration-300 ease-water ${
              light ? "bg-mint" : "bg-aqua"
            } ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
          />
        </>
      )}
    </NavLink>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  // Every page now opens on the dark deep-water hero, so at the very top the
  // chrome is light everywhere; it flips to glass-on-white once scrolled.
  const overHero = !scrolled && !open;

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape when menu open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-water ${
        scrolled || open
          ? "border-b border-line bg-white/70 shadow-soft backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-px flex h-[68px] items-center justify-between gap-4">
        <Logo tone={overHero ? "white" : "navy"} />

        <nav
          className="hidden items-center gap-x-6 lg:flex"
          aria-label="Navegación principal"
        >
          {nav.map((item) => (
            <DesktopLink key={item.to} to={item.to} label={item.label} light={overHero} />
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to={primaryCta.to} withArrow size="md">
            {primaryCta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className={`grid h-11 w-11 place-items-center rounded-full ring-1 transition-colors lg:hidden ${
            overHero
              ? "text-white ring-white/30 hover:bg-white/10"
              : "text-navy ring-line hover:bg-foam"
          }`}
        >
          <List size={22} weight="regular" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 top-0 z-50 h-[100dvh] bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-px flex h-[68px] items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="grid h-11 w-11 place-items-center rounded-full text-navy ring-1 ring-line transition-colors hover:bg-foam"
              >
                <X size={22} weight="regular" />
              </button>
            </div>

            <nav
              className="container-px mt-4 flex flex-col"
              aria-label="Navegación móvil"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: EASE }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `block border-b border-line py-4 font-display text-2xl tracking-tight transition-colors ${
                        isActive ? "text-blue" : "text-navy"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="container-px mt-8 flex flex-col gap-3">
              <Button to={primaryCta.to} withArrow size="lg" className="w-full">
                {primaryCta.label}
              </Button>
              <div className="flex gap-3">
                <a
                  href={whatsappHref("Hola, me interesa cotizar un proyecto de embotellado.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foam py-3 text-sm font-medium text-navy ring-1 ring-line transition-colors hover:bg-mist"
                >
                  <WhatsappLogo size={18} weight="fill" className="text-blue" />
                  WhatsApp
                </a>
                <a
                  href={mailtoHref("Cotización de proyecto")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foam py-3 text-sm font-medium text-navy ring-1 ring-line transition-colors hover:bg-mist"
                >
                  <EnvelopeSimple size={18} weight="regular" className="text-blue" />
                  Correo
                </a>
              </div>
              <p className="mt-1 text-center text-xs text-slate">{site.location.label}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
