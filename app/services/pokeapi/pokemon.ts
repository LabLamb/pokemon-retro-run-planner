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
 */
export async function fetchPokemonTypes(
  nameOrId: string | number
): Promise<string[]> {
  const pokemon = await fetchPokemon(nameOrId);
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
