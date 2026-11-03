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

function DesktopLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `label group relative whitespace-nowrap py-2 transition-colors duration-200 ${
          isActive ? "text-ink" : "text-slate hover:text-ink"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {/* Signal dot under the active item; a hairline grows on hover */}
          <span
            aria-hidden="true"
            className={`absolute -bottom-1 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-accent transition-all duration-300 ease-water ${
              isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />
          {!isActive ? (
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-water group-hover:scale-x-100"
            />
          ) : null}
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-water ${
        scrolled || open
          ? "border-b border-line bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-px grid h-[72px] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav className="hidden items-center gap-x-9 lg:flex" aria-label="Navegación principal">
          {nav.map((item) => (
            <DesktopLink key={item.to} to={item.to} label={item.label} />
          ))}
        </nav>

        <div className="hidden justify-end lg:flex">
          <Button to={primaryCta.to} withArrow size="md">
            {primaryCta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-white lg:hidden"
        >
          <List size={20} weight="bold" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 top-0 z-50 flex h-[100dvh] flex-col bg-paper lg:hidden"
          >
            <div className="container-px flex h-[72px] items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <nav className="container-px mt-6 flex flex-col" aria-label="Navegación móvil">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: EASE }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-baseline justify-between border-b border-line py-3 ${
                        isActive ? "text-accent" : "text-ink"
                      }`
                    }
                  >
                    <span className="poster text-[13vw] sm:text-6xl">{item.label}</span>
                    <span className="readout text-slate">{String(i + 1).padStart(2, "0")}</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="container-px mt-auto flex flex-col gap-3 pb-8">
              <Button to={primaryCta.to} withArrow size="lg" className="w-full">
                {primaryCta.label}
              </Button>
              <div className="flex gap-3">
                <a
                  href={whatsappHref("Hola, me interesa cotizar un proyecto de embotellado.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 text-ink"
                >
                  <WhatsappLogo size={17} weight="fill" className="text-accent" />
                  WhatsApp
                </a>
                <a
                  href={mailtoHref("Cotización de proyecto")}
                  className="label flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 text-ink"
                >
                  <EnvelopeSimple size={17} weight="bold" className="text-accent" />
                  Correo
                </a>
              </div>
              <p className="readout mt-1 text-center text-slate">{site.location.label}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
