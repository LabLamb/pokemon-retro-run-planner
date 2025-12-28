/**
 * Unit tests for usePersistedGame hook
 */

import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePersistedGame } from "../use-persisted-game";

describe("usePersistedGame", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty string when no stored value", () => {
    const { result } = renderHook(() => usePersistedGame());
    expect(result.current.gameId).toBe("");
  });

  it("should initialize with stored value from localStorage", () => {
    localStorage.setItem("pokemon-planner-game", JSON.stringify("firered"));

    const { result } = renderHook(() => usePersistedGame());
    expect(result.current.gameId).toBe("firered");
  });

  it("should update gameId and persist to localStorage", () => {
    const { result } = renderHook(() => usePersistedGame());

    act(() => {
      result.current.setGameId("emerald");
    });

    expect(result.current.gameId).toBe("emerald");
    const stored = localStorage.getItem("pokemon-planner-game");
    expect(stored).toBe(JSON.stringify("emerald"));
  });

  it("should clear gameId and remove from localStorage when set to empty string", () => {
    const { result } = renderHook(() => usePersistedGame());

    act(() => {
      result.current.setGameId("ruby");
    });
    expect(result.current.gameId).toBe("ruby");

    act(() => {
      result.current.setGameId("");
    });

    expect(result.current.gameId).toBe("");
    expect(localStorage.getItem("pokemon-planner-game")).toBeNull();
  });

  it("should clear gameId using clearGame method", () => {
    const { result } = renderHook(() => usePersistedGame());

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

  it("should maintain referential stability of setGameId", () => {
    const { result, rerender } = renderHook(() => usePersistedGame());
    const firstSetGameId = result.current.setGameId;

    rerender();
    expect(result.current.setGameId).toBe(firstSetGameId);
  });

  it("should maintain referential stability of clearGame", () => {
    const { result, rerender } = renderHook(() => usePersistedGame());
    const firstClearGame = result.current.clearGame;

    rerender();
    expect(result.current.clearGame).toBe(firstClearGame);
  });

  it("should persist changes across multiple setGameId calls", () => {
    const { result } = renderHook(() => usePersistedGame());

    act(() => {
      result.current.setGameId("red");
    });
    expect(result.current.gameId).toBe("red");

    act(() => {
      result.current.setGameId("blue");
    });
    expect(result.current.gameId).toBe("blue");

    const stored = localStorage.getItem("pokemon-planner-game");
    expect(stored).toBe(JSON.stringify("blue"));
  });

  it("should handle invalid localStorage data gracefully", () => {
    localStorage.setItem("pokemon-planner-game", "not valid json {");

    const { result } = renderHook(() => usePersistedGame());
    expect(result.current.gameId).toBe("");
  });
});
