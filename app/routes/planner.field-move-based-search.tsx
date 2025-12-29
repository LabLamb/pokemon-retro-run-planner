/**
 * Pokémon search screen
 * Layer 2: Screen/route
 */

import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { GAMES } from "~/data/games";
import { POKEMON_TYPES, TYPE_COLORS_TAILWIND } from "~/data/pokemon-types";
import { usePokemonSearch } from "~/hooks/use-pokemon-search";
import { useTeam } from "~/lib/team-provider";
import { useLocale } from "~/lib/locale-provider";
import { useGame } from "~/lib/game-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { MultiSelect } from "~/components/ui/multi-select";
import {
  PokemonCard,
  PokemonCardHeader,
  PokemonCardTitle,
  PokemonCardContent,
  PokemonCardHero,
  PokemonCardMedia,
  PokemonCardTypes,
  PokemonCardSkills,
  PokemonCardStats,
  PokemonCardActions,
} from "~/components/ui/pokemon-card";
import { PokemonList } from "~/components/ui/pokemon-list";
import { PokemonCardSkeleton } from "~/components/ui/pokemon-card-skeleton";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { TypeBadgeList } from "~/components/ui/type-badge";
import { FieldSkillsDisplay } from "~/components/ui/field-skills-display";
import { PokemonStats } from "~/components/ui/pokemon-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default function FieldMoveBasedSearchRoute() {
  const { t } = useTranslation();
  const { team, addToTeam } = useTeam();
  const { locale } = useLocale();
  const { gameId, setGameId } = useGame();
  const [selectedHms, setSelectedHms] = React.useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [includeTradeEvoFinals, setIncludeTradeEvoFinals] =
    React.useState(false);
  const [triggerSearch, setTriggerSearch] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);

  // Snapshot filter values when search is triggered
  const [activeGameId, setActiveGameId] = React.useState(gameId);
  const [activeHms, setActiveHms] = React.useState<string[]>([]);
  const [activeTypes, setActiveTypes] = React.useState<string[]>([]);
  const [activeIncludeTradeEvo, setActiveIncludeTradeEvo] =
    React.useState(false);

  const { pokemon, loading, error, availableHms } = usePokemonSearch({
    gameId: activeGameId,
    selectedHms: activeHms,
    selectedTypes: activeTypes,
    includeTradeEvoFinals: activeIncludeTradeEvo,
    locale,
    triggerSearch,
  });

  const handleSearch = () => {
    // Snapshot current filter values
    setActiveGameId(gameId);
    setActiveHms(selectedHms);
    setActiveTypes(selectedTypes);
    setActiveIncludeTradeEvo(includeTradeEvoFinals);

    setTriggerSearch((prev) => !prev);
    setHasSearched(true);
  };

  // Translate field skill labels
  const translatedHms = React.useMemo(
    () =>
      availableHms.map((hm) => ({
        id: hm.id,
        label: t(`fieldSkills.${hm.id}`, hm.label),
      })),
    [availableHms, t]
  );

  // Translate type labels
  const typeOptions = React.useMemo(
    () =>
      POKEMON_TYPES.map((type) => ({
        id: type,
        label: t(`search.types.${type}`, type),
        color: TYPE_COLORS_TAILWIND[type] || "bg-gray-400",
      })),
    [t]
  );

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div>
        <Link to={`/${locale}/planner`}>
          <Button variant="ghost" size="sm" className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("search.backToPlanner", "Back to Planner")}
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">
          {t("search.title", "Pokémon Field Skills Search")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            "search.description",
            "Find Pokémon that can learn specific field skills (HMs) in your selected game."
          )}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("search.filters.title")}</CardTitle>
          <CardDescription>
            {t(
              "search.filters.description",
              "Select a game and apply filters to find Pokémon."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="game-select">
                {t("search.filters.game", "Game")}
              </Label>
              <Select value={gameId} onValueChange={setGameId}>
                <SelectTrigger id="game-select" className="w-full">
                  <SelectValue
                    placeholder={t(
                      "search.filters.gamePlaceholder",
                      "Select a game..."
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {GAMES.map((game) => (
                    <SelectItem key={game.id} value={game.id}>
                      {t(`games.${game.id}`, game.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="md:hidden" />
            <Separator
              orientation="vertical"
              className="hidden md:block self-stretch"
            />

            <div className="flex-1 space-y-2">
              <Label htmlFor="hm-select">
                {t("search.filters.fieldSkills", "Field Skills (HMs)")}
              </Label>
              <MultiSelect
                options={translatedHms}
                selected={selectedHms}
                onChange={setSelectedHms}
                placeholder={t(
                  "search.filters.fieldSkillsPlaceholder",
                  "Select field skills..."
                )}
                disabled={!gameId}
              />
            </div>

            <Separator className="md:hidden" />
            <Separator
              orientation="vertical"
              className="hidden md:block self-stretch"
            />

            <div className="flex-1 space-y-2">
              <Label htmlFor="type-select">
                {t("search.filters.types", "Types (OR filter)")}
              </Label>
              <MultiSelect
                options={typeOptions}
                selected={selectedTypes}
                onChange={setSelectedTypes}
                placeholder={t(
                  "search.filters.typesPlaceholder",
                  "Select up to 2 types..."
                )}
                maxSelections={2}
                disabled={!gameId}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="trade-evo"
              checked={includeTradeEvoFinals}
              onCheckedChange={(checked) =>
                setIncludeTradeEvoFinals(checked === true)
              }
              disabled={!gameId}
            />
            <Label
              htmlFor="trade-evo"
              className="text-sm font-normal cursor-pointer"
            >
              {t(
                "search.filters.includeTradeEvolutions",
                "Include trade-evolution-only Pokémon"
              )}
            </Label>
          </div>

          <Separator />

          <Button
            onClick={handleSearch}
            disabled={loading || !gameId}
            className="w-full"
          >
            {loading
              ? t("search.filters.searching", "Searching...")
              : t("search.filters.search", "Search Pokémon")}
          </Button>
        </CardContent>
      </Card>

      {hasSearched && error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">
              {t("search.error", "Error")}: {error}
            </p>
          </CardContent>
        </Card>
      )}

      {hasSearched && loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {t("search.loading", "Loading Pokémon...")}
            </h2>
          </div>
          <PokemonList>
            {Array.from({ length: 8 }).map((_, i) => (
              <PokemonCardSkeleton key={i} />
            ))}
          </PokemonList>
        </div>
      )}

      {hasSearched && !loading && !error && pokemon.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              {t("search.noResults", "No Pokémon found matching your filters.")}
            </p>
          </CardContent>
        </Card>
      )}

      {hasSearched && !loading && !error && pokemon.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {t("search.results.title", "Results")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("search.results.count", "{{count}} Pokémon found", {
                count: pokemon.length,
              })}
            </p>
          </div>

          <PokemonList>
            {pokemon.map((p) => {
              const isInTeam = team.some(
                (member) => member !== null && member.id === p.id
              );
              const isTeamFull = team.filter((slot) => slot !== null).length >= 6;

              // Translate types for display
              const translatedTypes = p.types.map((type) => ({
                id: type,
                label: t(`search.types.${type}`, type),
              }));

              // Translate field skills for display
              const translatedFieldSkills = p.learnableHms.map((id) => {
                const hm = availableHms.find((h) => h.id === id);
                return { id, label: t(`fieldSkills.${id}`, hm?.label || id) };
              });

              return (
                <PokemonCard key={p.id}>
                  <PokemonCardHero backgroundImage={p.sprite}>
                    <PokemonCardHeader>
                      <PokemonCardTitle>{p.name}</PokemonCardTitle>
                      <PokemonCardTypes>
                        {p.tradeEvolutionOnly && (
                          <Badge variant="outline" className="text-xs">
                            {t("search.tradeOnly", "Trade")}
                          </Badge>
                        )}
                        <TypeBadgeList types={translatedTypes} />
                      </PokemonCardTypes>
                    </PokemonCardHeader>
                    <PokemonCardMedia>
                      <PokemonCardSkills>
                        <FieldSkillsDisplay
                          skills={translatedFieldSkills}
                        />
                      </PokemonCardSkills>
                    </PokemonCardMedia>
                  </PokemonCardHero>
                  <PokemonCardContent>

                    <PokemonCardStats>
                      <PokemonStats
                        stats={{
                          hp: p.baseHp,
                          attack: p.baseAttack,
                          defense: p.baseDefense,
                          spAttack: p.baseSpAttack,
                          spDefense: p.baseSpDefense,
                          speed: p.baseSpeed,
                        }}
                        labels={{
                          hp: `${t("pokemonCard.stats.hp", "HP")}:`,
                          attack: `${t("pokemonCard.stats.atk", "ATK")}:`,
                          defense: `${t("pokemonCard.stats.def", "DEF")}:`,
                          spAttack: `${t("pokemonCard.stats.spAtk", "SP.A")}:`,
                          spDefense: `${t("pokemonCard.stats.spDef", "SP.D")}:`,
                          speed: `${t("pokemonCard.stats.spd", "SPD")}:`,
                        }}
                      />
                    </PokemonCardStats>

                    <PokemonCardActions>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            addToTeam({
                              id: p.id,
                              name: p.name,
                              sprite: p.sprite,
                              types: p.types,
                              baseHp: p.baseHp,
                              baseAttack: p.baseAttack,
                              baseDefense: p.baseDefense,
                              baseSpAttack: p.baseSpAttack,
                              baseSpDefense: p.baseSpDefense,
                              baseSpeed: p.baseSpeed,
                              allLearnableHms: p.learnableHms.map((id) => {
                                const hm = availableHms.find((h) => h.id === id);
                                return { id, label: hm?.label || id };
                              }),
                              tradeEvolutionOnly: p.tradeEvolutionOnly,
                            })
                          }
                          disabled={isInTeam || isTeamFull}
                          variant={isTeamFull && !isInTeam ? "secondary" : "default"}
                          className="flex-1"
                          size="sm"
                        >
                          {isInTeam
                            ? t("search.addedToTeam", "Added to Team")
                            : isTeamFull
                            ? t("search.teamFull", "Team Full")
                            : t("search.addToTeam", "Add to Team")}
                        </Button>
                        <Button
                          onClick={() => {
                            // Favorite callback will be implemented later
                            console.log('Favorite pokemon:', p.id);
                          }}
                          variant="outline"
                          size="sm"
                          className="px-3"
                          aria-label={t("search.addToFavorites", "Add to Favorites")}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </PokemonCardActions>
                  </PokemonCardContent>
                </PokemonCard>
              );
            })}
          </PokemonList>
        </div>
      )}
    </div>
  );
}
