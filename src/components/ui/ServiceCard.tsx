import { Link } from "react-router-dom";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { Icon } from "./Icon";
import type { Service } from "@/lib/site";

export function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col rounded-card bg-white p-7 shadow-soft ring-1 ring-line transition-all duration-300 ease-water hover:-translate-y-1 hover:shadow-lift">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-mist text-blue transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
        <Icon name={service.icon} size={24} />
      </span>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-navy">
        {service.title}
      </h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-slate">
        {detailed ? service.detail : service.summary}
      </p>

      {detailed ? (
        <ul className="mt-5 space-y-2.5">
          {service.points.map((point) => {
            const clean = point.replace(/\s*\/\/ EDITABLE.*$/, "");
            return (
              <li key={point} className="flex items-start gap-2.5 text-[14px] text-navy/80">
                <Check
                  size={16}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-blue"
                />
                {clean}
              </li>
            );
          })}
        </ul>
      ) : null}

      <Link
        to={`/contacto?servicio=${service.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-blue-deep transition-colors hover:text-navy"
      >
        Solicitar información
        <ArrowRight
          size={15}
          weight="bold"
          className="transition-transform duration-300 ease-water group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}
