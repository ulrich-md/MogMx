import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { Icon } from "./Icon";
import { whatsappHref, type Service } from "@/lib/site";

/**
 * Editorial service row: big index number + title + summary + a hover arrow
 * that fills. Replaces the flat icon-card grid. Each row opens WhatsApp with
 * a message pre-filled for that service (direct contact, no form).
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
      className="group relative block border-t border-line py-7 transition-colors duration-300 ease-water hover:bg-foam"
    >
      <div className="grid items-start gap-x-6 gap-y-4 md:grid-cols-12">
        <div className="font-display text-lg font-bold text-slate/45 transition-colors duration-300 group-hover:text-amber md:col-span-1">
          {n}
        </div>

        <div className="flex items-center gap-3.5 md:col-span-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-blue transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
            <Icon name={service.icon} size={20} />
          </span>
          <h3 className="font-display text-xl font-bold tracking-tight text-navy md:text-[1.6rem] md:leading-[1.05]">
            {service.title}
          </h3>
        </div>

        <div className="md:col-span-6">
          <p className="text-[15px] leading-relaxed text-slate">
            {detailed ? service.detail : service.summary}
          </p>
          {detailed ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {service.points.map((point) => {
                const clean = point.replace(/\s*\/\/ EDITABLE.*$/, "");
                return (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-[13.5px] text-navy/75"
                  >
                    <Check
                      size={15}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-blue"
                    />
                    {clean}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="flex md:col-span-1 md:justify-end">
          <span className="grid h-11 w-11 place-items-center rounded-full text-navy ring-1 ring-line transition-all duration-300 ease-water group-hover:bg-navy group-hover:text-white group-hover:ring-navy">
            <ArrowUpRight
              size={18}
              weight="bold"
              className="transition-transform duration-300 ease-water group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </a>
  );
}
