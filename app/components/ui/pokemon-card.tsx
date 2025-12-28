/**
 * Pokémon card component
 * Layer 1: UI component (primitives only)
 */

import * as React from "react";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";

export interface PokemonCardProps {
  name: string;
  sprite: string;
  types: string[];
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpAttack: number;
  baseSpDefense: number;
  baseSpeed: number;
  allLearnableHms: Array<{ id: string; label: string }>;
  tradeEvolutionOnly: boolean;
  onAddToTeam?: () => void;
  addToTeamLabel?: string;
  isAddedToTeam?: boolean;
  className?: string;
}

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export function PokemonCard({
  name,
  sprite,
  types,
  baseHp,
  baseAttack,
  baseDefense,
  baseSpAttack,
  baseSpDefense,
  baseSpeed,
  allLearnableHms,
  tradeEvolutionOnly,
  onAddToTeam,
  addToTeamLabel = "Add to Team",
  isAddedToTeam = false,
  className,
}: PokemonCardProps) {
  return (
    <Card className={cn("overflow-hidden py-3 gap-0 flex flex-col", className)}>
      <CardHeader className="pb-1.5 px-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold capitalize text-base leading-tight">
            {name}
          </h3>
          {tradeEvolutionOnly && (
            <Badge variant="outline" className="text-xs shrink-0">
              Trade
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5 px-3 pb-0 flex-1 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            {sprite ? (
              <img
                src={sprite}
                alt={name}
                className="h-16 w-16 object-contain"
              />
            ) : (
              <div className="h-16 w-16 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">
                No image
              </div>
            )}
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex gap-1 flex-wrap">
              {types.map((type) => (
                <Badge
                  key={type}
                  className={cn(
                    "capitalize text-white text-xs px-2 py-0",
                    TYPE_COLORS[type] || "bg-gray-400"
                  )}
                >
                  {type}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs">
              <div>
                <span className="text-muted-foreground">HP:</span>{" "}
                <span className="font-semibold">{baseHp}</span>
              </div>
              <div>
                <span className="text-muted-foreground">ATK:</span>{" "}
                <span className="font-semibold">{baseAttack}</span>
              </div>
              <div>
                <span className="text-muted-foreground">DEF:</span>{" "}
                <span className="font-semibold">{baseDefense}</span>
              </div>
              <div>
                <span className="text-muted-foreground">SP.A:</span>{" "}
                <span className="font-semibold">{baseSpAttack}</span>
              </div>
              <div>
                <span className="text-muted-foreground">SP.D:</span>{" "}
                <span className="font-semibold">{baseSpDefense}</span>
              </div>
              <div>
                <span className="text-muted-foreground">SPD:</span>{" "}
                <span className="font-semibold">{baseSpeed}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1 pt-1.5 mt-1.5 border-t">
          <p className="text-xs text-muted-foreground">Field Skills:</p>
          <div className="flex flex-wrap gap-1">
            {allLearnableHms.length > 0 ? (
              allLearnableHms.map((hm) => (
                <Badge
                  key={hm.id}
                  variant="secondary"
                  className="text-xs px-1.5 py-0"
                >
                  {hm.label}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">None</span>
            )}
          </div>
        </div>

        {onAddToTeam && (
          <div className="pt-2 mt-auto">
            <Button
              onClick={onAddToTeam}
              disabled={isAddedToTeam}
              className="w-full"
              size="sm"
            >
              {isAddedToTeam ? "Added to Team" : addToTeamLabel}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
