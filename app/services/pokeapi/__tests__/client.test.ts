/**
 * Tests for PokeAPI client
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { 
  fetchFromPokeAPI, 
  buildQueryKey,
  PokeAPIError 
} from "../client";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("PokeAPI client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchFromPokeAPI", () => {
    it("should fetch data from PokeAPI", async () => {
      const mockData = { id: 1, name: "bulbasaur" };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchFromPokeAPI("pokemon/bulbasaur");

      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/bulbasaur");
    });

    it("should add query parameters to URL", async () => {
      const mockData = { results: [] };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await fetchFromPokeAPI("pokemon", {
        queryParams: { limit: 20, offset: 0 },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );
    });

    it("should handle multiple query parameters", async () => {
      const mockData = { results: [] };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await fetchFromPokeAPI("pokemon", {
        queryParams: { 
          limit: 50, 
          offset: 100,
          test: true,
        },
      });

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain("limit=50");
      expect(calledUrl).toContain("offset=100");
      expect(calledUrl).toContain("test=true");
    });

    it("should handle full URLs with query params", async () => {
      const mockData = { id: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await fetchFromPokeAPI("https://pokeapi.co/api/v2/pokemon/1", {
        queryParams: { expand: true },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/1?expand=true"
      );
    });

    it("should throw PokeAPIError on failed request", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        statusText: "Not Found",
        status: 404,
      });

      await expect(fetchFromPokeAPI("pokemon/invalid")).rejects.toThrow(PokeAPIError);
      await expect(fetchFromPokeAPI("pokemon/invalid")).rejects.toThrow(
        "PokéAPI request failed: Not Found"
      );
    });

    it("should throw PokeAPIError on network error", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      await expect(fetchFromPokeAPI("pokemon/bulbasaur")).rejects.toThrow(PokeAPIError);
      await expect(fetchFromPokeAPI("pokemon/bulbasaur")).rejects.toThrow(
        "Network error: Network error"
      );
    });
  });

  describe("buildQueryKey", () => {
    it("should build query key from endpoint", () => {
      const key = buildQueryKey("pokemon/bulbasaur");
      expect(key).toEqual(["pokemon/bulbasaur"]);
    });

    it("should include query params in key", () => {
      const key = buildQueryKey("pokemon", {
        queryParams: { limit: 20, offset: 0 },
      });
      expect(key).toEqual(["pokemon", JSON.stringify({ limit: 20, offset: 0 })]);
    });

    it("should create consistent keys for same params", () => {
      const key1 = buildQueryKey("pokemon", {
        queryParams: { limit: 20, offset: 0 },
      });
      const key2 = buildQueryKey("pokemon", {
        queryParams: { limit: 20, offset: 0 },
      });
      expect(key1).toEqual(key2);
    });
  });
});
