# Pokémon Search Tool – Implementation Plan

## Goals & Scope
- Provide a Pokémon search tool scoped to a **selected game title** (e.g., Pokémon FireRed) using PokéAPI.
- Respect **obtainability**: exclude species unobtainable in-game for the selected title (e.g., trade-only exclusives when no in-game acquisition exists).
- Filters:
  - **HM/field skills**: multi-select; reflect learnability in the selected game version.
  - **Type inclusion**: single or dual-type inclusion (OR logic). If user selects Water + Flying, show Water-only, Flying-only, and Water/Flying.
- Display per Pokémon: sprite/image, name, types, base Attack & Special Attack, which selected HMs it can learn, trade-evolution-only flag.
- Output a **structured list** for UI rendering (Layer 2 consumes structured data; Layer 1 renders primitives only).

## Architecture Mapping (5-layer compliance)
1. **UI components (Layer 1)**
   - Presentational list/grid, filter controls, badges for types/HMs, stat display, trade-evo pill.
   - Input controls: multi-select chips or checkboxes for HMs, type select (single or multi OR-type), game select dropdown.
   - No data fetching; only primitive props & callbacks.

2. **Screens (Layer 2)**
  - Route: dedicated path `/field-move-based-search`. Composes providers/hooks to fetch data and pass to UI.
   - Manages local screen state for selected game, HM filters, type filters, and triggers business hooks.

3. **Business logic & hooks (Layer 3)**
   - Hook `usePokemonSearch` orchestrates:
     - Fetch obtainable Pokémon for the selected game.
     - Fetch learnsets for selected HMs in that version.
     - Apply type inclusion filtering and HM learnability intersection.
   - Normalizes PokéAPI responses into domain models consumed by screens.

4. **App state & context (Layer 4)**
   - If we need cross-screen persistence for selected game/filters, add context; otherwise keep state local to screen.
   - Should not call services; only store session-scoped selections/cache references.

5. **Services (Layer 5)**
   - PokéAPI adapters for:
     - **Game catalog**: map user-facing game titles to `version` / `version_group` (e.g., FireRed/LeafGreen => `version_group: firered-leafgreen`).
     - **Pokémon obtainability** per version: from `pokemon/{name}` encounters filtered by `version`, and `location-area` encounter tables; fallback to species + egg groups to exclude trade-only? (See strategy below.)
     - **HM learnability** per version group: use move learnsets filtered by `version_group` + `machine` endpoints for HM/TM IDs.
     - **Pokemon base data**: types, sprites, base stats from `pokemon` endpoint; species for evolution details.

## Data & Rules
### Game selection
- Maintain a curated mapping of supported games to PokéAPI `version` and `version_group` identifiers covering **Aka/Midori (JP R/G) through Black/White 2** inclusive. Keep list static in code for now.

### HM/Field skills catalog (static list in app)
- Example HM-equivalents to include (per gen availability): Cut, Fly, Surf, Strength, Flash, Rock Smash, Waterfall, Dive, Headbutt, Rock Climb, Defog, Whirlpool. Label as “Field Skills (HMs/TMs)” in UI.
- Store per-game availability + move names (e.g., Rock Smash is TM in Gen 3 but acts as field skill). Represent as `{ id, label, moveName, versionGroups: [...] }`.

### Obtainaibility strategy
- Use `pokemon/{name}/encounters` filtered by `version` to determine if encounterable. If empty, mark unobtainable (exclude).
- Edge cases: gift/event-only Pokémon may not appear in encounters; allow a manual allowlist/denylist per game for correctness (small JSON).
- Exclude species that only evolve via trade **and** have no pre-evo obtainable in game (e.g., if Kadabra obtainable, Alakazam flagged trade-evo-only but excluded unless we decide to keep evolutions that require trade—requirement says exclude Pokémon that cannot be caught). Add a **boolean filter to show/hide trade-evo finals** when pre-evo is obtainable; default behavior to be aligned with PM (proposed default: hide).

### HM learnability per version group
- For each Pokémon, retrieve move learnsets for the selected `version_group` via `pokemon/{name}/moves`. Filter for moves whose `move.name` matches selected HM move names **and** `version_group_details` contains the selected `version_group`. Consider level-up, machine, tutor methods; accept any.
- Precompute HM move names per generation (e.g., `flash`, `rock-smash`, `headbutt`).

### Type filtering logic
- User selects 1–2 types. Apply OR: include any Pokémon whose primary or secondary type matches any selected type.
- If no type filter selected, do not filter by type.

### Output shape (for UI consumption)
```ts
{
  id: number;
  name: string;
  sprite: string; // prefer official artwork front_default or home sprite
  types: Array<"water" | ...>;
  baseAttack: number;
  baseSpAttack: number;
  tradeEvolutionOnly: boolean;
  learnableHms: string[]; // subset of selected HM ids
}
```
- Screen will also receive `availableHms` for the selected game and metadata for filters.

