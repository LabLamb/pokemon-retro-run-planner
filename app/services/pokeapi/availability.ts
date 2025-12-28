/**
 * Pokémon availability service
 * Layer 5: Service/IO adapter
 * 
 * OPTIMIZATIONS:
 * 1. Batch encounter fetching with controlled concurrency
 * 2. Early exit for manual overrides (no API call needed)
 */

import { fetchPokemonEncounters } from "./pokemon";
import type { LocationAreaEncounter } from "./types";

/**
 * Manual overrides for Pokémon that are obtainable but don't appear in encounter data
 * (e.g., gift Pokémon, starters, fossils, event-only)
 * Format: { gameVersion: { speciesName: true } }
 */
const OBTAINABILITY_OVERRIDES: Record<string, Record<string, boolean>> = {
  // Generation I - Red/Blue/Green
  red: {
    bulbasaur: true, // Starter
    charmander: true, // Starter
    squirtle: true, // Starter
    eevee: true, // Gift in Celadon
    lapras: true, // Gift in Silph Co
    hitmonlee: true, // Gift in Saffron
    hitmonchan: true, // Gift in Saffron
    omanyte: true, // Fossil
    kabuto: true, // Fossil
    aerodactyl: true, // Fossil
  },
  blue: {
    bulbasaur: true, // Starter
    charmander: true, // Starter
    squirtle: true, // Starter
    eevee: true, // Gift in Celadon
    lapras: true, // Gift in Silph Co
    hitmonlee: true, // Gift in Saffron
    hitmonchan: true, // Gift in Saffron
    omanyte: true, // Fossil
    kabuto: true, // Fossil
    aerodactyl: true, // Fossil
  },
  green: {
    bulbasaur: true, // Starter
    charmander: true, // Starter
    squirtle: true, // Starter
    eevee: true, // Gift in Celadon
    lapras: true, // Gift in Silph Co
    hitmonlee: true, // Gift in Saffron
    hitmonchan: true, // Gift in Saffron
    omanyte: true, // Fossil
    kabuto: true, // Fossil
    aerodactyl: true, // Fossil
  },
  yellow: {
    pikachu: true, // Starter
    bulbasaur: true, // Gift in Cerulean
    charmander: true, // Gift in Route 24
    squirtle: true, // Gift in Vermilion
    eevee: true, // Gift in Celadon
    lapras: true, // Gift in Silph Co
    hitmonlee: true, // Gift in Saffron
    hitmonchan: true, // Gift in Saffron
    omanyte: true, // Fossil
    kabuto: true, // Fossil
    aerodactyl: true, // Fossil
  },
  // FireRed/LeafGreen
  firered: {
    bulbasaur: true, // Starter
    charmander: true, // Starter
    squirtle: true, // Starter
    eevee: true, // Gift in Celadon
    lapras: true, // Gift in Silph Co
    hitmonlee: true, // Gift in Saffron
    hitmonchan: true, // Gift in Saffron
    omanyte: true, // Fossil
    kabuto: true, // Fossil
    aerodactyl: true, // Fossil
  },
  leafgreen: {
    bulbasaur: true,
    charmander: true,
    squirtle: true,
    eevee: true,
    lapras: true,
    hitmonlee: true,
    hitmonchan: true,
    omanyte: true,
    kabuto: true,
    aerodactyl: true,
  },
  // Add more as needed for other games
};

export async function isPokemonObtainable(
  speciesName: string,
  version: string
): Promise<boolean> {
  // Check manual overrides first
  if (OBTAINABILITY_OVERRIDES[version]?.[speciesName]) {
    return true;
  }

  // Check encounter data
  try {
    const encounters = await fetchPokemonEncounters(speciesName);
    return hasEncounterInVersion(encounters, version);
  } catch {
    // If encounter fetch fails, assume not obtainable
    return false;
  }
}

export function hasEncounterInVersion(
  encounters: LocationAreaEncounter[],
  version: string
): boolean {
  return encounters.some((encounter) =>
    encounter.version_details.some((vd) => vd.version.name === version)
  );
}

export async function filterObtainablePokemon(
  speciesNames: string[],
  version: string
): Promise<string[]> {
  // OPTIMIZATION: Process in controlled batches to avoid overwhelming the API
  const BATCH_SIZE = 15;
  const obtainableFlags: boolean[] = new Array(speciesNames.length).fill(false);

  for (let i = 0; i < speciesNames.length; i += BATCH_SIZE) {
    const batch = speciesNames.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.allSettled(
      batch.map((name) => isPokemonObtainable(name, version))
    );

    batchResults.forEach((result, batchIndex) => {
      const resultIndex = i + batchIndex;
      if (result.status === "fulfilled" && result.value === true) {
        obtainableFlags[resultIndex] = true;
      }
    });
  }

  return speciesNames.filter((_, index) => obtainableFlags[index]);
}
