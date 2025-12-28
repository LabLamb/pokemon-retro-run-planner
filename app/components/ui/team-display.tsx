/**
 * Team display component - shows the current team of 6 Pokémon
 * Layer 1: UI component
 */

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

export interface TeamSlot {
  id: number;
  name: string;
  sprite?: string;
  types: string[];
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpAttack: number;
  baseSpDefense: number;
  baseSpeed: number;
  allLearnableHms: Array<{ id: string; label: string }>;
  tradeEvolutionOnly?: boolean;
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

interface TeamDisplayProps {
  team: (TeamSlot | null)[];
  onRemove?: (index: number) => void;
  onClear?: () => void;
  emptySlotLabel?: string;
  clearButtonLabel?: string;
  teamLabel?: string;
  clearConfirmTitle?: string;
  clearConfirmDescription?: string;
  clearConfirmCancel?: string;
  clearConfirmConfirm?: string;
}

export function TeamDisplay({
  team,
  onRemove,
  onClear,
  emptySlotLabel = "Empty",
  clearButtonLabel = "Clear Team",
  teamLabel = "Your Team",
  clearConfirmTitle = "Clear Team?",
  clearConfirmDescription = "Are you sure you want to clear your entire team? This action cannot be undone.",
  clearConfirmCancel = "Cancel",
  clearConfirmConfirm = "Clear Team",
}: TeamDisplayProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const teamSize = team.filter((slot) => slot !== null).length;

  const handleClearConfirm = () => {
    onClear?.();
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {teamLabel} ({teamSize}/6)
        </span>
        {teamSize > 0 && onClear && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {clearButtonLabel}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{clearConfirmTitle}</DialogTitle>
                <DialogDescription>{clearConfirmDescription}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  {clearConfirmCancel}
                </Button>
                <Button variant="destructive" onClick={handleClearConfirm}>
                  {clearConfirmConfirm}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {team.map((slot, index) => (
          <div key={index} className="relative">
            {slot ? (
              <Card className="overflow-hidden py-2 gap-0 relative">
                {onRemove && (
                  <button
                    onClick={() => onRemove(index)}
                    className={cn(
                      "absolute top-1 right-1 z-10 w-5 h-5 rounded-full",
                      "bg-destructive text-destructive-foreground",
                      "flex items-center justify-center",
                      "border-[2px] border-border",
                      "hover:bg-destructive/90 transition-colors"   
                    )}
                    aria-label={`Remove ${slot.name}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <CardContent className="space-y-1 px-2 pb-0">
                  <div className="flex items-start gap-1.5">
                    <div className="shrink-0">
                      {slot.sprite ? (
                        <img
                          src={slot.sprite}
                          alt={slot.name}
                          className="h-10 w-10 lg:h-12 lg:w-12 object-contain pixelated"
                        />
                      ) : (
                        <div className="h-10 w-10 lg:h-12 lg:w-12 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-semibold capitalize text-[11px] leading-tight truncate">
                          {slot.name}
                        </h4>
                        {slot.tradeEvolutionOnly && (
                          <Badge variant="outline" className="text-[9px] px-1 py-0 shrink-0 leading-none">
                            Trade
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-0.5 flex-wrap">
                        {slot.types.map((type) => (
                          <Badge
                            key={type}
                            className={cn(
                              "capitalize text-white text-[9px] px-1 py-0 leading-none",
                              TYPE_COLORS[type] || "bg-gray-400"
                            )}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-x-1 gap-y-0 text-[9px] leading-tight">
                    <div>
                      <span className="text-muted-foreground">HP:</span>{" "}
                      <span className="font-semibold">{slot.baseHp}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ATK:</span>{" "}
                      <span className="font-semibold">{slot.baseAttack}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">DEF:</span>{" "}
                      <span className="font-semibold">{slot.baseDefense}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">SP.A:</span>{" "}
                      <span className="font-semibold">{slot.baseSpAttack}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">SP.D:</span>{" "}
                      <span className="font-semibold">{slot.baseSpDefense}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">SPD:</span>{" "}
                      <span className="font-semibold">{slot.baseSpeed}</span>
                    </div>
                  </div>

                  {slot.allLearnableHms.length > 0 && (
                    <div className="space-y-0.5 pt-0.5 mt-0.5 border-t">
                      <p className="text-[9px] text-muted-foreground leading-tight">Field Skills:</p>
                      <div className="flex flex-wrap gap-0.5">
                        {slot.allLearnableHms.map((hm) => (
                          <Badge key={hm.id} variant="secondary" className="text-[9px] px-1 py-0 leading-none">
                            {hm.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className={cn(
                "overflow-hidden py-2 gap-0 h-full",
                "bg-muted border-dashed"
              )}>
                <CardContent className="px-2 pb-0 h-full flex items-center justify-center min-h-[120px]">
                  <span className="text-xs text-muted-foreground">
                    {emptySlotLabel}
                  </span>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
