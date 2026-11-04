import type { ReactNode } from "react";

/**
 * Small tracked uppercase label above a heading, led by a short signal bar.
 */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-aqua" : "text-blue-deep";
  return (
    <span className={`label inline-flex items-center gap-2.5 tracking-[0.11em] sm:gap-3 sm:tracking-eyebrow ${color} ${className}`}>
      <span aria-hidden="true" className="h-[2px] w-4 shrink-0 bg-accent sm:w-6" />
      {children}
    </span>
  );
}
