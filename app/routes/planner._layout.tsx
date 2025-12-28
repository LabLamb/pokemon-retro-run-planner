/**
 * Planner layout - shared header for all planner routes
 * Layer 2: Layout
 */

import { Outlet, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Flame } from "lucide-react";
import { GlobalSwitchers } from "~/components/global-switchers";
import { LocaleProvider } from "~/lib/locale-provider";
import { isValidLocale, defaultLocale, type Locale } from "~/lib/i18n";
import { useTeam } from "~/lib/team-provider";
import { TeamDisplay } from "~/components/ui/team-display";

export default function PlannerLayout() {
  const { t } = useTranslation();
  const params = useParams();
  const { team, removeFromTeam, clearTeam } = useTeam();
  
  // Extract and validate locale from URL params
  const locale: Locale = params.locale && isValidLocale(params.locale) 
    ? params.locale as Locale
    : defaultLocale;

  return (
    <LocaleProvider locale={locale}>
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
            <TeamDisplay
              team={team}
              onRemove={removeFromTeam}
              onClear={clearTeam}
              emptySlotLabel={t("team.emptySlot", "Empty")}
              clearButtonLabel={t("team.clearButton", "Clear Team")}
              teamLabel={t("team.label", "Your Team")}
              clearConfirmTitle={t("team.clearConfirmTitle", "Clear Team?")}
              clearConfirmDescription={t("team.clearConfirmDescription", "Are you sure you want to clear your entire team? This action cannot be undone.")}
              clearConfirmCancel={t("team.clearConfirmCancel", "Cancel")}
              clearConfirmConfirm={t("team.clearConfirmConfirm", "Clear Team")}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </LocaleProvider>
  );
}
