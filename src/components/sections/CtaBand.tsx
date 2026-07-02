import { WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "../ui/Button";
import { GlassEffect } from "../ui/liquid-glass";
import { Reveal } from "../ui/Reveal";
import { primaryCta, whatsappHref } from "@/lib/site";

export function CtaBand({
  title = "¿Listo para producir tu marca de agua?",
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

      <div className="container-px section relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.9rem] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.5rem]">
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
