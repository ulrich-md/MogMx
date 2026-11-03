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
  filler: "/assets/hero/filler.webp",
  width: 1024,
  height: 1536,
} as const;

export const photos = {
  valley: "/assets/photos/valle-tehuacan.webp",
  water: "/assets/photos/agua.webp",
  orizaba: "/assets/photos/pico-de-orizaba.webp",
  bubbles: "/assets/photos/burbujas.webp",
  street: "/assets/photos/botella-calle.webp",
  idea: "/assets/photos/idea.webp",
  preforms: "/assets/photos/preformas.webp",
  labels: "/assets/photos/etiquetas.webp",
  fridge: "/assets/photos/anaquel.webp",
  table: "/assets/photos/mesa.webp",
  caps: "/assets/photos/tapas.webp",
} as const;

export const products = {
  family: "/assets/products/familia.webp",
  flavors: "/assets/products/sabores.webp",
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
    src: photos.caps,
    alt: "Tapas de rosca para PET y corcholatas para vidrio en varios colores",
    fit: "cover",
  },
  "otras-bebidas": {
    src: products.flavors,
    alt: "Bebidas naturales MOG de limón, jamaica, pepino y mango",
    fit: "contain",
  },
  "producto-final": {
    src: products.pallet,
    alt: "Tarima con paquetes termoencogidos de botellas MOG listas para distribución",
    fit: "contain",
  },
};

/** One photo per process step (keyed by step number in src/lib/site.ts). */
export const processImages: Record<string, { src: string; alt: string }> = {
  "01": { src: photos.idea, alt: "Bocetos de etiqueta, lápices y paleta de color junto a una botella sin etiquetar" },
  "02": { src: products.flavors, alt: "Bebidas MOG de limón, jamaica, pepino y mango" },
  "03": { src: photos.caps, alt: "Tapas de rosca para PET y corcholatas para vidrio" },
  "04": { src: photos.preforms, alt: "Preformas de PET de distintos tamaños junto a una botella terminada" },
  "05": { src: photos.labels, alt: "Rollo de etiquetas impresas listas para aplicarse" },
  "06": { src: products.pallet, alt: "Tarima con paquetes de botellas listas para distribución" },
};
