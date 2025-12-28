/**
 * Tests for Pokémon service
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { 
  fetchPokemon,
  fetchPokemonCore, 
  fetchPokemonTypes,
  canLearnMove, 
  getLearnableMoves 
} from "../pokemon";
import type { Pokemon, PokemonMove } from "../types";

vi.mock("../client", () => ({
  fetchFromPokeAPI: vi.fn(),
}));

describe("pokemon service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchPokemonCore", () => {
    it("should fetch and transform Pokémon core data", async () => {
      const mockPokemon: Pokemon = {
        id: 25,
        name: "pikachu",
        base_experience: 112,
        height: 4,
        weight: 60,
        types: [
          { slot: 1, type: { name: "electric", url: "" } },
        ],
        stats: [
          { base_stat: 55, effort: 0, stat: { name: "attack", url: "" } },
          { base_stat: 50, effort: 0, stat: { name: "special-attack", url: "" } },
        ],
        sprites: {
          front_default: "sprite.png",
          front_shiny: null,
          front_female: null,
          front_shiny_female: null,
          back_default: null,
          back_shiny: null,
          back_female: null,
          back_shiny_female: null,
          other: {
            "official-artwork": {
              front_default: "artwork.png",
              front_shiny: null,
            },
          },
        },
        moves: [],
        species: { name: "pikachu", url: "" },
      };

      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokemon);

      const result = await fetchPokemonCore("pikachu");

      expect(result).toEqual({
        id: 25,
        name: "pikachu",
        types: ["electric"],
        baseAttack: 55,
        baseSpAttack: 50,
        sprite: "artwork.png",
      });
    });
  });

  describe("canLearnMove", () => {
    it("should return true if Pokémon can learn move in version group", () => {
      const moves: PokemonMove[] = [
        {
          move: { name: "surf", url: "" },
          version_group_details: [
            {
              move_learn_method: { name: "machine", url: "" },
              version_group: { name: "firered-leafgreen", url: "" },
              level_learned_at: 0,
            },
          ],
        },
      ];

      expect(canLearnMove(moves, "surf", "firered-leafgreen")).toBe(true);
    });

    it("should return false if Pokémon cannot learn move in version group", () => {
      const moves: PokemonMove[] = [
        {
          move: { name: "surf", url: "" },
          version_group_details: [
            {
              move_learn_method: { name: "machine", url: "" },
              version_group: { name: "ruby-sapphire", url: "" },
              level_learned_at: 0,
            },
          ],
        },
      ];

      expect(canLearnMove(moves, "surf", "firered-leafgreen")).toBe(false);
    });
  });

  describe("getLearnableMoves", () => {
    it("should return list of learnable moves", () => {
      const moves: PokemonMove[] = [
        {
          move: { name: "surf", url: "" },
          version_group_details: [
            {
              move_learn_method: { name: "machine", url: "" },
              version_group: { name: "firered-leafgreen", url: "" },
              level_learned_at: 0,
            },
          ],
        },
        {
          move: { name: "cut", url: "" },
          version_group_details: [
            {
              move_learn_method: { name: "machine", url: "" },
              version_group: { name: "firered-leafgreen", url: "" },
              level_learned_at: 0,
            },
          ],
        },
        {
          move: { name: "fly", url: "" },
          version_group_details: [
            {
              move_learn_method: { name: "machine", url: "" },
              version_group: { name: "ruby-sapphire", url: "" },
              level_learned_at: 0,
            },
          ],
        },
      ];

      const result = getLearnableMoves(
        moves,
        ["surf", "cut", "fly"],
        "firered-leafgreen"
      );

      expect(result).toEqual(["surf", "cut"]);
    });
  });

  describe("fetchPokemon", () => {
    it("should fetch full Pokemon data", async () => {
      const mockPokemon: Pokemon = {
        id: 25,
        name: "pikachu",
        base_experience: 112,
        height: 4,
        weight: 60,
        types: [
          { slot: 1, type: { name: "electric", url: "" } },
        ],
        stats: [
          { base_stat: 55, effort: 0, stat: { name: "attack", url: "" } },
        ],
        sprites: {
          front_default: "sprite.png",
          front_shiny: null,
          front_female: null,
          front_shiny_female: null,
          back_default: null,
          back_shiny: null,
          back_female: null,
          back_shiny_female: null,
        },
        moves: [],
        species: { name: "pikachu", url: "" },
      };

      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokemon);

      const result = await fetchPokemon("pikachu");

      expect(result).toEqual(mockPokemon);
      expect(fetchFromPokeAPI).toHaveBeenCalledWith("pokemon/pikachu");
    });
  });

  describe("fetchPokemonTypes", () => {
    it("should fetch only Pokemon types", async () => {
      const mockPokemon: Pokemon = {
        id: 25,
        name: "pikachu",
        base_experience: 112,
        height: 4,
        weight: 60,
        types: [
          { slot: 1, type: { name: "electric", url: "" } },
        ],
        stats: [],
        sprites: {
          front_default: null,
          front_shiny: null,
          front_female: null,
          front_shiny_female: null,
          back_default: null,
          back_shiny: null,
          back_female: null,
          back_shiny_female: null,
        },
        moves: [],
        species: { name: "pikachu", url: "" },
      };

      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokemon);

      const result = await fetchPokemonTypes("pikachu");

      expect(result).toEqual(["electric"]);
    });

    it("should handle multiple types", async () => {
      const mockPokemon: Pokemon = {
        id: 6,
        name: "charizard",
        base_experience: 240,
        height: 17,
        weight: 905,
        types: [
          { slot: 1, type: { name: "fire", url: "" } },
          { slot: 2, type: { name: "flying", url: "" } },
        ],
        stats: [],
        sprites: {
          front_default: null,
          front_shiny: null,
          front_female: null,
          front_shiny_female: null,
          back_default: null,
          back_shiny: null,
          back_female: null,
          back_shiny_female: null,
        },
        moves: [],
        species: { name: "charizard", url: "" },
      };

      const { fetchFromPokeAPI } = await import("../client");
      vi.mocked(fetchFromPokeAPI).mockResolvedValue(mockPokemon);

      const result = await fetchPokemonTypes("charizard");

      expect(result).toEqual(["fire", "flying"]);
    });
  });
});
