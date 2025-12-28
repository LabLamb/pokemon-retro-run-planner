/**
 * Pokémon species service
 * Layer 5: Service/IO adapter
 */

import { fetchFromPokeAPI } from "./client";
import type { PokemonSpecies } from "./types";

export async function fetchSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  return fetchFromPokeAPI<PokemonSpecies>(`pokemon-species/${nameOrId}`);
}

export function getEvolutionChainId(species: PokemonSpecies): number {
  const url = species.evolution_chain.url;
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2], 10);
}
