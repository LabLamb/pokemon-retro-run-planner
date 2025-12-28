/**
 * Pokémon list/grid component
 * Layer 1: UI component (primitives only)
 */

import * as React from "react";
import { cn } from "~/lib/utils";

export interface PokemonListProps {
  children: React.ReactNode;
  className?: string;
}

export function PokemonList({ children, className }: PokemonListProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}
