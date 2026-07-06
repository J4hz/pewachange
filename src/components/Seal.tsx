import { useId } from "react";
import { Check, Clock } from "lucide-react";

interface SealProps {
  /** decorative: hero emblem. verified/pending: stamp mark on a stat card. */
  variant?: "decorative" | "verified" | "pending";
  /** Text set around the ring. */
  label?: string;
  size?: number;
  className?: string;
}

/**
 * The campaign's signature mark: a certification-stamp emblem that doubles
 * as a campaign-pin motif. "verified"/"pending" states are the visual
 * expression of the site's core rule — a figure is only stamped once it's
 * sourced, otherwise the ring stays dashed and open. Ring text renders via
 * SVG textPath, so each instance needs its own path id (useId).
 */
export function Seal({
  variant = "decorative",
  label = "DAGORETTI NORTH · MP 2027 · ",
  size = 128,
  className = "",
}: SealProps) {
  const pathId = useId();
  const isPending = variant === "pending";
  const ringColor = isPending ? "#9C7A3C" : "#B43052";
  const repeatedLabel = label.repeat(3);

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={
        variant === "verified"
          ? "Verified figure"
          : variant === "pending"
          ? "Pending verification"
          : "Ombaka 2027 campaign seal"
      }
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path
          id={pathId}
          d="M 50,50 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke={ringColor}
          strokeWidth={variant === "decorative" ? 2 : 1.5}
          strokeDasharray={isPending ? "3 3" : undefined}
        />
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="#9C7A3C"
          strokeWidth="0.75"
        />
        <text
          fontSize="6.4"
          fontWeight={700}
          letterSpacing="0.3"
          fill="#111111"
          fillOpacity={0.6}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {repeatedLabel}
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {variant === "verified" && (
          <Check className="h-8 w-8 text-berry" strokeWidth={2.5} aria-hidden="true" />
        )}
        {variant === "pending" && (
          <Clock className="h-7 w-7 text-brass" strokeWidth={2} aria-hidden="true" />
        )}
        {variant === "decorative" && (
          <span className="font-serif text-2xl font-semibold text-ink">
            VO
          </span>
        )}
      </div>
    </div>
  );
}
