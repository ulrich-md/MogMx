import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Floater, JugSvg } from "@/components/hero/Products";

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" path="/404" />
      <section
        className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-[#03141A]"
        style={{
          background:
            "radial-gradient(120% 110% at 50% -15%, #0E3A44 0%, #07232C 48%, #03141A 100%)",
        }}
      >
        <div className="container-px relative py-32 text-center">
          <div className="relative inline-block">
            <p className="font-display text-[clamp(6rem,22vw,15rem)] font-extrabold leading-none tracking-tight text-white/[0.07]">
              404
            </p>
            <Floater
              delay={0.2}
              depth={0.6}
              floatY={12}
              duration={6}
              className="absolute inset-0 grid place-items-center"
            >
              <JugSvg className="h-32 w-auto rotate-[168deg] drop-shadow-[0_26px_40px_rgba(3,16,22,0.55)] sm:h-40" />
            </Floater>
          </div>
          <h1 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight text-white">
            Esta página se nos derramó
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-mist/90">
            Es posible que el enlace haya cambiado. Vuelve al inicio o
            escríbenos para cotizar tu proyecto.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button to="/" withArrow>
              Volver al inicio
            </Button>
            <Button to="/contacto" variant="outlineDark">
              Contacto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
