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
  orizaba: "/assets/photos/pico-de-orizaba.webp",
  bubbles: "/assets/photos/burbujas.webp",
  street: "/assets/photos/botella-calle.webp",
} as const;

export const products = {
  family: "/assets/products/familia.webp",
  privateLabels: "/assets/products/marcas-propias.webp",
  pallet: "/assets/products/tarima.webp",
} as const;

/**
 * One image per service (keyed by service slug in src/lib/site.ts).
 * "cover" = full-bleed photo; "contain" = product cut-out on a water panel.
 */
export type ServiceImage = { src: string; alt: string; fit: "cover" | "contain" };

export const serviceImages: Record<string, ServiceImage> = {
  "agua-mineral-tehuacan": {
    src: photos.orizaba,
    alt: "El Pico de Orizaba nevado entre las nubes, origen del agua que aflora en Tehuacán",
    fit: "cover",
  },
  "marca-propia": {
    src: products.privateLabels,
    alt: "Ejemplos ilustrativos de marcas propias en botella PET, lata y vidrio",
    fit: "contain",
  },
  formulacion: {
    src: photos.bubbles,
    alt: "Burbujas de agua mineral en un vaso, en primer plano",
    fit: "cover",
  },
  "envases-y-tapas": {
    src: products.family,
    alt: "Envases MOG: botella PET, lata, botella de vidrio y garrafón",
    fit: "contain",
  },
  // REEMPLAZAR: imagen de bebidas de sabores (limón, jamaica, pepino, mango)
  "otras-bebidas": {
    src: products.family,
    alt: "Presentaciones MOG para agua y otras bebidas",
    fit: "contain",
  },
  "producto-final": {
    src: products.pallet,
    alt: "Tarima con paquetes termoencogidos de botellas MOG listas para distribución",
    fit: "contain",
  },
};
