/**
 * Data generation script: Precompute Pokémon availability for all games
 *
 * This script fetches encounter data from PokeAPI for all Pokémon in each game's
 * regional Pokédex and generates static JSON files to avoid runtime API spam.
 *
 * Run with: yarn generate:availability
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import gamesData from "./data/games.json";
import { OBTAINABILITY_OVERRIDES } from "./data/obtainability-overrides";

// Load game data from JSON file
const GAMES = gamesData;

interface LocationAreaEncounter {
  location_area: { name: string };
  version_details: {
    version: { name: string };
  }[];
}

interface EvolutionChain {
  chain: EvolutionChainLink;
}

interface EvolutionChainLink {
  species: { name: string };
  evolves_to: EvolutionChainLink[];
  evolution_details: {
    trigger: { name: string };
  }[];
}

interface PokemonSpecies {
  evolution_chain: { url: string };
}

// Trade evolutions that cannot be obtained without player-to-player trading
// These will be excluded UNLESS explicitly listed in manual overrides
const TRADE_EVOLUTIONS = [
  "alakazam",
  "machamp",
  "golem",
  "gengar",
  "steelix",
  "kingdra",
  "scizor",
  "politoed",
  "slowking",
  "porygon2",
  "huntail",
  "gorebyss",
  "electivire",
  "magmortar",
  "porygon-z",
  "rhyperior",
  "dusknoir",
];

const API_BASE = "https://pokeapi.co/api/v2";
const DELAY_MS = 50; // Rate limiting delay between requests

// Cache for evolution chains to avoid redundant API calls
const evolutionChainCache = new Map<string, string[]>();

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${url}`);
  }
  return response.json();
}

/**
 * Recursively extract all species names from an evolution chain
 */
function extractSpeciesFromChain(chain: EvolutionChainLink): string[] {
  const species = [chain.species.name];
  for (const evolution of chain.evolves_to) {
    species.push(...extractSpeciesFromChain(evolution));
  }
  return species;
}

/**
 * Fetch the complete evolution chain for a Pokémon species
 * Returns all species in the chain (including the input species)
 */
async function fetchEvolutionChain(speciesName: string): Promise<string[]> {
  // Check cache first
  if (evolutionChainCache.has(speciesName)) {
    return evolutionChainCache.get(speciesName)!;
  }

  try {
    // Fetch species data to get evolution chain URL
    const speciesData = await fetchJSON<PokemonSpecies>(
      `${API_BASE}/pokemon-species/${speciesName}`
    );
    await sleep(DELAY_MS);

    // Fetch evolution chain
    const chainData = await fetchJSON<EvolutionChain>(
      speciesData.evolution_chain.url
    );
    await sleep(DELAY_MS);

    // Extract all species from the chain
    const allSpecies = extractSpeciesFromChain(chainData.chain);

    // Cache the result for all species in the chain
    for (const species of allSpecies) {
      evolutionChainCache.set(species, allSpecies);
    }

    return allSpecies;
  } catch (error) {
    console.warn(
      `  ⚠️  Failed to fetch evolution chain for ${speciesName}:`,
      error
    );
    // Return just the input species if we can't fetch the chain
    return [speciesName];
  }
}

async function fetchPokedex(pokedexId: string): Promise<string[]> {
  console.log(`  Fetching Pokédex: ${pokedexId}...`);
  const data = await fetchJSON<{
    pokemon_entries: { pokemon_species: { name: string } }[];
  }>(`${API_BASE}/pokedex/${pokedexId}`);

  return data.pokemon_entries.map((entry) => entry.pokemon_species.name);
}

async function fetchPokemonEncounters(
  speciesName: string
): Promise<LocationAreaEncounter[]> {
  try {
    return await fetchJSON<LocationAreaEncounter[]>(
      `${API_BASE}/pokemon/${speciesName}/encounters`
    );
  } catch (error) {
    // Some Pokémon have no encounter data (e.g., starters, gifts)
    return [];
  }
}

function hasEncounterInVersion(
  encounters: LocationAreaEncounter[],
  version: string
): boolean {
  return encounters.some((encounter) =>
    encounter.version_details.some((vd) => vd.version.name === version)
  );
}

