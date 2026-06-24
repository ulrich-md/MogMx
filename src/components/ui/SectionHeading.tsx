import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * Stacked section header (eyebrow -> headline -> lead). Never the
 * banned "big headline left, small paragraph floating right" split.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const isDark = tone === "dark";
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <Eyebrow tone={tone} className="mb-4">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={`font-display text-[2rem] font-bold leading-[1.04] tracking-tight sm:text-4xl md:text-[2.9rem] ${
          isDark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 max-w-prose text-[1.05rem] leading-[1.7] ${
            align === "center" ? "mx-auto" : ""
          } ${isDark ? "text-mist" : "text-slate"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
