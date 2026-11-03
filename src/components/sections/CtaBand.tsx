import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { bottle } from "@/lib/assets";
import { primaryCta, whatsappHref } from "@/lib/site";

/** Closing band: ink surface, poster title, the finished bottle on a signal block. */
export function CtaBand({
  title = "¿Listo para embotellar tu marca?",
  lead = "Cuéntanos tu proyecto y te enviamos una propuesta clara, sin compromiso.",
}: {
  title?: string;
  lead?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bottleY = useTransform(scrollYProgress, [0, 1], ["14%", "-10%"]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [-4, 6]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-ink text-white"
      style={{ background: "linear-gradient(135deg, #03141A 0%, #07232C 42%, #0F4C58 100%)" }}
    >
      <div className="container-px relative grid items-center gap-10 py-24 md:py-32 lg:grid-cols-12">
        <Reveal className="relative z-10 lg:col-span-7">
          <h2 className="poster text-[clamp(3.2rem,7.4vw,7.4rem)]">{title}</h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist">{lead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={primaryCta.to} variant="accent" withArrow size="lg">
              {primaryCta.label}
            </Button>
            <Button
              href={whatsappHref("Hola, me interesa cotizar un proyecto de embotellado.")}
              target="_blank"
              variant="outlineDark"
              size="lg"
            >
              <span className="inline-flex items-center gap-2">
                <WhatsappLogo size={17} weight="fill" />
                WhatsApp
              </span>
            </Button>
          </div>
        </Reveal>

        <div aria-hidden="true" className="relative mx-auto h-[420px] w-full max-w-[420px] lg:col-span-5 lg:h-[560px]">
          <div className="absolute bottom-0 left-[26%] right-[26%] top-0 bg-[linear-gradient(180deg,rgba(47,193,207,0.22),rgba(24,147,166,0.08))] ring-1 ring-inset ring-white/10" />
          <motion.img
            src={bottle.final}
            alt=""
            loading="lazy"
            decoding="async"
            style={reduce ? undefined : { y: bottleY, rotate: bottleRotate }}
            className="absolute inset-0 m-auto h-full w-auto drop-shadow-[0_40px_50px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </section>
  );
}
