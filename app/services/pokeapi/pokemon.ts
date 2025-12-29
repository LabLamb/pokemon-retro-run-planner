/**
 * Pokémon data service
 * Layer 5: Service/IO adapter
 */

import { fetchFromPokeAPI } from "./client";
import type {
  Pokemon,
  LocationAreaEncounter,
  PokemonMove,
} from "./types";

export interface PokemonCore {
  id: number;
  name: string;
  types: string[];
  baseAttack: number;
  baseSpAttack: number;
  sprite: string;
}

/**
 * Fetch full Pokemon data (cached)
 * Use this when you need multiple fields to avoid redundant API calls
 */
export async function fetchPokemon(
  nameOrId: string | number
): Promise<Pokemon> {
  return fetchFromPokeAPI<Pokemon>(`pokemon/${nameOrId}`);
}

/**
 * Fetch core Pokemon data with all essential fields
 * This is optimized to reuse the cached full Pokemon object
 */
export async function fetchPokemonCore(
  nameOrId: string | number
): Promise<PokemonCore> {
  const pokemon = await fetchPokemon(nameOrId);

  const attackStat = pokemon.stats.find((s) => s.stat.name === "attack");
  const spAttackStat = pokemon.stats.find(
    (s) => s.stat.name === "special-attack"
  );

  // Prefer official artwork, fallback to home sprite, then default
  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.other?.home?.front_default ||
    pokemon.sprites.front_default ||
    "";

  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((t) => t.type.name),
    baseAttack: attackStat?.base_stat || 0,
    baseSpAttack: spAttackStat?.base_stat || 0,
    sprite,
  };
}

/**
 * Fetch only Pokemon types (lightweight)
 * Reuses cached full Pokemon data if available
 * @param nameOrId - Pokemon name or ID
 * @param generation - Optional generation number for historical types
 */
export async function fetchPokemonTypes(
  nameOrId: string | number,
  generation?: number
): Promise<string[]> {
  const pokemon = await fetchPokemon(nameOrId);
  
  if (generation) {
    return getTypesForGeneration(pokemon, generation);
  }
  
  return pokemon.types.map((t) => t.type.name);
}

/**
 * Fetch Pokemon moves
 * Reuses cached full Pokemon data if available
 */
export async function fetchPokemonMoves(
  nameOrId: string | number
): Promise<PokemonMove[]> {
  const pokemon = await fetchPokemon(nameOrId);
  return pokemon.moves;
}

export async function fetchPokemonEncounters(
  nameOrId: string | number
): Promise<LocationAreaEncounter[]> {
  return fetchFromPokeAPI<LocationAreaEncounter[]>(
    `pokemon/${nameOrId}/encounters`
  );
}

/**
 * Get Pokemon types for a specific generation
 * Uses past_types to return historically accurate types
 */
export function getTypesForGeneration(
  pokemon: Pokemon,
  generation: number
): string[] {
  // If no past_types, use current types
  if (!pokemon.past_types || pokemon.past_types.length === 0) {
    return pokemon.types.map((t) => t.type.name);
  }

  // Check if there are past types for this generation
  const pastType = pokemon.past_types.find(
    (pt) => pt.generation.name === `generation-${toRoman(generation)}`
  );

  // If found, use past types; otherwise use current types
  if (pastType) {
    return pastType.types.map((t) => t.type.name);
  }

  return pokemon.types.map((t) => t.type.name);
}

/**
 * Convert number to Roman numeral for generation names
 */
function toRoman(num: number): string {
  const romanNumerals: [number, string][] = [
    [10, 'x'],
    [9, 'ix'],
    [5, 'v'],
    [4, 'iv'],
    [1, 'i'],
  ];
  
  let result = '';
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

export function canLearnMove(
  moves: PokemonMove[],
  moveName: string,
  versionGroup: string
): boolean {
  return moves.some(
    (m) =>
      m.move.name === moveName &&
      m.version_group_details.some(
        (vgd) => vgd.version_group.name === versionGroup
      )
  );
}

export function getLearnableMoves(
  moves: PokemonMove[],
  moveNames: string[],
  versionGroup: string
): string[] {
  return moveNames.filter((moveName) =>
    canLearnMove(moves, moveName, versionGroup)
  );
}
