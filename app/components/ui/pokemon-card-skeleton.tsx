/**
 * Pokémon card skeleton loading component
 * Layer 1: UI component (primitives only)
 */

import { Card, CardContent, CardHeader } from "./card";
import { Skeleton } from "./skeleton";

export function PokemonCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-center">
          <Skeleton className="h-24 w-24 rounded" />
        </div>

        <div className="flex gap-1 justify-center">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-3 w-20" />
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
