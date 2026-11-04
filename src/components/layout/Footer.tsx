import { Link } from "react-router-dom";
import { WhatsappLogo, EnvelopeSimple, Phone, MapPin, ArrowUpRight } from "@phosphor-icons/react";
import { nav, services, site, whatsappHref, mailtoHref } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  const contacts = [
    {
      icon: WhatsappLogo,
      label: site.contact.whatsappDisplay,
      href: whatsappHref("Hola, me interesa cotizar un proyecto de embotellado."),
      external: true,
    },
    { icon: EnvelopeSimple, label: site.contact.email, href: mailtoHref("Cotización de proyecto") },
    { icon: Phone, label: site.contact.phone },
    { icon: MapPin, label: site.location.label },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink pb-20 text-white lg:pb-0">
      <div className="container-px grid gap-12 pb-10 pt-20 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <Logo tone="white" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist/85">{site.description}</p>
          <ul className="mt-8 border-t border-line-dark">
            {contacts.map((c, i) => {
              const Ico = c.icon;
              const content = (
                <>
                  <Ico size={17} weight="bold" className="shrink-0 text-aqua" />
                  <span className="flex-1">{c.label}</span>
                  {c.href ? (
                    <ArrowUpRight
                      size={15}
                      weight="bold"
                      className="text-white/30 transition-all duration-300 ease-water group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  ) : null}
                </>
              );
              return (
                <li key={i} className="border-b border-line-dark">
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 py-3.5 text-[14.5px] text-white/80 transition-colors hover:text-white"
                    >
                      {content}
                    </a>
                  ) : (
                    <span className="flex items-center gap-4 py-3.5 text-[14.5px] text-white/80">{content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="md:col-span-3 md:col-start-7" aria-label="Páginas">
          <h2 className="label text-aqua">Navegación</h2>
          <ul className="mt-6 space-y-3">
            {nav
              .filter((n) => n.to !== "/")
              .map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="poster inline-block text-[1.9rem] text-white/85 transition-all duration-300 ease-water hover:translate-x-1 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <nav className="md:col-span-3" aria-label="Servicios">
          <h2 className="label text-aqua">Servicios</h2>
          <ul className="mt-6 space-y-3 text-[14.5px]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/servicios"
                  className="inline-block text-white/70 transition-all duration-300 ease-water hover:translate-x-1 hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Giant wordmark, cropped by the page edge like a label seam */}
      <div aria-hidden="true" className="container-px select-none">
        <p data-text="MOG" className="poster pseudo-text -mb-[0.06em] mt-6 text-left text-[30vw] leading-[0.74] text-white/[0.06] lg:text-[21vw]" />
      </div>

      <div className="border-t border-line-dark">
        <div className="container-px flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="readout text-white/65">
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <div className="readout flex items-center gap-5 text-white/65">
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
