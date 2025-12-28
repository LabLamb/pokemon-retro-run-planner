/**
 * Tests for games data catalog
 */

import { describe, it, expect } from "vitest";
import { GAMES, getGameById, getGamesByGeneration } from "../games";

describe("games catalog", () => {
  it("should contain all expected games", () => {
    expect(GAMES.length).toBeGreaterThan(0);
    expect(GAMES.some((g) => g.id === "firered")).toBe(true);
    expect(GAMES.some((g) => g.id === "leafgreen")).toBe(true);
  });

  describe("getGameById", () => {
    it("should return game by id", () => {
      const game = getGameById("firered");
      expect(game).toBeDefined();
      expect(game?.name).toBe("Pokémon FireRed");
      expect(game?.versionGroup).toBe("firered-leafgreen");
    });

    it("should return undefined for invalid id", () => {
      const game = getGameById("invalid-game");
      expect(game).toBeUndefined();
    });
  });

  describe("getGamesByGeneration", () => {
    it("should return games for generation 1", () => {
      const games = getGamesByGeneration(1);
      expect(games.length).toBeGreaterThan(0);
      expect(games.every((g) => g.generation === 1)).toBe(true);
    });

    it("should return games for generation 3", () => {
      const games = getGamesByGeneration(3);
      expect(games.length).toBeGreaterThan(0);
      expect(games.some((g) => g.id === "firered")).toBe(true);
      expect(games.some((g) => g.id === "emerald")).toBe(true);
    });

    it("should return empty array for invalid generation", () => {
      const games = getGamesByGeneration(99);
      expect(games.length).toBe(0);
    });
  });
});
