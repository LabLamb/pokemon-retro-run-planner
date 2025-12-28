/**
 * Tests for GameProvider context
 */

import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { GameProvider, useGame } from "../game-provider";

describe("GameProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty gameId", () => {
    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider,
    });

    expect(result.current.gameId).toBe("");
  });

  it("should initialize with stored gameId from localStorage", () => {
    localStorage.setItem("pokemon-planner-game", JSON.stringify("red"));

    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider,
    });

    expect(result.current.gameId).toBe("red");
  });

  it("should update gameId", () => {
    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider,
    });

    act(() => {
      result.current.setGameId("blue");
    });

    expect(result.current.gameId).toBe("blue");
  });

  it("should persist gameId to localStorage when set", () => {
    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider,
    });

    act(() => {
      result.current.setGameId("emerald");
    });

    const stored = localStorage.getItem("pokemon-planner-game");
    expect(stored).toBe(JSON.stringify("emerald"));
  });

  it("should remove from localStorage when gameId is set to empty string", () => {
    localStorage.setItem("pokemon-planner-game", JSON.stringify("crystal"));

    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider,
    });

    expect(result.current.gameId).toBe("crystal");

    act(() => {
      result.current.setGameId("");
    });

    expect(result.current.gameId).toBe("");
    expect(localStorage.getItem("pokemon-planner-game")).toBeNull();
  });

  it("should clear gameId using clearGame method", () => {
    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider,
    });

    act(() => {
      result.current.setGameId("platinum");
    });
    expect(result.current.gameId).toBe("platinum");

    act(() => {
      result.current.clearGame();
    });

    expect(result.current.gameId).toBe("");
    expect(localStorage.getItem("pokemon-planner-game")).toBeNull();
  });

  it("should throw error when useGame is used outside GameProvider", () => {
    // Suppress console.error for this test
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useGame());
    }).toThrow("useGame must be used within a GameProvider");

    consoleErrorSpy.mockRestore();
  });
});
