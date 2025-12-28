/**
 * Pokédex service for regional species lists
 * Layer 5: Service/IO adapter
 */

import { fetchFromPokeAPI } from "./client";
import type { Pokedex } from "./types";

export async function fetchPokedex(pokedexId: string): Promise<Pokedex> {
  return fetchFromPokeAPI<Pokedex>(`pokedex/${pokedexId}`);
}

export function getSpeciesNamesFromPokedex(pokedex: Pokedex): string[] {
  return pokedex.pokemon_entries.map((entry) => entry.pokemon_species.name);
}

/**
 * Get all regional species (cached after first fetch)
 */
export async function getRegionalSpecies(pokedexId: string): Promise<string[]> {
  const pokedex = await fetchPokedex(pokedexId);
  return getSpeciesNamesFromPokedex(pokedex);
}

/**
 * Get a paginated slice of regional species
 * Useful for loading Pokemon in batches
 */
export async function getRegionalSpeciesPaginated(
  pokedexId: string,
  offset: number = 0,
  limit: number = 20
): Promise<{ species: string[]; total: number; hasMore: boolean }> {
  const pokedex = await fetchPokedex(pokedexId);
  const allSpecies = getSpeciesNamesFromPokedex(pokedex);
  const total = allSpecies.length;
  const species = allSpecies.slice(offset, offset + limit);
  const hasMore = offset + limit < total;

  return { species, total, hasMore };
}
