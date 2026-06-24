import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" path="/404" />
      <section className="relative grid min-h-[70vh] place-items-center bg-gradient-to-b from-foam to-white">
        <div className="container-px pt-28 text-center">
          <p className="font-display text-7xl font-bold tracking-tight text-mist">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy">
            No encontramos esta página
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate">
            Es posible que el enlace haya cambiado. Vuelve al inicio o escríbenos
            para cotizar tu proyecto.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
