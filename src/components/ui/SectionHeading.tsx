import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * Editorial section header: optional index + eyebrow, poster headline, lead.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  tone = "light",
  align = "left",
  size = "lg",
  className = "",
}: {
  eyebrow?: string;
  /** Optional section number shown before the eyebrow, e.g. "01" */
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
}) {
  const isDark = tone === "dark";
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  const titleSize =
    size === "lg"
      ? "text-[clamp(2.9rem,6.4vw,6rem)]"
      : "text-[clamp(2.4rem,4.6vw,4.2rem)]";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow || index ? (
        <div className="mb-6 flex items-center gap-4">
          {index ? (
            <span className={`readout ${isDark ? "text-white/50" : "text-slate"}`}>{index}</span>
          ) : null}
          {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        </div>
      ) : null}
      <h2 className={`poster ${titleSize} ${isDark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead ? (
        <p
          className={`mt-6 max-w-prose text-[1.05rem] leading-[1.65] ${
            align === "center" ? "mx-auto" : ""
          } ${isDark ? "text-white/70" : "text-slate"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