## Services (Layer 5) – Proposed modules
- `~/services/pokeapi/client.ts`: thin fetch wrapper with base URL, optional caching layer.
- `~/services/pokeapi/games.ts`: map supported games to `version` + `version_group` identifiers and expose typed list.
- `~/services/pokeapi/hms.ts`: static catalog of field skills with per-version-group availability.
- `~/services/pokeapi/pokemon.ts`:
  - `fetchPokemonCore(nameOrId)` → types, stats, sprites.
  - `fetchPokemonMoves(nameOrId)` → moves with version group details.
  - `fetchPokemonEncounters(nameOrId)` → encounters grouped by version.
- `~/services/pokeapi/species.ts`:
  - `fetchSpecies(nameOrId)` → evolution chain URL and evolution details (for trade-evo flagging).
- `~/services/pokeapi/evolution-chain.ts`: fetch evolution chain to identify trade-only evolutions.
- `~/services/pokeapi/availability.ts`:
  - Given game `version`, determine obtainable species list: call encounters per species? (Expensive: instead, derive from curated per-game lists? See performance section.)
  - Provide helper to check if encounters for a species exist in `version` OR are allowlisted.

## Business Logic (Layer 3)
- Hook `usePokemonSearch(gameId, selectedHms, selectedTypes, includeTradeEvoFinals)`:
  1. Resolve game → `version`, `version_group`, available HMs.
  2. Obtain candidate Pokémon list for that game (see performance strategy).
  3. For each candidate, fetch core data + moves + encounters (batched).
  4. Determine HM learnability: intersect selected HM move names with moves learnable in the `version_group`.
  5. Apply obtainability filter: ensure encounters exist for the `version`. If none and not allowlisted, drop.
   6. Apply type filter (OR logic for 1–2 types).
   7. Compute `tradeEvolutionOnly` flag by inspecting evolution chain for trade triggers on that species and apply `includeTradeEvoFinals` toggle to include/exclude those finals when pre-evo is obtainable.
   8. Return structured list + loading/error states.
- Caching/memoization of API results to reduce calls (in-memory per session).
- Include a small manual overrides file for edge cases (e.g., gift Pokémon not in encounters).

## Screen (Layer 2)
- Likely `planner` route extension: add a new section or dedicated route module under `/planner/search` (confirm navigation). Uses `usePokemonSearch` and passes data to UI components.
- Manages local state for filters and selected game.
- Handles loading, empty, and error states.

## UI (Layer 1)
- Components:
  - `GameSelect` (primitive select with provided options).
  - `HmMultiSelect` (checkbox list or chips; provided list from hook).
  - `TypeMultiSelect` (OR-inclusive up to 2 types, enforce max selection).
  - `PokemonCard` / `PokemonRow` to render sprite, name, types badges, stats, HM badges, trade-evo flag.
  - `PokemonList` to layout cards/rows with responsive grid.
- Ensure props are primitives/arrays + callbacks only.

## App State (Layer 4)
- Optional: persist last-selected game + filters in context/localStorage if reuse across screens is desired. Otherwise keep inside screen state.

## Performance & Data Strategy
- PokéAPI breadth is large; avoid fetching all species. Options:
  - Maintain curated list of species per game/version_group (static JSON) for supported games to avoid full traversal.
  - Or fetch regional Pokédex (e.g., `pokedex/{kanto}` for FireRed/LeafGreen) to get species IDs, then process only those.
- Use in-memory cache keyed by species id for core data, moves, species, evolution chains.
- Parallelize fetches with `Promise.allSettled` and cap concurrency (e.g., `p-limit`).

## Error Handling & UX
- Show retry on network error.
- Indicate when filters yield zero results.
- Display loading skeletons for list/cards.

## i18n
- Add strings for labels, headings, empty/error states to all 10 locale files under `messages/` with a new namespace like `search`.

## Testing
- Unit tests for services (parsing HM learnability, obtainability filtering, type filter logic).
- Hook tests for `usePokemonSearch` with mocked service responses.
- Component tests for filter controls and list rendering (excluding SSG pages per project rule).

## Task Breakdown
1. **Data catalog**: add static game ↔ version/version_group mapping; HM catalog with per-game availability.
2. **Services**: client + per-entity fetchers; helpers for availability and trade-evo detection; optional curated Pokédex list per game.
3. **Business hook**: `usePokemonSearch` with caching and filters.
4. **UI components**: filter controls, badges, list/card components.
5. **Screen wiring**: integrate into `planner` or new route; manage state; connect hook; handle UX states.
6. **i18n**: add copy to all locale JSONs.
7. **Tests**: services, hooks, components; follow project testing rules.
8. **Polish**: loading/empty/error states; accessibility for form controls.

## Open Questions (flag for PM/Design)
- Exact set of supported games at launch (start with FireRed/LeafGreen?).
- Whether to include trade-evo finals if their pre-evo is obtainable (currently plan to flag but include/exclude per decision).
- Navigation placement: within `/planner` or a dedicated route.
