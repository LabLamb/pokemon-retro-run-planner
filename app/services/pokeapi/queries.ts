/**
 * React Query hooks for PokeAPI
 * Layer 3: Business logic & hooks
 * 
 * These hooks provide a declarative interface to PokeAPI data with automatic
 * caching, request deduplication, and state management via React Query.
 */

import { useQuery, useQueries, type UseQueryResult } from "@tanstack/react-query";
import { fetchPokemon, fetchPokemonTypes, fetchPokemonEncounters } from "./pokemon";
import { fetchSpecies } from "./species";
import { fetchEvolutionChain } from "./evolution-chain";
import { getRegionalSpecies } from "./pokedex";
import type { Pokemon, PokemonSpecies, EvolutionChain, LocationAreaEncounter } from "./types";

/**
 * Fetch a single Pokémon by name or ID
 */
export function usePokemon(nameOrId: string | number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["pokemon", String(nameOrId)],
    queryFn: () => fetchPokemon(nameOrId),
    enabled: enabled && !!nameOrId,
  });
}

/**
 * Fetch multiple Pokémon in parallel
 * Returns an array of query results
 */
export function usePokemonBatch(namesOrIds: Array<string | number>) {
  return useQueries({
    queries: namesOrIds.map((nameOrId) => ({
      queryKey: ["pokemon", String(nameOrId)],
      queryFn: () => fetchPokemon(nameOrId),
    })),
  });
}

/**
 * Fetch Pokémon types only (lightweight)
 */
export function usePokemonTypes(nameOrId: string | number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["pokemon-types", String(nameOrId)],
    queryFn: () => fetchPokemonTypes(nameOrId),
    enabled: enabled && !!nameOrId,
  });
}

/**
 * Fetch Pokémon species data
 */
export function usePokemonSpecies(nameOrId: string | number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["pokemon-species", String(nameOrId)],
    queryFn: () => fetchSpecies(nameOrId),
    enabled: enabled && !!nameOrId,
  });
}

/**
 * Fetch multiple species in parallel
 */
export function usePokemonSpeciesBatch(namesOrIds: Array<string | number>) {
  return useQueries({
    queries: namesOrIds.map((nameOrId) => ({
      queryKey: ["pokemon-species", String(nameOrId)],
      queryFn: () => fetchSpecies(nameOrId),
    })),
  });
}

/**
 * Fetch evolution chain by ID
 */
export function useEvolutionChain(chainId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["evolution-chain", chainId],
    queryFn: () => fetchEvolutionChain(chainId),
    enabled: enabled && !!chainId,
  });
}

/**
 * Fetch Pokémon encounter locations
 */
export function usePokemonEncounters(nameOrId: string | number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["pokemon-encounters", String(nameOrId)],
    queryFn: () => fetchPokemonEncounters(nameOrId),
    enabled: enabled && !!nameOrId,
  });
}

/**
 * Fetch regional Pokédex species list
 */
export function useRegionalPokedex(pokedexId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["regional-pokedex", pokedexId],
    queryFn: () => getRegionalSpecies(String(pokedexId)),
    enabled: enabled && !!pokedexId,
  });
}

/**
 * Helper type for batch query results
 */
export type BatchQueryResult<T> = UseQueryResult<T, Error>[];
