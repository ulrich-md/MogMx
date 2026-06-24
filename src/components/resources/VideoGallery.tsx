import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X } from "@phosphor-icons/react";
import { Reveal } from "../ui/Reveal";
import { videos, type VideoResource } from "@/lib/site";
import { media } from "@/lib/media";

const posters = [media.fillingLine, media.bottlingLine, media.waterPour];

function embedUrl(v: VideoResource) {
  if (!v.videoId) return "";
  return v.provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${v.videoId}?autoplay=1`;
}

function Lightbox({
  video,
  onClose,
}: {
  video: VideoResource;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const url = embedUrl(video);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] grid place-items-center bg-navy/85 p-4 backdrop-blur-sm"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar video"
          className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full text-white ring-1 ring-white/30 transition-colors hover:bg-white/10"
        >
          <X size={20} weight="bold" />
        </button>
        <div className="aspect-video overflow-hidden rounded-card bg-black ring-1 ring-white/10">
          {url ? (
            <iframe
              src={url}
              title={video.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  {video.title}
                </p>
                <p className="mt-2 text-sm text-mist">
                  EDITABLE: agrega el ID del video en src/lib/site.ts para
                  reproducirlo aquí.
                </p>
              </div>
            </div>
          )}
        </div>
        <p className="mt-4 text-center font-display text-white">{video.title}</p>
      </motion.div>
    </motion.div>
  );
}

export function VideoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? videos[active] : null;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {videos.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group block w-full text-left"
            >
              <div className="relative aspect-video overflow-hidden rounded-card bg-navy ring-1 ring-line">
                <img
                  src={posters[i % posters.length]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-water group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/45 transition-colors duration-300 group-hover:bg-navy/30" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-navy shadow-lift transition-transform duration-300 ease-water group-hover:scale-110">
                    <Play size={26} weight="fill" className="ml-1" />
                  </span>
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-navy">
                {v.title}
              </h3>
              <p className="mt-1 text-[14px] leading-relaxed text-slate">
                {v.description}
              </p>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {current ? (
          <Lightbox video={current} onClose={() => setActive(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
