/**
 * PokéAPI response type definitions
 * Layer 5: Service types
 */

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    home?: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
}

export interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: PokemonType[];
  past_types?: Array<{
    generation: NamedAPIResource;
    types: PokemonType[];
  }>;
  stats: PokemonStat[];
  sprites: PokemonSprites;
  moves: PokemonMove[];
  species: NamedAPIResource;
}

export interface LocationAreaEncounter {
  location_area: NamedAPIResource;
  version_details: {
    max_chance: number;
    encounter_details: {
      min_level: number;
      max_level: number;
      condition_values: NamedAPIResource[];
      chance: number;
      method: NamedAPIResource;
    }[];
    version: NamedAPIResource;
  }[];
}

export interface EvolutionDetail {
  item: NamedAPIResource | null;
  trigger: NamedAPIResource;
  gender: number | null;
  held_item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  turn_upside_down: boolean;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource | null;
  chain: ChainLink;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  evolution_chain: {
    url: string;
  };
  genera: {
    genus: string;
    language: NamedAPIResource;
  }[];
  names: {
    name: string;
    language: NamedAPIResource;
  }[];
}

export interface PokemonEntry {
  entry_number: number;
  pokemon_species: NamedAPIResource;
}

export interface Pokedex {
  id: number;
  name: string;
  is_main_series: boolean;
  descriptions: {
    description: string;
    language: NamedAPIResource;
  }[];
  names: {
    name: string;
    language: NamedAPIResource;
  }[];
  pokemon_entries: PokemonEntry[];
  region: NamedAPIResource | null;
  version_groups: NamedAPIResource[];
}
