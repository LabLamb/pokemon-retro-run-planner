# Pokémon Availability Data

This directory contains precomputed Pokémon availability data for each game version.

## Overview

Instead of making hundreds of API calls to PokeAPI at runtime to determine which Pokémon are obtainable in each game, we precompute this data and store it as static JSON files. This dramatically improves performance and reduces API spam.

## Data Structure

Each JSON file follows this structure:

```json
{
  "gameId": "red",
  "version": "red",
  "pokedexId": "kanto",
  "generatedAt": "2025-12-28T12:00:00.000Z",
  "totalObtainable": 150,
  "obtainable": [
    "bulbasaur",
    "ivysaur",
    "venusaur",
    ...
  ]
}
```

## Generating Data

To regenerate the availability data (e.g., after adding new games or updating overrides):

```bash
yarn generate:availability
```

This script will:
1. Fetch the regional Pokédex for each game
2. Query encounter data for each Pokémon from PokeAPI
3. Apply manual overrides for gift/starter/fossil Pokémon
4. Generate a JSON file for each game in this directory

**Note:** The generation process takes several minutes due to API rate limiting (100ms delay between requests).

## Manual Overrides

Some Pokémon are obtainable but don't appear in encounter data:
- **Starters** (e.g., Bulbasaur, Charmander, Squirtle)
- **Gift Pokémon** (e.g., Eevee, Lapras, Togepi)
- **Fossils** (e.g., Omanyte, Kabuto, Aerodactyl)
- **Event-only** (e.g., Victini, Shiny Haxorus)

These are defined in the `OBTAINABILITY_OVERRIDES` constant in `scripts/generate-availability-data.ts`.

## Usage in Code

The availability service (`app/services/pokeapi/availability.ts`) automatically loads and caches this data:

```typescript
import { isPokemonObtainable, filterObtainablePokemon } from "~/services/pokeapi/availability";

// Check if a single Pokémon is obtainable
const isObtainable = await isPokemonObtainable("pikachu", "yellow");

// Filter a list to only obtainable Pokémon
const obtainable = await filterObtainablePokemon(
  ["bulbasaur", "charmander", "squirtle"],
  "red"
);
```

## Supported Games

- **Generation I:** Red, Blue, Green (JP), Yellow
- **Generation II:** Gold, Silver, Crystal
- **Generation III:** Ruby, Sapphire, Emerald, FireRed, LeafGreen
- **Generation IV:** Diamond, Pearl, Platinum, HeartGold, SoulSilver
- **Generation V:** Black, White, Black 2, White 2

## Performance

- **Before:** ~150 API calls per game selection (batched, ~10-15 seconds)
- **After:** 1 JSON file load + O(1) Set lookups (~50ms)

This is a **300x performance improvement** for availability checks!
