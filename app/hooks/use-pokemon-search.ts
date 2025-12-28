/**
 * Pokémon search business logic hook
 * Layer 3: Business logic & hooks
 * 
 * OPTIMIZATION STRATEGY (via React Query):
 * 1. Automatic caching: React Query caches all API responses
 * 2. Request deduplication: Concurrent requests for same resource share a single fetch
 * 3. Parallel fetching: useQueries fetches multiple Pokémon simultaneously
 * 4. Smart refetching: Stale data is refetched in background
 * 5. Optimistic updates: UI updates immediately while data loads
 */

import { useState, useEffect, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getGameById } from "~/data/games";
import { getFieldSkillById, FIELD_SKILLS, getFieldSkillsForVersionGroup } from "~/data/field-skills";
import { getRegionalSpecies } from "~/services/pokeapi/pokedex";
import { filterObtainablePokemon } from "~/services/pokeapi/availability";
import {
  fetchPokemon,
  getLearnableMoves,
} from "~/services/pokeapi/pokemon";
import { fetchSpecies, getEvolutionChainId } from "~/services/pokeapi/species";
import {
  fetchEvolutionChain,
  isTradeEvolution,
  getAllSpeciesInChain,
} from "~/services/pokeapi/evolution-chain";
import type { EvolutionChain } from "~/services/pokeapi/types";
import type { Locale } from "~/lib/i18n";
import { getLocalizedName } from "~/lib/pokeapi-locale";

export interface SearchablePokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpAttack: number;
  baseSpDefense: number;
  baseSpeed: number;
  tradeEvolutionOnly: boolean;
  learnableHms: string[]; // ALL learnable field skills for this Pokémon in the version group
}

export interface PokemonSearchFilters {
  gameId: string;
  selectedHms: string[];
  selectedTypes: string[];
  includeTradeEvoFinals: boolean;
  triggerSearch?: boolean;
  locale?: Locale;
}

export interface PokemonSearchResult {
  pokemon: SearchablePokemon[];
  loading: boolean;
  error: string | null;
  availableHms: Array<{ id: string; label: string }>;
}

