import { DownloadSimple, FilePdf } from "@phosphor-icons/react";
import type { DownloadResource } from "@/lib/site";

export function DownloadCard({ item }: { item: DownloadResource }) {
  const isPlaceholder = item.href === "#";

  return (
    <a
      href={item.href}
      onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
      aria-disabled={isPlaceholder || undefined}
      className="group flex items-center gap-4 rounded-card bg-white p-5 shadow-soft ring-1 ring-line transition-all duration-300 ease-water hover:-translate-y-0.5 hover:shadow-lift"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist text-blue">
        <FilePdf size={24} weight="light" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display font-semibold tracking-tight text-navy">
          {item.title}
        </h3>
        <p className="truncate text-[13.5px] text-slate">{item.description}</p>
      </div>
      <span className="flex shrink-0 items-center gap-2">
        <span className="hidden text-[11px] font-semibold uppercase tracking-eyebrow text-slate sm:inline">
          {item.kind}
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-foam text-navy transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
          <DownloadSimple size={18} weight="bold" />
        </span>
      </span>
    </a>
  );
}
