import { imageWidths } from "./imageWidths";
/**
 * Raster brand assets (served from /public/assets).
 * Bump ASSET_VERSION whenever an image is replaced under the same name, so
 * browsers and the CDN fetch the new file instead of a cached one.
 * The hero bottle layers share one 1024x1536 canvas so they stack
 * pixel-aligned; the assembly animation reveals them in order.
 */
const ASSET_VERSION = "4";
const a = (path: string) => `${path}?v=${ASSET_VERSION}`;

export const bottle = {
  empty: a("/assets/hero/bottle-empty.webp"),
  filled: a("/assets/hero/bottle-filled.webp"),
  cap: a("/assets/hero/bottle-cap.webp"),
  label: a("/assets/hero/bottle-label.webp"),
  final: a("/assets/hero/bottle-final.webp"),
  // Shape-only masks: the small variants are plenty and are already cached
  filledMask: a("/assets/hero/bottle-filled-768.webp"),
  finalMask: a("/assets/hero/bottle-final-768.webp"),
  filler: a("/assets/hero/filler.webp"),
  width: 1024,
  height: 1536,
} as const;

export const photos = {
  valley: a("/assets/photos/valle-tehuacan.webp"),
  water: a("/assets/photos/agua.webp"),
  orizaba: a("/assets/photos/pico-de-orizaba.webp"),
  bubbles: a("/assets/photos/burbujas.webp"),
  street: a("/assets/photos/botella-calle.webp"),
  idea: a("/assets/photos/idea.webp"),
  preforms: a("/assets/photos/preformas.webp"),
  labels: a("/assets/photos/etiquetas.webp"),
  fridge: a("/assets/photos/refri-mog.webp"),
  table: a("/assets/photos/mesa.webp"),
  caps: a("/assets/photos/tapas.webp"),
} as const;

export const products = {
  family: a("/assets/products/familia.webp"),
  flavors: a("/assets/products/sabores.webp"),
  privateLabels: a("/assets/products/marcas-propias.webp"),
  pallet: a("/assets/products/tarima.webp"),
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

/** `srcset` for an asset URL from the generated width map (undefined if no variants). */
export function srcSet(src: string): string | undefined {
  const [path, query] = src.split("?");
  const widths = imageWidths[path];
  if (!widths || widths.length < 2) return undefined;
  const full = widths[widths.length - 1];
  const q = query ? `?${query}` : "";
  return widths
    .map((w) => `${w === full ? path : path.replace(/\.webp$/, `-${w}.webp`)}${q} ${w}w`)
    .join(", ");
}
