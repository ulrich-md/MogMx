import { motion, useReducedMotion } from "framer-motion";
import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { bottle } from "@/lib/assets";

export default function NotFound() {
  const reduce = useReducedMotion();
  return (
    <>
      <Seo title="Página no encontrada" path="/404" />
      <section className="grain relative grid min-h-[100dvh] place-items-center overflow-hidden bg-paper pt-[72px]">
        <div className="container-px relative py-20 text-center">
          <div className="relative mx-auto inline-block">
            <p className="poster text-[clamp(9rem,34vw,24rem)] leading-[0.8] text-ink">404</p>
            {/* The empty bottle, tipped over: the page spilled */}
            <motion.img
              src={bottle.empty}
              alt=""
              aria-hidden="true"
              style={{ x: "-50%", y: "-50%" }}
              initial={reduce ? false : { rotate: 0, opacity: 0 }}
              animate={{ rotate: 72, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-auto mix-blend-multiply"
            />
          </div>
          <h1 className="poster mt-10 text-[clamp(2.2rem,5vw,3.6rem)] text-ink">Esta página se nos derramó</h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate">
            Es posible que el enlace haya cambiado. Vuelve al inicio o
            escríbenos para cotizar tu proyecto.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/" withArrow>
              Volver al inicio
            </Button>
            <Button to="/contacto" variant="secondary">
              Contacto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
