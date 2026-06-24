import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghostDark";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Show the nested circular arrow (button-in-button) */
  withArrow?: boolean;
  className?: string;
};

type AsLink = CommonProps & { to: string; href?: never; onClick?: never };
type AsAnchor = CommonProps & {
  href: string;
  to?: never;
  target?: string;
  rel?: string;
  onClick?: never;
};
type AsButton = CommonProps & {
  to?: never;
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = AsLink | AsAnchor | AsButton;

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-semibold tracking-tight transition-all duration-300 ease-water active:translate-y-px active:scale-[0.985] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-6 py-3.5 text-[15px]",
};

// Amber is the ONLY accent and is reserved for these primary CTAs.
// Navy text on amber = ~5.3:1 contrast (passes WCAG AA).
const variants: Record<Variant, string> = {
  primary: "bg-amber text-navy shadow-amber hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "bg-white text-navy ring-1 ring-line hover:ring-navy/25 hover:bg-foam",
  ghostDark:
    "bg-white/0 text-white ring-1 ring-white/30 hover:bg-white/10 hover:ring-white/50",
};

function Inner({
  children,
  withArrow,
  variant,
}: {
  children: ReactNode;
  withArrow?: boolean;
  variant: Variant;
}) {
  const circle =
    variant === "primary"
      ? "bg-navy/12 text-navy"
      : variant === "ghostDark"
        ? "bg-white/15 text-white"
        : "bg-navy/8 text-navy";
  return (
    <>
      <span>{children}</span>
      {withArrow ? (
        <span
          aria-hidden="true"
          className={`grid h-6 w-6 place-items-center rounded-full transition-transform duration-300 ease-water group-hover:translate-x-0.5 group-hover:-translate-y-px ${circle}`}
        >
          <ArrowRight size={13} weight="bold" />
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    withArrow = false,
    className = "",
  } = props;
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <Inner withArrow={withArrow} variant={variant}>
      {children}
    </Inner>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel ?? (props.target === "_blank" ? "noopener noreferrer" : undefined)}
        className={cls}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type={(props as AsButton).type ?? "button"}
      onClick={(props as AsButton).onClick}
      disabled={(props as AsButton).disabled}
      className={cls}
    >
      {inner}
    </button>
  );
}
