import {
  Drop,
  Flask,
  Tag,
  TestTube,
  Factory,
  Package,
  ShieldCheck,
  MapPin,
  Medal,
  Truck,
  Sparkle,
  ArrowRight,
  ArrowUpRight,
  List,
  X,
  WhatsappLogo,
  EnvelopeSimple,
  Phone,
  Play,
  DownloadSimple,
  FilePdf,
  CaretDown,
  Check,
  Quotes,
  type IconProps,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

const REGISTRY: Record<string, PhosphorIcon> = {
  Drop,
  Flask,
  Tag,
  TestTube,
  Factory,
  Package,
  ShieldCheck,
  MapPin,
  Medal,
  Truck,
  Sparkle,
  ArrowRight,
  ArrowUpRight,
  List,
  X,
  WhatsappLogo,
  EnvelopeSimple,
  Phone,
  Play,
  DownloadSimple,
  FilePdf,
  CaretDown,
  Check,
  Quotes,
};

type IconName = keyof typeof REGISTRY | string;

/**
 * Single icon family (Phosphor), one weight for the whole product.
 * Default weight "light" gives the precise, premium hairline look.
 */
export function Icon({
  name,
  weight = "light",
  ...rest
}: { name: IconName } & IconProps) {
  const Cmp = (REGISTRY[name] ?? Drop) as ComponentType<IconProps>;
  return <Cmp weight={weight} {...rest} />;
}
