/**
 * Evolution chain service
 * Layer 5: Service/IO adapter
 */

import { fetchFromPokeAPI } from "./client";
import type { EvolutionChain, ChainLink } from "./types";

export async function fetchEvolutionChain(
  chainId: number
): Promise<EvolutionChain> {
  return fetchFromPokeAPI<EvolutionChain>(`evolution-chain/${chainId}`);
}

export function isTradeEvolution(speciesName: string, chain: EvolutionChain): boolean {
  return checkTradeEvolutionInChain(speciesName, chain.chain);
}

function checkTradeEvolutionInChain(
  speciesName: string,
  link: ChainLink
): boolean {
  // Check if this species evolves via trade
  if (link.species.name === speciesName) {
    return link.evolution_details.some(
      (detail) => detail.trigger.name === "trade"
    );
  }

  // Recursively check evolved forms
  for (const evolvedForm of link.evolves_to) {
    if (checkTradeEvolutionInChain(speciesName, evolvedForm)) {
      return true;
    }
  }

  return false;
}

export function getAllSpeciesInChain(chain: EvolutionChain): string[] {
  const species: string[] = [];
  collectSpeciesFromChain(chain.chain, species);
  return species;
}

function collectSpeciesFromChain(link: ChainLink, species: string[]): void {
  species.push(link.species.name);
  for (const evolvedForm of link.evolves_to) {
    collectSpeciesFromChain(evolvedForm, species);
  }
}
