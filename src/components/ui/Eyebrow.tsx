import type { ReactNode } from "react";

/**
 * Small uppercase label above a heading. Used sparingly
 * (max ~1 per 3 sections, per the anti-slop discipline).
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
    <span
      className={`inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-eyebrow ${color} ${className}`}
    >
      {children}
    </span>
  );
}
