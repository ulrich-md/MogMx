import { Link } from "react-router-dom";
import { WhatsappLogo, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import {
  nav,
  services,
  site,
  whatsappHref,
  mailtoHref,
} from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-mist">
      <div className="container-px grid gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* Brand */}
        <div className="md:col-span-5">
          <Logo tone="white" />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-mist/85">
            {site.description}
          </p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li>
              <a
                href={whatsappHref(
                  "Hola, me interesa cotizar un proyecto de embotellado.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-mist/90 transition-colors hover:text-white"
              >
                <WhatsappLogo size={18} weight="fill" className="text-aqua" />
                {site.contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={mailtoHref("Cotización de proyecto")}
                className="inline-flex items-center gap-3 text-mist/90 transition-colors hover:text-white"
              >
                <EnvelopeSimple size={18} weight="regular" className="text-aqua" />
                {site.contact.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-3 text-mist/90">
              <Phone size={18} weight="regular" className="text-aqua" />
              {site.contact.phone}
            </li>
            <li className="inline-flex items-center gap-3 text-mist/90">
              <MapPin size={18} weight="regular" className="text-aqua" />
              {site.location.label}
            </li>
          </ul>
        </div>

        {/* Nav */}
        <nav className="md:col-span-3" aria-label="Páginas">
          <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-aqua">
            Navegación
          </h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {nav
              .filter((n) => n.to !== "/")
              .map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-mist/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {/* Services */}
        <nav className="md:col-span-4" aria-label="Servicios">
          <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-aqua">
            Servicios
          </h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/servicios"
                  className="text-mist/85 transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col gap-3 py-6 text-[13px] text-mist/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {/* EDITABLE: enlazar aviso de privacidad y términos reales */}
            <a href="#" className="transition-colors hover:text-white">
              Aviso de privacidad
            </a>
            <span aria-hidden="true" className="text-white/20">
              /
            </span>
            <span>{site.location.label}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