async function generateAvailabilityForGame(
  gameId: string,
  version: string,
  pokedexId: string,
  gameName: string
): Promise<void> {
  console.log(`\n📦 Processing: ${gameName} (${gameId})`);

  // Check if existing data file exists and load it
  const outputDir = join(process.cwd(), "app", "data", "availability");
  const outputPath = join(outputDir, `${gameId}.json`);

  let existingObtainable = new Set<string>();
  if (existsSync(outputPath)) {
    try {
      const existingData = JSON.parse(readFileSync(outputPath, "utf-8"));
      existingObtainable = new Set(existingData.obtainable || []);
      console.log(
        `  📂 Loaded existing data: ${existingObtainable.size} Pokémon already marked obtainable`
      );
    } catch (error) {
      console.log(`  ⚠️  Could not load existing data, starting fresh`);
    }
  }

  // Fetch all Pokémon in this game's regional Pokédex
  const allSpecies = await fetchPokedex(pokedexId);
  console.log(`  Found ${allSpecies.length} Pokémon in ${pokedexId} Pokédex`);

  const obtainableSet = new Set<string>();

  // Expand manual overrides to include full evolution chains
  // Do this FIRST so we always get complete evolution lines
  // BUT exclude trade evolutions unless they're explicitly in the override list
  const baseOverrides = OBTAINABILITY_OVERRIDES[version] || [];
  const manualOverrides = new Set(baseOverrides);
  console.log(
    `  Expanding ${baseOverrides.length} base overrides with evolution chains...`
  );

  const expandedOverrides = new Set<string>();
  for (const basePokemon of baseOverrides) {
    const evolutionChain = await fetchEvolutionChain(basePokemon);
    evolutionChain.forEach((species) => {
      // Only add if it's in this game's Pokédex
      if (!allSpecies.includes(species)) return;
      
      // Skip trade evolutions UNLESS they're explicitly in manual overrides
      if (TRADE_EVOLUTIONS.includes(species) && !manualOverrides.has(species)) {
        return;
      }
      
      expandedOverrides.add(species);
    });
  }

  expandedOverrides.forEach((name) => obtainableSet.add(name));
  console.log(
    `  Added ${expandedOverrides.size} Pokémon from overrides (including evolutions)`
  );

  // Now add existing data (trust what we already have for encounter-based Pokémon)
  // This avoids re-checking encounters for Pokémon we already know about
  existingObtainable.forEach((name) => {
    if (allSpecies.includes(name) && !obtainableSet.has(name)) {
      obtainableSet.add(name);
    }
  });

  // Process each Pokémon
  let processed = 0;
  let foundViaEncounters = 0;
  let skippedFromExisting = 0;

  for (const speciesName of allSpecies) {
    processed++;

    // Skip if already marked as obtainable (from existing data or overrides)
    if (obtainableSet.has(speciesName)) {
      if (
        existingObtainable.has(speciesName) &&
        !expandedOverrides.has(speciesName)
      ) {
        skippedFromExisting++;
      }
      continue;
    }

    // Fetch encounter data
    const encounters = await fetchPokemonEncounters(speciesName);

    if (hasEncounterInVersion(encounters, version)) {
      obtainableSet.add(speciesName);
      foundViaEncounters++;
    }

    // Rate limiting
    await sleep(DELAY_MS);

    // Progress indicator
    if (processed % 20 === 0) {
      console.log(
        `  Progress: ${processed}/${allSpecies.length} (${obtainableSet.size} obtainable, ${skippedFromExisting} from cache)`
      );
    }
  }

  console.log(`  ✅ Complete: ${obtainableSet.size} obtainable`);
  console.log(`     - ${skippedFromExisting} from existing data (cached)`);
  console.log(
    `     - ${expandedOverrides.size} from overrides (including evolutions)`
  );
  console.log(`     - ${foundViaEncounters} from new encounter checks`);

  // IMPORTANT: Expand evolution chains for ALL obtainable Pokémon
  // This ensures stone evolutions and other evolutions are included
  // BUT we exclude trade evolutions unless they're in the manual overrides
  console.log(`  🔄 Expanding evolution chains for all obtainable Pokémon...`);
  const allObtainableCopy = Array.from(obtainableSet);
  
  for (const speciesName of allObtainableCopy) {
    const evolutionChain = await fetchEvolutionChain(speciesName);
    evolutionChain.forEach((species) => {
      // Skip if not in the regional dex
      if (!allSpecies.includes(species)) return;
      
      // Skip if already obtainable
      if (obtainableSet.has(species)) return;
      
      // Skip trade evolutions UNLESS they're explicitly in manual overrides
      if (TRADE_EVOLUTIONS.includes(species) && !manualOverrides.has(species)) {
        return;
      }
      
      obtainableSet.add(species);
    });
  }
  console.log(`  ✅ Final total after evolution expansion: ${obtainableSet.size} obtainable`);

  // Convert to sorted array for consistent output
  const obtainableList = Array.from(obtainableSet).sort();

  // Write to file
  mkdirSync(outputDir, { recursive: true });

  const output = {
    gameId,
    version,
    pokedexId,
    generatedAt: new Date().toISOString(),
    totalObtainable: obtainableList.length,
    obtainable: obtainableList,
  };

  writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf-8");
  console.log(`  💾 Saved to: ${outputPath}`);
}

async function main(): Promise<void> {
  console.log("🚀 Starting Pokémon availability data generation...\n");
  console.log(`Processing ${GAMES.length} games...\n`);

  const startTime = Date.now();

  for (const game of GAMES) {
    try {
      await generateAvailabilityForGame(
        game.id,
        game.version,
        game.pokedexId,
        game.name
      );
    } catch (error) {
      console.error(`❌ Error processing ${game.name}:`, error);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(
    `\n✨ All done! Generated data for ${GAMES.length} games in ${duration}s`
  );
  console.log(`📁 Output directory: app/data/availability/`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
