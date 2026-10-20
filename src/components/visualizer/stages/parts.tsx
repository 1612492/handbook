import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StageShell({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <div className={cn("mt-3", className)}>{children}</div>
    </div>
  );
}

export function StageChip({ label }: { label: string }) {
  return (
    <span className="rounded-lg border border-border/70 bg-background/80 px-2 py-1 text-xs font-medium">
      {label}
    </span>
  );
}

export function StageChips({ labels }: { labels: string[] }) {
  if (labels.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => (
        <StageChip key={label} label={label} />
      ))}
    </div>
  );
}

export function StageLegend({
  items,
}: {
  items: { label: string; className: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item.label}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span className={cn("size-2 rounded-full", item.className)} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
