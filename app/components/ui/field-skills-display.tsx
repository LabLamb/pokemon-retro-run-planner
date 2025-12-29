/**
 * Field skills display component
 * Layer 1: UI component (primitives only)
 */

import { Badge } from "./badge";
import { cn } from "~/lib/utils";

export interface FieldSkillsDisplayProps {
  skills: Array<{ id: string; label: string }>;
  label?: string;
  emptyText?: string;
  className?: string;
}

export function FieldSkillsDisplay({
  skills,
  label,
  emptyText = "None",
  className,
}: FieldSkillsDisplayProps) {
  // Don't render anything if no skills and no label
  if (skills.length === 0 && !label) {
    return null;
  }

  return (
    <div className={cn("space-y-1", className)}>
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap gap-1">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="text-xs px-1.5 py-0"
            >
              {skill.label}
            </Badge>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">{emptyText}</span>
        )}
      </div>
    </div>
  );
}
