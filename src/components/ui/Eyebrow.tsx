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
    <span className={`label inline-flex items-center gap-3 ${color} ${className}`}>
      <span aria-hidden="true" className="h-[2px] w-6 bg-accent" />
      {children}
    </span>
  );
}
