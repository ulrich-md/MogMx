import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  /** Public Spline scene URL (…prod.spline.design/<id>/scene.splinecode). */
  scene: string;
  className?: string;
}

/**
 * Lazy-loaded wrapper around an interactive Spline 3D scene. The runtime
 * (~Spline WebGL) is code-split, so it never blocks the initial bundle; the
 * scene file streams from prod.spline.design in the visitor's browser.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
