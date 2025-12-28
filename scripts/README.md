# Data Generation Scripts

## generate-availability-data.ts

Generates precomputed Pokémon availability data for all game versions.

### Features

1. **Evolution Chain Expansion**
   - Manual overrides automatically include full evolution chains
   - Example: Adding "bulbasaur" also adds "ivysaur" and "venusaur"

2. **Incremental Updates**
   - Loads existing data and trusts it (no redundant API calls)
   - Only fetches encounter data for new/unknown Pokémon
   - First run: ~15-20 minutes
   - Subsequent runs: ~2-5 minutes

3. **Smart Caching**
   - Evolution chains cached during execution
   - Existing JSON files used as source of truth

### Usage

```bash
# Generate all availability data
yarn generate:availability

# The script will:
# 1. Load existing JSON files (if any)
# 2. Expand manual overrides with evolution chains
# 3. Only check encounters for Pokémon not already marked obtainable
# 4. Save updated JSON files
```

### Manual Overrides

Define base Pokémon in `OBTAINABILITY_OVERRIDES` - evolutions are added automatically:

```typescript
const OBTAINABILITY_OVERRIDES = {
  red: [
    "bulbasaur",  // Auto-adds: ivysaur, venusaur
    "charmander", // Auto-adds: charmeleon, charizard
    "squirtle",   // Auto-adds: wartortle, blastoise
    "eevee",      // Auto-adds: vaporeon, jolteon, flareon
    // ... etc
  ],
};
```

### Output

Each game gets a JSON file in `app/data/availability/`:

```json
{
  "gameId": "red",
  "version": "red",
  "pokedexId": "kanto",
  "generatedAt": "2025-12-28T14:28:33.396Z",
  "totalObtainable": 127,
  "obtainable": ["abra", "aerodactyl", ...]
}
```

### Performance

| Metric | First Run | Incremental Run |
|--------|-----------|-----------------|
| Duration | 15-20 min | 2-5 min |
| API Calls | ~3000 | ~100-500 |
| Data Reused | 0% | 80-95% |

### Troubleshooting

**"Too many API calls"**
- The script includes 100ms delays between requests
- PokeAPI is generally very reliable
- If you hit rate limits, wait a few minutes and re-run

**"Missing evolutions"**
- Check that the base form is in `OBTAINABILITY_OVERRIDES`
- Evolution chains are fetched automatically
- Re-run the script to pick up any missed chains

**"Incorrect count"**
- Verify manual overrides are correct
- Check that the Pokémon exists in that game's Pokédex
- Some Pokémon may be trade-only (not currently handled)
