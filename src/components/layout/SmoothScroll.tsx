import type { ReactNode } from "react";

/**
 * Native scroll only. The previous Lenis + GSAP smoothing added ~120 KB of JS
 * and a per-frame scroll loop that made the site feel heavy; every scroll
 * effect now runs on Framer Motion's native useScroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
