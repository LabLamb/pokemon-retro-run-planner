/**
 * Game context provider - manages the currently selected game version
 * Layer 4: App state & context
 */

import { createContext, useContext, type ReactNode } from "react";
import { usePersistedGame } from "~/hooks/use-persisted-game";

interface GameContextValue {
  gameId: string;
  setGameId: (gameId: string) => void;
  clearGame: () => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  // Use business logic hook for persistence
  const { gameId, setGameId, clearGame } = usePersistedGame();

  return (
    <GameContext.Provider value={{ gameId, setGameId, clearGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
