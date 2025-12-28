/**
 * Team context provider - manages the user's team of up to 6 Pokémon
 * Layer 4: App state & context
 */

import { createContext, useContext, type ReactNode } from "react";
import { usePersistedTeam, type TeamPokemon } from "~/hooks/use-persisted-team";

// Re-export TeamPokemon type for consumers
export type { TeamPokemon };

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
  // Use business logic hook for persistence
  const { team, addToTeam, removeFromTeam, clearTeam, isTeamFull, teamSize } = usePersistedTeam();

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
