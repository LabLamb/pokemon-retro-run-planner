/**
 * Game catalog mapping user-facing game titles to PokéAPI identifiers
 * Covers Japanese Red/Green through Black/White 2
 */

export interface GameInfo {
  id: string;
  name: string;
  version: string; // PokéAPI version identifier
  versionGroup: string; // PokéAPI version_group identifier
  generation: number;
  region: string;
  pokedexId: string; // Regional Pokédex identifier for species list
}

export const GAMES: readonly GameInfo[] = [
  // Generation I
  {
    id: "red-jp",
    name: "Pokémon Red (JP)",
    version: "red",
    versionGroup: "red-blue",
    generation: 1,
    region: "kanto",
    pokedexId: "kanto",
  },
  {
    id: "green-jp",
    name: "Pokémon Green (JP)",
    version: "green",
    versionGroup: "red-blue",
    generation: 1,
    region: "kanto",
    pokedexId: "kanto",
  },
  {
    id: "blue-jp",
    name: "Pokémon Blue (JP)",
    version: "blue",
    versionGroup: "red-blue",
    generation: 1,
    region: "kanto",
    pokedexId: "kanto",
  },
  {
    id: "red",
    name: "Pokémon Red",
    version: "red",
    versionGroup: "red-blue",
    generation: 1,
    region: "kanto",
    pokedexId: "kanto",
  },
  {
    id: "blue",
    name: "Pokémon Blue",
    version: "blue",
    versionGroup: "red-blue",
    generation: 1,
    region: "kanto",
    pokedexId: "kanto",
  },
  {
    id: "yellow",
    name: "Pokémon Yellow",
    version: "yellow",
    versionGroup: "yellow",
    generation: 1,
    region: "kanto",
    pokedexId: "kanto",
  },

  // Generation II
  {
    id: "gold",
    name: "Pokémon Gold",
    version: "gold",
    versionGroup: "gold-silver",
    generation: 2,
    region: "johto",
    pokedexId: "original-johto",
  },
  {
    id: "silver",
    name: "Pokémon Silver",
    version: "silver",
    versionGroup: "gold-silver",
    generation: 2,
    region: "johto",
    pokedexId: "original-johto",
  },
  {
    id: "crystal",
    name: "Pokémon Crystal",
    version: "crystal",
    versionGroup: "crystal",
    generation: 2,
    region: "johto",
    pokedexId: "original-johto",
  },

  // Generation III
  {
    id: "ruby",
    name: "Pokémon Ruby",
    version: "ruby",
    versionGroup: "ruby-sapphire",
    generation: 3,
    region: "hoenn",
    pokedexId: "hoenn",
  },
  {
    id: "sapphire",
    name: "Pokémon Sapphire",
    version: "sapphire",
    versionGroup: "ruby-sapphire",
    generation: 3,
    region: "hoenn",
    pokedexId: "hoenn",
  },
  {
    id: "emerald",
    name: "Pokémon Emerald",
    version: "emerald",
    versionGroup: "emerald",
    generation: 3,
    region: "hoenn",
    pokedexId: "hoenn",
  },
  {
    id: "firered",
    name: "Pokémon FireRed",
    version: "firered",
    versionGroup: "firered-leafgreen",
    generation: 3,
    region: "kanto",
    pokedexId: "kanto",
  },
  {
    id: "leafgreen",
    name: "Pokémon LeafGreen",
    version: "leafgreen",
    versionGroup: "firered-leafgreen",
    generation: 3,
    region: "kanto",
    pokedexId: "kanto",
  },

  // Generation IV
  {
    id: "diamond",
    name: "Pokémon Diamond",
    version: "diamond",
    versionGroup: "diamond-pearl",
    generation: 4,
    region: "sinnoh",
    pokedexId: "original-sinnoh",
  },
  {
    id: "pearl",
    name: "Pokémon Pearl",
    version: "pearl",
    versionGroup: "diamond-pearl",
    generation: 4,
    region: "sinnoh",
    pokedexId: "original-sinnoh",
  },
  {
    id: "platinum",
    name: "Pokémon Platinum",
    version: "platinum",
    versionGroup: "platinum",
    generation: 4,
    region: "sinnoh",
    pokedexId: "extended-sinnoh",
  },
  {
    id: "heartgold",
    name: "Pokémon HeartGold",
    version: "heartgold",
    versionGroup: "heartgold-soulsilver",
    generation: 4,
    region: "johto",
    pokedexId: "updated-johto",
  },
  {
    id: "soulsilver",
    name: "Pokémon SoulSilver",
    version: "soulsilver",
    versionGroup: "heartgold-soulsilver",
    generation: 4,
    region: "johto",
    pokedexId: "updated-johto",
  },

  // Generation V
  {
    id: "black",
    name: "Pokémon Black",
    version: "black",
    versionGroup: "black-white",
    generation: 5,
    region: "unova",
    pokedexId: "original-unova",
  },
  {
    id: "white",
    name: "Pokémon White",
    version: "white",
    versionGroup: "black-white",
    generation: 5,
    region: "unova",
    pokedexId: "original-unova",
  },
  {
    id: "black-2",
    name: "Pokémon Black 2",
    version: "black-2",
    versionGroup: "black-2-white-2",
    generation: 5,
    region: "unova",
    pokedexId: "updated-unova",
  },
  {
    id: "white-2",
    name: "Pokémon White 2",
    version: "white-2",
    versionGroup: "black-2-white-2",
    generation: 5,
    region: "unova",
    pokedexId: "updated-unova",
  },
] as const;

export type GameId = (typeof GAMES)[number]["id"];

export function getGameById(id: string): GameInfo | undefined {
  return GAMES.find((game) => game.id === id);
}

export function getGamesByGeneration(generation: number): readonly GameInfo[] {
  return GAMES.filter((game) => game.generation === generation);
}
