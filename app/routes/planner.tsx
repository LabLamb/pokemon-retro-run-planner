import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../lib/locale-provider";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Languages, Flame, Leaf, Zap, Sparkles } from "lucide-react";

const locales = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "pt", label: "Português" },
  { code: "zh-Hans", label: "简体中文" },
  { code: "zh-Hant", label: "繁體中文" },
];

export default function Planner() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  const currentLocaleLabel = locales.find((l) => l.code === locale)?.label || "English";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-[3px] border-border sticky top-0 bg-background z-10 shadow-[0_4px_0_0] shadow-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flame className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">
              {t("planner.title", "Pokémon Retro Run Planner")}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Locale Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Languages className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentLocaleLabel}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map(({ code, label }) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLocale(code as any)}
                    className={locale === code ? "bg-accent" : ""}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="game-select" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="game-select">
              {t("planner.selectGame", "Select Game")}
            </TabsTrigger>
            <TabsTrigger value="team-builder">
              {t("planner.teamPlanner", "Team Builder")}
            </TabsTrigger>
            <TabsTrigger value="route-planner">
              {t("planner.routePlanner", "Route Planner")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game-select">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:scale-[1.02] transition-transform cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-primary" />
                      Fire Red
                    </CardTitle>
                    <Badge variant="default">Gen III</Badge>
                  </div>
                  <CardDescription>
                    {t("planner.fireRedDesc", "Return to Kanto with enhanced graphics and features")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">
                    <Sparkles className="h-4 w-4" />
                    {t("planner.selectButton", "Select Game")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:scale-[1.02] transition-transform cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      Leaf Green
                    </CardTitle>
                    <Badge variant="default">Gen III</Badge>
                  </div>
                  <CardDescription>
                    {t("planner.leafGreenDesc", "Experience the classic journey through Kanto")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">
                    <Sparkles className="h-4 w-4" />
                    {t("planner.selectButton", "Select Game")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:scale-[1.02] transition-transform cursor-pointer opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-muted-foreground" />
                      More Games
                    </CardTitle>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                  <CardDescription>
                    {t("planner.moreGamesDesc", "Ruby, Sapphire, Emerald and more!")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg" variant="secondary" disabled>
                    {t("planner.comingSoon", "Coming Soon")}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t("planner.features", "Features")}</CardTitle>
                  <CardDescription>
                    {t("planner.featuresDesc", "Everything you need for the perfect run")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {t("planner.featureTeamBuilder", "Team Builder")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("planner.featureRouting", "Route Planning")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("planner.featureTypeChart", "Type Chart")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("planner.featureMovesets", "Moveset Analysis")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("planner.featureLocations", "Pokémon Locations")}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team-builder">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">
                  {t("planner.teamPlanner", "Team Builder")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t("planner.teamPlannerDescription", "Build your perfect team for your Pokémon journey.")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t("planner.teamBuilderInfo", "Select a game first to start building your team!")}
                </p>
                <div className="flex gap-2">
                  <Button variant="default">
                    {t("planner.addPokemon", "Add Pokémon")}
                  </Button>
                  <Button variant="outline">
                    {t("planner.importTeam", "Import Team")}
                  </Button>
                  <Button variant="ghost">
                    {t("planner.clearTeam", "Clear Team")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="route-planner">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">
                  {t("planner.routePlanner", "Route Planner")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t("planner.routePlannerDescription", "Plan your journey through the game step by step.")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t("planner.routePlannerInfo", "Chart your path to become a Pokémon Champion!")}
                </p>
                <div className="flex gap-2">
                  <Button variant="default">
                    {t("planner.createRoute", "Create Route")}
                  </Button>
                  <Button variant="secondary">
                    {t("planner.loadTemplate", "Load Template")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
