/**
 * Type badge component
 * Layer 1: UI component (primitives only)
 */

import { Badge } from "./badge";
import { TYPE_COLORS_TAILWIND } from "~/data/pokemon-types";
import { cn } from "~/lib/utils";

export interface TypeBadgeProps {
  typeId: string;
  label: string;
  className?: string;
}

export function TypeBadge({ typeId, label, className }: TypeBadgeProps) {
  return (
    <Badge
      className={cn(
        "text-white text-sm px-2.5 py-0.5",
        TYPE_COLORS_TAILWIND[typeId as keyof typeof TYPE_COLORS_TAILWIND] || "bg-gray-400",
        className
      )}
    >
      {label}
    </Badge>
  );
}

export interface TypeBadgeListProps {
  types: Array<{ id: string; label: string }>;
  className?: string;
}

export function TypeBadgeList({ types, className }: TypeBadgeListProps) {
  return (
    <div className={cn("flex gap-1 flex-wrap", className)}>
      {types.map((type) => (
        <TypeBadge key={type.id} typeId={type.id} label={type.label} />
      ))}
    </div>
  );
}
