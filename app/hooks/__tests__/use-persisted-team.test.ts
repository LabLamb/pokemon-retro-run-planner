/**
 * Unit tests for usePersistedTeam hook
 */

import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePersistedTeam, type TeamPokemon } from "../use-persisted-team";

const createMockPokemon = (id: number, name: string): TeamPokemon => ({
  id,
  name,
  sprite: `sprite-${id}.png`,
  types: ["normal"],
  baseHp: 100,
  baseAttack: 50,
  baseDefense: 50,
  baseSpAttack: 50,
  baseSpDefense: 50,
  baseSpeed: 50,
  allLearnableHms: [],
});

describe("usePersistedTeam", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty team when no stored value", () => {
    const { result } = renderHook(() => usePersistedTeam());
    
    expect(result.current.team).toHaveLength(6);
    expect(result.current.team.every(slot => slot === null)).toBe(true);
    expect(result.current.teamSize).toBe(0);
    expect(result.current.isTeamFull).toBe(false);
  });

  it("should initialize with stored team from localStorage", () => {
    const storedTeam = [
      createMockPokemon(1, "Bulbasaur"),
      createMockPokemon(4, "Charmander"),
      null,
      null,
      null,
      null,
    ];
    localStorage.setItem("pokemon-planner-team", JSON.stringify(storedTeam));

    const { result } = renderHook(() => usePersistedTeam());
    
    expect(result.current.team[0]?.name).toBe("Bulbasaur");
    expect(result.current.team[1]?.name).toBe("Charmander");
    expect(result.current.teamSize).toBe(2);
  });

  it("should add pokemon to first empty slot", () => {
    const { result } = renderHook(() => usePersistedTeam());
    const pikachu = createMockPokemon(25, "Pikachu");

    act(() => {
      const added = result.current.addToTeam(pikachu);
      expect(added).toBe(true);
    });

    expect(result.current.team[0]?.name).toBe("Pikachu");
    expect(result.current.teamSize).toBe(1);
  });

  it("should persist team to localStorage when adding pokemon", () => {
    const { result } = renderHook(() => usePersistedTeam());
    const pikachu = createMockPokemon(25, "Pikachu");

    act(() => {
      result.current.addToTeam(pikachu);
    });

    const stored = localStorage.getItem("pokemon-planner-team");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed[0].name).toBe("Pikachu");
  });

  it("should not add duplicate pokemon", () => {
    const { result } = renderHook(() => usePersistedTeam());
    const pikachu = createMockPokemon(25, "Pikachu");

    act(() => {
      result.current.addToTeam(pikachu);
    });
    expect(result.current.teamSize).toBe(1);

    act(() => {
      const added = result.current.addToTeam(pikachu);
      expect(added).toBe(false);
    });
    expect(result.current.teamSize).toBe(1);
  });

  it("should not add pokemon when team is full", () => {
    const { result } = renderHook(() => usePersistedTeam());

    // Fill the team
    act(() => {
      for (let i = 1; i <= 6; i++) {
        result.current.addToTeam(createMockPokemon(i, `Pokemon${i}`));
      }
    });

    expect(result.current.isTeamFull).toBe(true);
    expect(result.current.teamSize).toBe(6);

    // Try to add another
    act(() => {
      const added = result.current.addToTeam(createMockPokemon(7, "Pokemon7"));
      expect(added).toBe(false);
    });

    expect(result.current.teamSize).toBe(6);
  });

  it("should remove pokemon from team by index", () => {
    const { result } = renderHook(() => usePersistedTeam());
    
    act(() => {
      result.current.addToTeam(createMockPokemon(1, "Bulbasaur"));
      result.current.addToTeam(createMockPokemon(4, "Charmander"));
    });
    expect(result.current.teamSize).toBe(2);

    act(() => {
      result.current.removeFromTeam(0);
    });

    expect(result.current.team[0]).toBeNull();
    expect(result.current.team[1]?.name).toBe("Charmander");
    expect(result.current.teamSize).toBe(1);
  });

  it("should persist team to localStorage when removing pokemon", () => {
    const { result } = renderHook(() => usePersistedTeam());
    
    act(() => {
      result.current.addToTeam(createMockPokemon(1, "Bulbasaur"));
    });

    act(() => {
      result.current.removeFromTeam(0);
    });

    const stored = localStorage.getItem("pokemon-planner-team");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed[0]).toBeNull();
  });

  it("should ignore invalid index when removing pokemon", () => {
    const { result } = renderHook(() => usePersistedTeam());
    
    act(() => {
      result.current.addToTeam(createMockPokemon(1, "Bulbasaur"));
    });

    act(() => {
      result.current.removeFromTeam(-1);
      result.current.removeFromTeam(6);
      result.current.removeFromTeam(100);
    });

    expect(result.current.teamSize).toBe(1);
  });

  it("should clear entire team", () => {
    const { result } = renderHook(() => usePersistedTeam());
    
    act(() => {
      result.current.addToTeam(createMockPokemon(1, "Bulbasaur"));
      result.current.addToTeam(createMockPokemon(4, "Charmander"));
    });
    expect(result.current.teamSize).toBe(2);

    act(() => {
      result.current.clearTeam();
    });

    expect(result.current.teamSize).toBe(0);
    expect(result.current.team.every(slot => slot === null)).toBe(true);
    expect(localStorage.getItem("pokemon-planner-team")).toBeNull();
  });

  it("should calculate teamSize correctly", () => {
    const { result } = renderHook(() => usePersistedTeam());

    expect(result.current.teamSize).toBe(0);

    act(() => {
      result.current.addToTeam(createMockPokemon(1, "Bulbasaur"));
    });
    expect(result.current.teamSize).toBe(1);

    act(() => {
      result.current.addToTeam(createMockPokemon(4, "Charmander"));
      result.current.addToTeam(createMockPokemon(7, "Squirtle"));
    });
    expect(result.current.teamSize).toBe(3);

    act(() => {
      result.current.removeFromTeam(1);
    });
    expect(result.current.teamSize).toBe(2);
  });

  it("should calculate isTeamFull correctly", () => {
    const { result } = renderHook(() => usePersistedTeam());

    expect(result.current.isTeamFull).toBe(false);

    act(() => {
      for (let i = 1; i <= 5; i++) {
        result.current.addToTeam(createMockPokemon(i, `Pokemon${i}`));
      }
    });
    expect(result.current.isTeamFull).toBe(false);

    act(() => {
      result.current.addToTeam(createMockPokemon(6, "Pokemon6"));
    });
    expect(result.current.isTeamFull).toBe(true);
  });

  it("should handle invalid localStorage data gracefully", () => {
    localStorage.setItem("pokemon-planner-team", "not valid json {");

    const { result } = renderHook(() => usePersistedTeam());
    
    expect(result.current.team).toHaveLength(6);
    expect(result.current.team.every(slot => slot === null)).toBe(true);
  });

  it("should handle invalid team structure in localStorage", () => {
    localStorage.setItem("pokemon-planner-team", JSON.stringify([1, 2, 3])); // Wrong length

    const { result } = renderHook(() => usePersistedTeam());
    
    expect(result.current.team).toHaveLength(6);
    expect(result.current.team.every(slot => slot === null)).toBe(true);
  });

  it("should maintain referential stability of callbacks", () => {
    const { result, rerender } = renderHook(() => usePersistedTeam());
    
    const firstAddToTeam = result.current.addToTeam;
    const firstRemoveFromTeam = result.current.removeFromTeam;
    const firstClearTeam = result.current.clearTeam;

    rerender();

    expect(result.current.addToTeam).toBe(firstAddToTeam);
    expect(result.current.removeFromTeam).toBe(firstRemoveFromTeam);
    expect(result.current.clearTeam).toBe(firstClearTeam);
  });

  it("should add multiple pokemon in correct order", () => {
    const { result } = renderHook(() => usePersistedTeam());

    act(() => {
      result.current.addToTeam(createMockPokemon(1, "Bulbasaur"));
      result.current.addToTeam(createMockPokemon(4, "Charmander"));
      result.current.addToTeam(createMockPokemon(7, "Squirtle"));
    });

    expect(result.current.team[0]?.name).toBe("Bulbasaur");
    expect(result.current.team[1]?.name).toBe("Charmander");
    expect(result.current.team[2]?.name).toBe("Squirtle");
    expect(result.current.team[3]).toBeNull();
  });

  it("should reuse empty slots after removal", () => {
    const { result } = renderHook(() => usePersistedTeam());

    act(() => {
      result.current.addToTeam(createMockPokemon(1, "Bulbasaur"));
      result.current.addToTeam(createMockPokemon(4, "Charmander"));
      result.current.addToTeam(createMockPokemon(7, "Squirtle"));
    });

    act(() => {
      result.current.removeFromTeam(1); // Remove Charmander
    });

    act(() => {
      result.current.addToTeam(createMockPokemon(25, "Pikachu"));
    });

    expect(result.current.team[0]?.name).toBe("Bulbasaur");
    expect(result.current.team[1]?.name).toBe("Pikachu");
    expect(result.current.team[2]?.name).toBe("Squirtle");
  });
});
