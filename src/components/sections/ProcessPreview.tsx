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
          title="De la posibilidad a la realidad"
          lead="Seis pasos entre la idea que traes hoy y el producto que vas a vender. Con acompañamiento en cada uno."
        />

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <div className="group cursor-default">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white font-display text-sm font-bold text-blue shadow-soft ring-1 ring-line transition-all duration-300 ease-water group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                    {step.n}
                  </span>
                  <h3 className="font-display text-[1.05rem] font-semibold tracking-tight text-navy transition-transform duration-300 ease-water group-hover:translate-x-1">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-[38ch] text-[14.5px] leading-relaxed text-slate">
                  {step.description}
                </p>
              </div>
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
