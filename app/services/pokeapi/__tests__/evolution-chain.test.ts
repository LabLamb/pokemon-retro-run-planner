/**
 * Tests for evolution chain service
 */

import { describe, it, expect } from "vitest";
import { isTradeEvolution, getAllSpeciesInChain } from "../evolution-chain";
import type { EvolutionChain } from "../types";

describe("evolution-chain service", () => {
  describe("isTradeEvolution", () => {
    it("should return true for trade evolution", () => {
      const chain: EvolutionChain = {
        id: 1,
        baby_trigger_item: null,
        chain: {
          is_baby: false,
          species: { name: "kadabra", url: "" },
          evolution_details: [],
          evolves_to: [
            {
              is_baby: false,
              species: { name: "alakazam", url: "" },
              evolution_details: [
                {
                  item: null,
                  trigger: { name: "trade", url: "" },
                  gender: null,
                  held_item: null,
                  known_move: null,
                  known_move_type: null,
                  location: null,
                  min_level: null,
                  min_happiness: null,
                  min_beauty: null,
                  min_affection: null,
                  needs_overworld_rain: false,
                  party_species: null,
                  party_type: null,
                  relative_physical_stats: null,
                  time_of_day: "",
                  trade_species: null,
                  turn_upside_down: false,
                },
              ],
              evolves_to: [],
            },
          ],
        },
      };

      expect(isTradeEvolution("alakazam", chain)).toBe(true);
    });

    it("should return false for non-trade evolution", () => {
      const chain: EvolutionChain = {
        id: 1,
        baby_trigger_item: null,
        chain: {
          is_baby: false,
          species: { name: "bulbasaur", url: "" },
          evolution_details: [],
          evolves_to: [
            {
              is_baby: false,
              species: { name: "ivysaur", url: "" },
              evolution_details: [
                {
                  item: null,
                  trigger: { name: "level-up", url: "" },
                  gender: null,
                  held_item: null,
                  known_move: null,
                  known_move_type: null,
                  location: null,
                  min_level: 16,
                  min_happiness: null,
                  min_beauty: null,
                  min_affection: null,
                  needs_overworld_rain: false,
                  party_species: null,
                  party_type: null,
                  relative_physical_stats: null,
                  time_of_day: "",
                  trade_species: null,
                  turn_upside_down: false,
                },
              ],
              evolves_to: [],
            },
          ],
        },
      };

      expect(isTradeEvolution("ivysaur", chain)).toBe(false);
    });
  });

  describe("getAllSpeciesInChain", () => {
    it("should return all species in evolution chain", () => {
      const chain: EvolutionChain = {
        id: 1,
        baby_trigger_item: null,
        chain: {
          is_baby: false,
          species: { name: "bulbasaur", url: "" },
          evolution_details: [],
          evolves_to: [
            {
              is_baby: false,
              species: { name: "ivysaur", url: "" },
              evolution_details: [],
              evolves_to: [
                {
                  is_baby: false,
                  species: { name: "venusaur", url: "" },
                  evolution_details: [],
                  evolves_to: [],
                },
              ],
            },
          ],
        },
      };

      const result = getAllSpeciesInChain(chain);
      expect(result).toEqual(["bulbasaur", "ivysaur", "venusaur"]);
    });
  });
});
