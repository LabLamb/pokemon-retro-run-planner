/**
 * Multi-select component with chips
 * Layer 1: UI component (primitives only)
 */

import * as React from "react";
import { cn } from "~/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { X, XCircle } from "lucide-react";

export interface MultiSelectOption {
  id: string;
  label: string;
  color?: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  maxSelections?: number;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  maxSelections,
  className,
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleToggle = (id: string) => {
    if (disabled) return;
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      if (maxSelections && selected.length >= maxSelections) {
        return;
      }
      onChange([...selected, id]);
    }
  };

  const handleRemove = (id: string) => {
    if (disabled) return;
    onChange(selected.filter((s) => s !== id));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange([]);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          selected.length > 0 && "pr-9"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-muted-foreground">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selected.map((id) => {
              const option = options.find((o) => o.id === id);
              return option ? (
                <Badge
                  key={id}
                  variant="secondary"
                  className={cn(
                    "gap-1",
                    option.color && "text-white border-transparent",
                    option.color
                  )}
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(id);
                    }}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null;
            })}
          </div>
        )}
      </div>

      {selected.length > 0 && !disabled && (
        <button
          type="button"
          onClick={handleClearAll}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full outline-none ring-offset-background hover:bg-accent focus:ring-2 focus:ring-ring focus:ring-offset-2 p-0.5"
        >
          <XCircle className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover p-2 shadow-md">
          <div className="max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = selected.includes(option.id);
              const isDisabled =
                !isSelected &&
                maxSelections !== undefined &&
                selected.length >= maxSelections;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleToggle(option.id)}
                  disabled={isDisabled}
                  className={cn(
                    "w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-accent",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-4 w-4 border rounded-sm flex items-center justify-center",
                        isSelected && "bg-primary border-primary"
                      )}
                    >
                      {isSelected && (
                        <div className="h-2 w-2 bg-primary-foreground rounded-sm" />
                      )}
                    </div>
                    {option.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
