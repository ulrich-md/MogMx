import { WhatsappLogo, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { site, whatsappHref, mailtoHref } from "@/lib/site";

const channels = [
  {
    icon: WhatsappLogo,
    label: "WhatsApp",
    value: site.contact.whatsappDisplay,
    href: whatsappHref("Hola, me interesa cotizar un proyecto de embotellado."),
    external: true,
  },
  {
    icon: EnvelopeSimple,
    label: "Correo",
    value: site.contact.email,
    href: mailtoHref("Cotización de proyecto"),
    external: false,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: site.contact.phone,
    href: `tel:${site.contact.phone.replace(/\s/g, "")}`,
    external: false,
  },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contacto"
        description="Cotiza tu proyecto de maquila, embotellado o marca privada. WhatsApp, correo y ubicación en Tehuacán, Puebla."
        path="/contacto"
      />
      <PageHero
        eyebrow="Contacto"
        title="Cotiza tu proyecto"
        lead="Cuéntanos sobre tu marca y tu proyecto. Te respondemos con una propuesta clara, sin compromiso."
      />

      <section className="bg-white">
        <div className="container-px grid gap-12 pb-24 lg:grid-cols-12">
          {/* Channels + map */}
          <div className="lg:col-span-5">
            <ul className="space-y-3">
              {channels.map((c) => {
                const Ico = c.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-card bg-white p-5 shadow-soft ring-1 ring-line transition-all duration-300 ease-water hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist text-blue transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
                        <Ico size={22} weight="regular" />
                      </span>
                      <span>
                        <span className="block text-[12px] font-semibold uppercase tracking-eyebrow text-slate">
                          {c.label}
                        </span>
                        <span className="block font-display text-[15px] font-semibold text-navy">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
              <li className="flex items-center gap-4 rounded-card bg-foam p-5 ring-1 ring-line">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-blue shadow-soft">
                  <MapPin size={22} weight="regular" />
                </span>
                <span>
                  <span className="block text-[12px] font-semibold uppercase tracking-eyebrow text-slate">
                    Ubicación
                  </span>
                  <span className="block font-display text-[15px] font-semibold text-navy">
                    {site.location.label}
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-5">
              <MediaPlaceholder
                // REEMPLAZAR: insertar mapa de Google Maps (Tehuacán, Puebla)
                label="Mapa de ubicación - Tehuacán, Puebla (insertar Google Maps)"
                alt="Mapa de ubicación de MOG México en Tehuacán, Puebla"
                aspect="16/9"
              />
            </div>
          </div>

          {/* Quote form */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </div>
      </section>

      <WaveDivider nextColor="#0E2A47" className="bg-white" />
    </>
  );
}
