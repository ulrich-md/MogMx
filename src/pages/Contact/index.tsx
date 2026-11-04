import {
  WhatsappLogo,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { photos, srcSet } from "@/lib/assets";
import { site, whatsappHref, telHref, mapsHref, mapsEmbed } from "@/lib/site";

const directChannels = [
  {
    icon: Phone,
    label: "Teléfono",
    value: site.contact.phone,
    href: telHref,
    external: false,
  },
];

function InfoRow({
  icon: Ico,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent">
        <Ico size={18} weight="bold" />
      </span>
      <span className="flex-1">
        <span className="label block text-slate">{label}</span>
        <span className="mt-1 block text-[1.15rem] font-semibold tracking-tight text-ink">{value}</span>
      </span>
      {href ? (
        <ArrowUpRight
          size={18}
          weight="bold"
          className="text-slate transition-all duration-300 ease-water group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        />
      ) : null}
    </>
  );
  return (
    <li className="border-b border-line">
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-5 py-6"
        >
          {inner}
        </a>
      ) : (
        <div className="group flex items-center gap-5 py-6">{inner}</div>
      )}
    </li>
  );
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contacto"
        description="Contáctanos por WhatsApp, correo o teléfono. MOG México, agua mineral de Tehuacán, Puebla, embotellada con tu marca."
        path="/contacto"
      />
      <PageHero
        visual="bottle"
        eyebrow="Contacto"
        title="Hablemos de tu marca"
        lead="Escríbenos o llámanos directo. Te respondemos con una propuesta clara para tu marca, sin compromiso."
      />

      <section className="bg-paper">
        <div className="container-px grid gap-12 pb-24 md:pb-32 lg:grid-cols-2 lg:gap-10">
          <div>
            {/* WhatsApp: the primary channel, on water photography */}
            <div className="relative isolate overflow-hidden rounded-card bg-water p-7 text-white sm:p-10">
              <img
                src={photos.water} srcSet={srcSet(photos.water)} sizes="(min-width: 1024px) 48vw, 92vw"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(3,20,26,0.92),rgba(7,35,44,0.6))]" />
              <WhatsappLogo size={28} weight="fill" className="text-accent" />
              <h2 className="poster mt-6 text-[clamp(2.4rem,4vw,3.4rem)]">Escríbenos por WhatsApp</h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
                Cuéntanos tu proyecto (tipo de agua, formato y volumen estimado)
                y te enviamos una cotización.
              </p>
              <div className="mt-8">
                <Button
                  href={whatsappHref("Hola, me interesa cotizar un proyecto de embotellado.")}
                  target="_blank"
                  size="lg"
                  withArrow
                >
                  Abrir WhatsApp
                </Button>
              </div>
            </div>

            <ul className="mt-8 border-t border-line">
              {directChannels.map((c) => (
                <InfoRow key={c.label} icon={c.icon} label={c.label} value={c.value} href={c.href} external={c.external} />
              ))}
              <InfoRow icon={MapPin} label="Ubicación" value={site.location.label} href={mapsHref} external />
              {/* EDITABLE: horario real de atención */}
              <InfoRow icon={Clock} label="Horario" value="[horario de atención]" />
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="relative flex-1 overflow-hidden rounded-card border border-line">
              {/* Ubicación exacta de la planta (site.location.lat / lng) */}
              <iframe
                title="Ubicación de MOG México en Tehuacán, Puebla"
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[460px] w-full border-0 grayscale-[0.6] lg:h-full lg:min-h-[560px]"
              />
              <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-[3px] w-24 bg-accent" />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="readout text-slate">{site.location.coordinates}</p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="label group inline-flex items-center gap-2 text-ink"
              >
                Cómo llegar
                <ArrowUpRight size={14} weight="bold" className="transition-transform duration-300 ease-water group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
