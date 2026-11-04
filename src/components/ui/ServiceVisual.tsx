import type { ServiceImage } from "@/lib/assets";
import { srcSet } from "@/lib/assets";

/**
 * Framed service image. Photos fill the frame; product cut-outs sit on the
 * water panel (multiply drops any white studio background into the panel).
 */
export function ServiceVisual({
  image,
  className = "",
  eager = false,
}: {
  image: ServiceImage;
  className?: string;
  eager?: boolean;
}) {
  const cover = image.fit === "cover";
  return (
    <div
      className={`relative overflow-hidden rounded-card ${
        cover ? "bg-ink" : "bg-white ring-1 ring-inset ring-line"
      } ${className}`}
    >
      <img
        src={image.src} srcSet={srcSet(image.src)} sizes="(min-width: 1024px) 40vw, 82vw"
        alt={image.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04] ${
          cover ? "object-cover" : "object-contain p-[6%] mix-blend-multiply"
        }`}
      />
    </div>
  );
}
