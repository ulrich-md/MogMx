import { useState } from "react";

// EDITABLE: escena Spline del hero (viewer interactivo). Sustituir por una
// escena de agua/botella si se quiere algo más alineado a la marca.
const SCENE_URL =
  "https://my.spline.design/interactiverobotarm-mWU43luKerLilagHgWqOs3Sr/";

/**
 * Interactive Spline scene embedded as an iframe (drag to rotate). Heavier than
 * the SVG object but fully interactive. Shows a spinner until the scene loads.
 */
export function SplineRobot() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {!loaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loader" />
        </div>
      ) : null}
      <iframe
        src={SCENE_URL}
        title="Escena 3D interactiva"
        onLoad={() => setLoaded(true)}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        className="h-full w-full border-0"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
