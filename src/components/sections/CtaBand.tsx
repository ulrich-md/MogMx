import { WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "../ui/Button";
import { GlassEffect } from "../ui/liquid-glass";
import { Reveal } from "../ui/Reveal";
import { BottleSvg, CanSvg, Floater } from "../hero/Products";
import { primaryCta, whatsappHref } from "@/lib/site";

export function CtaBand({
  title = "¿Listo para embotellar tu marca?",
  lead = "Cuéntanos tu proyecto y te enviamos una propuesta clara, sin compromiso.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section
      className="relative overflow-hidden bg-navy"
      style={{
        background:
          "linear-gradient(135deg, #03141A 0%, #07232C 42%, #0F4C58 100%)",
      }}
    >
      {/* Decorative water ripples */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-[28rem] w-[28rem] opacity-[0.12]"
        viewBox="0 0 400 400"
      >
        {[60, 110, 160, 200].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="#2FC1CF"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Product echoes from the hero, floating at the edges */}
      <Floater
        delay={0.2}
        depth={0.4}
        floatY={9}
        duration={7}
        className="pointer-events-none absolute -left-6 top-1/2 hidden h-56 -translate-y-1/2 opacity-80 lg:block"
      >
        <BottleSvg className="h-full w-auto -rotate-[10deg] drop-shadow-[0_26px_40px_rgba(3,16,22,0.5)]" />
      </Floater>
      <Floater
        delay={0.35}
        depth={0.55}
        floatY={11}
        duration={6.2}
        className="pointer-events-none absolute -right-4 top-1/2 hidden h-44 -translate-y-1/2 opacity-80 lg:block"
      >
        <CanSvg className="h-full w-auto rotate-[12deg] drop-shadow-[0_26px_40px_rgba(3,16,22,0.5)]" />
      </Floater>

      <div className="container-px section relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[2rem] font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-4xl md:text-[2.7rem]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mist">
            {lead}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to={primaryCta.to} withArrow size="lg">
              {primaryCta.label}
            </Button>
            <GlassEffect
              href={whatsappHref(
                "Hola, me interesa cotizar un proyecto de embotellado.",
              )}
              className="rounded-full px-7 py-4"
            >
              <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-white">
                <WhatsappLogo size={18} weight="fill" />
                WhatsApp
              </span>
            </GlassEffect>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
