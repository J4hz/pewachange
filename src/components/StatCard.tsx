import { ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";
import type { StatItem } from "@/data/stats";
import { Seal } from "@/components/Seal";

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  unaccounted: AlertTriangle,
} as const;

const trendColor = {
  up: "text-berry",
  down: "text-berry",
  unaccounted: "text-berry",
} as const;

export function StatCard({ item }: { item: StatItem }) {
  const Icon = trendIcon[item.trend];
  const isVerified = Boolean(item.value);

  return (
    <div className="receipt-edge-top flex h-full flex-col border-2 border-t-0 border-ink bg-cream pt-5 shadow-stamp-sm">
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
              {item.label}
            </span>
            <p className="mt-1 text-xs italic text-ink/50">{item.swahiliLabel}</p>
          </div>
          <Icon
            className={`h-5 w-5 shrink-0 ${trendColor[item.trend]}`}
            aria-hidden="true"
          />
        </div>

        <div className="dotted-leader mt-4 pb-2 text-ink/40" />

        <div className="mt-2 flex items-end justify-between gap-3">
          {item.value ? (
            <p className="font-mono text-4xl font-bold tabular-nums text-ink">
              {item.value}
              {item.unit && (
                <span className="ml-1 text-lg font-normal text-ink/60">
                  {item.unit}
                </span>
              )}
            </p>
          ) : (
            <div className="border border-dashed border-ink/30 px-3 py-2">
              <p className="font-mono text-sm text-ink/50">
                Verified figure coming soon
              </p>
            </div>
          )}
          <Seal variant={isVerified ? "verified" : "pending"} size={44} />
        </div>

        <p className="mt-auto pt-4 text-xs text-ink/50">{item.sourceNote}</p>
      </div>
    </div>
  );
}
