import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { SectionHeading } from "../ui/SectionHeading";
import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/site";

/** Six-column process ledger: hairline columns, poster numerals. */
export function ProcessPreview() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-bone">
      <div className="container-px section">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Proceso"
            size="md"
            title="De la posibilidad a la realidad"
            lead="Seis pasos entre la idea que traes hoy y el producto que vas a vender. Con acompañamiento en cada uno."
            className="md:max-w-3xl"
          />
          <Link
            to="/proceso"
            className="label group inline-flex shrink-0 items-center gap-3 text-ink"
          >
            Ver el proceso completo
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
              <ArrowRight size={15} weight="bold" className="transition-transform duration-300 ease-water group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <ol className="mt-12 grid border-t border-ink/15 sm:mt-16 sm:grid-cols-2 lg:grid-cols-6">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid grid-cols-[4.25rem_1fr] gap-x-4 border-b border-ink/15 py-6 sm:block sm:px-6 sm:py-8 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
            >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[-1px] h-[3px] w-0 bg-accent transition-[width] duration-500 ease-water group-hover:w-full"
                />
                <span aria-hidden="true" data-text={step.n} className="pseudo-text poster row-span-2 block text-[3.4rem] text-ink/15 transition-colors duration-300 group-hover:text-accent sm:text-[4.5rem]" />
                <h3 className="label mt-1 text-[12.5px] text-ink sm:mt-6">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate sm:mt-3">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
