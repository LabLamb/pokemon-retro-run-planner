/**
 * Precomputed availability data types
 * Layer 5: Data types
 */

export interface AvailabilityData {
  gameId: string;
  version: string;
  pokedexId: string;
  generatedAt: string;
  totalObtainable: number;
  obtainable: string[];
}
