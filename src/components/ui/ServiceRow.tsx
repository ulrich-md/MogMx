import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { Icon } from "./Icon";
import { ServiceVisual } from "./ServiceVisual";
import { serviceImages } from "@/lib/assets";
import { whatsappHref, type Service } from "@/lib/site";

/**
 * Editorial service row. Each row opens WhatsApp with a message pre-filled
 * for that service (direct contact, no form).
 *  - summary (home): index, poster title, summary, hover arrow; reports hover
 *    / focus through `onActivate` so the section can swap its preview image.
 *  - detailed (Servicios): adds the full copy, points and the service image.
 */
export function ServiceRow({
  service,
  index,
  detailed = false,
  active = false,
  onActivate,
}: {
  service: Service;
  index: number;
  detailed?: boolean;
  active?: boolean;
  onActivate?: () => void;
}) {
  const n = String(index + 1).padStart(2, "0");
  const image = serviceImages[service.slug];
  const href = whatsappHref(`Hola, me interesa el servicio: ${service.title}.`);

  if (detailed) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid gap-x-8 gap-y-6 border-t border-line py-12 lg:grid-cols-12 lg:py-16"
      >
        <div className="flex items-center justify-between lg:col-span-1 lg:block">
          <span className="readout text-slate transition-colors duration-300 group-hover:text-accent-deep">{n}</span>
          <span className="mt-0 grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent lg:mt-6">
            <Icon name={service.icon} size={17} weight="bold" />
          </span>
        </div>

        <div className="lg:col-span-6">
          <h3 className="poster text-[2.6rem] text-ink transition-transform duration-500 ease-water group-hover:translate-x-1.5 md:text-[3.6rem]">
            {service.title}
          </h3>
          <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-slate">{service.detail}</p>
          <ul className="mt-6 grid gap-2.5 border-t border-line pt-5 sm:grid-cols-2">
            {service.points.map((point) => {
              const clean = point.replace(/\s*\/\/ EDITABLE.*$/, "");
              return (
                <li key={point} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-graphite">
                  <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                  {clean}
                </li>
              );
            })}
          </ul>
          <span className="mt-8 inline-flex text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 transition-all duration-300 ease-water group-hover:border-ink group-hover:bg-ink group-hover:text-white">
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 ease-water group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </span>
        </div>

        {image ? <ServiceVisual image={image} className="order-first aspect-[4/3] w-full lg:order-none lg:col-span-5" /> : null}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group relative block overflow-hidden border-t border-line"
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left bg-bone transition-transform duration-500 ease-water group-hover:scale-x-100 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
      <div className="relative grid items-start gap-x-6 gap-y-3 py-7 md:grid-cols-12 md:py-8">
        <div className="md:col-span-1">
          <span
            className={`readout transition-colors duration-300 group-hover:text-accent-deep ${
              active ? "text-accent-deep" : "text-slate"
            }`}
          >
            {n}
          </span>
        </div>

        <div className="flex items-start gap-4 md:col-span-5">
          <span className="mt-1 hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent sm:grid">
            <Icon name={service.icon} size={17} weight="bold" />
          </span>
          <h3 className="poster text-[2.05rem] text-ink transition-transform duration-500 ease-water group-hover:translate-x-1.5 md:text-[2.4rem]">
            {service.title}
          </h3>
        </div>

        <div className="md:col-span-5">
          <p className="text-[15px] leading-relaxed text-slate">{service.summary}</p>
        </div>

        <div className="hidden md:col-span-1 md:flex md:justify-end">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 ease-water group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight
              size={17}
              weight="bold"
              className="transition-transform duration-300 ease-water group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </a>
  );
}
