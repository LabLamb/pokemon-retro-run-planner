/**
 * Planner layout - shared header for all planner routes
 * Layer 2: Layout
 */

import * as React from "react";
import { Outlet, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Flame, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { GlobalSwitchers } from "~/components/global-switchers";
import { LocaleProvider } from "~/lib/locale-provider";
import { GameProvider } from "~/lib/game-provider";
import { isValidLocale, defaultLocale, type Locale } from "~/lib/i18n";
import { useTeam } from "~/lib/team-provider";
import {
  TeamDisplay,
  TeamDisplayHeader,
  TeamDisplayLabel,
  TeamDisplayAction,
  TeamDisplayGrid,
  TeamDisplaySlot,
} from "~/components/ui/team-display";
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
import { TYPE_COLORS_TAILWIND } from "~/data/pokemon-types";

export default function PlannerLayout() {
  const { t } = useTranslation();
  const params = useParams();
  const { team, removeFromTeam, clearTeam } = useTeam();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  
  // Extract and validate locale from URL params
  const locale: Locale = params.locale && isValidLocale(params.locale) 
    ? params.locale as Locale
    : defaultLocale;

  const teamSize = team.filter((slot) => slot !== null).length;

  const handleClearConfirm = () => {
    clearTeam();
    setIsDialogOpen(false);
  };

  return (
    <LocaleProvider locale={locale}>
      <GameProvider>
        <div className="min-h-screen flex flex-col">
          {/* Shared Header */}
          <header className="border-b-[3px] border-border sticky top-0 bg-background z-10 shadow-[0_4px_0_0] shadow-border/40">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Flame className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold">
                    {t("planner.title", "Pokémon Retro Run Planner")}
                  </h1>
                </div>
                
                <GlobalSwitchers />
              </div>
              
              {/* Team Display */}
              <TeamDisplay>
                <TeamDisplayHeader>
                  <TeamDisplayLabel>
                    {t("team.label", "Your Team")} ({teamSize}/6)
                  </TeamDisplayLabel>
                  {teamSize > 0 && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <TeamDisplayAction>
                          {t("team.clearButton", "Clear Team")}
                        </TeamDisplayAction>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {t("team.clearConfirmTitle", "Clear Team?")}
                          </DialogTitle>
                          <DialogDescription>
                            {t(
                              "team.clearConfirmDescription",
                              "Are you sure you want to clear your entire team? This action cannot be undone."
                            )}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            {t("team.clearConfirmCancel", "Cancel")}
                          </Button>
                          <Button variant="destructive" onClick={handleClearConfirm}>
                            {t("team.clearConfirmConfirm", "Clear Team")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </TeamDisplayHeader>

                <TeamDisplayGrid>
                  {team.map((slot, index) => (
                    <TeamDisplaySlot key={index}>
                      {slot ? (
                        <Card className="overflow-hidden py-2 gap-0 relative">
                          <button
                            onClick={() => removeFromTeam(index)}
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
                                      {t("team.tradeOnly", "Trade")}
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="flex gap-0.5 flex-wrap">
                                  {slot.types.map((type) => (
                                    <Badge
                                      key={type}
                                      className={cn(
                                        "capitalize text-white text-[9px] px-1 py-0 leading-none",
                                        TYPE_COLORS_TAILWIND[type as keyof typeof TYPE_COLORS_TAILWIND] || "bg-gray-400"
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
                                <p className="text-[9px] text-muted-foreground leading-tight">
                                  {t("team.fieldSkills", "Field Skills:")}
                                </p>
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
                              {t("team.emptySlot", "Empty")}
                            </span>
                          </CardContent>
                        </Card>
                      )}
                    </TeamDisplaySlot>
                  ))}
                </TeamDisplayGrid>
              </TeamDisplay>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </GameProvider>
    </LocaleProvider>
  );
}
