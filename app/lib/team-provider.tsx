/**
 * Team context provider - manages the user's team of up to 6 Pokémon
 * Layer 4: App state & context
 */

import { createContext, useContext, useState, type ReactNode } from "react";

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

interface TeamContextValue {
  team: (TeamPokemon | null)[];
  addToTeam: (pokemon: TeamPokemon) => boolean;
  removeFromTeam: (index: number) => void;
  clearTeam: () => void;
  isTeamFull: boolean;
  teamSize: number;
}

const TeamContext = createContext<TeamContextValue | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [team, setTeam] = useState<(TeamPokemon | null)[]>(
    Array(6).fill(null)
  );

  const addToTeam = (pokemon: TeamPokemon): boolean => {
    // Check if Pokémon is already in team
    const alreadyInTeam = team.some(
      (member) => member !== null && member.id === pokemon.id
    );
    if (alreadyInTeam) {
      return false;
    }

    // Find first empty slot
    const emptyIndex = team.findIndex((slot) => slot === null);
    if (emptyIndex === -1) {
      return false; // Team is full
    }

    setTeam((prev) => {
      const newTeam = [...prev];
      newTeam[emptyIndex] = pokemon;
      return newTeam;
    });
    return true;
  };

  const removeFromTeam = (index: number) => {
    if (index < 0 || index >= 6) return;
    
    setTeam((prev) => {
      const newTeam = [...prev];
      newTeam[index] = null;
      return newTeam;
    });
  };

  const clearTeam = () => {
    setTeam(Array(6).fill(null));
  };

  const teamSize = team.filter((member) => member !== null).length;
  const isTeamFull = teamSize === 6;

  return (
    <TeamContext.Provider
      value={{
        team,
        addToTeam,
        removeFromTeam,
        clearTeam,
        isTeamFull,
        teamSize,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}
