# Pokémon Field Skills Search Feature

## Overview
The Pokémon Field Skills Search tool allows users to find Pokémon that can learn specific field skills (HMs) in their selected game. The feature respects game-specific obtainability and provides comprehensive filtering options.

## Features
- **Game Selection**: Choose from 28 Pokémon games (Gen 1-5)
- **Field Skills Filter**: Multi-select HMs/field skills available in the selected game
- **Type Filter**: OR-based type filtering (select up to 2 types)
- **Trade Evolution Toggle**: Option to include/exclude trade-evolution-only Pokémon
- **Responsive Grid**: Adaptive card layout for different screen sizes
- **Loading States**: Skeleton loaders for better UX
- **i18n Support**: Fully translated in 10 languages

## Architecture

### Layer 1: UI Components
- `MultiSelect`: Reusable multi-select with chips
- `PokemonCard`: Displays Pokémon with sprite, types, stats, and learnable HMs
- `PokemonList`: Responsive grid layout
- `PokemonCardSkeleton`: Loading skeleton
- `Skeleton`: Base skeleton component

### Layer 2: Screen
- `planner.search.tsx`: Main search route at `/planner/search`
- Manages filter state and wires hook to UI components

### Layer 3: Business Logic
- `usePokemonSearch`: Hook that orchestrates:
  - Regional Pokédex fetching
  - Obtainability filtering
  - HM learnability checking
  - Type filtering
  - Trade evolution detection
  - Batched API calls with concurrency control

### Layer 4: App State
- No global state required (filters are local to screen)

### Layer 5: Services
- `pokeapi/client.ts`: HTTP client with in-memory caching
- `pokeapi/pokemon.ts`: Pokémon core data and moves
- `pokeapi/species.ts`: Species data
- `pokeapi/evolution-chain.ts`: Evolution chain analysis
- `pokeapi/pokedex.ts`: Regional Pokédex fetching
- `pokeapi/availability.ts`: Obtainability checking with manual overrides

## Data Catalogs
- `data/games.ts`: 28 games mapped to PokéAPI identifiers
- `data/field-skills.ts`: 12 field skills with version group availability
- `data/pokemon-types.ts`: Type definitions and colors

## Usage

### Navigate to Search
Visit `/planner/search` in the application.

### Select a Game
Choose from the dropdown (e.g., "Pokémon FireRed").

### Apply Filters
1. **Field Skills**: Select one or more HMs (e.g., Surf, Fly)
2. **Types**: Select up to 2 types for OR filtering
3. **Trade Evolutions**: Toggle to include/exclude

### View Results
Results display in a responsive grid with:
- Pokémon sprite
- Name
- Types (color-coded badges)
- Base Attack & Special Attack stats
- Learnable HMs from your selection
- Trade evolution indicator

## Performance
- **Batched Fetching**: Processes Pokémon in batches of 10
- **In-Memory Cache**: Caches all PokéAPI responses per session
- **Concurrent Requests**: Uses Promise.allSettled for parallel fetching
- **Error Resilience**: Skips failed fetches without breaking the search

## Testing
Comprehensive test coverage for:
- Service functions (pokemon, evolution-chain, availability)
- Data catalogs (games, field-skills)
- UI components (PokemonCard, MultiSelect)
- Business logic (usePokemonSearch hook)

Run tests:
```bash
yarn test
```

## Internationalization
Fully translated in:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Portuguese (pt)
- Simplified Chinese (zh-Hans)
- Traditional Chinese (zh-Hant)

Translation keys in `app/messages/*.json` under the `search` namespace.

## Future Enhancements
- Ability filter (e.g., Intimidate, Levitate)
- Move power/accuracy filtering
- Export results to team planner
- Save/load filter presets
- Advanced stats filtering (Speed, Defense, etc.)
- Shiny sprite toggle
- Gender differences display
