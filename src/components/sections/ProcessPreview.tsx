import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { processSteps } from "@/lib/site";

export function ProcessPreview() {
  return (
    <section className="bg-foam">
      <div className="container-px section">
        <SectionHeading
          title="De la cotización a la entrega"
          lead="Un proceso claro y trazable. Tú defines tu marca; nosotros la producimos paso a paso."
        />

        <div className="mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-6">
          {processSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <div className="flex items-center gap-3 lg:block">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white font-display text-sm font-bold text-blue shadow-soft ring-1 ring-line">
                  {step.n}
                </span>
                <h3 className="font-display text-base font-semibold tracking-tight text-navy lg:mt-4">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-11">
          <Link
            to="/proceso"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-blue-deep transition-colors hover:text-navy"
          >
            Ver el proceso completo
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform duration-300 ease-water group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
