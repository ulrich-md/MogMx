import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghostDark" | "outlineDark";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Show the trailing arrow */
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
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-sans font-semibold uppercase tracking-[0.12em] transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-water active:scale-[0.98] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[11.5px]",
  lg: "h-14 px-7 text-[12.5px]",
};

const variants: Record<Variant, string> = {
  // Coral pill: the single primary action (navy on coral = AA).
  primary: "bg-accent text-ink shadow-accent hover:bg-ink hover:text-white",
  // Alias of primary, kept for call-site intent.
  accent: "bg-accent text-ink shadow-accent hover:bg-ink hover:text-white",
  // Hairline pill for secondary actions on paper.
  secondary: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  // Solid paper pill for dark surfaces.
  ghostDark: "bg-white text-ink hover:bg-mist",
  // Hairline pill for dark surfaces.
  outlineDark: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink",
};

function Inner({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span className="relative">{children}</span>
      {withArrow ? (
        <span aria-hidden="true" className="relative -mr-1 grid h-5 w-5 place-items-center overflow-hidden">
          <ArrowUpRight
            size={15}
            weight="bold"
            className="transition-transform duration-500 ease-water group-hover:-translate-y-5 group-hover:translate-x-5"
          />
          <ArrowUpRight
            size={15}
            weight="bold"
            className="absolute -translate-x-5 translate-y-5 transition-transform duration-500 ease-water group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", withArrow = false, className = "" } = props;
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = <Inner withArrow={withArrow}>{children}</Inner>;

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
