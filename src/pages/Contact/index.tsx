import {
  WhatsappLogo,
  EnvelopeSimple,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { site, whatsappHref, mailtoHref } from "@/lib/site";

const directChannels = [
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
        description="Contáctanos por WhatsApp, correo o teléfono. MOG México, agua mineral de Tehuacán, Puebla, embotellada con tu marca."
        path="/contacto"
      />
      <PageHero
        product="bottle"
        eyebrow="Contacto"
        title="Hablemos de tu marca"
        lead="Escríbenos o llámanos directo. Te respondemos con una propuesta clara para tu marca, sin compromiso."
      />

      <section className="bg-white">
        <div className="container-px grid gap-12 pb-24 lg:grid-cols-2 lg:gap-16">
          {/* Direct channels (company info only) */}
          <div>
            <div className="rounded-card bg-navy p-7 sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
                Escríbenos por WhatsApp
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-mist">
                Cuéntanos tu proyecto (tipo de agua, formato y volumen estimado)
                y te enviamos una cotización.
              </p>
              <div className="mt-6">
                <Button
                  href={whatsappHref(
                    "Hola, me interesa cotizar un proyecto de embotellado.",
                  )}
                  target="_blank"
                  size="lg"
                  withArrow
                >
                  <span className="inline-flex items-center gap-2">
                    <WhatsappLogo size={18} weight="fill" />
                    Abrir WhatsApp
                  </span>
                </Button>
              </div>
            </div>

            <ul className="mt-8 border-t border-line">
              {directChannels.map((c) => {
                const Ico = c.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 border-b border-line py-5 transition-colors duration-300 hover:bg-foam"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-blue transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
                        <Ico size={20} weight="regular" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-eyebrow text-slate">
                          {c.label}
                        </span>
                        <span className="block font-display text-lg font-bold text-navy">
                          {c.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        weight="bold"
                        className="text-slate transition-all duration-300 ease-water group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy"
                      />
                    </a>
                  </li>
                );
              })}

              <li className="flex items-center gap-4 border-b border-line py-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-blue">
                  <MapPin size={20} weight="regular" />
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-eyebrow text-slate">
                    Ubicación
                  </span>
                  <span className="block font-display text-lg font-bold text-navy">
                    {site.location.label}
                  </span>
                </span>
              </li>

              <li className="flex items-center gap-4 border-b border-line py-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-blue">
                  <Clock size={20} weight="regular" />
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-eyebrow text-slate">
                    Horario
                  </span>
                  {/* EDITABLE: horario real de atención */}
                  <span className="block font-display text-lg font-bold text-navy">
                    [horario de atención]
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Real embedded map */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-card shadow-soft ring-1 ring-line">
              {/* EDITABLE: cambia la consulta por la dirección/coordenadas exactas de la planta */}
              <iframe
                title="Ubicación de MOG México en Tehuacán, Puebla"
                src="https://www.google.com/maps?q=Tehuac%C3%A1n%2C%20Puebla%2C%20M%C3%A9xico&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[460px] w-full border-0 lg:h-full lg:min-h-[460px]"
              />
            </div>
            <p className="mt-3 text-[13px] text-slate">
              {site.location.label}
            </p>
          </div>
        </div>
      </section>

      <WaveDivider nextColor="#07232C" className="bg-white" />
    </>
  );
}
