/**
 * Raster brand assets (served from /public/assets).
 * The hero bottle layers share one 1024x1536 canvas so they stack
 * pixel-aligned; the assembly animation reveals them in order.
 */
export const bottle = {
  empty: "/assets/hero/bottle-empty.webp",
  filled: "/assets/hero/bottle-filled.webp",
  cap: "/assets/hero/bottle-cap.webp",
  label: "/assets/hero/bottle-label.webp",
  final: "/assets/hero/bottle-final.webp",
  splash: "/assets/hero/splash.webp",
  width: 1024,
  height: 1536,
} as const;

export const photos = {
  valley: "/assets/photos/valle-tehuacan.webp",
  water: "/assets/photos/agua.webp",
} as const;

export const products = {
  family: "/assets/products/familia.webp",
} as const;
