import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { Icon } from "./Icon";
import { whatsappHref, type Service } from "@/lib/site";

/**
 * Editorial service row: index, poster title, summary and a hover arrow.
 * On hover a bone panel sweeps in from the left. Each row opens WhatsApp
 * with a message pre-filled for that service (direct contact, no form).
 */
export function ServiceRow({
  service,
  index,
  detailed = false,
}: {
  service: Service;
  index: number;
  detailed?: boolean;
}) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <a
      href={whatsappHref(`Hola, me interesa el servicio: ${service.title}.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden border-t border-line"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-bone transition-transform duration-500 ease-water group-hover:scale-x-100"
      />
      <div
        className={`relative grid items-start gap-x-6 gap-y-3 py-7 md:grid-cols-12 md:py-8 ${
          detailed ? "lg:py-12" : ""
        }`}
      >
        <div className="flex items-center gap-3 md:col-span-1 md:block">
          <span className="readout text-slate transition-colors duration-300 group-hover:text-accent-deep">{n}</span>
        </div>

        <div className={`flex items-start gap-4 ${detailed ? "md:col-span-5" : "md:col-span-5"}`}>
          <span className="mt-1 hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent sm:grid">
            <Icon name={service.icon} size={17} weight="bold" />
          </span>
          <h3
            className={`poster text-ink transition-transform duration-500 ease-water group-hover:translate-x-1.5 ${
              detailed ? "text-[2.4rem] md:text-[3.2rem]" : "text-[2.05rem] md:text-[2.4rem]"
            }`}
          >
            {service.title}
          </h3>
        </div>

        <div className="md:col-span-5">
          <p className={`leading-relaxed text-slate ${detailed ? "text-[1.02rem]" : "text-[15px]"}`}>
            {detailed ? service.detail : service.summary}
          </p>
          {detailed ? (
            <ul className="mt-5 grid gap-2.5 border-t border-line pt-5 sm:grid-cols-2">
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
          ) : null}
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
