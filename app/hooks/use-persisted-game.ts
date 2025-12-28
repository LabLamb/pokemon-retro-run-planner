/**
 * Business logic for persisting selected game to localStorage
 * Layer 3: Business logic & hooks
 * 
 * Orchestrates reading/writing game selection using the storage service
 */

import { useState, useCallback } from "react";
import { getFromStorage, setInStorage, removeFromStorage } from "~/services/storage/local-storage";

const GAME_STORAGE_KEY = "pokemon-planner-game";

export interface UsePersistedGameReturn {
  gameId: string;
  setGameId: (gameId: string) => void;
  clearGame: () => void;
}

/**
 * Hook that manages game selection with localStorage persistence
 * Loads initial state from localStorage and persists all changes
 */
export function usePersistedGame(): UsePersistedGameReturn {
  // Initialize state from localStorage
  const [gameId, setGameIdState] = useState<string>(() => {
    const stored = getFromStorage<string>(GAME_STORAGE_KEY);
    return stored || "";
  });

  /**
   * Updates game selection and persists to localStorage
   */
  const setGameId = useCallback((newGameId: string) => {
    if (newGameId) {
      setInStorage(GAME_STORAGE_KEY, newGameId);
    } else {
      removeFromStorage(GAME_STORAGE_KEY);
    }
    setGameIdState(newGameId);
  }, []);

  /**
   * Clears game selection from state and localStorage
   */
  const clearGame = useCallback(() => {
    removeFromStorage(GAME_STORAGE_KEY);
    setGameIdState("");
  }, []);

  return {
    gameId,
    setGameId,
    clearGame,
  };
}
