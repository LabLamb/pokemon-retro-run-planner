/**
 * Pokemon stats display component
 * Layer 1: UI component (primitives only)
 */

import { cn } from "~/lib/utils";

export type StatKey =
  | "hp"
  | "attack"
  | "defense"
  | "spAttack"
  | "spDefense"
  | "speed";

export type StatLevel = "low" | "medium" | "high" | "very-high";

export interface PokemonStatsProps {
  stats: Record<StatKey, number>;
  labels?: Partial<Record<StatKey, string>>;
  className?: string;
  /**
   * Show stat level indicators (icons)
   * @default true
   */
  showIndicators?: boolean;
  /**
   * Custom thresholds for stat levels
   * @default { low: 60, medium: 100, high: 130 }
   */
  thresholds?: {
    low: number;
    medium: number;
    high: number;
  };
}

const DEFAULT_LABELS: Record<StatKey, string> = {
  hp: "HP:",
  attack: "ATK:",
  defense: "DEF:",
  spAttack: "SP.A:",
  spDefense: "SP.D:",
  speed: "SPD:",
};

const DEFAULT_THRESHOLDS = {
  low: 60,
  medium: 100,
  high: 130,
};

const STAT_ORDER: StatKey[] = [
  "hp",
  "attack",
  "defense",
  "spAttack",
  "spDefense",
  "speed",
];

/**
 * Simple triangle indicator component
 */
function Triangle({
  direction,
  className,
}: {
  direction: "up" | "down";
  className?: string;
}) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      {direction === "up" ? (
        <path d="M6 2 L10 10 L2 10 Z" fill="currentColor" />
      ) : (
        <path d="M6 10 L10 2 L2 2 Z" fill="currentColor" />
      )}
    </svg>
  );
}

/**
 * Determine stat level based on value and thresholds
 */
function getStatLevel(
  value: number,
  thresholds: { low: number; medium: number; high: number }
): StatLevel {
  if (value < thresholds.low) return "low";
  if (value < thresholds.medium) return "medium";
  if (value < thresholds.high) return "high";
  return "very-high";
}

/**
 * Get icon component and styling for stat level
 */
function getStatIndicator(level: StatLevel): {
  direction: "up" | "down";
  className: string;
  ariaLabel: string;
} {
  switch (level) {
    case "very-high":
      return {
        direction: "up",
        className: "text-emerald-500",
        ariaLabel: "Exceptional stat",
      };
    case "high":
      return {
        direction: "up",
        className: "text-green-500",
        ariaLabel: "High stat",
      };
    case "medium":
      return {
        direction: "up",
        className: "text-yellow-400",
        ariaLabel: "Medium stat",
      };
    case "low":
      return {
        direction: "down",
        className: "text-red-500",
        ariaLabel: "Low stat",
      };
  }
}

export function PokemonStats({
  stats,
  labels,
  className,
  showIndicators = true,
  thresholds = DEFAULT_THRESHOLDS,
}: PokemonStatsProps) {
  const effectiveLabels = { ...DEFAULT_LABELS, ...labels };

  return (
    <div className={cn("grid grid-cols-3 gap-x-2 gap-y-1 text-xs", className)}>
      {STAT_ORDER.map((key) => {
        const value = stats[key];
        const level = getStatLevel(value, thresholds);
        const {
          direction,
          className: iconClassName,
          ariaLabel,
        } = getStatIndicator(level);

        return (
          <div key={key} className="flex items-center gap-0.5">
            <span className="text-muted-foreground">
              {effectiveLabels[key]}
            </span>
            <span className="font-semibold ml-1">{value}</span>
            {showIndicators && (
              <Triangle
                direction={direction}
                className={iconClassName}
                aria-label={ariaLabel}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
