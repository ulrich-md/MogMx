import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

/**
 * Interactive 3D band (Spline). Branded adaptation of the 21st.dev demo:
 * navy/ink surface, emerald-tinted spotlight, Spanish copy.
 *
 * NOTE: the scene below is the generic Spline sample (a robot) and is OFF-BRAND
 * for MOG. Replace it with a water / bottle / liquid scene before shipping.
 */
// EDITABLE: sustituir por una escena Spline propia (envase, gota, línea de agua).
const SCENE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function InteractiveScene() {
  return (
    <Card className="relative h-[520px] w-full overflow-hidden border-white/10 bg-ink shadow-lift">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#8FE8C9" />

      <div className="flex h-full flex-col md:flex-row">
        {/* Copy */}
        <div className="relative z-10 flex flex-1 flex-col justify-center p-8 sm:p-10">
          <h2 className="bg-gradient-to-b from-white to-mist/70 bg-clip-text font-display text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            Tu marca, en 3D
          </h2>
          <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.6] text-mist">
            Explora tu envase y tu línea en un entorno interactivo. Gira,
            acércate y descubre cada detalle del producto terminado.
          </p>
        </div>

        {/* Interactive scene */}
        <div className="relative min-h-[260px] flex-1">
          <SplineScene scene={SCENE_URL} className="h-full w-full" />
        </div>
      </div>
    </Card>
  );
}
