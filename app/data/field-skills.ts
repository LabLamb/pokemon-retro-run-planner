/**
 * Field skills (HMs/TMs) catalog with per-version-group availability
 */

export interface FieldSkill {
  id: string;
  label: string;
  moveName: string; // PokéAPI move identifier
  versionGroups: readonly string[]; // Version groups where this skill is available
  generation: number; // First generation introduced
}

export const FIELD_SKILLS: readonly FieldSkill[] = [
  {
    id: "cut",
    label: "Cut",
    moveName: "cut",
    versionGroups: [
      "red-blue",
      "yellow",
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
    ],
    generation: 1,
  },
  {
    id: "fly",
    label: "Fly",
    moveName: "fly",
    versionGroups: [
      "red-blue",
      "yellow",
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
      "black-white",
      "black-2-white-2",
    ],
    generation: 1,
  },
  {
    id: "surf",
    label: "Surf",
    moveName: "surf",
    versionGroups: [
      "red-blue",
      "yellow",
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
      "black-white",
      "black-2-white-2",
    ],
    generation: 1,
  },
  {
    id: "strength",
    label: "Strength",
    moveName: "strength",
    versionGroups: [
      "red-blue",
      "yellow",
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
      "black-white",
      "black-2-white-2",
    ],
    generation: 1,
  },
  {
    id: "flash",
    label: "Flash",
    moveName: "flash",
    versionGroups: [
      "red-blue",
      "yellow",
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
    ],
    generation: 1,
  },
  {
    id: "whirlpool",
    label: "Whirlpool",
    moveName: "whirlpool",
    versionGroups: [
      "gold-silver",
      "crystal",
      "heartgold-soulsilver",
    ],
    generation: 2,
  },
  {
    id: "waterfall",
    label: "Waterfall",
    moveName: "waterfall",
    versionGroups: [
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
      "black-white",
      "black-2-white-2",
    ],
    generation: 2,
  },
  {
    id: "rock-smash",
    label: "Rock Smash",
    moveName: "rock-smash",
    versionGroups: [
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
      "black-white",
      "black-2-white-2",
    ],
    generation: 2,
  },
  {
    id: "headbutt",
    label: "Headbutt",
    moveName: "headbutt",
    versionGroups: [
      "gold-silver",
      "crystal",
      "heartgold-soulsilver",
    ],
    generation: 2,
  },
  {
    id: "dive",
    label: "Dive",
    moveName: "dive",
    versionGroups: [
      "ruby-sapphire",
      "emerald",
      "black-white",
      "black-2-white-2",
    ],
    generation: 3,
  },
  {
    id: "rock-climb",
    label: "Rock Climb",
    moveName: "rock-climb",
    versionGroups: [
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
    ],
    generation: 4,
  },
  {
    id: "defog",
    label: "Defog",
    moveName: "defog",
    versionGroups: [
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
    ],
    generation: 4,
  },
  {
    id: "dig",
    label: "Dig",
    moveName: "dig",
    versionGroups: [
      "red-blue",
      "yellow",
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
      "black-white",
      "black-2-white-2",
    ],
    generation: 1,
  },
  {
    id: "teleport",
    label: "Teleport",
    moveName: "teleport",
    versionGroups: [
      "red-blue",
      "yellow",
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
      "black-white",
      "black-2-white-2",
    ],
    generation: 1,
  },
  {
    id: "sweet-scent",
    label: "Sweet Scent",
    moveName: "sweet-scent",
    versionGroups: [
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
      "black-white",
      "black-2-white-2",
    ],
    generation: 2,
  },
  {
    id: "milk-drink",
    label: "Milk Drink",
    moveName: "milk-drink",
    versionGroups: [
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
    ],
    generation: 2,
  },
  {
    id: "softboiled",
    label: "Softboiled",
    moveName: "softboiled",
    versionGroups: [
      "red-blue",
      "yellow",
      "gold-silver",
      "crystal",
      "ruby-sapphire",
      "emerald",
      "firered-leafgreen",
      "diamond-pearl",
      "platinum",
      "heartgold-soulsilver",
    ],
    generation: 1,
  },
] as const;

export type FieldSkillId = (typeof FIELD_SKILLS)[number]["id"];

export function getFieldSkillsForVersionGroup(
  versionGroup: string
): readonly FieldSkill[] {
  return FIELD_SKILLS.filter((skill) =>
    skill.versionGroups.includes(versionGroup)
  );
}

export function getFieldSkillById(id: string): FieldSkill | undefined {
  return FIELD_SKILLS.find((skill) => skill.id === id);
}
