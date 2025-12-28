/**
 * Tests for Pokedex service
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fetchPokedex,
  getSpeciesNamesFromPokedex,
  getRegionalSpecies,
  getRegionalSpeciesPaginated,
} from "../pokedex";
import type { Pokedex } from "../types";

vi.mock("../client", () => ({
  fetchFromPokeAPI: vi.fn(),
}));

describe("pokedex service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPokedex: Pokedex = {
    id: 2,
    name: "kanto",
    is_main_series: true,
    descriptions: [],
    names: [],
    pokemon_entries: [
      { entry_number: 1, pokemon_species: { name: "bulbasaur", url: "" } },
      { entry_number: 2, pokemon_species: { name: "ivysaur", url: "" } },
      { entry_number: 3, pokemon_species: { name: "venusaur", url: "" } },
      { entry_number: 4, pokemon_species: { name: "charmander", url: "" } },
      { entry_number: 5, pokemon_species: { name: "charmeleon", url: "" } },
      { entry_number: 6, pokemon_species: { name: "charizard", url: "" } },
      { entry_number: 7, pokemon_species: { name: "squirtle", url: "" } },
      { entry_number: 8, pokemon_species: { name: "wartortle", url: "" } },
      { entry_number: 9, pokemon_species: { name: "blastoise", url: "" } },
      { entry_number: 10, pokemon_species: { name: "caterpie", url: "" } },
    ],
    region: null,
    version_groups: [],
  };

  describe("fetchPokedex", () => {
    it("should fetch pokedex data", async () => {
      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokedex);

      const result = await fetchPokedex("kanto");

      expect(result).toEqual(mockPokedex);
      expect(fetchFromPokeAPI).toHaveBeenCalledWith("pokedex/kanto");
    });
  });

  describe("getSpeciesNamesFromPokedex", () => {
    it("should extract species names from pokedex", () => {
      const result = getSpeciesNamesFromPokedex(mockPokedex);

      expect(result).toEqual([
        "bulbasaur",
        "ivysaur",
        "venusaur",
        "charmander",
        "charmeleon",
        "charizard",
        "squirtle",
        "wartortle",
        "blastoise",
        "caterpie",
      ]);
    });
  });

  describe("getRegionalSpecies", () => {
    it("should fetch and extract regional species", async () => {
      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokedex);

      const result = await getRegionalSpecies("kanto");

      expect(result).toEqual([
        "bulbasaur",
        "ivysaur",
        "venusaur",
        "charmander",
        "charmeleon",
        "charizard",
        "squirtle",
        "wartortle",
        "blastoise",
        "caterpie",
      ]);
    });
  });

  describe("getRegionalSpeciesPaginated", () => {
    it("should return paginated species with default offset and limit", async () => {
      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokedex);

      const result = await getRegionalSpeciesPaginated("kanto");

      expect(result).toEqual({
        species: [
          "bulbasaur",
          "ivysaur",
          "venusaur",
          "charmander",
          "charmeleon",
          "charizard",
          "squirtle",
          "wartortle",
          "blastoise",
          "caterpie",
        ],
        total: 10,
        hasMore: false,
      });
    });

    it("should return first page with custom limit", async () => {
      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokedex);

      const result = await getRegionalSpeciesPaginated("kanto", 0, 3);

      expect(result).toEqual({
        species: ["bulbasaur", "ivysaur", "venusaur"],
        total: 10,
        hasMore: true,
      });
    });

    it("should return second page with offset", async () => {
      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokedex);

      const result = await getRegionalSpeciesPaginated("kanto", 3, 3);

      expect(result).toEqual({
        species: ["charmander", "charmeleon", "charizard"],
        total: 10,
        hasMore: true,
      });
    });

    it("should return last page with hasMore false", async () => {
      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokedex);

      const result = await getRegionalSpeciesPaginated("kanto", 7, 5);

      expect(result).toEqual({
        species: ["wartortle", "blastoise", "caterpie"],
        total: 10,
        hasMore: false,
      });
    });

    it("should handle offset beyond total", async () => {
      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokedex);

      const result = await getRegionalSpeciesPaginated("kanto", 20, 5);

      expect(result).toEqual({
        species: [],
        total: 10,
        hasMore: false,
      });
    });
  });
});
