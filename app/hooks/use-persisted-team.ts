/**
 * Business logic for persisting team to localStorage
 * Layer 3: Business logic & hooks
 * 
 * Orchestrates reading/writing team state using the storage service
 */

import { useState, useCallback } from "react";
import { getFromStorage, setInStorage, removeFromStorage } from "~/services/storage/local-storage";

const TEAM_STORAGE_KEY = "pokemon-planner-team";

export interface TeamPokemon {
  id: number;
  name: string;
  sprite?: string;
  types: string[];
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpAttack: number;
  baseSpDefense: number;
  baseSpeed: number;
  allLearnableHms: Array<{ id: string; label: string }>;
  tradeEvolutionOnly?: boolean;
}

export interface UsePersistedTeamReturn {
  team: (TeamPokemon | null)[];
  addToTeam: (pokemon: TeamPokemon) => boolean;
  removeFromTeam: (index: number) => void;
  clearTeam: () => void;
  isTeamFull: boolean;
  teamSize: number;
}

/**
 * Hook that manages team state with localStorage persistence
 * Loads initial state from localStorage and persists all changes
 */
export function usePersistedTeam(): UsePersistedTeamReturn {
  // Initialize state from localStorage
  const [team, setTeam] = useState<(TeamPokemon | null)[]>(() => {
    const stored = getFromStorage<(TeamPokemon | null)[]>(TEAM_STORAGE_KEY);
    // Validate that stored data is an array of 6 items
    if (Array.isArray(stored) && stored.length === 6) {
      return stored;
    }
    return Array(6).fill(null);
  });

  /**
   * Persists team to localStorage
   */
  const persistTeam = useCallback((newTeam: (TeamPokemon | null)[]) => {
    setInStorage(TEAM_STORAGE_KEY, newTeam);
  }, []);

  /**
   * Adds a Pokémon to the first available team slot
   * @returns true if added successfully, false if team is full or already in team
   */
  const addToTeam = useCallback((pokemon: TeamPokemon): boolean => {
    let added = false;

    setTeam((prev) => {
      // Check if Pokémon is already in team
      const alreadyInTeam = prev.some(
        (member) => member !== null && member.id === pokemon.id
      );
      if (alreadyInTeam) {
        return prev;
      }

      // Find first empty slot
      const emptyIndex = prev.findIndex((slot) => slot === null);
      if (emptyIndex === -1) {
        return prev; // Team is full
      }

      const newTeam = [...prev];
      newTeam[emptyIndex] = pokemon;
      persistTeam(newTeam);
      added = true;
      return newTeam;
    });

    return added;
  }, [persistTeam]);

  /**
   * Removes a Pokémon from the team at the specified index
   */
  const removeFromTeam = useCallback((index: number) => {
    if (index < 0 || index >= 6) return;

    setTeam((prev) => {
      const newTeam = [...prev];
      newTeam[index] = null;
      persistTeam(newTeam);
      return newTeam;
    });
  }, [persistTeam]);

  /**
   * Clears all Pokémon from the team and localStorage
   */
  const clearTeam = useCallback(() => {
    const emptyTeam = Array(6).fill(null);
    setTeam(emptyTeam);
    removeFromStorage(TEAM_STORAGE_KEY);
  }, []);

  const teamSize = team.filter((member) => member !== null).length;
  const isTeamFull = teamSize === 6;

  return {
    team,
    addToTeam,
    removeFromTeam,
    clearTeam,
    isTeamFull,
    teamSize,
  };
}