export function usePokemonSearch(
  filters: PokemonSearchFilters
): PokemonSearchResult {
  const [availableHms, setAvailableHms] = useState<
    Array<{ id: string; label: string }>
  >([]);
  const [obtainableSpecies, setObtainableSpecies] = useState<string[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [loadingSpecies, setLoadingSpecies] = useState(false);

  const { gameId, selectedHms, selectedTypes, includeTradeEvoFinals, triggerSearch, locale = "en" } = filters;

  // Effect 1: Load available HMs when game changes (lightweight)
  useEffect(() => {
    async function loadAvailableHms() {
      if (!gameId) {
        setAvailableHms([]);
        setObtainableSpecies([]);
        return;
      }

      try {
        const game = getGameById(gameId);
        if (!game) {
          throw new Error(`Game not found: ${gameId}`);
        }

        const hms = getFieldSkillsForVersionGroup(game.versionGroup);
        setAvailableHms(hms.map((hm) => ({ id: hm.id, label: hm.label })));
      } catch (err) {
        setSearchError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    loadAvailableHms();
  }, [gameId]);

  // Effect 2: Load obtainable species when search is triggered
  useEffect(() => {
    async function loadObtainableSpecies() {
      if (!gameId || triggerSearch === undefined) {
        return;
      }

      setSearchError(null);
      setLoadingSpecies(true);

      try {
        const game = getGameById(gameId);
        if (!game) {
          throw new Error(`Game not found: ${gameId}`);
        }

        // Get regional Pokédex species list
        const regionalSpecies = await getRegionalSpecies(game.pokedexId);

        // Filter to obtainable Pokémon in this version
        const obtainable = await filterObtainablePokemon(
          regionalSpecies,
          game.version
        );

        setObtainableSpecies(obtainable);
      } catch (err) {
        setSearchError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setObtainableSpecies([]);
      } finally {
        setLoadingSpecies(false);
      }
    }

    loadObtainableSpecies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSearch]);

  // Use React Query to fetch all Pokémon data in parallel
  const game = gameId ? getGameById(gameId) : null;
  const versionGroup = game?.versionGroup || "";

  const pokemonQueries = useQueries({
    queries: obtainableSpecies.map((speciesName) => ({
      queryKey: ["pokemon-search", speciesName, versionGroup],
      queryFn: () => fetchPokemon(speciesName),
      enabled: obtainableSpecies.length > 0,
      staleTime: 1000 * 60 * 10, // 10 minutes
    })),
  });

  // Fetch species data for localized names
  const speciesQueries = useQueries({
    queries: obtainableSpecies.map((speciesName) => ({
      queryKey: ["species-search", speciesName],
      queryFn: () => fetchSpecies(speciesName),
      enabled: obtainableSpecies.length > 0,
      staleTime: 1000 * 60 * 10, // 10 minutes
    })),
  });

  // Process results and apply filters
  const { pokemon, loading, error } = useMemo(() => {
    // Check if any queries are still loading
    const isLoadingQueries = pokemonQueries.some((q) => q.isLoading) || speciesQueries.some((q) => q.isLoading);
    const isLoading = loadingSpecies || isLoadingQueries;
    
    // Check for errors
    const queryError = pokemonQueries.find((q) => q.error)?.error;
    const errorMessage = searchError || (queryError ? String(queryError) : null);

    // If still loading species list or no species loaded yet, return early
    if (loadingSpecies || (!obtainableSpecies.length && triggerSearch !== undefined)) {
      return { pokemon: [], loading: isLoading, error: errorMessage };
    }

    // If queries are still loading, return early
    if (isLoadingQueries) {
      return { pokemon: [], loading: true, error: errorMessage };
    }

    // Process successful results
    const results: SearchablePokemon[] = [];
    const hmMoveNames = selectedHms
      .map((id) => getFieldSkillById(id)?.moveName)
      .filter((name): name is string => name !== undefined);

    for (let i = 0; i < pokemonQueries.length; i++) {
      const query = pokemonQueries[i];
      const speciesQuery = speciesQueries[i];
      if (!query.data || !speciesQuery.data) continue;

      const pokemonData = query.data;
      const speciesData = speciesQuery.data;
      
      // Get localized name
      const localizedName = getLocalizedName(speciesData.names, locale);
      const types = pokemonData.types.map((t) => t.type.name);

      // Filter by type if specified
      if (selectedTypes.length > 0) {
        const hasMatchingType = types.some((type) => selectedTypes.includes(type));
        if (!hasMatchingType) continue;
      }

      // Filter by HM learnability
      const learnableSelectedHms = getLearnableMoves(
        pokemonData.moves,
        hmMoveNames,
        versionGroup
      );

      if (hmMoveNames.length > 0) {
        const canLearnAllHms = hmMoveNames.every((hmMove) =>
          learnableSelectedHms.includes(hmMove)
        );
        if (!canLearnAllHms) continue;
      }

      // Get ALL field skills for this version group
      const allFieldSkills = getFieldSkillsForVersionGroup(versionGroup);
      const allFieldSkillMoveNames = allFieldSkills.map((skill) => skill.moveName);
      const allLearnableFieldSkillMoves = getLearnableMoves(
        pokemonData.moves,
        allFieldSkillMoveNames,
        versionGroup
      );

      const learnableHmIds = allLearnableFieldSkillMoves
        .map((moveName) => FIELD_SKILLS.find((skill) => skill.moveName === moveName)?.id)
        .filter((id): id is string => id !== undefined);

      // Extract stats
      const hpStat = pokemonData.stats.find((s) => s.stat.name === "hp");
      const attackStat = pokemonData.stats.find((s) => s.stat.name === "attack");
      const defenseStat = pokemonData.stats.find((s) => s.stat.name === "defense");
      const spAttackStat = pokemonData.stats.find((s) => s.stat.name === "special-attack");
      const spDefenseStat = pokemonData.stats.find((s) => s.stat.name === "special-defense");
      const speedStat = pokemonData.stats.find((s) => s.stat.name === "speed");

      // Get sprite
      const sprite =
        pokemonData.sprites.other?.["official-artwork"]?.front_default ||
        pokemonData.sprites.other?.home?.front_default ||
        pokemonData.sprites.front_default ||
        "";

      results.push({
        id: pokemonData.id,
        name: localizedName,
        sprite,
        types,
        baseHp: hpStat?.base_stat || 0,
        baseAttack: attackStat?.base_stat || 0,
        baseDefense: defenseStat?.base_stat || 0,
        baseSpAttack: spAttackStat?.base_stat || 0,
        baseSpDefense: spDefenseStat?.base_stat || 0,
        baseSpeed: speedStat?.base_stat || 0,
        tradeEvolutionOnly: false, // We'll handle this separately if needed
        learnableHms: learnableHmIds,
      });
    }

    return { pokemon: results, loading: false, error: errorMessage };
  }, [pokemonQueries, speciesQueries, obtainableSpecies, selectedHms, selectedTypes, versionGroup, searchError, loadingSpecies, triggerSearch, locale]);

  return { pokemon, loading, error, availableHms };
}


